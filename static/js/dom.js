// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";


let statusesDraggable = [];
export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);

        });

        // const boardExpandButton = document.getElementById('')\


    },

    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
               <div>
                    <p>
                        <div class="navbar navbar-light bg-light rounded border">
                            <div class="d-flex flex-row">
                              <a class="btn btn-light" data-toggle="collapse" href="#collapseExample${board.id}"  role="button" aria-expanded="false" aria-controls="collapseExample">
                                ${board.title}
                              </a>
                              <button type="button" class="btn btn-light mr-1 rounded border-secondary" id="buttonNewCardForBoard${board.id}">+ New Card</button>
                              <button id="buttonNewStatusForBoard${board.id}" class="btn btn-light mr-1 rounded border-secondary" data-toggle="collapse" href="#collapseExampleInput${board.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                                + New Status
                              </button>  
                            </div>
                            <button id ="board_${board.id}" class="btn btn-light rounded border-secondary" type="button" data-toggle="collapse" data-target="#collapseExample${board.id}" aria-expanded="false" aria-controls="collapseExample">
                                v
                            </button>
                        </div>
                    </p>
                    <div>     
                      <div class="collapse inputClass" id="collapseExampleInput${board.id}">
                        <input type="text" class="inputId" placeholder="Add new Status">
                    </div>
                    <div class="collapse" id="collapseExample${board.id}">
                      <div class="card card-body container" >
                        <div class="container-fluid">
                            <div class="row" id="${board.id}">
                            </div>
                        </div>
                     </div>
                </div>  
        `;
        }

        const outerHtml = `

            <ul class="container">
                ${boardList}
            </ul>
          
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);

        const boardExpandButton = document.getElementsByTagName('button');


        for (let button of boardExpandButton) {
            if (button.id.slice(0, 21) === 'buttonNewCardForBoard') {
                button.addEventListener('click', handleNewCardClick);
            } else if (button.id.includes('buttonNewStatusForBoard')) {
                // console.log('entered if ');
                button.addEventListener('click', handleNewColumnclick);

            }
            else if (button.id.includes('nav')) {
                console.log('skipped nav buttons');
            }
            else {
                button.addEventListener('click', async function (event) {
                    let idForBoard = button.id.slice(6);
                    console.log('idb', idForBoard);
                    let response = await fetch(`${window.origin}/get-statuses/${idForBoard}`);
                    response = await response.json();
                    //console.log(response);
                    console.log('Pop Boards');
                    let boardBody = document.getElementById(`${idForBoard}`);
                    boardBody.innerHTML = '';

                    for (let element of response) {
                        console.log('Populating with the', element);
                        createAppend(element);
                        let columnResponse = await fetch(`${window.origin}/get-cards/${element.id}`);
                        columnResponse = await columnResponse.json();
                        let columnBody = document.getElementById(`column_tr_${element.id}`);
                        columnBody.innerHTML = '';
                        columnBody.innerText = element.title;
                        for (let card of columnResponse) {
                            // console.log(card);
                            createAppendCard(card);
                        }

                        insertObjectInArray(columnBody, statusesDraggable);

                    }
                    markCardsForClickRename();
                    console.log(statusesDraggable);
                    let drake = dragula(statusesDraggable).on('drop', function (el, target, source, sibling) {
                        el.dataset.card = target.id;
                        el.dataset.board = target.dataset.board;
                        let i = 0;
                        if (source.length > 0) {
                            for (let child of source.children) {

                                child.dataset.order = i;
                                i += 1;
                                console.log(child, 'from source');
                                let dataToSend = {
                                    status_id: child.dataset.card.slice(10),
                                    board_id: child.dataset.board,
                                    column_order: child.dataset.order,
                                    id: child.id.slice(5)
                                };
                                fetch(`${window.origin}/move`, {
                                    method: 'POST',
                                    credentials: "include",
                                    cache: "no-cache",
                                    headers: new Headers({
                                        'content-type': 'application/json'
                                    }),
                                    body: JSON.stringify(dataToSend)
                                });
                            }
                        }
                        i = 0;
                        for (let child of target.children) {
                            child.dataset.order = i;
                            i += 1;
                            console.log(child, 'from target');
                            let dataToSend = {
                                status_id: child.dataset.card.slice(10),
                                board_id: child.dataset.board,
                                column_order: child.dataset.order,
                                id: child.id.slice(5)
                            };
                            fetch(`${window.origin}/move`, {
                                method: 'POST',
                                credentials: "include",
                                cache: "no-cache",
                                headers: new Headers({
                                    'content-type': 'application/json'
                                }),
                                body: JSON.stringify(dataToSend)
                            });
                        }

                    });
                    console.log(`Board event ${this.id} expanded`);
                });
            }
        }


    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features

};

function createAppend(element) {
    let boardBody = document.getElementById(`${element.board_id}`)
    let column = document.createElement('div');
    column.setAttribute('class', 'col-md text-center');
    // let column_tr = document.createElement('p');
    // column.setAttribute('class', 'col-sm');
    column.setAttribute('style', 'margin:10px; border: 2px solid black; display: table');
    // column.setAttribute('style', 'display: block;')
    column.setAttribute('id', `column_${element.id}`);
    column.setAttribute('id', `column_tr_${element.id}`);
    column.setAttribute('data-board', element.board_id);
    column.innerText = `test ${element.title}`;
    boardBody.appendChild(column);
    // boardBody.appendChild(column_tr);

}

