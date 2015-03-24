__author__ = 'Junbo Wang'
__version__ = '1.0'

from flask import Flask
from flask_restful import Api

# flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_te$t_K3y!!!'

# flask restful
api = Api(app)

from . import views
