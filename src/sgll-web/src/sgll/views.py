#!/usr/bin/env python
# -*- coding: utf-8 -*-

from . import api, app
from sgll.database import db_session
from api_routes import *
from player import player_manager
from flask import render_template


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


api.add_resource(PlayerResource, "/api/sgll/player")

api.add_resource(SeedResource, "/api/farm/seed/<string:name>")
api.add_resource(SeedListResource, "/api/farm/seed/list")
api.add_resource(SeedAllResource, "/api/farm/seeds")


@app.route("/")
def index():
    return render_template("index.html", user=player_manager.get_by_id(1))


@app.route("/farm")
def farm():
    return render_template("farm/index.html")
