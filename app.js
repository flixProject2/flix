const app = {};

// ***** API CALLS *****
app.apiKey = '438f9921b5287c90f91cf32070a635f1';
app.apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${app.apiKey}`;
app.apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${app.apiKey}`;
app.discoverApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${app.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&`;
app.apiGenres = `https://api.themoviedb.org/3/discover/movie?api_key=${app.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
app.apiTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${app.apiKey}&language=en-US&page=1`;
app.apiUpcoming = ` https://api.themoviedb.org/3/movie/upcoming?api_key=${app.apiKey}&language=en-US&page=1`;
app.apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${app.apiKey}&language=en-US&page=1&include_adult=false&`;


// ***** Global Variables *****
const discoverLink = document.querySelector('.discoverLink');
const popularLink = document.querySelector('.popularLink');
const genresLink = document.querySelector('.genresLink');
const genresMenu = document.querySelector('.genreDropDown')
const hideDropDown = document.querySelector('.genreDropDown')
const formElement = document.querySelector('form');
const columnFlex = document.querySelector('.columnFlex');
const clearFlex = document.querySelector('.movieFlex');

// ***** INIT to kickoff application *****
app.init = () => {
    app.getTrending();

    hideDropDown.style.display = "none";

    discoverLink.addEventListener('click', function () {
        clearFlex.innerHTML = '';
        columnFlex.innerHTML = '';
        const discoverHeading = document.getElementById('mainHeader');
        discoverHeading.textContent = 'Discover';
        hideDropDown.style.display = "none";
        app.getDiscover();
    });

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        //Log search input
        const searchElement = document.querySelector('#movieSearch');
        const searchValue = searchElement.value;
        console.log(searchValue);
        //Clear section
        sectionElement = document.querySelector('.movieFlex');
        sectionElement.innerHTML = '';
        columnFlex.innerHTML = '';
        searchHeading = document.getElementById('mainHeader');
        searchHeading.textContent = `Results for ${searchValue}`;
        hideDropDown.style.display = "none";
        app.getSearch(searchValue);
    });

    popularLink.addEventListener('click', function () {
        clearFlex.innerHTML = '';
        columnFlex.innerHTML = '';
        const popularHeading = document.getElementById('mainHeader')
        popularHeading.textContent = 'Popular';
        hideDropDown.style.display = "none";
        app.getPopular();
    });

    genresLink.addEventListener('click', function() {
        const clearFlex = document.querySelector('.movieFlex')
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        const genresHeading = document.getElementById('mainHeader')
        genresHeading.textContent = 'Genres';
        document.getElementById('movieGenre').selectedIndex = [0];
        hideDropDown.style.display = "inline";
        app.setUpEventListener();
        app.getGenres();
    });

    genresMenu.addEventListener('change', function() {
        const clearFlex = document.querySelector('.movieFlex')
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
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
    // console.log(dataFromTrendingApi);

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
        //Set class to text container 
        trendingTextContainer.classList.add('trendingTextContainer');
        
        //Create img container 
        const trendingImgContainer = document.createElement('div');
        trendingImgContainer.classList.add('trendingImgContainer')
        
        // trendingImgContainer.classList.add('trendingImgContainer');

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
        
        
        //Add src to img element
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        
        //Add movie title to Header Element
        headerElement.textContent = movie.title
        
        //Add content to p tag 
        paragraphHeader.textContent = `${movie.release_date.substring(0,4)} | Rating: ${movie.vote_average}`;
        
        //Add text content to the summary h4 element
        summaryElement.textContent = `Summary`;
        
        //Add movie overview to p element
        paragraphElement.textContent = `${movie.overview.split('.', 2).join('. ')}`;
        
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
        app.displayDiscover(jsonResponse);
    })
}

// Create function to display Discover data
app.displayDiscover = (dataFromDiscoverApi) => {
    
    // Get movies from array
    const discoverFirstFive = dataFromDiscoverApi.results.slice(15, 20);
    // console.log(discoverFirstFive);
    
    // Loop through array
    discoverFirstFive.forEach( (movie) => {
        console.log(movie);

        // Create containers
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('discoverFlexContainer');
        
        const discoverTextContainer = document.createElement('div');
        discoverTextContainer.classList.add('discoverTextContainer');
        
        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')
        
        // Create elements
        const imgElement = document.createElement('img');
        const headerElement = document.createElement('h3');
        const summaryElement = document.createElement('h4');
        const paragraphHeader = document.createElement('p');
        const paragraphElement = document.createElement('p');
        
        // Add data to elements
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        headerElement.textContent = movie.title
        paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;
        summaryElement.textContent = `Summary`;
        paragraphElement.textContent = `${movie.overview}`;
        
        //Append elements to respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverImgContainer.appendChild(imgElement);
        
        //Append containers to movie container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);
        
        //Append movie container to div to display on page
        columnFlex.appendChild(movieContainer);
    })
}

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
            app.displayPopular(jsonResponse)
        })
};

// Create function to display Popular data
app.displayPopular = (dataFromPopularApi) => {

    // Get movies from array
    const popularFirstThree = dataFromPopularApi.results.slice(10, 15);

    // Loop through array
    popularFirstThree.forEach((movie) => {

        // Create containers
        const popularContainer = document.createElement('div');
        popularContainer.classList.add('popularFlexContainer');

        const popularTextContainer = document.createElement('div');
        popularTextContainer.classList.add('popularTextContainer');

        const popularImageContainer = document.createElement('div');
        popularImageContainer.classList.add('popularImageContainer');

        // Create elements
        const popularImg = document.createElement('img');
        const popularHeader = document.createElement('h3');
        const popularRating = document.createElement('p');
        const popularSummary = document.createElement('h4');
        const popularParagraph = document.createElement('p');

        // Add data to elements
        popularImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        popularHeader.textContent = movie.title;
        popularRating.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;
        popularSummary.textContent = 'Summary';
        popularParagraph.textContent = `${movie.overview.split('.', 2).join('. ')}`;

        //Append elements to respective containers
        popularTextContainer.appendChild(popularHeader);
        popularTextContainer.appendChild(popularRating);
        popularTextContainer.appendChild(popularSummary);
        popularTextContainer.appendChild(popularParagraph);
        popularImageContainer.appendChild(popularImg);

        //Append containers to movie container
        popularContainer.appendChild(popularTextContainer);
        popularContainer.appendChild(popularImageContainer);

        //Append movie container to div to display on page
        columnFlex.appendChild(popularContainer);
    })
}

// ***** Genres Section *****

// Get data from API for Genres Section
app.getGenres = (genreId) => {
    // use URL constructor to target popular movies as endpoint
    const url = new URL(app.apiGenres);

    url.search = new URLSearchParams({
        api_key: app.apiKey,
        with_genres: genreId,
    })
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            app.displayGenres(jsonResponse.results);
        })
};

// Create function to display Genres data
app.displayGenres = (dataFromGenresApi) => {

    // Get movies from array
    const genresList = dataFromGenresApi.slice(12, 17);
    
    // Loop through the array
    genresList.forEach(function(movie) {

        // Create containers
        const genresContainer = document.createElement('div');
        genresContainer.classList.add('genresFlexContainer');

        const genresTextContainer = document.createElement('div');
        genresTextContainer.classList.add('genresTextContainer');

        const genresImageContainer = document.createElement('div');
        genresImageContainer.classList.add('genresImageContainer');

        // Create elements
        const genresImg = document.createElement('img');
        const genresHeader = document.createElement('h3');
        const genresRating = document.createElement('p');
        const genresSummary = document.createElement('h4');
        const genresParagraph = document.createElement('p');

        // Add data to elements
        genresImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        genresHeader.textContent = movie.title;
        genresRating.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;
        genresSummary.textContent = 'Summary';
        genresParagraph.textContent = `${movie.overview.split('.', 2).join('. ')}`;

        //Append elements to respective containers
        genresTextContainer.appendChild(genresHeader);
        genresTextContainer.appendChild(genresRating);
        genresTextContainer.appendChild(genresParagraph);
        genresTextContainer.appendChild(genresSummary);
        genresImageContainer.appendChild(genresImg);

        //Append containers to movie container
        genresContainer.appendChild(genresTextContainer);
        genresContainer.appendChild(genresImageContainer);

        //Append movie container to div to display on page
        columnFlex.appendChild(genresContainer);
    });
}

// ***** Search Bar Feature *****

// Get data from API for Search Bar
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

// Create function to display Search data
app.displaySearch = (dataFromSearchApi) => {
    // console.log(dataFromSearchApi);

    // Get movies from array
    const searchMovies = dataFromSearchApi.results.slice(0,5);
    // console.log(searchMovies);

    // Loop through array
    searchMovies.forEach((search) => {
        // console.log(search);

        //Create containers
        const searchMovieContainer = document.createElement('div');
        searchMovieContainer.classList.add('searchMovieContainer');

        const searchTextContainer = document.createElement('div');
        searchTextContainer.classList.add('searchTextContainer');

        const searchImgContainer = document.createElement('div');
        searchImgContainer.classList.add('searchImgContainer')


        //Create elements
        const imgElement = document.createElement('img');
        const headerElement = document.createElement('h3');
        const summaryElement = document.createElement('h4');
        const paragraphHeader = document.createElement('p');
        const paragraphElement = document.createElement('p');


        // Add data to elements
        imgElement.src = `https://image.tmdb.org/t/p/original/${search.poster_path}`;
        headerElement.textContent = search.title
        paragraphHeader.textContent = `${search.release_date} | Rating: ${search.vote_average}`;
        summaryElement.textContent = `Summary`;
        paragraphElement.textContent = `${search.overview}`;

        //Append elements to respective containers
        searchTextContainer.appendChild(headerElement);
        searchTextContainer.appendChild(paragraphHeader);
        searchTextContainer.appendChild(summaryElement);
        searchTextContainer.appendChild(paragraphElement);
        searchImgContainer.appendChild(imgElement);

        //Append containers to movie container
        searchMovieContainer.appendChild(searchTextContainer);
        searchMovieContainer.appendChild(searchImgContainer);

        //Append movie container to div to display on page
        columnFlex.appendChild(searchMovieContainer);
    });
};

