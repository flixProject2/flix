const app = {};


app.apiKey = '438f9921b5287c90f91cf32070a635f1';
app.apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${app.apiKey}`;
app.apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${app.apiKey}`;
app.discoverApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${app.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&`;
app.apiGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${app.apiKey}&language=en-US`;
app.apiTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${app.apiKey}&language=en-US&page=1`;
app.apiUpcoming = ` https://api.themoviedb.org/3/movie/upcoming?api_key=${app.apiKey}&language=en-US&page=1`;

app.apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${app.apiKey}&language=en-US&page=1&include_adult=false&`;

const discoverLink = document.querySelector('.discoverLink');
const popularLink = document.querySelector('.popularLink');

const formElement = document.querySelector('form');
const searchingFlex = document.querySelector('.searchFlex');

const genresLink = document.querySelector('.genresFlex');

const discoverFlex = document.querySelector('.discoverFlex');

const clearFlex = document.querySelector('.movieFlex');


app.init = () => {
    app.getTrending();
    discoverLink.addEventListener('click', function () {
        clearFlex.innerHTML = '';
        const clearPopular = document.querySelector('.popularFlex');
        clearPopular.innerHTML = '';
        const clearGenres = document.querySelector('.genresFlex');
        clearGenres.innerHTML = '';
        const discoverHeading = document.getElementById('mainHeader');
        discoverHeading.textContent = 'Discover';
        app.getDiscover();
    }, {once: true});
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        //Log search input
        const searchElement = document.querySelector('#movieSearch');
        const searchValue = searchElement.value;
        console.log(searchValue);
        //Clear section
        sectionElement = document.querySelector('.movieFlex');
        sectionElement.innerHTML = '';
        const clearDiscover = document.querySelector('.discoverFlex')
        clearDiscover.innerHTML = '';
        const clearGenres = document.querySelector('.genresFlex')
        clearGenres.innerHTML = '';
        const clearPopular = document.querySelector('.popularFlex');
        clearPopular.innerHTML = '';
        searchHeading = document.getElementById('mainHeader');
        searchHeading.textContent = `Results for ${searchValue}`;
        app.getSearch(searchValue);
    }, {once: true});
    popularLink.addEventListener('click', function () {
        const clearFlex = document.querySelector('.movieFlex')
        clearFlex.innerHTML = '';
        const clearDiscover = document.querySelector('.discoverFlex')
        clearDiscover.innerHTML = '';
        const clearGenres = document.querySelector('.genresFlex')
        clearGenres.innerHTML = '';
        const popularHeading = document.getElementById('mainHeader')
        popularHeading.textContent = 'Popular';
        app.getPopular();
        app.displayPopular();
        window.location.reload(true);
    }, {once: true});
    genresLink.addEventListener('click', function() {
        const clearFlex = document.querySelector('.movieFlex')
        clearFlex.innerHTML = '';
        const clearDiscover = document.querySelector('.discoverFlex')
        clearDiscover.innerHTML = '';
        const clearPopular = document.querySelector('.popularFlex');
        clearPopular.innerHTML = '';
        const genresHeading = document.getElementById('mainHeader')
        genresHeading.textContent = 'Genres';
        window.location.reload(true);
        app.getGenres();
        app.displayGenres();
    }, { once: true });
};

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
        trendingImgContainer.classList.add('trendingImgContainer')
        
        
        trendingImgContainer.classList.add('trendingImgContainer');


        // console.log(movie)

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


app.getDiscover = () => {
    const discoverURL = new URL(app.discoverApiUrl);
    fetch(discoverURL)
    .then(function (apiResponse) {
        return apiResponse.json()
    })
    .then((jsonResponse) => {
        app.displayDiscover(jsonResponse);
    })
}

app.displayDiscover = (dataFromDiscoverApi) => {
    //Select the div where we will be appending the movie cards.
    
    //Take 5 movies from the current array of 20
    const discoverFirstFive = dataFromDiscoverApi.results.slice(0,5);
    console.log(discoverFirstFive);
    
    //Loop through each movie and append it to the DOM
    discoverFirstFive.forEach( (movie) => {
        console.log(movie);
        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('discoverFlexContainer');
        
        //Create text container 
        const discoverTextContainer = document.createElement('div');
        //set class to text container 
        discoverTextContainer.classList.add('discoverTextContainer');
        
        //Create img container 
        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')
        
        
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
        paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;
        
        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;
        
        //Add movie overview to p element
        paragraphElement.textContent = `${movie.overview}`;
        
        
        //Append Movie Poster and Title to their respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverImgContainer.appendChild(imgElement);
        
        //Append Movie Poster and Title Containers to their own container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);
        
        //Append movie container to Discover Flex
        discoverFlex.appendChild(movieContainer);
        
    })
}


app.getPopular = () => {
    // use URL consteuctor to target popular movies as endpoint
    const url = new URL(app.apiPopular);
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            app.displayPopular(jsonResponse)
        })
};

app.displayPopular = (dataFromPopularApi) => {
    // target div to append movie card to
    const popularFlex = document.querySelector('.popularFlex');

    // data check
    console.log(dataFromPopularApi);

    // get first three movies from array
    const popularFirstThree = dataFromPopularApi.results.slice(5, 10);

    // loop through array and append popular movie info to DOM
    popularFirstThree.forEach((movie) => {

        console.log(movie);
        // popular movie container
        const popularContainer = document.createElement('div');
        popularContainer.classList.add('popularFlexContainer');

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
        popularFlex.appendChild(popularContainer);
    })
}

// ***** Genres Section *****

app.getGenres = () => {
    // use URL consteuctor to target popular movies as endpoint
    const url = new URL(app.apiGenres);
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            app.displayGenres(jsonResponse.genres)
        })
};

app.displayGenres = (dataFromGenresApi) => {
    // target div to append movie card to
    const genresFlex = document.querySelector('.genresFlex');

    // data check to ensure data is being returned in the array
    const genresList = dataFromGenresApi;
    // console.log(genresList);

    // filter array to select specific genres to get from returned data
    const genresArray = genresList.filter((genres) => {
        return genres.id < 40;
    });

    // data check
    // console.log(genresArray);


    // Loop through the genre array
    genresArray.forEach(function (genres) {

        // genres list container
        const genresContainer = document.createElement('div');
        genresContainer.classList.add('genresFlexContainer');

        // genres text container
        const genresTextContainer = document.createElement('div');
        genresTextContainer.classList.add('genresTextContainer');

        // save genres data in variable
        const genresHeader = document.createElement('h2');

        // add genres name
        genresHeader.textContent = genres.name;

        // append genres information to respective container
        genresTextContainer.appendChild(genresHeader);

        // append to genres list container
        genresContainer.appendChild(genresTextContainer);

        // append containers to genresFlex
        genresFlex.appendChild(genresContainer);

        // data check for genres
        // console.log(genres);
    })
}

//Search Bar Feature

app.getSearch = (userQuery) => {
    const searchURL = new URL(app.apiSearch);

    searchURL.search = new URLSearchParams({
        api_key: app.apiKey, 
        query: userQuery,
    })
    fetch(searchURL)
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        app.displaySearch(jsonResponse)
    })
}

app.displaySearch = (dataFromSearchApi) => {
    //Select the div where we will be appending the movie cards.

    console.log(dataFromSearchApi);

    const searchMovies = dataFromSearchApi.results.slice(0,5);

    console.log(searchMovies);

    searchMovies.forEach((search) => {
        console.log(search);

        //Create movie container 
        const searchMovieContainer = document.createElement('div');
        //Set class to movie container
        searchMovieContainer.classList.add('searchMovieContainer');

        //Create text container 
        const searchTextContainer = document.createElement('div');
        //set class to text container 
        searchTextContainer.classList.add('searchTextContainer');

        //Create img container 
        const searchImgContainer = document.createElement('div');
        searchImgContainer.classList.add('searchImgContainer')


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
        imgElement.src = `https://image.tmdb.org/t/p/original/${search.poster_path}`;

        //add movie title to Header Element
        headerElement.textContent = search.title

        //add content to p tag 
        paragraphHeader.textContent = `${search.release_date} | Rating: ${search.vote_average}`;

        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;

        //Add movie overview to p element
        paragraphElement.textContent = `${search.overview}`;


        //Append Movie Poster and Title to their respective containers
        searchTextContainer.appendChild(headerElement);
        searchTextContainer.appendChild(paragraphHeader);
        searchTextContainer.appendChild(summaryElement);
        searchTextContainer.appendChild(paragraphElement);
        searchImgContainer.appendChild(imgElement);

        //Append Movie Poster and Title Containers to their own container
        searchMovieContainer.appendChild(searchTextContainer);
        searchMovieContainer.appendChild(searchImgContainer);

        //Append movie container to Search Flex
        searchingFlex.appendChild(searchMovieContainer);

    });

};

