// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { createAppendCard, handleNewCardClick, handleCardRenameKeyPressed, handleCardClickRename, handleCardRenameChange } from "./card_module.js";
import { addEventClickBoardTitle, handleDeleteClick } from "./board_module.js"

let triggered = false;
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
                              <div id="card-title" class="navbar navbar-light bg-light" data-board-id = "${board.id}" data-board-title="${board.title}" data-toggle="collapse" href=""  role="button" aria-expanded="false" aria-controls="collapseExample">
                                ${board.title}
                              </div>
                              <button type="button" class="btn btn-light mr-1 rounded border-secondary" id="buttonNewCardForBoard${board.id}">+ New Card</button>
                              <button id="buttonNewStatusForBoard${board.id}" class="btn btn-light mr-1 rounded border-secondary" data-toggle="collapse" href="#collapseExampleInput${board.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                                + New Status
                              </button>
                              <button type="button" class="btn btn-light mr-1 rounded border-secondary" id="buttonDeleteCardForBoard${board.id}">
                              - Delete
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
        button.addEventListener('click', handleNewColumnclick);
      } else if (button.id.includes('buttonDeleteCardForBoard')) {
        button.addEventListener('click', handleDeleteClick);
      } else if (button.id.includes('nav')) {
        console.log('skipped nav buttons');
      } else {
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
            // columnBody.innerText = element.title;
            for (let card of columnResponse) {
              // console.log(card);
              createAppendCard(card);
            }
            insertObjectInArray(columnBody, statusesDraggable);
            markCardsForClickRename()
          }
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
        addEventClickBoardTitle();
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
    let boardBody = document.getElementById(`${element.board_id}`);
    let columnHolder = document.createElement('div');
    columnHolder.setAttribute('style', 'margin: 10px; border: 2px solid black; display:table; padding: 1px');
    columnHolder.setAttribute('class', 'col-md text-center');
    let column = document.createElement('div');
    column.setAttribute('class', 'col-md text-center');
    column.setAttribute('min-height', '10px');
    column.setAttribute('min-width', '10px');
    column.setAttribute('style', 'display: table; border: 2px solid white');
    column.setAttribute('id', `column_${element.id}`);
    column.setAttribute('id', `column_tr_${element.id}`);
    column.setAttribute('data-board', element.board_id);
    let title = document.createElement('span');
    title.setAttribute('id', `title_board${element.id}`);
    title.setAttribute('class', `non_draggable`);
    title.innerText = `${element.title}`;
    title.setAttribute('style', 'cursor:pointer; padding-left: 1px; padding-right:1px;  outline-color: #9ecaed; display:inline-block; ');
    title.setAttribute('contenteditable', 'true');
    title.setAttribute('title', `${element.title}`);
    title.setAttribute('tabIndex', '-1');
    console.log(title.title);
    title.addEventListener('focus', function(event){
        title.setAttribute('style', 'cursor:pointer; padding-left: 10px; padding-right:10px;  outline-color: #9ecaed; box-shadow: 0 0 8px #9ecaed')
    });
    title.addEventListener('focusout', function (event) {
        console.log(title.innerText);
        title.innerText = title.innerText.trim();
        if(title.innerText.trim() === '') {
            title.innerText = title.title;
            title.blur();
        }
        title.title = title.innerHTML;
        const value = title.innerText;
        const status_id = title.id.slice(11);
        const dataToSend = {
            value: value,
            status_id: status_id
        };
        fetch(`${window.origin}/update-statuses`, {
            method: 'POST',
            credentials: "include",
            cache: "no-cache",
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(dataToSend)
        });
        title.blur();
         title.setAttribute('style', 'cursor:pointer; padding-left: 1px; padding-right:1px;  outline-color: #9ecaed')
    });
    title.addEventListener('keydown', function(event){
        console.log(event.key);
        console.log(this.title);
        let titleInitialValue = title.title;
        if (event.key === 'Escape'){
            title.innerHTML = title.title;
            title.blur();
            title.setAttribute('style', 'cursor:pointer; padding-left: 1px; padding-right:1px;  outline-color: #9ecaed')
        } else if (event.key === 'Enter'){
             console.log(title.innerText);
             title.innerText = title.innerText.trim();
             if (title.innerText.trim() === ''){
                 title.innerText=title.title
             }

        title.title = title.innerHTML;
        const value = title.innerText;

        const status_id = title.id.slice(11);

        const dataToSend = {
            value: value,
            status_id: status_id
        };
        title.blur();
        fetch(`${window.origin}/update-statuses`, {
            method: 'POST',
            credentials: "include",
            cache: "no-cache",
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(dataToSend)
        });
         title.setAttribute('style', 'cursor:pointer; padding-left: 1px; padding-right:1px;  outline-color: #9ecaed')
        }
    });
    columnHolder.appendChild(title);
    columnHolder.appendChild(column);
    boardBody.appendChild(columnHolder);
}



const insertObjectInArray = (elem, arr) => {
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
  let board_id = event.target.id.slice(23);
  let inputsColumnName = document.querySelectorAll("input");
  for (let input of inputsColumnName) {
    input.addEventListener('change', function (event) {
      console.log('input value', event.target.value);
      let status_title = event.target.value;
      let data = {board_id, status_title};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('http://127.0.0.1:5000/api/create-status', options).then(() => location.reload());
    });
  }
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
