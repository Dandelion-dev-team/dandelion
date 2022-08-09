from flask import abort


def abort_db(e):
	print(e.orig.msg)
	abort(409, e.orig.msg.split(":")[0])
