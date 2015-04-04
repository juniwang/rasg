#!/usr/bin/env python
# -*- coding: utf-8 -*-
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import backref, relation
from . import Base, db_adapter
import json
from datetime import datetime


def relationship(*arg, **kw):
    ret = relation(*arg, **kw)
    db_adapter.commit()
    return ret


def date_serializer(date):
    return long((date - datetime(1970, 1, 1)).total_seconds() * 1000)


def to_dic(inst, cls):
    # add your coversions for things like datetime's
    # and what-not that aren't serializable.
    convert = dict()

    d = dict()
    for c in cls.__table__.columns:
        v = getattr(inst, c.name)
        if c.type.__class__ in convert.keys() and v is not None:
            try:
                func = convert[c.type.__class__]
                d[c.name] = func(v)
            except:
                d[c.name] = "Error:  Failed to covert using ", str(convert[c.type.__class__])
        elif v is None:
            d[c.name] = str()
        else:
            d[c.name] = v
    return d


def to_json(inst, cls):
    return json.dumps(to_dic(inst, cls))


class Player(Base):
    __tablename__ = 'player'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    server = Column(String(20))
    game_player_id = Column(String(100))
    dan = Column(Integer)
    shi = Column(Integer)

    def dic(self):
        return to_dic(self, self.__class__)

    def json(self):
        return to_json(self, self.__class__)

    def __init__(self, **kwargs):
        super(Player, self).__init__(**kwargs)

    def __repr__(self):
        return "Player: " + self.json()


class Figure(Base):
    __tablename__ = 'figure'

    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    avatar = Column(String(120))
    country = Column(String(10))
    init_star = Column(Integer)
    figure_type = Column(Integer)  # Figure_type

    def dic(self):
        return to_dic(self, self.__class__)

    def json(self):
        return to_json(self, self.__class__)

    def __init__(self, **kwargs):
        super(Figure, self).__init__(**kwargs)

    def __repr__(self):
        return "Figure: " + self.json()


class FigureData(Base):
    __tablename__ = 'figure_data'

    id = Column(Integer, primary_key=True)
    data_type = Column(String(20))
    comment = Column(String(50))
    min = Column(Integer)
    max = Column(Integer)

    figure_id = Column(Integer, ForeignKey('figure.id', ondelete='CASCADE'))
    figure = relationship('Figure', backref=backref('data', lazy='dynamic'))

    def dic(self):
        return to_dic(self, self.__class__)

    def json(self):
        return to_json(self, self.__class__)

    def __init__(self, **kwargs):
        super(FigureData, self).__init__(**kwargs)

    def __repr__(self):
        return "FigureData: " + self.json()


class Card(Base):
    __tablename__ = 'card'

    id = Column(Integer, primary_key=True)
    skill_name = Column(String(10))
    skill_level = Column(Integer)
    graduated = Column(Integer)
    number = Column(Integer)
    update_time = Column(DateTime)

    figure_id = Column(Integer, ForeignKey('figure.id', ondelete='CASCADE'))
    figure = relationship('Figure', backref=backref('cards', lazy='dynamic'))

    player_id = Column(Integer, ForeignKey('player.id', ondelete='CASCADE'))
    player = relationship('Player', backref=backref('cards', lazy='dynamic'))

    def dic(self):
        return to_dic(self, self.__class__)

    def json(self):
        return to_json(self, self.__class__)

    def __init__(self, **kwargs):
        super(Card, self).__init__(**kwargs)

    def __repr__(self):
        return "Card: " + self.json()


class Seed(Base):
    __tablename__ = 'seed'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    number = Column(Integer)

    def dic(self):
        return to_dic(self, self.__class__)

    def json(self):
        return to_json(self, self.__class__)

    def __init__(self, **kwargs):
        super(Seed, self).__init__(**kwargs)

    def __repr__(self):
        return "Seed: " + self.json()
