const fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector('.choose-img');

const loadImage = ()=> {
    let file = fileInput.files[0]; // getting user selected file
    console.log(file);
}

fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener('click', ()=> fileInput.click());   //file-input as image on click choose img button