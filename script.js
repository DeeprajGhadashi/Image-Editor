const fileInput = document.querySelector(".file-input"),
    filterOptions = document.querySelectorAll('.filter button '),
    filterName = document.querySelector('.filter-info .name'),
    filterValue = document.querySelector('.filter-info .value'),
    rotateOptions = document.querySelectorAll('.rotate button'),
    filterSlider = document.querySelector('.slider input'),
    previewImg = document.querySelector('.preview-img img'),
    resetFilterBtn = document.querySelector('.reset-filter'),
    chooseImgBtn = document.querySelector('.choose-img'),
    saveImgBtn = document.querySelector('.save-img');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let contrast = 100, opacity = 100, blur = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} , ${flipVertical}) `;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) opacity(${opacity}%)  blur(${blur}px)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; // getting user selected file
    if (!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file);
    // console.log(file);
    previewImg.addEventListener('load', () => {
        resetFilterBtn.click(); //clicking reset btn, so the filter value reset if the user select new img
        document.querySelector('.container').classList.remove('disable')   // all .editor-panel, .reset-filter,.save-img,.css-panel open after image selected
    });
}

filterOptions.forEach(option => {
    option.addEventListener('click', () => {  // adding click event listener to all filter buttons 
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        filterSlider.addEventListener('input', () => {
            let sliderValue = filterSlider.value;
            let filterText = '';
        
            switch (filterSlider.id) {
                case 'brightness':
                    filterText = `brightness(${sliderValue / 200})`;
                    break;
                case 'saturation':
                    filterText = `saturate(${sliderValue}%)`;
                    break;
                case 'inversion':
                    filterText = `invert(${sliderValue}%)`;
                    break;
                case 'contrast':
                    filterText = `contrast(${sliderValue}%)`;
                    break;
                case 'opacity':
                    filterText = `opacity(${sliderValue}%)`;
                    break;
                case 'blur':
                    filterText = `blur(${sliderValue}px)`;
                    break;
                case 'grayscale':
                    filterText = `grayscale(${sliderValue}%)`;
                    break;
                default:
                    break;
            }
        
            filterValue.innerText = `${sliderValue}%`;
            document.querySelector('.css-panel').innerHTML = `
                <span style="color: #00ff59;">img &nbsp;</span> 
                { 
                    &nbsp;&nbsp;
                    <span style="color: white;">filter &nbsp;:</span> 
                    <span style="color: blue;">&nbsp;&nbsp; ${filterSlider.id}</span>
                    <span style="color: #ff5500;">&nbsp;(${sliderValue})</span>
                    <span style="color: white;"> ; </span>
                    &nbsp;&nbsp;
                    <span style="color: white;">}</span>
            `;
        
            updateFilter(); // Call the function to apply filters
        });
        
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`  //console.log(filterSlider.value);
    const selectedFilter = document.querySelector('.filter .active'); //getting selected filter btn

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if (selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else if (selectedFilter.id === "opacity") {
        opacity = filterSlider.value;
    } else if (selectedFilter.id === "blur") {
        blur = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener('click', () => { // adding click event listener to all rotate/flip buttons
        //console.log(option);
        if (option.id === 'left') {
            rotate -= 90;  //clicked btn is left rotate, decrement rotate value by -90
        } else if (option.id === 'right') {
            rotate += 90;  //clicked btn is right rotate, increment rotate value by +90
        } else if (option.id === 'horizontal') {
            // if flipHorizontal value is 1, set this value to -1 else set 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            // if flipVertical value is 1, set this value to -1 else set 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});

const resetFilter = () => {
    // resetting all variable value to its default value
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    contrast = 100; opacity = 100; blur = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); //clicking brightness btn, so the brightness selected by default
    applyFilters();
}

const saveImage = () => {
    // console.log("save image btn clicked");
    const canvas = document.createElement("canvas"); //creating canvas element
    const ctx = canvas.getContext("2d"); //canvas.getContext return a drawing context on the canvas
    canvas.width = previewImg.naturalWidth; //setting canvas width to actual image width
    canvas.height = previewImg.naturalHeight; // setting canvas height to actual image height

    //appling user selected filters to canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical); //flip canvas Horizontal / Vertical 
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // document.body.appendChild(canvas);  //image show in user interface

    const link = document.createElement('a'); //create <a> element
    link.download = `ImageEditor${Date.now()}.jpg`; // passing <a> tag download value to "image.jpg"
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); //clicking <a> tag image download

}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener('input', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);
saveImgBtn.addEventListener('click', saveImage);
chooseImgBtn.addEventListener('click', () => fileInput.click());   //file-input as image on click choose img button