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
                              <button type="button" class="btn btn-light rounded border-secondary">+ New Card</button>

                            </div>
                            <button class="btn btn-light rounded border-secondary" type="button" data-toggle="collapse" data-target="#collapseExample${board.id}" aria-expanded="false" aria-controls="collapseExample">
                                v
                            </button>
                        </div>
                    </p>
                    <div class="collapse" id="collapseExample${board.id}">
                      <div class="card card-body">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>New</th>
                              <th>In Progress</th>
                              <th>Testing</th>
                              <th>Done</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
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
`;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
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
