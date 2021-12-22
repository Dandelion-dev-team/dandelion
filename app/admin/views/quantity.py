from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Quantity
from app import db
from app.utils.functions import row2dict


@admin.route('/quantity', methods=['GET'])
def listQuantity():
    quantity = Quantity.query.all()

    return json_response(data=(row2dict(x) for x in quantity))



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


@admin.route('/quantity/add', methods=['GET', 'POST'])
def add_quantity():
    form = QuantityForm()
    if form.validate_on_submit():
        quantity = Quantity(name=form.name.data)
        try:
            db.session.add(quantity)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_quantity'))

    return render_template('admin/quantity.html',
                           form=form,
                           title="Add quantity")


@admin.route('/quantity/delete/<int:id>', methods=['GET', 'POST'])
def delete_quantity(id):
    quantity = Quantity.query.get_or_404(id)
    db.session.delete(quantity)
    db.session.commit()

    return redirect(url_for('admin.list_quantity'))


@admin.route('/quantity/edit/<int:id>', methods=['GET', 'POST'])
def edit_quantity(id):
    quantity = Quantity.query.get_or_404(id)
    form = QuantityForm(obj=quantity)

    if form.validate_on_submit():
        quantity.name = form.name.data
        db.session.commit()
        return redirect(url_for('admin.list_quantity'))

    return render_template('admin/quantity.html',
                           form=form,
                           quantity=quantity,
                           title='Edit subject quantity')


# ~~TESTING~~

# @admin.route('/quantity', methods=['GET'])
# def list_quantity():
#     quantity = SubjectGroup.query.all()
#     return json_response(
#  id= 0,
#  name= "string",
#  unit= "string",
#  help_url= "string"
#  )
# return render_template('admin/quantity.html',
#                        rowdata=quantity,
#                        title='Subject Groups')
