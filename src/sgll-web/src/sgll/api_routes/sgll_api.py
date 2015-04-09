#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys

sys.path.append("..")
from flask_restful import Resource, reqparse
from sgll.player import player_manager
from flask import request
from sgll.sg import sg


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


class FigureListResource(Resource):
    def get(self):
        return sg.get_figure_names()


class CardResource(Resource):
    def get(self, name):
        return sg.search_card_by_name(name)

    def post(self, name):
        return sg.add_new_card(name)

    def delete(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, location='args')
        args = parser.parse_args()
        if args['id'] is None:
            return "Bad request", 400
        return sg.delete_card(args["id"])

    def put(self, name):
        body = request.get_json()
        if "id" not in body:
            return "Bad Request", 400

        return sg.update_card(body)


class FigureResource(Resource):
    def post(self, name):
        return sg.add_figure(name)