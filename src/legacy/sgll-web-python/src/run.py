#!flask/bin/python
from sgll import app

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9527, debug=True)