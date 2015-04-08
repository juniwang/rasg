#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

sys.path.append("..")
from sgll.database.models import Figure, FigureData, Player, Card
from sgll.database import db_adapter
from datetime import datetime


class Sg():
    def __init__(self, db):
        self.db = db

    def __get_figure_by_name(self, name):
        return self.db.find_first_object_by(Figure, name=name)

    def get_figure_names(self):
        fs = self.db.find_all_objects(Figure)
        return [x.name for x in fs]

    def add_figure(self, name):
        return ""

    def search_card_by_name(self, name):
        f = self.__get_figure_by_name(name)
        if f is None:
            return []
        cards = f.cards.order_by(Card.skill_level.desc()).all()
        return [c.dic() for c in cards]

    def get_card_by_id(self, id):
        return self.db.find_first_object_by(Card, id=id)

    def add_new_card(self, name):
        f = self.__get_figure_by_name(name)
        if f is None:
            return "card '" + name + "'doesn't exists", 404

        card = Card(skill_level=0,
                    update_time=datetime.utcnow(),
                    graduated=0,
                    is_seed=0,
                    figure=f,
                    player_id=1)

        self.db.add_object(card)
        return card.dic()

    def delete_card(self, id):
        self.db.delete_all_objects_by(Card, id=id)

    def update_card(self, data):
        card = self.get_card_by_id(data["id"])
        if 'skill_name' in data:
            card.skill_name = data["skill_name"]
        if 'skill_level' in data:
            card.skill_level = data["skill_level"]
        if 'graduated' in data:
            card.graduated = data["graduated"]
        if 'ready_to_convert' in data:
            card.ready_to_convert = data["ready_to_convert"]
        if 'is_seed' in data:
            card.is_seed = data["is_seed"]
        if 'dan_shi' in data:
            card.dan_shi = data["dan_shi"]
        if 'need_enhance' in data:
            card.need_enhance = data["need_enhance"]
        card.update_time = datetime.utcnow()
        self.db.commit()


sg = Sg(db_adapter)