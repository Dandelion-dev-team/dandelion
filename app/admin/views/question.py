from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Question
from app import db
from app.utils.functions import row2dict


@admin.route('/question', methods=['GET'])
def listQuestion():
    question = Question.query.all()

    return json_response(data=(row2dict(x) for x in question))



@admin.route('/question/add', methods=['GET', 'POST'])
def add_question():
    form = QuestionForm()
    if form.validate_on_submit():
        question = Question(name=form.name.data)
        try:
            db.session.add(question)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_question'))

    return render_template('admin/question.html',
                           form=form,
                           title="Add question")




    return render_template('admin/question.html',
                           form=form,
                           question=question,
                           title='Edit question')


