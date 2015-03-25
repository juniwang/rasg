#!/usr/bin/env python
# -*- coding: utf-8 -*-

from . import api, app
from sgll.database import db_session
from api_routes import *
from player import player_manager


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


api.add_resource(PlayerResource, "/api/sgll/player")

@app.route("/")
def index():
    return "中文测试:" + player_manager.get_by_id(1).json()