//Upcoming Movies Section

app.getUpcoming = () => {
    const upcomingUrl = new URL(app.apiUpcoming)
    fetch(upcomingUrl)
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        app.displayUpcoming(responseJson);
    })
}

app.displayUpcoming = (dataFromUpcomingMovies) => {
    const upcomingMovies = dataFromUpcomingMovies.results.slice(0, 5);

    console.log(upcomingMovies);

    //Loop through each movie and append it to the DOM
    upcomingMovies.forEach((movie) => {
        console.log(movie);
        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('discoverFlexContainer');

        //Create text container 
        const discoverTextContainer = document.createElement('div');
        //set class to text container 
        discoverTextContainer.classList.add('discoverTextContainer');

        //Create img container 
        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')


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
        paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;

        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;

        //Add movie overview to p element
        paragraphElement.textContent = `${movie.overview}`;


        //Append Movie Poster and Title to their respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverImgContainer.appendChild(imgElement);

        //Append Movie Poster and Title Containers to their own container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);

        //Append movie container to Discover Flex
        discoverFlex.appendChild(movieContainer);
    });
};

//Get Top Rated

app.getTopRated = () => {
    const topRatedUrl = new URL(app.apiTopRated)
    fetch(topRatedUrl)
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            app.displayTopRated(responseJson);
        })
}

