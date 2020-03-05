

export function addEventClickBoardTitle() {
    let allCardsTitle = document.querySelectorAll('#card-title');
    for (let cardTitle of allCardsTitle) {
        if (cardTitle.id.includes('card-title')) {
            cardTitle.addEventListener('click', handleBoardTitle);
            cardTitle.addEventListener('keydown', handleBoardTitleOnKeyPress);
        }
    }
}


function handleBoardTitleOnKeyPress(event) {
    if (event.which == 13 || event.keyCode == 13) {
        event.target.defaultValue = event.target.value;
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
    <input type="text" class="form-control">
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


export function expandedBoardsLocalList(board_id) {
    // localStorage.clear();
    if (localStorage.getItem('expandedBoards') === false || localStorage.getItem('expandedBoards') === null) {
        localStorage.setItem('expandedBoards', 'placeholder,');
    }
    let expandedBoardsString = localStorage.getItem('expandedBoards');
    console.log('the string', expandedBoardsString);
    let expandedBoardsList = expandedBoardsString.split(",");
    if (expandedBoardsList.includes(board_id) === false) {
        localStorage.setItem('expandedBoards', expandedBoardsList.join(',') + `${board_id},`);
    }
    else if (expandedBoardsList.includes(board_id) === true){
        let alreadyExpandedBoardIndex = expandedBoardsList.indexOf(`${board_id}`);
        console.log('list index to remove', alreadyExpandedBoardIndex);
        expandedBoardsList.splice(alreadyExpandedBoardIndex, 1);
        console.log('list after splice', expandedBoardsList);
        localStorage.setItem('expandedBoards', expandedBoardsList.join(','));
    }
}
