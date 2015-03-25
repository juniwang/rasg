from flask_restful import Resource, reqparse
from . import api
from flask import g, request
from log import log
import json

#
# class UserExperimentResource(Resource):
#     def get(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('id', type=int, location='args')
#         args = parser.parse_args()
#         if args['id'] is None:
#             return json.dumps({"error": "Bad request"}), 400
#         try:
#             cs = expr_manager.get_expr_status(args['id'])
#         except Exception as e:
#             log.error(e)
#             return {"error": "Please Reload then Wait"}, 500
#         if cs is not None:
#             return cs
#         else:
#             return {"error": "Not Found"}, 404
#
#     def post(self):
#         args = request.get_json()
#         if "cid" not in args or "hackathon" not in args:
#             return "invalid parameter", 400
#         cid = args["cid"]
#         hackathon = args["hackathon"]
#         try:
#             return expr_manager.start_expr(hackathon, cid)
#         except Exception as err:
#             log.error(err)
#             return {"error": "fail to start due to '%s'" % err}, 500
#
#     # @token_required
#     def delete(self):
#         # id is experiment id
#         parser = reqparse.RequestParser()
#         parser.add_argument('id', type=int, location='args')
#         parser.add_argument('force', type=int, location='args')
#         args = parser.parse_args()
#         if args['id'] is None or args['force'] is None:
#             return {"error": "Bad request"}, 400
#         return expr_manager.stop_expr(args["id"], args['force'])
#
#     @token_required
#     def put(self):
#         args = request.get_json()
#         if args['id'] is None:
#             return json.dumps({"error": "Bad request"}), 400
#         return expr_manager.heart_beat(args["id"])
#
#
# api.add_resource(UserExperimentResource, "/api/user/experiment")
