from flask import Flask, render_template, url_for, request, jsonify
from util import json_response, hash_password, verify_password

import data_handler
import util

app = Flask(__name__)


@app.route('/')
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    try:
        username = util.username_validation(request.form['username'])
        password = hash_password(request.form['password'])
        if username and password:
            data_handler.save_credentials(username, password)
            return jsonify({'success': 'Account created, try to login.'})
        else:
            return jsonify({'error': 'Missing Data'})
    except:
        return jsonify({'error': 'Username already exists, try again.'})


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


# @app.route("/get-cards/<int:board_id>")
# @json_response
# def get_cards_for_board(board_id: int):
#     """
#     All cards that belongs to a board
#     :param board_id: id of the parent board
#     """
#     return data_handler.get_cards_for_board(board_id)
#

@app.route("/get-statuses/<board_id>")
@json_response
def get_statuses_for_board(board_id):
    return data_handler.get_statuses_for_board(board_id)


@app.route("/get-cards/<status_id>")
@json_response
def get_cards_for_status(status_id):
    return data_handler.get_cards_for_status(status_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
