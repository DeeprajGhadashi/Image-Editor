const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll('.filter button '),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
previewImg = document.querySelector('.preview-img img'),
chooseImgBtn = document.querySelector('.choose-img');

let brightness = 100, saturation = 100, inversion = 0 , grayscale = 0;

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
        filterName.innerText = option.innerText;
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`  //console.log(filterSlider.value);
    const selectedFilter = document.querySelector('.filter .active'); //getting selected filter btn

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        brightness = filterSlider.value;
    } else {
        brightness = filterSlider.value;
    } 
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener('input', updateFilter);
chooseImgBtn.addEventListener('click', ()=> fileInput.click());   //file-input as image on click choose img button