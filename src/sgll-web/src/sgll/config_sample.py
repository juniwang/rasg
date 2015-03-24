MYSQL_HOST = "localhost"
MYSQL_USER = "sgll"
MYSQL_PWD = "sgll"
MYSQL_DB = "sgll"

Config = {
    "mysql": {
        "connection": 'mysql://%s:%s@%s/%s' % (MYSQL_USER, MYSQL_PWD, MYSQL_HOST, MYSQL_DB)
    }
}
