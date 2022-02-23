from datetime import datetime

from sqlalchemy import inspect

from app import db
from app.models import Audit, AuditDetail


def audit_create(table_name, primary_key_value, user_id):
    audit = Audit(
        user_id=user_id,
        audit_date=datetime.now(),
        table_name=table_name,
        primary_key_value=primary_key_value
    )

    db.session.add(audit)
    db.session.commit()


# This is the combined code
def prepare_audit_details(mapper, db_object, delete=False):
    audit_details = []

    for column in mapper.c:
        if column.name != "password_hash":
            history = getattr(inspect(db_object).attrs, column.name).history
            if delete or history.has_changes():
                audit_details.append({
                    'column_name': column.name,
                    'old_value': getattr(inspect(db_object).attrs, column.name).value if delete else history.deleted[0]
                })
    return audit_details


def audit_update(table_name, primary_key_value, audit_details, user_id):
    audit = Audit(
        user_id=user_id,
        audit_date=datetime.now(),
        table_name=table_name,
        primary_key_value=primary_key_value
    )

    db.session.add(audit)
    db.session.commit()

    for updated_column in audit_details:
        audit_detail = AuditDetail(
            audit_id=audit.id,
            column_name=updated_column["column_name"],
            old_value=updated_column["old_value"]
        )
        db.session.add(audit_detail)
    db.session.commit()


def audit_delete(table_name, primary_key_value, audit_details, user_id):
    audit = Audit(
        user_id=user_id,
        audit_date=datetime.now(),
        table_name=table_name,
        primary_key_value=primary_key_value
    )

    db.session.add(audit)
    db.session.commit()

    for deleted_column in audit_details:
        audit_detail = AuditDetail(
            audit_id=audit.id,
            column_name=deleted_column["column_name"],
            old_value=deleted_column["old_value"]
        )
        db.session.add(audit_detail)
    db.session.commit()

# def prepare_audit_details(mapper, db_object, delete=False):
#     audit_details = []
#
#     for column in mapper.c:
#         if column.name != "password_hash":
#             history = getattr(inspect(db_object).attrs, column.name).history
#             if delete or history.has_changes():
#                 audit_details.append({
#                 'column_name': column.name,
#                 'old_value': getattr(inspect(db_object).attrs, column.name).value if delete else history.deleted[0]
#                 })
#     return audit_details

# def prepare_audit_details(mapper, db_object):
#     audit_details = []
#     for attr in mapper.attrs:
#         if attr.key != "password_hash":
#             history = getattr(inspect(db_object).attrs, attr.key).history
#             if history.has_changes():
#                 audit_details.append({
#                     'column_name': attr.key,
#                     'old_value': history.deleted[0]
#                 })
#     return audit_details


# def prepare_audit_details_to_delete(mapper, db_object):
#     audit_details = []
#
#     for column in mapper.c:
#         if column.name != "password_hash":
#             audit_details.append({
#                     'column_name': column.name,
#                     'old_value': getattr(inspect(db_object).attrs, column.name).value
#             })
#     return audit_details
