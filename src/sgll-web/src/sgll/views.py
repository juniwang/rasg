#!/usr/bin/env python
# -*- coding: utf-8 -*-

from . import api, app
from sgll.database import db_session
from api_routes import *


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


api.add_resource(PlayerResource, "/api/sgll/player")
