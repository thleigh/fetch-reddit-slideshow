const body = document.querySelector('body');

fetch('https://www.reddit.com/search.json?q=son_heungmin+nsfw:no')
.then(response => {
    console.log(response);
    return response.json();
})
.then(data => {

    //rotator function
    function imageRotator() {
        let prevImage = document.querySelector('img');
        prevImage.remove();
    }

    function reset () {
        window.location.reload();
    }
    console.log(document.getElementById('button-addon1').addEventListener('click', reset));

    //the search function
    function buttonSearch() {
        let input = document.getElementById('searchBar').value;
        console.log(input);
   

        let redditSon = data.data.children;
        console.log(redditSon);

        for (let i = 0; i < 10; i++) {

            let main = redditSon[i].data.thumbnail;
            console.log(main);

            // let img = main + 10;

            setInterval (
                function addImg () {
                    const photo1 = document.createElement('div');
                    photo1.classList.add('photoGrid');

                    const image = document.createElement('img');
                    image.src = main;
                    image.classList.add('son-image');
                    image.alt = 'son heung min';
                    body.appendChild(image);

                    document.querySelector('.gone').style.display = 'none';

                imageRotator();

                }, 2000);
        }
        return main;
    }
    console.log(document.getElementById('button-addon2').addEventListener('click', buttonSearch));
    
       
})
.catch(error => {
    console.log('this is an error' + error);
})

