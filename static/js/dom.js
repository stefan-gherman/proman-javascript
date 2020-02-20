// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

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
                        <div class="navbar navbar-light bg-light rounded">
                            <div class="d-flex flex-row">
                              <a class="btn btn-light" data-toggle="collapse" href="#collapseExample${board.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                                ${board.title}
                              </a>
                              <button type="button" class="btn btn-light rounded border-secondary" >+ New Card</button>

                            </div>
                            <button id ="board_${board.id}" class="card-btn btn btn-light rounded border-secondary" type="button" data-toggle="collapse" data-target="#collapseExample${board.id}" aria-expanded="false" aria-controls="collapseExample">
                                v
                            </button>
                        </div>
                    </p>
                    <div class="collapse" id="collapseExample${board.id}">
                    <div class="container">
                      <div class="card card-body container " >
                        <table class="table table-bordered">
                          <thead>
                            <tr >
                              
                            </tr>
                          </thead>
                          <tbody>
                            <tr id="${board.id}">
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
                </div>
`;

        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);

        const boardExpandButton = document.querySelectorAll('.card-btn');
        console.log(boardExpandButton);

        for (let button of boardExpandButton) {
            button.addEventListener('click', async function (event) {
                let idForBoard = button.id.slice(6);
                let response = await fetch(`${window.origin}/get-statuses/${idForBoard}`);
                response = await response.json();
                console.log(response);
                let boardBody = document.getElementById(`${idForBoard}`)
                boardBody.innerHTML = '';
                for (let element of response) {
                    createAppend(element);
                    console.log('Enter fetch');
                    let columnResponse = await fetch(`${window.origin}/get-cards/${element.id}`);
                    console.log('Before JSON');
                    columnResponse = await columnResponse.json();
                    console.log('After fetch');
                    let columnBody = document.getElementById(`column_tr_${element.id}`);
                    columnBody.innerHTML = '';
                    columnBody.innerText = element.title;
                    for (let card of columnResponse) {
                        createAppendCard(card);
                    }

                }

                console.log(`Board event ${this.id} expanded`);
            });
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
    let column = document.createElement('th');
    let column_tr = document.createElement('tr');
    // column.setAttribute('class', 'col-sm');
    // column.setAttribute('style', ' margin: 30px; border: 2px solid black');
    // column.setAttribute('style', 'display: block;')
    column.setAttribute('id', `column_${element.id}`);
    column.setAttribute('id', `column_tr_${element.id}`);
    column.innerText = `test ${element.title}`;
    boardBody.appendChild(column);
    boardBody.appendChild(column_tr);

}

function createAppendCard(element) {
    let columnBody = document.getElementById(`column_tr_${element.id}`);
    let card = document.createElement('td');
    card.setAttribute('class', 'col-md-2');
    card.setAttribute('style', ' margin: 30px; border: 2px solid black');
    card.setAttribute('id', `card_${element.id}`);
    card.innerText += `${element.title}`;
    columnBody.appendChild(card);

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


function refreshloginModal(){
    let submitLogin = document.querySelector('#close-login');
    submitLogin.addEventListener('click', function(){
       location.reload();
    });


}






