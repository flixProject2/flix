const app = {};

// ***** API CALLS *****
app.apiKey = '438f9921b5287c90f91cf32070a635f1';
app.apiMovie = `https://api.themoviedb.org/3/movie/`
app.apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${app.apiKey}`;
app.apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${app.apiKey}`;
app.discoverApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${app.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&`;
app.apiTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${app.apiKey}&language=en-US&page=1`;
app.apiUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${app.apiKey}&language=en-US&page=1`;
app.apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${app.apiKey}&language=en-US&page=1&include_adult=false&`;

// ***** Global Variables *****
const genresMenu = document.querySelector('.genreDropDown');
const hideDropDown = document.querySelector('.genreDropDown')

const formElement = document.querySelector('form');
const columnFlex = document.querySelector('.columnFlex');


// ***** INIT to kickoff application *****
app.init = () => {
    app.getTrending();
    hideDropDown.style.display = "none";
    const asideNav = document.querySelector('.asideFlex')

    asideNav.addEventListener('click', (e) => {
        const clearFlex = document.querySelector('.movieFlex')
        if (e.target.textContent == 'Popular') {
            clearFlex.innerHTML = '';
            const clearColumnFlex = document.querySelector('.columnFlex')
            clearColumnFlex.innerHTML = '';
            const popularHeading = document.getElementById('mainHeader')
            popularHeading.textContent = 'Popular';
            hideDropDown.style.display = "none";
            app.getPopular();
        } else if (e.target.textContent == 'Discover') {
            clearFlex.innerHTML = '';
            const clearColumnFlex = document.querySelector('.columnFlex')
            clearColumnFlex.innerHTML = '';
            const discoverHeading = document.getElementById('mainHeader');
            discoverHeading.textContent = 'Discover';
            hideDropDown.style.display = "none";
            app.getDiscover();
        } else if (e.target.textContent == 'Upcoming') {
            clearFlex.innerHTML = '';
            const clearColumnFlex = document.querySelector('.columnFlex')
            clearColumnFlex.innerHTML = '';
            const discoverHeading = document.getElementById('mainHeader');
            discoverHeading.textContent = 'Upcoming';
            hideDropDown.style.display = "none";
            app.getUpcoming();
        } else if (e.target.textContent == 'Top Rated') {
            clearFlex.innerHTML = '';
            const clearColumnFlex = document.querySelector('.columnFlex')
            clearColumnFlex.innerHTML = '';
            const discoverHeading = document.getElementById('mainHeader');
            discoverHeading.textContent = 'Top Rated';
            hideDropDown.style.display = "none";
            app.getTopRated();
        } else if (e.target.textContent == 'Genres') {
            clearFlex.innerHTML = '';
            const clearColumnFlex = document.querySelector('.columnFlex')
            clearColumnFlex.innerHTML = '';
            const genresHeading = document.getElementById('mainHeader')
            genresHeading.textContent = 'Genres';
            document.getElementById('movieGenre').selectedIndex = [0];
            hideDropDown.style.display = "flex";
            app.setUpEventListener();
            app.getGenres();
        }
    })

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        //Log search input
        const searchElement = document.querySelector('#movieSearch');
        const searchValue = searchElement.value;
        //Clear section
        sectionElement = document.querySelector('.movieFlex');
        sectionElement.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        searchHeading = document.getElementById('mainHeader');
        searchHeading.textContent = `Results for "${searchValue}"`;
        hideDropDown.style.display = "none";
        app.getSearch(searchValue);
    });   
};
// ***** Trending Section *****
// Get data from API for Trending Section
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
// Create function to display Trending data 
app.displayTrending = (dataFromTrendingApi) => {
    //Target where we want to append each movie
    const movieFlex = document.querySelector('.movieFlex');

    const carouselTrack = document.querySelector('.carousel')
    console.log(carouselTrack);

    //Creating the carousel structure
    const imgOne = document.querySelector('.imgOne')
    const imgTwo = document.querySelector('.imgTwo')
    const imgThree = document.querySelector('.imgThree')

    const carousel = document.createElement('div')
    carousel.classList.add('carousel')
    
    const firstCaro = dataFromTrendingApi.results[0];
    imgOne.src = `https://image.tmdb.org/t/p/original/${firstCaro.poster_path}`;

    const secondCaro = dataFromTrendingApi.results[1];
    imgTwo.src = `https://image.tmdb.org/t/p/original/${secondCaro.poster_path}`;
    
    const thirdCaro = dataFromTrendingApi.results[2];
    imgThree.src = `https://image.tmdb.org/t/p/original/${thirdCaro.poster_path}`;

    //Get first three movies in the array
    const trendingFirstThree = dataFromTrendingApi.results.slice(0, 3);
    //Loop through each movie and append info to the DOM
    trendingFirstThree.forEach((movie) => {

        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('movieContainer', 'grow');

        //Create text container 
        const trendingTextContainer = document.createElement('div');
        //set class to text container 
        trendingTextContainer.classList.add('trendingTextContainer');

        //Create img container 
        const trendingImgContainer = document.createElement('div');
        trendingImgContainer.classList.add('trendingImgContainer')
     
        trendingImgContainer.classList.add('trendingImgContainer');

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
        paragraphHeader.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;

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
// ***** Discover Section *****
// Get data from API for Discover Section
app.getDiscover = () => {
    const discoverURL = new URL(app.discoverApiUrl);
    fetch(discoverURL)
    .then(function (apiResponse) {
        return apiResponse.json()
    })
    .then((jsonResponse) => {
        app.displayMovie(jsonResponse.results.slice(15, 20))
    })
}
// Create function to display Discover data
app.displayMovie = (dataFromDiscoverApi) => {    
    //Loop through each movie and append it to the DOM
    dataFromDiscoverApi.forEach( (movie) => {
        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('discoverFlexContainer', 'grow');

        //Create text container 
        const discoverTextContainer = document.createElement('div');
        //set class to text container 
        discoverTextContainer.classList.add('discoverTextContainer');

        //Create img container 
        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')

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

        //Create anchor element
        const anchorElement = document.createElement('a');
        
        //add src to img element
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        //add movie title to Header Element
        headerElement.textContent = movie.title

        //add content to p tag 
        paragraphHeader.textContent = `${movie.release_date.substring(0, 4)} | ⭐️ ${movie.vote_average}`;
        
        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;

        //Add movie overview to p element
        paragraphElement.textContent = `${movie.overview}`;

        //modify string to match href provided by MovieDB
        const movieTitle = movie.title.replace(/\s/g, '-').replace(':', '');

        //Add href and modify string being passed into the anchor
        anchorElement.href = `https://www.themoviedb.org/movie/${movie.id}-${movieTitle}`;
        anchorElement.textContent = `Read More`;
        anchorElement.classList.add('linkButton')
        
        //Append Movie Poster and Title to their respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverTextContainer.appendChild(anchorElement);
        discoverImgContainer.appendChild(imgElement);

        //Append Movie Poster and Title Containers to their own container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);

        //Append movie container to Discover Flex
        columnFlex.appendChild(movieContainer);
    });
};
// ***** Popular Section *****
// Get data from API for Popular Section
app.getPopular = () => {
    // use URL consteuctor to target popular movies as endpoint
    const url = new URL(app.apiPopular);
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            app.displayMovie(jsonResponse.results.slice(10,15))
        })
};

// ***** Genres Section *****
app.getGenres = (genreId) => {
    // use URL consteuctor to target popular movies as endpoint
    const url = new URL(app.discoverApiUrl);
    url.search = new URLSearchParams({
        api_key: app.apiKey,
        with_genres: genreId,
    })
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            app.displayMovie(jsonResponse.results.slice(12, 17));
        })
};

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
        app.displayMovie(jsonResponse.results.slice(0, 5))
    })
}

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
    //Loop through each movie and append it to the DOM
    upcomingMovies.forEach((movie) => {
        //Create movie container 
        const movieContainer = document.createElement('div');
        //Set class to movie container
        movieContainer.classList.add('discoverFlexContainer', 'grow');

        //Create text container 
        const discoverTextContainer = document.createElement('div');
        //set class to text container 
        discoverTextContainer.classList.add('discoverTextContainer');

        //Create img container 
        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')

        //Create img element
        const imgElement = document.createElement('img');
        //Create movie header to store movie title in
        const headerElement = document.createElement('h3');
        //Create h4 to store in text Container
        const summaryElement = document.createElement('h4');
        //Create p tag to store in textContainer under header
        const paragraphHeader = document.createElement('p');
        paragraphElement.classList.add('textdoc')
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
        columnFlex.appendChild(movieContainer);
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
            app.displayMovie(responseJson.results.slice(0, 5))
        })
}

app.setUpEventListener = function() {
    const selectGenre = document.querySelector('#movieGenre');

    selectGenre.addEventListener('change', function () {
        const clearFlex = document.querySelector('.movieFlex')
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';

        const selectedGenre = this.value;
        app.getGenres(selectedGenre);
    })
}
app.init();