// ***** Upcoming Movies Section *****

// // Get data from API for Upcoming section
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

// Create function to display Upcoming data
app.displayUpcoming = (dataFromUpcomingMovies) => {

    // Get movies from array
    const upcomingMovies = dataFromUpcomingMovies.results.slice(0, 5);

    // console.log(upcomingMovies);

    //Loop through each movie and append it to the DOM
    upcomingMovies.forEach((movie) => {
        // console.log(movie);

        //Create containers
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('discoverFlexContainer');

        const discoverTextContainer = document.createElement('div');
        discoverTextContainer.classList.add('discoverTextContainer');

        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')

        // console.log(movie)

        // Creat elements
        const imgElement = document.createElement('img');
        const headerElement = document.createElement('h3');
        const summaryElement = document.createElement('h4');
        const paragraphHeader = document.createElement('p');
        const paragraphElement = document.createElement('p');

        // Add data to elements
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        headerElement.textContent = movie.title
        paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;
        summaryElement.textContent = `Summary`;
        paragraphElement.textContent = `${movie.overview}`;

        //Append elements to respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverImgContainer.appendChild(imgElement);

        //Append containers to movie container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);

        //Append movie container to div to display on page
        columnFlex.appendChild(movieContainer);
    });
};

// ***** Get Top Rated *****

