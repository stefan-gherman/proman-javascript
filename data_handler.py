import persistence
from psycopg2 import sql


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


@persistence.connection_handler
def get_boards(cursor):
    """
    Gather all boards
    :return:
    """
    # return persistence.get_boards(force=True)
    cursor.execute(
        sql.SQL('SELECT * FROM {boards};')
            .format(
            boards=sql.Identifier('boards')
        )
    )

    result = cursor.fetchall()
    return result


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards