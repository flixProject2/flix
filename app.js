const app = {};


app.apiKey = '438f9921b5287c90f91cf32070a635f1';
app.apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${app.apiKey}`;
app.apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${app.apiKey}`;


app.init = () => {
    app.getTrending();
    app.getPopular();
}

app.getTrending = () => {
    //use the URL constructor to create our endpoint and specify the parameters we want to include
    const url = new URL(app.apiURL);
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            app.displayTrending(jsonResponse)
        })

};

app.displayTrending = (dataFromTrendingApi) => {
    //Target where we want to append each movie
    const movieFlex = document.querySelector('.movieFlex');

    //Target Img Container where we can append movie poster
    const trendingImgContainer = document.querySelector('.trendingImgContainer');

    //Target header Container where we can append movie title
    const trendingTextContainer = document.querySelector('.trendingTextContainer');

    console.log(dataFromTrendingApi);
    //Get first three movies in the array
    const trendingFirstThree = dataFromTrendingApi.results.slice(0, 3);
    //Loop through each movie and append info to the DOM
    trendingFirstThree.forEach( (movie) => {

        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('movieContainer');

        //Create text container 
        const trendingTextContainer = document.createElement('div');
        //set class to text container 
        trendingTextContainer.classList.add('trendingTextContainer');
        
        //Create img container 
        const trendingImgContainer = document.createElement('div');
        trendingImgContainer.classList.add('trendingImgContainer');


        console.log(movie)
        //Create img element
        const imgElement = document.createElement('img');
        //Create movie header to store movie title in
        const headerElement = document.createElement('h3');
        //Create h4 to store in text Container
        const summaryElement = document.createElement('h4');
        //Create p tag to store in textContainer under header
        const paragraphHeader = document.createElement('p');
        //Create p tag to store in textContainer 
        const paragraphElement = document.createElement('p');


        //add src to img element
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        //add movie title to Header Element
        headerElement.textContent = movie.title

        //add content to p tag 
        paragraphHeader.textContent = `${movie.release_date.substring(0,4)} | Rating: ${movie.vote_average}`;

        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;

        //Add movie overview to p element
        paragraphElement.textContent = `${movie.overview.split('.', 2).join('. ')}.`;


        //Append Movie Poster and Title to their respective containers
        trendingTextContainer.appendChild(headerElement);
        trendingTextContainer.appendChild(paragraphHeader);
        trendingTextContainer.appendChild(summaryElement);
        trendingTextContainer.appendChild(paragraphElement);
        trendingImgContainer.appendChild(imgElement);

        //Append Movie Poster and Title Containers to their own container
        movieContainer.appendChild(trendingTextContainer);
        movieContainer.appendChild(trendingImgContainer);

        //Append movie container to Movie Flex
        movieFlex.appendChild(movieContainer);
    })
}

app.getPopular = () => {
    // use URL consteuctor to target popular movies as endpoint
    const url = new URL(app.apiPopular);
    fetch(url)
        .then(function (responsePopular) {
            return responsePopular.json();
        })
        .then((jsonPopular) => {
            app.displayPopular(jsonPopular)
        })
};

app.displayPopular = (dataFromPopularApi) => {
    // target where to append
    const movieFlex = document.querySelector('.movieFlex');

    // data check
    console.log(dataFromPopularApi);

    // get first three movies from array
    const popularFirstThree = dataFromPopularApi.results.slice(0, 3);

    movieFlex.innerHTML = "";

    // target Popular section and add event listener
    const popularLink = document.querySelector('.popularLink');

    popularLink.addEventListener('click', function () {
        app.displayPopular();
        console.log('click');
    }) 

    // loop through array and append popular movie info to DOM
    popularFirstThree.forEach((movie) => {
        // popular movie container
        const popularContainer = document.createElement('div');
        popularContainer.classList.add('popularContainer');

        // popular movie text container
        const popularTextContainer = document.createElement('div');
        popularTextContainer.classList.add('popularTextContainer');

        // popular movie image container
        const popularImageContainer = document.createElement('div');
        popularImageContainer.classList.add('popularImageContainer');

        // data check for first three popular movies
        console.log(movie);

        // save movie data in variables
        const popularImg = document.createElement('img');
        const popularHeader = document.createElement('h3');
        const popularRating = document.createElement('p');
        const popularSummary = document.createElement('h4');
        const popularParagraph = document.createElement('p');

        // add movie image
        popularImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        // add movie title
        popularHeader.textContent = movie.title;

        // add movie release date and rating
        popularRating.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;

        // add summary header
        popularSummary.textContent = 'Summary';

        // add movie description
        popularParagraph.textContent = `${movie.overview.split('.', 2).join('. ')}.`;

        // append movie info to respective containers

        popularTextContainer.appendChild(popularHeader);
        popularTextContainer.appendChild(popularRating);
        popularTextContainer.appendChild(popularSummary);
        popularTextContainer.appendChild(popularParagraph);
        popularImageContainer.appendChild(popularImg);


        // append to movie container
        popularContainer.appendChild(popularTextContainer);
        popularContainer.appendChild(popularImageContainer);


        // append containers to movie flex
        movieFlex.appendChild(popularContainer);
    })
}

app.init();