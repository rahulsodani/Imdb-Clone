var allMoviesAPI;
var arrMov;
var results = document.getElementById("results");
var moviesmatching = [];
var myFavouriteList = [];

// to search and store the matched results in moviesmatching list
function displayResults(event) {
    var searchkeyword = event.target.value;
    if (!searchkeyword) {
        results.innerText = '';
        return;
    }
    if (searchkeyword.substr(0, 2) == 'tt')
        var url = "http://www.omdbapi.com/?apikey=a46da47&i=" + searchkeyword;
    else
        var url = "http://www.omdbapi.com/?apikey=a46da47&s=" + searchkeyword;
    fetch(url).then(response => response.json())
        .then(function (data) {
            allMoviesAPI = data;
            if (!allMoviesAPI.Title)
                arrMov = allMoviesAPI.Search;
            else {
                arrMov = [];
                arrMov[0] = allMoviesAPI;
            }
            moviesmatching = arrMov;
            renderSearchedMovieslist();
            console.log(allMoviesAPI, arrMov);
        })
        .catch(function (error) {
            console.log(error);

        })

}

//Render movies matched with Search keyword
function renderSearchedMovieslist() {
    results.textContent = "";
    for (var i in moviesmatching) {
        var li = document.createElement("li");
        li.innerHTML = `
        <img style="width:60px;" height="80" src="${moviesmatching[i].Poster}">
        <div>
        <h2 style="display:inline-block; width: 96%;">
        <a class="displaymovie" id="${moviesmatching[i].imdbID}" href="moviepage.html">
        ${moviesmatching[i].Title}
        </a>
        </h2>
        <img src="${myFavouriteList.includes(moviesmatching[i].imdbID) ? 'fav.jpg' : 'cccd311820e509964ce02c3b1a2a91ed.jpg'}" height="25" width="20" id="${moviesmatching[i].imdbID}" class="favorite">
        </div>
        `;
        results.append(li);
    }
}



//Toggle the favorite property from the moviematching list and rerender the list 
// or display the movie details page on clicking the movie name
document.addEventListener('click', function (event) {

    if (event.target.className == 'favorite') {
        event.preventDefault();
        var target = event.target;
        console.log(target.id);
        let retString = localStorage.getItem("favoriteval");
        retArray = JSON.parse(retString);
        var flag = 0;
        for (var i in retArray) {
            if (target.id == retArray[i]) {
                retArray.splice(i, 1);
                flag = 1;
                break;
            }
        }
        if (flag == 0)
            retArray.push(target.id);
        var flag = 0;
        for (var i in myFavouriteList) {
            if (target.id == myFavouriteList[i]) {
                myFavouriteList.splice(i, 1);
                flag = 1;
                break;
            }
        }
        if (flag == 0)
            myFavouriteList.push(target.id);
        renderSearchedMovieslist(moviesmatching);
        var string = JSON.stringify(retArray);
        localStorage.setItem("favoriteval", string);

        renderSearchedMovieslist(moviesmatching);
    }

    if (event.target.className == "displaymovie") {
        target = event.target;
        console.log(target.id);
        localStorage.display = target.id;
    }
})

// trigger the displayResults function when inputchange event
//  takes place on input tag 
var input = document.getElementById("input");
input.addEventListener("input", displayResults);


var retString = localStorage.getItem("favoriteval");
retArray = JSON.parse(retString);
myFavouriteList=retArray;