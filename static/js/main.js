import {dom} from "./dom.js";
import {createRegisterModal, createLoginModal, renameModal} from "./login_modals.js";


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register("/sw.js", {scope: '/'})
            .then((reg) => console.log('registered', reg))
            .catch((err) => console.log('does not work', err))
    }

// This function is to initialize the application
async function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    await dom.returnOfflineContent();
    dom.loadBoards();
    // refreshes boards every n seconds
    setInterval(function() {
        refreshBoards();}, 8000);

}


init();

// calling register modal
createRegisterModal();

// calling login modal
createLoginModal();


renameModal();


export function refreshBoards() {
    let expandedBoardsList = localStorage.getItem('expandedBoards').split(',');
    let expandedBoardsString = expandedBoardsList.join(',');
    for (let board of expandedBoardsList) {
        let expandButton;
        try {
            expandButton = document.getElementById(`collapseExample${board}`).getAttribute('class');
            console.log(expandButton);
            }
        catch (err) {
            console.log(err);
        }
        if (expandButton === 'collapse show') {
            console.log('already collapsed');
        } else if (expandButton === 'collapse'){
            document.getElementById(`board_${board}`).click();
        }

        // .click();
    }


    localStorage.setItem('expandedBoards', expandedBoardsString);
    // let boardsContainer = document.querySelector('#boards');
    // boardsContainer.innerHTML='';
    // dom.loadBoards();
}

let btnRefresh = document.getElementById('nav4');
btnRefresh.addEventListener('click', function(){
    let boardsContainer = document.querySelector('#boards');
    boardsContainer.innerHTML='';
    dom.loadBoards();
    // location.reload();
});