// // Get data from API for Top Rated section
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

// Create function to display Top Rated data
app.displayTopRated = (dataFromUpcomingMovies) => {

    // Get movies from array
    const displayRated = dataFromUpcomingMovies.results.slice(0, 5);

    // console.log(upcomingMovies);

    // Loop through array
    displayRated.forEach((movie) => {
        // console.log(movie);

        //Create containers
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('discoverFlexContainer');

        const discoverTextContainer = document.createElement('div');
        discoverTextContainer.classList.add('discoverTextContainer');

        const discoverImgContainer = document.createElement('div');
        discoverImgContainer.classList.add('discoverImgContainer')

        // console.log(movie);

        // Create elements
        const imgElement = document.createElement('img');
        const headerElement = document.createElement('h3');
        const summaryElement = document.createElement('h4');
        const paragraphHeader = document.createElement('p');
        const paragraphElement = document.createElement('p');


        // Add data to elements
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        headerElement.textContent = movie.title
        paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;
        summaryElement.textContent = `Summary`;
        paragraphElement.textContent = `${movie.overview}`;

        //Append elements to respective containers
        discoverTextContainer.appendChild(headerElement);
        discoverTextContainer.appendChild(paragraphHeader);
        discoverTextContainer.appendChild(summaryElement);
        discoverTextContainer.appendChild(paragraphElement);
        discoverImgContainer.appendChild(imgElement);

        //Append containers to movie container
        movieContainer.appendChild(discoverTextContainer);
        movieContainer.appendChild(discoverImgContainer);

        //Append movie container to div to display on page
        columnFlex.appendChild(movieContainer);
    });
};

//Watchlist feature

// const asideNav = document.querySelector('.asideFlex')

// asideNav.addEventListener('click', (e) => {
//     console.log(e);
//     if(e.target.textContent == 'Popular') {
//         clearFlex.innerHTML = '';
//         window.location.reload(true);
//         app.getPopular();
//         app.displayPopular();
//     } else if(e.target.textContent == 'Discover') {
//         clearFlex.innerHTML = '';
//         console.log('You clicked Discover');
//     } else if(e.target.textContent == 'Upcoming') {
//         clearFlex.innerHTML = '';
//         discoverHeading.textContent = 'Discover';
//         app.getDiscover();
//         console.log('You clicked Upcoming');
//     } else if(e.target.textContent == 'Top Rated') {
//         clearFlex.innerHTML = '';
        
//         console.log('You clicked Top Rated');
//     } else if(e.target.textContent == 'Genres') {
//         clearFlex.innerHTML = '';
//         window.location.reload(true);
//         app.getGenres();
//         app.displayGenres();
//         console.log('You clicked Genres');
//     }
// })

app.setUpEventListener = function() {
    const selectGenre = document.querySelector('#movieGenre');

    selectGenre.addEventListener('change', function() {

    const selectedGenre = this.value;
    console.log(selectedGenre);

    app.getGenres(selectedGenre);
    })
}

app.init()