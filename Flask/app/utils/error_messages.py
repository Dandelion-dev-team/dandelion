from flask import abort


def abort_db(e):
	abort(409, e.orig.msg.split(":")[0])
