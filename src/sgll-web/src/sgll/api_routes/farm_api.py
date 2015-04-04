#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys

sys.path.append("..")
from flask_restful import Resource, reqparse
from sgll.farm import farm
from flask import request


class SeedResource(Resource):
    def get(self, name):
        return farm.get_seed_by_name(name).dic()

    def post(self, name):
        body = request.get_json()
        if "number" not in body:
            return "BadRequest", 400
        return farm.add_or_update(name, body).dic()

    def put(self, name):
        body = request.get_json()
        if "number" not in body:
            return "BadRequest", 400
        return farm.add_or_update(name, body).dic()

    def delete(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument('del', type=int, location='args', default=0)
        args = parser.parse_args()

        if args["del"] == 1:
            return farm.delete_seed(name)
        else:
            return farm.disable_seed(name).dic()


class SeedListResource(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('limit', type=int, location='args', default=10)
        parser.add_argument('del', type=int, location='args', default=0)
        args = parser.parse_args()
        if args["del"] == 1:
            return [s.dic() for s in farm.get_sell_list()]
        else:
            return [s.dic() for s in farm.get_top_seeds(args["limit"])]


class SeedAllResource(Resource):
    def get(self):
        return [s.dic() for s in farm.get_all_seeds()]