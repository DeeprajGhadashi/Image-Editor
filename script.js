const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll('.filter button ')
previewImg = document.querySelector('.preview-img img');
chooseImgBtn = document.querySelector('.choose-img');


const loadImage = ()=> {
    let file = fileInput.files[0]; // getting user selected file
    if(!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file);   
    // console.log(file);
    previewImg.addEventListener('load',()=> {
        document.querySelector('.container').classList.remove('disable')   // all .editor-panel, .reset-filter,.save-img,.css-panel open after image selected
    });
}

filterOptions.forEach(option => {
    option.addEventListener('click', () =>{  // adding click event listener to all filter buttons 
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
    })
})

fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener('click', ()=> fileInput.click());   //file-input as image on click choose img button