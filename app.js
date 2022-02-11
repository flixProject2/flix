const app = {};


app.apiKey = '438f9921b5287c90f91cf32070a635f1';
app.apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${app.apiKey}`;

app.init = () => {
    app.getTrending();
}



app.getTrending = () => {
    //use the URL constructor to create our endpoint and specify the parameters we want to include
    const url = new URL(app.apiURL);
    fetch(url)
        .then(function (apiResponse) {
            return apiResponse.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);
        })

};

app.init();