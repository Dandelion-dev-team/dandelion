def row2dict(row, summary=False):
    d = {}

    # todo: add error checking for the tables with no summary property

    for column in row.__table__.columns:
        if (summary and column.name in row.summary_columns) or not summary:
            d[column.name] = str(getattr(row, column.name))


    return d