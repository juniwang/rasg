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
api.add_resource(FigureListResource, "/api/sgll/fgs")
api.add_resource(FigureResource, "/api/sgll/fg/<string:name>")
api.add_resource(CardResource, "/api/sgll/card/<string:name>")
api.add_resource(TopDataResource, "/api/sgll/top")

api.add_resource(SeedResource, "/api/farm/seed/<string:name>")
api.add_resource(SeedListResource, "/api/farm/seed/list")
api.add_resource(SeedAllResource, "/api/farm/seeds")


@app.route("/")
def index():
    return render_template("index.html", user=player_manager.get_by_id(1))


@app.route("/farm")
def farm():
    return render_template("farm/index.html")


@app.route("/sgll")
@app.route("/sgll/card")
def sgll():
    return render_template("sgll/card.html")


@app.route("/sgll/fg")
def fg():
    return render_template("sgll/figure.html")


@app.route("/sgll/yz")
def stat():
    return render_template("sgll/yz.html")


@app.route("/sgll/top")
def top():
    return render_template("sgll/top.html")