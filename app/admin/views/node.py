from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Node
from app import db
from app.utils.functions import row2dict


@admin.route('/node', methods=['GET'])
def listNode():
    node = Node.query.all()

    return json_response(data=(row2dict(x) for x in node))



@admin.route('/node/add', methods=['GET', 'POST'])
def add_node():
    form = NodeForm()
    if form.validate_on_submit():
        node = Node(name=form.name.data)
        try:
            db.session.add(node)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_node'))

    return render_template('admin/node.html',
                           form=form,
                           title="Add node")




    return render_template('admin/node.html',
                           form=form,
                           node=node,
                           title='Edit subject node')


