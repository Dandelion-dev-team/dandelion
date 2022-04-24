import json
import os

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
	Level, ConditionLevel, ResponseVariable
from app.utils.uploads import content_folder
import logging

logger = logging.getLogger()


@admin.route('/uploadData', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def upload_data():
	# ToDo: Make generic - decrypt
	b64text = request.data
	logger.error(b64text)

	ciphertext = base64.decodebytes(b64text)

	plaintext = decrypt(ciphertext, current_app.config["AES_KEY"])
	logger.error(plaintext)

	json_data = json.loads(plaintext)
	logger.error(json_data['message'])

	# id = 1
	# json_data = request.get_json()
	#
	# s = json.dumps(json_data)
	# j = json.loads(s)  # <-- Convert JSON string, s, to JSON object, j, with j = json.loads(s)
	#
	# for cube_level in ('top', 'middle', 'bottom'):
	#
	#     new_data_df = pd.DataFrame(j[cube_level], index=[j["timestamp"]])
	#     new_data_df.index = pd.to_datetime(new_data_df.index)
	#     new_data_df.index.name = "timestamp"
	#
	#     newdir = os.path.join(content_folder("DATA_ROOT", id, "FLASK", upload=True))
	#
	#     try:
	#         df = pd.read_csv(os.path.join(newdir, cube_level + '.csv'), index_col="timestamp")
	#         df = pd.concat([df, new_data_df])
	#     except:
	#         df = new_data_df
	#     df.to_csv(os.path.join(newdir, cube_level + '.csv'))
	#

	logger.error("Node data detected")

	message = "Node Data uploaded"
	return {"message": message}


def decrypt(ct, key_string):
	key = bytearray(key_string.encode('ascii'))
	iv = bytearray(ct[0:16])
	ct = bytearray(ct[16:])
	cipher = AES.new(key, AES.MODE_CBC, iv)
	decrypted = cipher.decrypt(ct)
	return unpad(decrypted, current_app.config["BLOCKSIZE"])
