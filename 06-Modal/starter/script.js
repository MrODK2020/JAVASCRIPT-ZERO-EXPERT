'use strict';

const btnDisplayModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const closeModal = document.getElementsByClassName("close-modal");
const overlay = document.querySelector(".overlay");

function openModalFunction(){
    modal.style.display = "block"
    overlay.style.display = "block"
    
}
function closeModalFunction(){
    modal.style.display = "none"
    overlay.style.display = "none"
}

for( let i = 0; i < btnDisplayModal.length; i++){
    btnDisplayModal[i].addEventListener('click',openModalFunction)
};

closeModal[0].addEventListener('click',closeModalFunction);

overlay.addEventListener("click",closeModalFunction);

document.addEventListener("keyup", function (e){

    if(e.key === "Escape"){
        closeModalFunction();
    }
})