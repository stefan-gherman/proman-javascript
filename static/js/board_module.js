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
        let tempValue = event.target.value;
        if (tempValue.trim() === '') {
            tempValue = event.target.defaultValue;
        }
        if (tempValue === '') {
            tempValue = event.currentTarget.dataset.boardTitle;
        }
        event.currentTarget.setAttribute('data-board-title', `${tempValue}`);
        event.currentTarget.innerHTML = tempValue;
        let boardId = event.currentTarget.dataset.boardId;
        let data = {boardId: boardId, tempValue: tempValue};
        const options = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        fetch(`http://127.0.0.1:5000/api/rename-board-title/${boardId}`, options);
    } else if (event.which == 27 || event.keyCode == 27) {
        event.currentTarget.innerHTML = event.target.defaultValue;
    }
}


function handleBoardTitle(event) {
    event.target.innerHTML = `
    <input type="text" class="form-control" id="board-rename-input" autofocus 
    value="${event.target.textContent.trim()}">`
}


export function handleDeleteClick(event) {
    let board_id = event.target.id.slice(24);
    let data = {board_id};
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://127.0.0.1:5000/api/delete-board', option).then(location.reload())
}
