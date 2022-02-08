from datetime import datetime
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



# def audit_create(table_name, primary_key_value, column_list):
#     audit = Audit(
#         user_id=current_user.id,
#         audit_date=datetime.now(),
#         table_name=table_name,
#         primary_key_value=primary_key_value
#     )
#
#     db.session.add(audit)
#     db.session.commit()
#
#     for column in column_list:
#         audit_detail = AuditDetail(
#             audit_di=audit.id,
#             column_name=column
#         )
#         db.session.add(audit_detail)
#     db.session.commit()

