from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Authority
from app import db
from app.utils.functions import row2dict


@admin.route('/authority', methods=['GET'])
def listAuthority():
    authority = Authority.query.all()

    return json_response(data=(row2dict(x,summary=True) for x in authority))



    # return json_response(
    #  id= 0,
    #  name= "string",
    #  unit= "string",
    #  help_url= "string"
    #  )

# [
#   {
#     "id": 0,
#     "name": "string",
#     "unit": "string",
#     "help_url": "string"
#   }
# ]


@admin.route('/authority/add', methods=['GET', 'POST'])
def add_authority():
    form = AuthorityForm()
    if form.validate_on_submit():
        authority = Authority(name=form.name.data)
        try:
            db.session.add(authority)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_authority'))

    return render_template('admin/authority.html',
                           form=form,
                           title="Add authority")


@admin.route('/authority/delete/<int:id>', methods=['GET', 'POST'])
def delete_authority(id):
    authority = Authority.query.get_or_404(id)
    db.session.delete(authority)
    db.session.commit()

    return redirect(url_for('admin.list_authority'))


@admin.route('/authority/edit/<int:id>', methods=['GET', 'POST'])
def edit_authority(id):
    authority = Authority.query.get_or_404(id)
    form = AuthorityForm(obj=authority)

    if form.validate_on_submit():
        authority.name = form.name.data
        db.session.commit()
        return redirect(url_for('admin.list_authority'))

    return render_template('admin/authority.html',
                           form=form,
                           authority=authority,
                           title='Edit subject authority')


# ~~TESTING~~

# @admin.route('/authority', methods=['GET'])
# def list_authority():
#     authority = SubjectGroup.query.all()
#     return json_response(
#  id= 0,
#  name= "string",
#  unit= "string",
#  help_url= "string"
#  )
# return render_template('admin/authority.html',
#                        rowdata=authority,
#                        title='Subject Groups')