function createAppendCard(element) {
    let columnBody = document.getElementById(`column_tr_${element.status_id}`);
    if (columnBody) {
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'col-md');
    cardBody.setAttribute('style', ' border: 2px solid black; margin: 6px; cursor: pointer;');
    cardBody.setAttribute('id', `card_${element.id}`);
    cardBody.setAttribute('data-card', `${columnBody.id}`);
    cardBody.setAttribute('data-board', columnBody.dataset.board);
    cardBody.setAttribute('data-order', element['column_order']);
    cardBody.innerText += `${element.title}`;
    columnBody.appendChild(cardBody);
    }
}

const insertObjectInArray = (elem, arr) => {

    // console.log('element compared',elem);
    // console.log('arr elems', arr[0]);
    let search = 0;
    let pos;
    if (arr.length === 0) {
        arr.push(elem);
    }
    for (let el of arr) {

        if (elem.id != el.id) {
            search += 1;
        } else {
            pos = arr.indexOf(el)
        }
    }
    if (search === arr.length) {
        arr.push(elem);
    } else {
        arr.splice(pos, 1);
        arr.push(elem);
    }

};

function handleNewColumnclick(event) {
    //console.clear()
    let board_id = event.target.id.slice(23);
    let inputsColumnName = document.querySelectorAll("input");
    // let status_title;

    // console.log(input);
    for (let input of inputsColumnName) {
        input.addEventListener('change', function (event) {
            console.log('input value', event.target.value);
            let status_title = event.target.value;
            let data = {board_id, status_title};
            const options = {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            fetch('http://127.0.0.1:5000/api/create-status', options).then(() => location.reload());
        });
    }
}

export function createRegisterModal() {
    let registerModal = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="register">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" id="username"
                               placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <div id="errorAlert" class="alert alert-danger" role="alert" style="display: none"></div>
                    <div id="successAlert" class="alert alert-success" role="alert" style="display: none"></div>
                </form>
            </div>
        </div>
    </div>
</div>
    `;
    document.querySelector('#register-modal').innerHTML = registerModal;

}

export function createLoginModal() {
    let loginModal = `
    <!-- Modal Login-->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" id="close-login" aria-label="Close" ">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="login">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" id="username-login"
                               placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password-login" placeholder="Password" required>
                    </div>
                    <button type="submit" class="btn btn-primary" id="submit-login" >Submit</button>
                    <div id="errorAlert-login" class="alert alert-danger" role="alert" style="display: none"></div>
                    <div id="successAlert-login" class="alert alert-success" role="alert" style="display: none">Logged in</div>
                </form>
            </div>
        </div>
    </div>
</div>
    `
    document.querySelector('#login-modal').innerHTML = loginModal;
    refreshloginModal();

}


function refreshloginModal() {
    let submitLogin = document.querySelector('#close-login');
    submitLogin.addEventListener('click', function () {
        location.reload();
    });
}

function handleNewCardClick(event) {
    let board_id = event.target.id.slice(21);
    let card_title = 'New Card';
    let data = {board_id, card_title};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://127.0.0.1:5000/api/create-card', options);
    // Artificial temporary visual update, must change before card edit
    fetch(`http://127.0.0.1:5000/api/board-first-status/${board_id}`)
        .then(response => response.json())
        .then(function(data) {
        console.log('data ', data);
        let tempColumn = document.getElementById(`column_tr_${data.first_status_id}`);
        let tempCard = document.createElement('div');
        tempCard.setAttribute('class', 'col-md');
        tempCard.setAttribute('style', ' border: 2px solid black; margin: 6px; cursor: pointer;');
        tempCard.setAttribute('id', `card_${data.last_card_id}`);
        tempCard.setAttribute('data-card', `column_tr_${data.first_status_id}`);
        tempCard.setAttribute('data-board', `${board_id}`);
        tempCard.setAttribute('data-order', `${data.last_card_order}`);
        tempCard.innerText += `${card_title}`;
        console.log('temp card     ', tempCard);
        tempColumn.appendChild(tempCard);
    });
}

function markCardsForClickRename() {
    let allCards = document.getElementsByClassName("col-md");
    console.log('cards= ', allCards);
    for (let card of allCards) {
        if (card.id.includes('card_')) {
            card.addEventListener('click', handleCardClickRename);
            card.addEventListener('keydown', handleCardRenameKeyPressed);
            card.addEventListener('change', handleCardRenameChange)
        }
    }
}

function handleCardRenameChange(event) {
    event.currentTarget.innerHTML = event.target.defaultValue;
}

function handleCardClickRename(event) {
    console.log('entered card click rename');
    console.log('click rename event:', event.toElement.innerHTML);
    event.toElement.innerHTML = `
            <input type="text" value="${event.toElement.innerHTML}">
    `;
}

function handleCardRenameKeyPressed(event) {
    if (event.which == 13 || event.keyCode == 13) {
        event.target.defaultValue = event.target.value;
        console.log(event.target.value);
        console.log(event.target);
        let tempValue = event.target.value;
        event.currentTarget.innerHTML = tempValue;
        console.log('post replacement ', event.target);
        let cardId = event.currentTarget.id.slice(5)
        console.log('parent_id card id ', event.currentTarget.id )
        console.log(cardId);
        let data = {cardId, tempValue};
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        };
        fetch(`http://127.0.0.1:5000/api/rename-card/${cardId}`, options);
    }
    else if (event.which == 27 || event.keyCode == 27) {
        event.currentTarget.innerHTML = event.target.defaultValue;
    }
}
