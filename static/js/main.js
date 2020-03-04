import {dom} from "./dom.js";
import {createRegisterModal, createLoginModal} from "./dom.js";


// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

init();

// calling register modal
createRegisterModal();

// calling login modal
createLoginModal();

let btnRefresh = document.getElementById('nav4');
btnRefresh.addEventListener('click', function(){
    let boardsContainer = document.querySelector('#boards');
    boardsContainer.innerHTML='';
    dom.loadBoards();
    // location.reload();
});
