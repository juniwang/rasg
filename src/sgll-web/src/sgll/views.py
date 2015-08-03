#!/usr/bin/env python
# -*- coding: utf-8 -*-

from . import api, app
from sgll.database import db_session
from api_routes import *
from flask import render_template
from log import log


@app.errorhandler(Exception)
def special_exception_handler(error):
    log.error(error)
    return 'Internal Server Error', 500


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


api.add_resource(SeedResource, "/api/farm/seed/<string:name>")
api.add_resource(SeedListResource, "/api/farm/seed/list")
api.add_resource(SeedAllResource, "/api/farm/seeds")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/farm")
def farm():
    return render_template("farm/index.html")