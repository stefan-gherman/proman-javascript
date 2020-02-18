DROP table if exists cards;

DROP table if exists statuses;
drop table if exists users;
DROP table if exists boards;
CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    owner varchar(100) DEfault 'public'
);


CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    board_id int references boards(id) ON DELETE CASCADE
);


CREATE TABLE cards (
    id serial primary key ,
    board_id integer references boards(id) ON DELETE CASCADE,
    title varchar (100),
    status_id integer references statuses(id) ON DELETE CASCADE,
    column_order integer
);


INSERT INTO boards(title) VALUES ('board1');
INSERT INTO boards(title) VALUES ('board2');
INSERT INTO boards(title) VALUES ('board 3');

INSERT INTO  statuses(title,board_id) VALUES('new', 1);
INSERT INTO  statuses(title, board_id) VALUES('in progress', 1);
INSERT INTO  statuses(title, board_id) VALUES('testing', 1);
INSERT INTO  statuses(title, board_id) VALUES('done', 1);

INSERT INTO  statuses(title,board_id) VALUES('new', 2);
INSERT INTO  statuses(title, board_id) VALUES('in progress', 2);
INSERT INTO  statuses(title, board_id) VALUES('testing', 2);
INSERT INTO  statuses(title, board_id) VALUES('done', 2);

INSERT INTO  statuses(title,board_id) VALUES('new', 3);
INSERT INTO  statuses(title, board_id) VALUES('in progress', 3);
INSERT INTO  statuses(title, board_id) VALUES('testing', 3);


INSERT INTO cards(board_id, title, status_id, column_order) VALUES (1, 'new card 1', 0 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (1, 'new card 2', 0 + 1, 1);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (1, 'in progress card', 1 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (1, 'planning', 2 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (1, 'done card 1', 3 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (1, 'done card 1', 3 + 1, 1);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (2, 'new card 1', 0 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (2, 'new card 2', 0 + 1, 1);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (2, 'in progress card', 1 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (2, 'planning', 2 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (2, 'done card 1', 3 + 1, 0);
INSERT INTO cards(board_id, title, status_id, column_order) VALUES (2, 'done car 1', 3 + 1, 1);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(100) UNIQUE,
    password varchar(100),
    register_time timestamp DEFAULT now()
);



SELECT statuses.*
    from
statuses WHERE statuses.board_id= 3;


SELECT title
FROM
cards
WHERE status_id = 10;