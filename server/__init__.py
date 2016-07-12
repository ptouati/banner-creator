import flask

from .views import setup_routes


def main():
    app = flask.Flask(__name__, instance_relative_config=True)

    setup_routes(app)

    # Apply default config and dev config from instance/config.cfg if exists
    app.config.from_object('server.config')
    app.config.from_pyfile('config.cfg', silent=True)

    app.run()
