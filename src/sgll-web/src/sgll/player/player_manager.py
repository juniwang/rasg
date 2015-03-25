#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

sys.path.append("..")
from sgll.database.models import Player


class PlayerManager:
    def __init__(self, db):
        self.db = db

    def get_by_id(self, id):
        return self.db.find_first_object_by(Player, id=id)

    def get_by_name(self, name):
        return self.db.find_first_object_by(Player, name=name)

    def add_player(self, **kwargs):
        return self.db.add_object_kwargs(Player, **kwargs)