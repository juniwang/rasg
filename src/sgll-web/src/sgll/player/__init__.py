#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

sys.path.append("..")
from player_manager import PlayerManager
from sgll.database import db_adapter

player_manager = PlayerManager(db_adapter)