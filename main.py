"""Main entry point for GT Base
"""

from blueprints.helpers import get_version_hash
from blueprints.gt16 import gt16
from flask import Flask, redirect, request, url_for
from urllib import urlencode
import os

"""Determine if basic auth enabled
"""
BASIC_AUTH = os.environ.get('BASIC_AUTH', 'False') == 'True'
if BASIC_AUTH:
    from flask_basicauth import BasicAuth
    from blueprints.helpers import is_social_bot

APP = Flask(__name__)
APP.url_map.strict_slashes = False
APP.register_blueprint(gt16)

@APP.before_request
def check_current_version_hash():
    """Cache-buster; redirects to hash-appended path

    @see https://davepeck.org/2011/10/25/a-word-on-app-engine-caching/
    """

    args = request.args.copy()
    path = request.path
    stripped_path = path.rstrip('/')
    non_redirected_paths = [
        '',
    ]
    h = get_version_hash()
    if h is False or h in args:
        if stripped_path in non_redirected_paths or not path.endswith('/'):
            return
        return redirect(stripped_path + '?' + urlencode(args), 302)
    args[h] = ''
    return redirect(stripped_path + '?' + urlencode(args), 302)

if BASIC_AUTH:
    APP.config['BASIC_AUTH_USERNAME'] = os.environ.get('BASIC_AUTH_USERNAME', 'gt')
    APP.config['BASIC_AUTH_PASSWORD'] = os.environ.get('BASIC_AUTH_PASSWORD', 'guest')

    @APP.before_request
    def check_user_agent():
        """Checks if user agent is a social bot so certain social bots
        can bypass basic auth

        NOTE: This must be before calling `BasicAuth`!
        """

        ua_string = request.headers.get('User-Agent', '')
        APP.config['BASIC_AUTH_FORCE'] = not is_social_bot(ua_string)

    BASIC_AUTH_APP = BasicAuth(APP)

@APP.route('/')
def index():
    """Base request, redirect to GT '16 for now
    """

    return redirect(url_for('gt16.index'), code=302)

@APP.errorhandler(404)
def not_found_error(_error):
    """404 catch; just redirecting to base '16 for now
    """

    return redirect(url_for('gt16.index'), code=302)
