export function createAppendCard(element) {
    let columnBody = document.getElementById(`column_tr_${element.status_id}`);
    if (columnBody) {
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'col-md');
        cardBody.setAttribute('style', ' border: 2px solid black; margin: 6px; cursor:pointer');
        cardBody.setAttribute('id', `card_${element.id}`);
        cardBody.setAttribute('data-card', `${columnBody.id}`);
        cardBody.setAttribute('data-board', columnBody.dataset.board);
        cardBody.setAttribute('data-order', element['column_order']);
        cardBody.innerText += `${element.title}`;
        columnBody.appendChild(cardBody);
    }
}


export function handleNewCardClick(event) {
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


export function handleCardRenameKeyPressed(event) {
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


export function handleCardClickRename(event) {
    console.log('entered card click rename');
    console.log('click rename event:', event.toElement.innerHTML);
    event.toElement.innerHTML = `
            <input type="text" value="${event.toElement.innerHTML}">
    `;
}

export function handleCardRenameChange(event) {
    event.currentTarget.innerHTML = event.target.defaultValue;
}
