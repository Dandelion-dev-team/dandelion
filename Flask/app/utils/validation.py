def get_required(row):
	return [c.name for c in row.__table__.columns if not c.nullable]
