const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll('.filter button '),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
previewImg = document.querySelector('.preview-img img'),
chooseImgBtn = document.querySelector('.choose-img');

let brightness = 100, saturation = 100, inversion = 0 , grayscale = 0;

const  applyFilters = () => {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

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

        if(option.id === 'brightness') {
            filterSlider.max ='200';
            filterSlider.value = brightness ;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === 'saturation') {
            filterSlider.max ='200';
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if(option.id === 'inversion') {
            filterSlider.max ='100';
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max ='100';
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`  //console.log(filterSlider.value);
    const selectedFilter = document.querySelector('.filter .active'); //getting selected filter btn

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    } 
    applyFilters();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener('input', updateFilter);
chooseImgBtn.addEventListener('click', ()=> fileInput.click());   //file-input as image on click choose img button