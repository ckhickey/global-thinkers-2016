"""Main entry point for GT '16
"""

from flask import Blueprint, redirect, render_template, request, url_for
from helpers import is_bot, is_dev_env, get_version_hash
import json
import os

dist_dir = os.getcwd() + '/2016/dist'
app_entry = 'index.html'

gt16 = Blueprint('gt16', __name__, static_folder=dist_dir, template_folder=dist_dir)

def get_json_context(subdir, slug):
    """Helper to retrieve template context
    """

    try:
        path = os.path.join(dist_dir, 'app/data', subdir, slug + '.json')
        with open(path) as f:
            return json.load(f)
    except:
        return None

def get_response(template, subdir, slug):
    """Common response wrapper
    """

    ua_string = request.headers.get('User-Agent', '')
    if is_bot(ua_string):
        context = get_json_context(str(subdir), str(slug))
        if not isinstance(context, dict):
            return 'Not Found', 404
        return render_template('static_templates/' + template, **context)
    return render_template(app_entry, **{'h': get_version_hash(), 'is_prod': not is_dev_env()})

@gt16.route('/2016/essay/<essay_slug>/', methods=['GET'])
def essay(essay_slug):
    """Essay pages
    """

    return get_response('essay.html', 'entries', essay_slug)

@gt16.route('/2016/profile/<profile_slug>/', methods=['GET'])
def profile(profile_slug):
    """Individual thinker profiles
    """

    return get_response('profile.html', 'entries', profile_slug)

@gt16.route('/2016/category/<category_slug>/', methods=['GET'])
def category(category_slug):
    """Category pages
    """

    return get_response('category.html', 'categories', category_slug)

@gt16.route('/2016/<page_slug>/', methods=['GET'])
def page(page_slug):
    """Misc. pages (AARP for now)
    """

    # HACK for only having one page now
    if page_slug not in ['aarp', 'statistics']:
        return redirect(url_for('gt16.index'), code=302)
    return get_response('%s.html' % (page_slug), 'pages', page_slug)

@gt16.route('/2016/', methods=['GET'])
def index():
    """Home
    """

    return get_response('home.html', 'pages', 'home')
