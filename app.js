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
            app.displayDiscover(jsonResponse);
        })
}
// Create function to display Discover data
app.displayDiscover = (dataFromDiscoverApi) => {
    //Take 5 movies from the current array of 20
    const discoverFirstFive = dataFromDiscoverApi.results.slice(15, 20);

    //Loop through each movie and append it to the DOM
    discoverFirstFive.forEach((movie) => {
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


        //add src to img element
        imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        //add movie title to Header Element
        headerElement.textContent = movie.title

        //add content to p tag 
        paragraphHeader.textContent = `${movie.release_date}      ⭐️ ${movie.vote_average}`;

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

    // get first three movies from array
    const popularFirstThree = dataFromPopularApi.results.slice(10, 15);

    // loop through array and append popular movie info to DOM
    popularFirstThree.forEach((movie) => {
        // popular movie container
        const popularContainer = document.createElement('div');
        popularContainer.classList.add('popularFlexContainer', 'grow');

        // popular movie text container
        const popularTextContainer = document.createElement('div');
        popularTextContainer.classList.add('popularTextContainer');

        // popular movie image container
        const popularImageContainer = document.createElement('div');
        popularImageContainer.classList.add('popularImageContainer');

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
        columnFlex.appendChild(popularContainer);
    })
}

// ***** Genres Section *****

app.getGenres = (genreId) => {
    // use URL consteuctor to target popular movies as endpoint
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

app.displayGenres = (dataFromGenresApi) => {
    // data check to ensure data is being returned in the array
    const genresList = dataFromGenresApi.slice(12, 17);

        // Loop through the genre array
        genresList.forEach(function (movie) {

            // genres movie container
            const genresContainer = document.createElement('div');
            genresContainer.classList.add('genresFlexContainer', 'grow');

            // genres text container
            const genresTextContainer = document.createElement('div');
            genresTextContainer.classList.add('genresTextContainer');

            // genres image container
            const genresImageContainer = document.createElement('div');
            genresImageContainer.classList.add('genresImageContainer');

            // save data from API in variables
            const genresImg = document.createElement('img');
            const genresHeader = document.createElement('h3');
            const genresRating = document.createElement('p');
            const genresSummary = document.createElement('h4');
            const genresParagraph = document.createElement('p');

            // add movie image
            genresImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

            // add genres name
            genresHeader.textContent = movie.title;

            // add movie release date and rating
            genresRating.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;

            // add summary header
            genresSummary.textContent = 'Summary';

            // add movie description
            genresParagraph.textContent = `${movie.overview.split('.', 2).join('. ')}`;

            // append genres information to respective container
            genresTextContainer.appendChild(genresHeader);
            genresTextContainer.appendChild(genresRating);
            genresTextContainer.appendChild(genresSummary);
            genresTextContainer.appendChild(genresParagraph);
            genresImageContainer.appendChild(genresImg);

            // append to genres list container
            genresContainer.appendChild(genresTextContainer);
            genresContainer.appendChild(genresImageContainer);

            // append containers to genresFlex
            columnFlex.appendChild(genresContainer);
        }); 
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
    const searchMovies = dataFromSearchApi.results.slice(0, 5);

    searchMovies.forEach((search) => {
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
        columnFlex.appendChild(searchMovieContainer);

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
            app.displayTopRated(responseJson);
        })
}

app.displayTopRated = (dataFromUpcomingMovies) => {
    const displayRated = dataFromUpcomingMovies.results.slice(0, 5);
    //Loop through each movie and append it to the DOM
    displayRated.forEach((movie) => {
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

app.setUpEventListener = function () {
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





// const app = {};

// // ***** API CALLS *****
// app.apiKey = '438f9921b5287c90f91cf32070a635f1';
// app.apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${app.apiKey}`;
// app.apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${app.apiKey}`;
// app.discoverApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${app.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&`;
// app.apiGenres = `https://api.themoviedb.org/3/discover/movie?api_key=${app.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
// app.apiTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${app.apiKey}&language=en-US&page=1`;
// app.apiUpcoming = ` https://api.themoviedb.org/3/movie/upcoming?api_key=${app.apiKey}&language=en-US&page=1`;
// app.apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${app.apiKey}&language=en-US&page=1&include_adult=false&`;


// // ***** Global Variables *****
// const genresMenu = document.querySelector('.genreDropDown');
// const hideDropDown = document.querySelector('.genreDropDown')

// const formElement = document.querySelector('form');
// const columnFlex = document.querySelector('.columnFlex');

// // ***** INIT to kickoff application *****
// app.init = () => {
//     app.getTrending();
//     hideDropDown.style.display = "none";
//     const asideNav = document.querySelector('.asideFlex')

//     asideNav.addEventListener('click', (e) => {
//         const clearFlex = document.querySelector('.movieFlex')
//         if (e.target.textContent == 'Popular') {
//             clearFlex.innerHTML = '';
//             const clearColumnFlex = document.querySelector('.columnFlex')
//             clearColumnFlex.innerHTML = '';
//             const popularHeading = document.getElementById('mainHeader')
//             popularHeading.textContent = 'Popular';
//             hideDropDown.style.display = "none";
//             app.getPopular();
//         } else if (e.target.textContent == 'Discover') {
//             clearFlex.innerHTML = '';
//             const clearColumnFlex = document.querySelector('.columnFlex')
//             clearColumnFlex.innerHTML = '';
//             const discoverHeading = document.getElementById('mainHeader');
//             discoverHeading.textContent = 'Discover';
//             hideDropDown.style.display = "none";
//             app.getDiscover();
//         } else if (e.target.textContent == 'Upcoming') {
//             clearFlex.innerHTML = '';
//             const clearColumnFlex = document.querySelector('.columnFlex')
//             clearColumnFlex.innerHTML = '';
//             const discoverHeading = document.getElementById('mainHeader');
//             discoverHeading.textContent = 'Upcoming';
//             hideDropDown.style.display = "none";
//             app.getUpcoming();
//         } else if (e.target.textContent == 'Top Rated') {
//             clearFlex.innerHTML = '';
//             const clearColumnFlex = document.querySelector('.columnFlex')
//             clearColumnFlex.innerHTML = '';
//             const discoverHeading = document.getElementById('mainHeader');
//             discoverHeading.textContent = 'Top Rated';
//             hideDropDown.style.display = "none";
//             app.getTopRated();
//         } else if (e.target.textContent == 'Genres') {
//             clearFlex.innerHTML = '';
//             const clearColumnFlex = document.querySelector('.columnFlex')
//             clearColumnFlex.innerHTML = '';
//             const genresHeading = document.getElementById('mainHeader')
//             genresHeading.textContent = 'Genres';
//             document.getElementById('movieGenre').selectedIndex = [0];
//             hideDropDown.style.display = "inline";
//             app.setUpEventListener();
//             app.getGenres();
//         }
//     })


//     formElement.addEventListener('submit', (e) => {
//         e.preventDefault();
//         //Log search input
//         const searchElement = document.querySelector('#movieSearch');
//         const searchValue = searchElement.value;
//         //Clear section
//         sectionElement = document.querySelector('.movieFlex');
//         sectionElement.innerHTML = '';
//         const clearColumnFlex = document.querySelector('.columnFlex')
//         clearColumnFlex.innerHTML = '';
//         searchHeading = document.getElementById('mainHeader');
//         searchHeading.textContent = `Results for "${searchValue}"`;
//         hideDropDown.style.display = "none";
//         app.getSearch(searchValue);
//     });
    
// };
// // ***** Trending Section *****
// // Get data from API for Trending Section
// app.getTrending = () => {
//     //use the URL constructor to create our endpoint and specify the parameters we want to include
//     const url = new URL(app.apiURL);
//     fetch(url)
//     .then(function (apiResponse) {
//         return apiResponse.json();
//     })
//     .then((jsonResponse) => {
//         app.displayTrending(jsonResponse)
//     })
    
// };
// // Create function to display Trending data 
// app.displayTrending = (dataFromTrendingApi) => {
//     //Target where we want to append each movie
//     const movieFlex = document.querySelector('.movieFlex');
//     //Get first three movies in the array
//     const trendingFirstThree = dataFromTrendingApi.results.slice(0, 3);
//     //Loop through each movie and append info to the DOM
//     trendingFirstThree.forEach( (movie) => {
        
//         //Create movie container 
//         const movieContainer = document.createElement('div');
//         //Set class to movie container
//         movieContainer.classList.add('movieContainer');
        
//         //Create text container 
//         const trendingTextContainer = document.createElement('div');
//         //set class to text container 
//         trendingTextContainer.classList.add('trendingTextContainer');
        
//         //Create img container 
//         const trendingImgContainer = document.createElement('div');
//         trendingImgContainer.classList.add('trendingImgContainer')
        
        
//         trendingImgContainer.classList.add('trendingImgContainer');

//         //Create img element
//         const imgElement = document.createElement('img');
//         //Create movie header to store movie title in
//         const headerElement = document.createElement('h3');
//         //Create h4 to store in text Container
//         const summaryElement = document.createElement('h4');
//         //Create p tag to store in textContainer under header
//         const paragraphHeader = document.createElement('p');
//         //Create p tag to store in textContainer 
//         const paragraphElement = document.createElement('p');
        
        
//         //add src to img element
//         imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        
//         //add movie title to Header Element
//         headerElement.textContent = movie.title
        
//         //add content to p tag 
//         paragraphHeader.textContent = `${movie.release_date.substring(0,4)} | Rating: ${movie.vote_average}`;
        
//         //Add text content to the summary h4 element
//         summaryElement.textContent = `Summary`;
        
//         //Add movie overview to p element
//         paragraphElement.textContent = `${movie.overview.split('.', 2).join('. ')}.`;
        
        
//         //Append Movie Poster and Title to their respective containers
//         trendingTextContainer.appendChild(headerElement);
//         trendingTextContainer.appendChild(paragraphHeader);
//         trendingTextContainer.appendChild(summaryElement);
//         trendingTextContainer.appendChild(paragraphElement);
//         trendingImgContainer.appendChild(imgElement);
        
//         //Append Movie Poster and Title Containers to their own container
//         movieContainer.appendChild(trendingTextContainer);
//         movieContainer.appendChild(trendingImgContainer);
        
//         //Append movie container to Movie Flex
//         movieFlex.appendChild(movieContainer);
//     })
// }
// // ***** Discover Section *****
// // Get data from API for Discover Section
// app.getDiscover = () => {
//     const discoverURL = new URL(app.discoverApiUrl);
//     fetch(discoverURL)
//     .then(function (apiResponse) {
//         return apiResponse.json()
//     })
//     .then((jsonResponse) => {
//         app.displayDiscover(jsonResponse);
//     })
// }
// // Create function to display Discover data
// app.displayDiscover = (dataFromDiscoverApi) => {    
//     //Take 5 movies from the current array of 20
//     const discoverFirstFive = dataFromDiscoverApi.results.slice(15, 20);

//     //Loop through each movie and append it to the DOM
//     discoverFirstFive.forEach( (movie) => {
//         //Create movie container 
//         const movieContainer = document.createElement('div');
//         //Set class to movie container
//         movieContainer.classList.add('discoverFlexContainer', 'grow');
        
//         //Create text container 
//         const discoverTextContainer = document.createElement('div');
//         //set class to text container 
//         discoverTextContainer.classList.add('discoverTextContainer');
        
//         //Create img container 
//         const discoverImgContainer = document.createElement('div');
//         discoverImgContainer.classList.add('discoverImgContainer')
        
//         //Create img element
//         const imgElement = document.createElement('img');
//         //Create movie header to store movie title in
//         const headerElement = document.createElement('h3');
//         //Create h4 to store in text Container
//         const summaryElement = document.createElement('h4');
//         //Create p tag to store in textContainer under header
//         const paragraphHeader = document.createElement('p');
//         //Create p tag to store in textContainer 
//         const paragraphElement = document.createElement('p');
        
        
//         //add src to img element
//         imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        
//         //add movie title to Header Element
//         headerElement.textContent = movie.title
        
//         //add content to p tag 
//         paragraphHeader.textContent = `${movie.release_date}      ⭐️ ${movie.vote_average}`;
        
//         //Add text content to the summary h4 element
//         summaryElement.textContent = `Summary`;
        
//         //Add movie overview to p element
//         paragraphElement.textContent = `${movie.overview}`;
        
//         //Append Movie Poster and Title to their respective containers
//         discoverTextContainer.appendChild(headerElement);
//         discoverTextContainer.appendChild(paragraphHeader);
//         discoverTextContainer.appendChild(summaryElement);
//         discoverTextContainer.appendChild(paragraphElement);
//         discoverImgContainer.appendChild(imgElement);
        
//         //Append Movie Poster and Title Containers to their own container
//         movieContainer.appendChild(discoverTextContainer);
//         movieContainer.appendChild(discoverImgContainer);
        
//         //Append movie container to Discover Flex
//         columnFlex.appendChild(movieContainer);
//     });
// };
// // ***** Popular Section *****
// // Get data from API for Popular Section
//         app.getPopular = () => {
//     // use URL consteuctor to target popular movies as endpoint
//     const url = new URL(app.apiPopular);
//     fetch(url)
//         .then(function (apiResponse) {
//             return apiResponse.json();
//         })
//         .then((jsonResponse) => {
//             app.displayPopular(jsonResponse)
//         })
// };

// // Create function to display Popular data
// app.displayPopular = (dataFromPopularApi) => {

//     // get first three movies from array
//     const popularFirstThree = dataFromPopularApi.results.slice(10, 15);

//     // loop through array and append popular movie info to DOM
//     popularFirstThree.forEach((movie) => {
//         // popular movie container
//         const popularContainer = document.createElement('div');
//         popularContainer.classList.add('popularFlexContainer', 'grow');

//         // popular movie text container
//         const popularTextContainer = document.createElement('div');
//         popularTextContainer.classList.add('popularTextContainer');

//         // popular movie image container
//         const popularImageContainer = document.createElement('div');
//         popularImageContainer.classList.add('popularImageContainer');

//         // save movie data in variables
//         const popularImg = document.createElement('img');
//         const popularHeader = document.createElement('h3');
//         const popularRating = document.createElement('p');
//         const popularSummary = document.createElement('h4');
//         const popularParagraph = document.createElement('p');

//         // add movie image
//         popularImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

//         // add movie title
//         popularHeader.textContent = movie.title;

//         // add movie release date and rating
//         popularRating.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;

//         // add summary header
//         popularSummary.textContent = 'Summary';

//         // add movie description
//         popularParagraph.textContent = `${movie.overview.split('.', 2).join('. ')}.`;

//         // append movie info to respective containers

//         popularTextContainer.appendChild(popularHeader);
//         popularTextContainer.appendChild(popularRating);
//         popularTextContainer.appendChild(popularSummary);
//         popularTextContainer.appendChild(popularParagraph);
//         popularImageContainer.appendChild(popularImg);


//         // append to movie container
//         popularContainer.appendChild(popularTextContainer);
//         popularContainer.appendChild(popularImageContainer);


//         // append containers to movie flex
//         columnFlex.appendChild(popularContainer);
//     })
// }

// // ***** Genres Section *****

// app.getGenres = (genreId) => {
//     // use URL consteuctor to target popular movies as endpoint
//     const url = new URL(app.apiGenres);

//     url.search = new URLSearchParams({
//         api_key: app.apiKey,
//         with_genres: genreId,
//     })
//     fetch(url)
//         .then(function (apiResponse) {
//             return apiResponse.json();
//         })
//         .then((jsonResponse) => {
//             app.displayGenres(jsonResponse.results);
//         })
// };

// app.displayGenres = (dataFromGenresApi) => {
//     // data check to ensure data is being returned in the array
//     const genresList = dataFromGenresApi.slice(12, 17);

    
//     // Loop through the genre array
//     genresList.forEach(function(movie) {


//         // genres movie container
//         const genresContainer = document.createElement('div');
//         genresContainer.classList.add('genresFlexContainer', 'grow');

//         // genres text container
//         const genresTextContainer = document.createElement('div');
//         genresTextContainer.classList.add('genresTextContainer');

//         // genres image container
//         const genresImageContainer = document.createElement('div');
//         genresImageContainer.classList.add('genresImageContainer');

//         // save data from API in variables
//         const genresImg = document.createElement('img');
//         const genresHeader = document.createElement('h3');
//         const genresRating = document.createElement('p');
//         const genresSummary = document.createElement('h4');
//         const genresParagraph = document.createElement('p');

//         // add movie image
//         genresImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

//         // add genres name
//         genresHeader.textContent = movie.title;

//         // add movie release date and rating
//         genresRating.textContent = `${movie.release_date.substring(0, 4)} | Rating: ${movie.vote_average}`;

//         // add summary header
//         genresSummary.textContent = 'Summary';

//         // add movie description
//         genresParagraph.textContent = `${movie.overview.split('.', 2).join('. ')}.`;

//         // append genres information to respective container
//         genresTextContainer.appendChild(genresHeader);
//         genresTextContainer.appendChild(genresRating);
//         genresTextContainer.appendChild(genresSummary);
//         genresTextContainer.appendChild(genresParagraph);
//         genresImageContainer.appendChild(genresImg);

//         // append to genres list container
//         genresContainer.appendChild(genresTextContainer);
//         genresContainer.appendChild(genresImageContainer);

//         // append containers to genresFlex
//         columnFlex.appendChild(genresContainer);
//     });
// }

// //Search Bar Feature

// app.getSearch = (userQuery) => {
//     const searchURL = new URL(app.apiSearch);

//     searchURL.search = new URLSearchParams({
//         api_key: app.apiKey, 
//         query: userQuery,
//     })
//     fetch(searchURL)
//     .then((response) => {
//         return response.json();
//     })
//     .then((jsonResponse) => {
//         app.displaySearch(jsonResponse)
//     })
// }

// app.displaySearch = (dataFromSearchApi) => {
//     //Select the div where we will be appending the movie cards.
//     const searchMovies = dataFromSearchApi.results.slice(0,5);

//     searchMovies.forEach((search) => {
//         //Create movie container 
//         const searchMovieContainer = document.createElement('div');
//         //Set class to movie container
//         searchMovieContainer.classList.add('searchMovieContainer');

//         //Create text container 
//         const searchTextContainer = document.createElement('div');
//         //set class to text container 
//         searchTextContainer.classList.add('searchTextContainer');

//         //Create img container 
//         const searchImgContainer = document.createElement('div');
//         searchImgContainer.classList.add('searchImgContainer')


//         //Create img element
//         const imgElement = document.createElement('img');
//         //Create movie header to store movie title in
//         const headerElement = document.createElement('h3');
//         //Create h4 to store in text Container
//         const summaryElement = document.createElement('h4');
//         //Create p tag to store in textContainer under header
//         const paragraphHeader = document.createElement('p');
//         //Create p tag to store in textContainer 
//         const paragraphElement = document.createElement('p');


//         //add src to img element
//         imgElement.src = `https://image.tmdb.org/t/p/original/${search.poster_path}`;

//         //add movie title to Header Element
//         headerElement.textContent = search.title

//         //add content to p tag 
//         paragraphHeader.textContent = `${search.release_date} | Rating: ${search.vote_average}`;

//         //Add text content to the summary h4 element
//         summaryElement.textContent = `Summary`;

//         //Add movie overview to p element
//         paragraphElement.textContent = `${search.overview}`;


//         //Append Movie Poster and Title to their respective containers
//         searchTextContainer.appendChild(headerElement);
//         searchTextContainer.appendChild(paragraphHeader);
//         searchTextContainer.appendChild(summaryElement);
//         searchTextContainer.appendChild(paragraphElement);
//         searchImgContainer.appendChild(imgElement);

//         //Append Movie Poster and Title Containers to their own container
//         searchMovieContainer.appendChild(searchTextContainer);
//         searchMovieContainer.appendChild(searchImgContainer);

//         //Append movie container to Search Flex
//         columnFlex.appendChild(searchMovieContainer);

//     });

// };

// //Upcoming Movies Section

// app.getUpcoming = () => {
//     const upcomingUrl = new URL(app.apiUpcoming)
//     fetch(upcomingUrl)
//     .then((response) => {
//         return response.json();
//     })
//     .then((responseJson) => {
//         app.displayUpcoming(responseJson);
//     })
// }

// app.displayUpcoming = (dataFromUpcomingMovies) => {
//     const upcomingMovies = dataFromUpcomingMovies.results.slice(0, 5);

//     //Loop through each movie and append it to the DOM
//     upcomingMovies.forEach((movie) => {
//         //Create movie container 
//         const movieContainer = document.createElement('div');
//         //Set class to movie container
//         movieContainer.classList.add('discoverFlexContainer', 'grow');

//         //Create text container 
//         const discoverTextContainer = document.createElement('div');
//         //set class to text container 
//         discoverTextContainer.classList.add('discoverTextContainer');

//         //Create img container 
//         const discoverImgContainer = document.createElement('div');
//         discoverImgContainer.classList.add('discoverImgContainer')

//         //Create img element
//         const imgElement = document.createElement('img');
//         //Create movie header to store movie title in
//         const headerElement = document.createElement('h3');
//         //Create h4 to store in text Container
//         const summaryElement = document.createElement('h4');
//         //Create p tag to store in textContainer under header
//         const paragraphHeader = document.createElement('p');
//         //Create p tag to store in textContainer 
//         const paragraphElement = document.createElement('p');


//         //add src to img element
//         imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

//         //add movie title to Header Element
//         headerElement.textContent = movie.title

//         //add content to p tag 
//         paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;

//         //Add text content to the summary h4 element
//         summaryElement.textContent = `Summary`;

//         //Add movie overview to p element
//         paragraphElement.textContent = `${movie.overview}`;


//         //Append Movie Poster and Title to their respective containers
//         discoverTextContainer.appendChild(headerElement);
//         discoverTextContainer.appendChild(paragraphHeader);
//         discoverTextContainer.appendChild(summaryElement);
//         discoverTextContainer.appendChild(paragraphElement);
//         discoverImgContainer.appendChild(imgElement);

//         //Append Movie Poster and Title Containers to their own container
//         movieContainer.appendChild(discoverTextContainer);
//         movieContainer.appendChild(discoverImgContainer);

//         //Append movie container to Discover Flex
//         columnFlex.appendChild(movieContainer);
//     });
// };

// //Get Top Rated
// app.getTopRated = () => {
//     const topRatedUrl = new URL(app.apiTopRated)
//     fetch(topRatedUrl)
//         .then((response) => {
//             return response.json();
//         })
//         .then((responseJson) => {
//             app.displayTopRated(responseJson);
//         })
// }

// app.displayTopRated = (dataFromUpcomingMovies) => {
//     const displayRated = dataFromUpcomingMovies.results.slice(0, 5);
//     //Loop through each movie and append it to the DOM
//     displayRated.forEach((movie) => {
//         //Create movie container 
//         const movieContainer = document.createElement('div');
//         //Set class to movie container
//         movieContainer.classList.add('discoverFlexContainer', 'grow');

//         //Create text container 
//         const discoverTextContainer = document.createElement('div');
//         //set class to text container 
//         discoverTextContainer.classList.add('discoverTextContainer');

//         //Create img container 
//         const discoverImgContainer = document.createElement('div');
//         discoverImgContainer.classList.add('discoverImgContainer')

//         //Create img element
//         const imgElement = document.createElement('img');
//         //Create movie header to store movie title in
//         const headerElement = document.createElement('h3');
//         //Create h4 to store in text Container
//         const summaryElement = document.createElement('h4');
//         //Create p tag to store in textContainer under header
//         const paragraphHeader = document.createElement('p');
//         //Create p tag to store in textContainer 
//         const paragraphElement = document.createElement('p');


//         //add src to img element
//         imgElement.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

//         //add movie title to Header Element
//         headerElement.textContent = movie.title

//         //add content to p tag 
//         paragraphHeader.textContent = `${movie.release_date} | Rating: ${movie.vote_average}`;

//         //Add text content to the summary h4 element
//         summaryElement.textContent = `Summary`;

//         //Add movie overview to p element
//         paragraphElement.textContent = `${movie.overview}`;


//         //Append Movie Poster and Title to their respective containers
//         discoverTextContainer.appendChild(headerElement);
//         discoverTextContainer.appendChild(paragraphHeader);
//         discoverTextContainer.appendChild(summaryElement);
//         discoverTextContainer.appendChild(paragraphElement);
//         discoverImgContainer.appendChild(imgElement);

//         //Append Movie Poster and Title Containers to their own container
//         movieContainer.appendChild(discoverTextContainer);
//         movieContainer.appendChild(discoverImgContainer);

//         //Append movie container to Discover Flex
//         columnFlex.appendChild(movieContainer);
//     });
// };

// app.setUpEventListener = function() {
//     const selectGenre = document.querySelector('#movieGenre');

//     selectGenre.addEventListener('change', function() {
//         const clearFlex = document.querySelector('.movieFlex')
//         clearFlex.innerHTML = '';
//         const clearColumnFlex = document.querySelector('.columnFlex')
//         clearColumnFlex.innerHTML = '';

//         const selectedGenre = this.value;
//         app.getGenres(selectedGenre);
//     })
// }
// app.init();

