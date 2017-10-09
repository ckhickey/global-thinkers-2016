"""Helpers file
"""

import os
from hashlib import md5
from ua_parser import user_agent_parser

social_bots = [
    'Facebot',
    'Mozilla/5.0 (compatible; Google-Structured-Data-Testing-Tool +https://search.google.com/structured-data/testing-tool)',
    'Twitterbot',
    'Twitterbot/1.0',
    'facebookexternalhit/1.1',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
]

def is_bot(user_agent_string):
    """Nothing fancy for now and should handle most popular bots

    see: https://developers.facebook.com/docs/sharing/webmasters/crawler#identify
    see: https://dev.twitter.com/cards/getting-started#url-crawling-caching
    see: https://perishablepress.com/list-all-user-agents-top-search-engines/
    """

    try:
        if is_social_bot(user_agent_string):
            return True
        data = user_agent_parser.Parse(user_agent_string)
        if not isinstance(data, dict):
            return False
        return data.get('device', {}).get('family', '') is 'Spider'
    except:
        return False

def is_social_bot(user_agent_string):
    """Checks if UA string is a certain set of social bots
    """

    return user_agent_string in social_bots

def get_version_hash():
    """Lil' helper for keeping the version num smaller
    """

    current_version_id = os.environ.get('CURRENT_VERSION_ID', False)
    if current_version_id is False:
        return False
    try:
        h = md5(str(current_version_id).encode()).hexdigest()
        return h[:10]
    except:
        return False

def is_dev_env():
    """Helper to determine if in dev env

    NOTE: http://stackoverflow.com/a/25341224/1858091
    """

    return 'development' in os.environ.get('SERVER_SOFTWARE', '').lower()
