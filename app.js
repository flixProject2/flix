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
const carouselElement = document.querySelector('.carouselMain')

// ***** INIT to kickoff application *****
app.init = () => {
    app.getTrending();
    hideDropDown.style.display = "none";
    const asideNav = document.querySelector('.asideFlex')
    asideNav.addEventListener('click', (e) => {
        navEventHandler(e);
    })

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        //Log search input
        const searchElement = document.querySelector('#movieSearch');
        const searchValue = searchElement.value;
        //Clear section
        carouselElement.style.display = "none"
        sectionElement = document.querySelector('.movieFlex');
        sectionElement.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        searchHeading = document.getElementById('mainHeader');
        searchHeading.textContent = `Results for "${searchValue}"`;
        hideDropDown.style.display = "none";
        app.getSearch(searchValue);
    });  
    const mobileNav = document.querySelector('.mobileMenu')
    mobileNav.addEventListener('click', (e) => {
        navEventHandler(e);
    })
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
    //Creating the carousel structure
    const imgOne = document.querySelector('.imgOne')
    const imgTwo = document.querySelector('.imgTwo')
    const imgThree = document.querySelector('.imgThree')
    
    const firstCaro = dataFromTrendingApi.results[0];
    imgOne.src = `https://image.tmdb.org/t/p/original/${firstCaro.poster_path}`;
    
    const secondCaro = dataFromTrendingApi.results[1];
    imgTwo.src = `https://image.tmdb.org/t/p/original/${secondCaro.poster_path}`;
    
    const thirdCaro = dataFromTrendingApi.results[2];
    imgThree.src = `https://image.tmdb.org/t/p/original/${thirdCaro.poster_path}`;

    const carouselTextContainerOne = document.querySelector('.carouselTextContainerOne');
    const carouselTextContainerTwo = document.querySelector('.carouselTextContainerTwo');
    const carouselTextContainerThree = document.querySelector('.carouselTextContainerThree');

    //Select individual text container and append info
    const movieTitleOne = document.querySelector('.movieTitleOne');
    movieTitleOne.textContent = firstCaro.title;

    const movieTitleTwo = document.querySelector('.movieTitleTwo');
    movieTitleTwo.textContent = secondCaro.title;

    const movieTitleThree = document.querySelector('.movieTitleThree');
    movieTitleThree.textContent = thirdCaro.title;

    const movieOverviewOne = document.querySelector('.movieOverviewOne');
    movieOverviewOne.textContent = firstCaro.overview;

    const movieOverviewTwo = document.querySelector('.movieOverviewTwo');
    movieOverviewTwo.textContent = secondCaro.overview;

    const movieOverviewThree = document.querySelector('.movieOverviewThree');
    movieOverviewThree.textContent = thirdCaro.overview;

    //modify string to match href provided by MovieDB
    firstCaro.title.replace(/\s/g, '-').replace(':', '');
    secondCaro.title.replace(/\s/g, '-').replace(':', '');
    thirdCaro.title.replace(/\s/g, '-').replace(':', '');

    const anchorElementOne = document.querySelector('.learnMoreOne')
    anchorElementOne.href = `https://www.themoviedb.org/movie/${firstCaro.id}-${firstCaro}`;
    anchorElementOne.classList.add('linkButton')

    const anchorElementTwo = document.querySelector('.learnMoreTwo')
    anchorElementTwo.href = `https://www.themoviedb.org/movie/${secondCaro.id}-${secondCaro}`;
    anchorElementTwo.classList.add('linkButton');

    const anchorElementThree = document.querySelector('.learnMoreThree')
    anchorElementThree.href = `https://www.themoviedb.org/movie/${thirdCaro.id}-${thirdCaro}`
    anchorElementThree.classList.add('linkButton')

    anchorElementOne

    const carouselTrack = document.querySelector('.carouselTrack')

    const slides = Array.from(carouselTrack.children);
    
    const rightButton = document.querySelector('.carouselButtonRight');
    const leftButton = document.querySelector('.carouselButtonLeft');

    const cNav = document.querySelector('.carouselNav')
    const navRectangle = Array.from(cNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    }
    slides.forEach(setSlidePosition)

    const moveToSlide = (carouselTrack, currentSlide, nextSlide) => {
        carouselTrack.style.transform = 'translateX(-' + nextSlide.style.left + ')';
        currentSlide.classList.remove('currentSlide');
        nextSlide.classList.add('currentSlide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('currentSlide');
        targetDot.classList.add('currentSlide');
    }

    const hideShowArrows = (slides, leftButton, rightButton, targetIndex) => {
        if (targetIndex === 0) {
            leftButton.classList.add('isHidden');
            rightButton.classList.remove('isHidden');

        } else if (targetIndex === slides.length - 1) {
            leftButton.classList.remove('isHidden');
            rightButton.classList.add('isHidden');
        } else {
            leftButton.classList.remove('isHidden');
            rightButton.classList.remove('isHidden');
        }
    }

    leftButton.addEventListener('click', (e) => {
        const currentSlide = carouselTrack.querySelector('.currentSlide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = cNav.querySelector('.currentSlide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(carouselTrack, currentSlide, prevSlide)
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, leftButton, rightButton, prevIndex)
    })
    rightButton.addEventListener('click', (e) => {
        const currentSlide = carouselTrack.querySelector('.currentSlide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = cNav.querySelector('.currentSlide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(carouselTrack, currentSlide, nextSlide)
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, leftButton, rightButton, nextIndex)    
    })

    cNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button');
        if(!targetDot) return;

        const currentSlide = carouselTrack.querySelector('.currentSlide');
        const currentDot = cNav.querySelector('.currentSlide');
        const targetIndex = navRectangle.findIndex(rec => rec === targetDot)
        const targetSlide = slides[targetIndex];

        moveToSlide(carouselTrack, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, leftButton, rightButton, targetIndex)
    })



    //Get first three movies in the array
    const trendingNextThree = dataFromTrendingApi.results.slice(3, 6);
    //Loop through each movie and append info to the DOM
    trendingNextThree.forEach((movie) => {

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

        //Set altText to img element
        imgElement.alt = `A movie poster for the movie ${movie.title}`

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
        if(jsonResponse.results.length >= 1) {
            app.displayMovie(jsonResponse.results.slice(0, 5))
        } else {
            const errorMessage = document.querySelector('.errorHandling')
            errorMessage.textContent = `I'm sorry, it looks like your search has not returned any movies. Please search again!`
        }
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
//Event handler function for nav (mobile and aside)
function navEventHandler(e) {
    const clearFlex = document.querySelector('.movieFlex')
    if (e.target.textContent == 'Popular') {
        carouselElement.style.display = "none"
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        const popularHeading = document.getElementById('mainHeader')
        popularHeading.textContent = 'Popular';
        hideDropDown.style.display = "none";
        app.getPopular();
    } else if (e.target.textContent == 'Discover') {
        carouselElement.style.display = "none"
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        const discoverHeading = document.getElementById('mainHeader');
        discoverHeading.textContent = 'Discover';
        hideDropDown.style.display = "none";
        app.getDiscover();
    } else if (e.target.textContent == 'Upcoming') {
        carouselElement.style.display = "none"
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        const discoverHeading = document.getElementById('mainHeader');
        discoverHeading.textContent = 'Upcoming';
        hideDropDown.style.display = "none";
        app.getUpcoming();
    } else if (e.target.textContent == 'Top Rated') {
        carouselElement.style.display = "none"
        clearFlex.innerHTML = '';
        const clearColumnFlex = document.querySelector('.columnFlex')
        clearColumnFlex.innerHTML = '';
        const discoverHeading = document.getElementById('mainHeader');
        discoverHeading.textContent = 'Top Rated';
        hideDropDown.style.display = "none";
        app.getTopRated();
    } else if (e.target.textContent == 'Genres') {
        carouselElement.style.display = "none"
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
}


app.init();
