import json
import os
from datetime import datetime

import pandas as pd
from flask import request, current_app
from flask_cors import cross_origin
from sqlalchemy import or_, and_, inspect
from sqlalchemy.orm import aliased
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
from typing import IO

from app import db
from app.admin import admin
from app.models import Observation, Experiment, School, Variable, SensorQuantity, ProjectPartner, Condition, Unit, \
	Level, ConditionLevel, ResponseVariable, Node
from app.utils.uploads import content_folder
import logging

logger = logging.getLogger()

@admin.route('/uploadData', methods=['POST'])
def upload_data():
	b64text = request.data
	ciphertext = base64.decodebytes(b64text)
	plaintext = decrypt(ciphertext, current_app.config["AES_KEY"])
	data = json.loads(plaintext)

	node = Node.query.filter(Node.mac_address == data["mac"]).first()
	if node:
		try:
			timestamp = datetime.strptime(data["timestamp"], "%Y-%m-%dT%H:%M:%S")
		except:
			# Assume send time is close enough to receive time
			# This branch handles incorrect formats as well as missing data
			timestamp = datetime.now()

		for cube_level in ('top', 'middle', 'bottom'):
			if cube_level in data:
				new_data_df = pd.DataFrame(data[cube_level], index=[timestamp])
				new_data_df.index = pd.to_datetime(new_data_df.index)
				new_data_df.index.name = "timestamp"

				folder = content_folder("node", node.id, "data", upload=True)
				try:
					df = pd.read_csv(os.path.join(folder, cube_level + '.csv'), index_col="timestamp")
					df = pd.concat([df, new_data_df])
				except:
					df = new_data_df
				df.to_csv(os.path.join(folder, cube_level + '.csv'), float_format='%.2f')
	else:
		folder = content_folder("node", 0, "data", upload=True)
		file = open(os.path.join(folder, "data.txt"), "a")
		file.write(plaintext.decode())
		file.write("\n")
		file.close()

	message = "Node Data uploaded"
	return {"message": message}


def decrypt(ct, key_string):
	key = bytearray(key_string.encode('ascii'))
	iv = bytearray(ct[0:16])
	ct = bytearray(ct[16:])
	cipher = AES.new(key, AES.MODE_CBC, iv)
	decrypted = cipher.decrypt(ct)
	return unpad(decrypted, current_app.config["BLOCKSIZE"])
