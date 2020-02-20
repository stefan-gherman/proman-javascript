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
