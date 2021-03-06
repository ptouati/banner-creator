from flask import current_app
from flask import (render_template, request, flash)
from flask import send_from_directory
from flask_login import login_required, current_user

from server.db import db
from server.forms import profile_form
from server.models import User


@login_required
def user_profile():
    form = profile_form.ProfileForm()
    if form.validate_on_submit():
        User.query.filter_by(id=current_user.id).update(form.data)
        db.session.commit()
        flash('Профиль изменен.')
    elif request.method == 'POST':
        flash('Профиль не изменен. Проверьте введенные данные.')
    return render_template('user/user_profile.html', form=form)


def uploaded_font(filename):
    return send_from_directory(
        current_app.config['FONT_FOLDER'], filename
    )


def page_not_found(e):
    return render_template('error_pages/404.html'), 404


def forbidden(e):
    return render_template('error_pages/403.html'), 403


def bad_request(e):
    return render_template('error_pages/400.html'), 400


def internal_server_error(e):
    return render_template('error_pages/500.html'), 500
