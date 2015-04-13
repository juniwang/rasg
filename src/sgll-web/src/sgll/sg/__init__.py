#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

sys.path.append("..")
from sgll.database.models import Figure, FigureData, Player, Card
from sgll.database import db_adapter
from datetime import datetime
from sgll.enum import FIGURE_TYPE, FIGURE_DATA_TYPE


class Sg():
    def __init__(self, db):
        self.db = db

    def __get_figure_by_name(self, name):
        return self.db.find_first_object_by(Figure, name=name)

    def get_figure_names(self):
        fs = self.db.find_all_objects(Figure)
        return [x.name for x in fs]

    def get_figure_by_name(self, name):
        f = self.__get_figure_by_name(name)
        if f is None:
            return "Not Found", 404

        dic = f.dic()
        dic["data"] = [d.dic() for d in f.data.all()]
        return dic

    def delete_figure_by_name(self, name):
        self.db.delete_all_objects_by(Figure, name=name)
        return "OK"


    def add_figure(self, name):
        fg = self.__get_figure_by_name(name)
        if fg is None:
            fg = Figure(name=name)
            self.db.add_object(fg)
        return fg.dic()


    def add_or_update_figure(self, name, body):
        fg = self.__get_figure_by_name(name)
        if fg is None:
            fg = Figure(name=name)
            self.db.add_object(fg)

        if "avatar" in body:
            fg.avatar = body["avatar"]
        if "country" in body:
            fg.country = body["country"]
        if "init_star" in body:
            fg.init_star = int(body["init_star"])
        if "figure_type" in body:
            fg.figure_type = body["figure_type"]
        self.db.commit()

        fg.data.delete()
        self.db.commit()

        fds = []
        if "data" in body:
            fds = body["data"]

        map(lambda d: self.add_figure_data(fg, d), fds)
        return fg.dic()

    def add_figure_data(self, figure, data):
        is_attack = int(data["is_attack"]) if "is_attack" in data else 0
        min = int(data["min"]) if "min" in data else 0
        max = int(data["max"]) if "max" in data else 0
        data_type = data["data_type"] if "data_type" in data else ""
        comment = data["comment"] if "comment" in data else ""

        fd = FigureData(is_attack=is_attack,
                        data_type=data_type,
                        comment=comment,
                        min=min,
                        max=max,
                        figure=figure)
        self.db.add_object(fd)
        return fd

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

    def get_yz_list(self):
        att = FigureData.query.join(Figure).filter(FigureData.is_attack == 1,
                                                   FigureData.data_type == FIGURE_DATA_TYPE.BASIC,
                                                   Figure.figure_type == FIGURE_TYPE.PERSON).order_by(
            FigureData.max.desc()).limit(7).all()
        att_j = [fd.dic() for fd in att]

        dl = FigureData.query.join(Figure).filter(FigureData.is_attack == 0,
                                                  FigureData.data_type == FIGURE_DATA_TYPE.BASIC,
                                                  Figure.figure_type == FIGURE_TYPE.PERSON).order_by(
            FigureData.max.desc()).limit(15).all()
        dl_j = [fd.dic() for fd in dl]

        return {
            "attack": att_j,
            "defense": dl_j
        }

    def get_opt_attack_list(self):
        att = FigureData.query.join(Figure).filter(FigureData.is_attack == 1,
                                                   FigureData.data_type == FIGURE_DATA_TYPE.OPT,
                                                   Figure.figure_type == FIGURE_TYPE.PERSON).order_by(
            FigureData.max.desc()).limit(30).all()
        return [fd.dic() for fd in att]


    def get_opt_defense_list(self):
        dl = FigureData.query.join(Figure).filter(FigureData.is_attack == 0,
                                                  FigureData.data_type == FIGURE_DATA_TYPE.OPT,
                                                  Figure.figure_type == FIGURE_TYPE.PERSON).order_by(
            FigureData.max.desc()).limit(30).all()
        return [fd.dic() for fd in dl]


    def get_weapon_list(self):
        att = FigureData.query.join(Figure).filter(FigureData.is_attack == 1,
                                                   Figure.figure_type == FIGURE_TYPE.WEAPON).order_by(
            FigureData.max.desc()).all()
        return [fd.dic() for fd in att]

    def get_armor_list(self):
        att = FigureData.query.join(Figure).filter(FigureData.is_attack == 0,
                                                   Figure.figure_type == FIGURE_TYPE.ARMOR).order_by(
            FigureData.max.desc()).all()
        return [fd.dic() for fd in att]


sg = Sg(db_adapter)