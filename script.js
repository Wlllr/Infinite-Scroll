// id area
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// initializing variables condicions
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


// unsplash API
const count = 30;
const apiKey = 'LNzF0Awkj_GmIJwm2Hjcrq6t92J_m6BHIK6SY_Gg5_E';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// array where we'll store our api
let photosArray = [];

// check if all imagens were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// function that help us attribute some attributes on our elements without being repetitive
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// displays photos on UI
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in side photosArray
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank', 
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put img inside a, then put both inside imageContainer and displays in UI
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// get photos from unsplash API
// try/catch error
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //error
    }
}

// adding load more photos feature
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();    
    }
});

// On load
getPhotos();