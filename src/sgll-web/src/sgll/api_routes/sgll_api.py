#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys

sys.path.append("..")
from flask_restful import Resource, reqparse
from sgll.player import player_manager
from flask import request
import json

class PlayerResource(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, location='args')
        args = parser.parse_args()
        if args['id'] is None:
            return "Bad request", 400
        p = player_manager.get_by_id(args["id"])
        if p is None:
            return "Not Found", 404
        return p.dic()

    def post(self):
        return player_manager.add_player(request.get_json())