app.displayTopRated = (dataFromUpcomingMovies) => {
    const displayRated = dataFromUpcomingMovies.results.slice(0, 5);

    console.log(upcomingMovies);

    //Loop through each movie and append it to the DOM
    displayRated.forEach((movie) => {
        console.log(movie);
        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('discoverFlexContainer');

        //Create text container 
        const discoverTextContainer = document.createElement('div');
        //set class to text container 
        discoverTextContainer.classList.add('discoverTextContainer');

        //Create img container 
        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')


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
        paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;

        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;

        //Add movie overview to p element
        paragraphElement.textContent = `${movie.overview}`;


        //Append Movie Poster and Title to their respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverImgContainer.appendChild(imgElement);

        //Append Movie Poster and Title Containers to their own container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);

        //Append movie container to Discover Flex
        discoverFlex.appendChild(movieContainer);
    });
};

//Watchlist feature

const asideNav = document.querySelector('.asideFlex')

asideNav.addEventListener('click', (e) => {
    console.log(e);
    if(e.target.textContent == 'Popular') {
        clearFlex.innerHTML = '';
        window.location.reload(true);
        app.getPopular();
        app.displayPopular();
    } else if(e.target.textContent == 'Discover') {
        clearFlex.innerHTML = '';
        console.log('You clicked Discover');
    } else if(e.target.textContent == 'Upcoming') {
        clearFlex.innerHTML = '';
        discoverHeading.textContent = 'Discover';
        app.getDiscover();
        console.log('You clicked Upcoming');
    } else if(e.target.textContent == 'Top Rated') {
        clearFlex.innerHTML = '';
        
        console.log('You clicked Top Rated');
    } else if(e.target.textContent == 'Genres') {
        clearFlex.innerHTML = '';
        window.location.reload(true);
        app.getGenres();
        app.displayGenres();
        console.log('You clicked Genres');
    }
})


app.init()