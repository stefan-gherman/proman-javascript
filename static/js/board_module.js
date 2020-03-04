export function addEventClickBoardTitle() {
    let allBoardsTitle = document.querySelectorAll('#board-title');
    for (let boardTitle of allBoardsTitle) {
        if (boardTitle.id.includes('board-title')) {
            boardTitle.addEventListener('click', handleBoardTitle);
            boardTitle.addEventListener('keydown', handleBoardTitleOnKeyPress);
        }
    }
}


function handleBoardTitleOnKeyPress(event) {
    if (event.which == 13 || event.keyCode == 13) {
        // event.target.defaultValue = event.target.value;
        console.log(event.target.value);
        let tempValue = event.target.value;
        event.currentTarget.innerHTML = tempValue;
        let boardId = event.currentTarget.dataset.boardId;
        let data = {boardId: boardId, tempValue: tempValue};
        const options = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        fetch(`http://127.0.0.1:5000/api/rename-board-title/${boardId}`, options);

    } else if (event.which == 27 || event.keyCode == 27) {
        event.currentTarget.innerHTML = event.currentTarget.dataset.boardTitle;
    }
}


function handleBoardTitle(event) {
    event.target.innerHTML = `
    <input type="text" class="form-control" id="board-rename-input" autofocus 
    value="${event.currentTarget.dataset.boardTitle}">
    `
}


export function handleDeleteClick(event) {
    let board_id = event.target.id.slice(24);
    let data = {board_id};
    console.log(data);
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://127.0.0.1:5000/api/delete-board', option).then(location.reload())
}
