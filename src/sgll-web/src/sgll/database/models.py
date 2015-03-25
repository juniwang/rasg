#!/usr/bin/env python
# -*- coding: utf-8 -*-


from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import backref, relation
from . import Base, db_adapter
import json


def relationship(*arg, **kw):
    ret = relation(*arg, **kw)
    db_adapter.commit()
    return ret


class Player(Base):
    __tablename__ = 'player'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    server = Column(String(20))
    game_player_id = Column(String(100))
    dan = Column(Integer)
    shi = Column(Integer)

    def json(self):
        return json.dumps(self)

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

    def json(self):
        return json.dumps(self)

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

    def json(self):
        return json.dumps(self)

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

    figure_id = Column(Integer, ForeignKey('figure.id', ondelete='CASCADE'))
    figure = relationship('Figure', backref=backref('cards', lazy='dynamic'))

    player_id = Column(Integer, ForeignKey('player.id', ondelete='CASCADE'))
    player = relationship('Player', backref=backref('cards', lazy='dynamic'))

    def json(self):
        return json.dumps(self)

    def __init__(self, **kwargs):
        super(Card, self).__init__(**kwargs)

    def __repr__(self):
        return "Card: " + self.json()
