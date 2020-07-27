// const body = document.querySelector('body');

// fetch('https://www.reddit.com/search.json?q=son_heungmin+nsfw:no')
// .then(response => {
//     console.log(response);
//     return response.json();
// })
// .then(data => {

//     //rotator function
//     function imageRotator() {
//         let prevImage = document.querySelector('img');
//         prevImage.remove();
//     }

//     function reset () {
//         window.location.reload();
//     }
//     console.log(document.getElementById('button-addon1').addEventListener('click', reset));

//     //the search function
//     function buttonSearch() {
//         let input = document.getElementById('searchBar').value;
//         console.log(input);
   

//         let redditSon = data.data.children;
//         console.log(redditSon);

//         for (let i = 0; i < 10; i++) {

//             let main = redditSon[i].data.thumbnail;
//             console.log(main);

//             // let img = main + 10;

//             setInterval (
//                 function addImg () {
//                     const photo1 = document.createElement('div');
//                     photo1.classList.add('photoGrid');

//                     const image = document.createElement('img');
//                     image.src = main;
//                     image.classList.add('son-image');
//                     image.alt = 'son heung min';
//                     body.appendChild(image);

//                     document.querySelector('.gone').style.display = 'none';

//                 imageRotator();

//                 }, 2000);
//         }
//         return main;
//     }
//     console.log(document.getElementById('button-addon2').addEventListener('click', buttonSearch));
    
       
// })
// .catch(error => {
//     console.log('this is an error' + error);
// })

let slideshow;
let searchForm;
let input;
let baseEndpoint = 'http://www.reddit.com/search.json?q=basketball+nsfw:no';
let resultsArray = [];
let i = 1;
let resetButton;
let interval;

const changePhoto = () => {
    if(resultsArray[i].data.thumbnail) {
        i++
        console.log(resultsArray[i].data.thumbnail);
    } else {
        currIndex = 0;
    }
    slideshow.setAttribute('src', resultsArray[i].data.thumbnail);
}

const startSlideshow = () => {
    setInterval(changePhoto, 3000);
}

const getSearchResults = () => {
    //string interpolation
    fetch(`${baseEndpoint}+${input.value}`)
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        resultsArray = jsonData.data.children;
        slideshow.setAttribute('src', resultsArray[0].data.thumbnail);
        startSlideshow();
    })
    .catch(err => {
        console.log("there was an error fetching the results");
        console.log(err);
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    slideshow = document.getElementById('slideshow');
    searchForm = document.querySelector('form');
    input = document.querySelector('input');
    resetButton = document.getElementById('reset');

    searchForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        // slideshow appears
        slideshow.style.display = 'block';
        // hide the search form
        searchForm.style.display = 'none';
        // get search results
        getSearchResults();
    })

    resetButton.addEventListener('click', () => {
        slideshow.style.display = 'none';
        searchForm.style.display = '';
        resultsArray = [];
        clearInterval(interval);
    }) 
})