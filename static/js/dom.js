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
                        <div class="navbar navbar-light bg-light rounded">
                            <div class="d-flex flex-row">
                              <a class="btn btn-light" data-toggle="collapse" href="#collapseExample${board.id}"  role="button" aria-expanded="false" aria-controls="collapseExample">
                                ${board.title}
                              </a>
                              <button type="button" class="btn btn-light rounded border-secondary" >+ New Card</button>

                            </div>
                            <button id ="board_${board.id}" class="btn btn-light rounded border-secondary" type="button" data-toggle="collapse" data-target="#collapseExample${board.id}" aria-expanded="false" aria-controls="collapseExample">
                                v
                            </button>
                        </div>
                    </p>
                    <div class="collapse" id="collapseExample${board.id}">
                    
                      <div class="card card-body container " >
                      <div class="container-fluid">
                      <div class="row" id="${board.id}">
                      
                        
                        </div>
                      </div>
                     </div>
                     
                </div>
            
`;

        }

        const outerHtml = `

            <ul  class="board-container">
                ${boardList}
            </ul>
          
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);

        const boardExpandButton = document.getElementsByTagName('button');
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

                     if (checkIfObjectInArray(element, statusesDraggable) === false){
                        statusesDraggable.push(element);
                }
                }
                console.log(statusesDraggable);
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
    let column = document.createElement('div');
    column.setAttribute('class', 'col-md text-center');
    // let column_tr = document.createElement('p');
    // column.setAttribute('class', 'col-sm');
    column.setAttribute('style', 'margin:10px; border: 2px solid black; display: table');
    // column.setAttribute('style', 'display: block;')
    column.setAttribute('id', `column_${element.id}`);
    column.setAttribute('id', `column_tr_${element.id}`);
    column.innerText = `test ${element.title}`;
    boardBody.appendChild(column);
    // boardBody.appendChild(column_tr);

}

function createAppendCard(element) {
    let columnBody = document.getElementById(`column_tr_${element.id}`);
    let card = document.createElement('div');
    card.setAttribute('class', 'col-md');
    card.setAttribute('style', ' border: 2px solid black; margin: 6px;');
    card.setAttribute('id', `card_${element.id}`);
    card.innerText += `${element.title}`;
    columnBody.appendChild(card);

}

const checkIfObjectInArray = (elem, array) => {

    for(let el of array){

        if(_.isEqual(elem, el) === true){
            return true;
        }

    }
    return false;

}