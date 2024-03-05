var allMoviesAPI;
var arrMov;
var results = document.getElementById("results");
var moviesmatching = [];
var myFavouriteList = [];

// to store the matched results in moviesmatching list
function displayResults(event) {
    var searchkeyword = event.target.value;
    if (!searchkeyword) {
        results.innerText = '';
        return;
    }

    moviesmatching = [];
    for (var i in arrMov) {
        var temp = arrMov[i].Title.toLowerCase();
        if (temp.includes(searchkeyword.toLowerCase()))
            moviesmatching.push(arrMov[i]);
    }
    renderSearchedMovieslist();
    console.log(searchkeyword);
}

//Render movies matched with Search keyword
function renderSearchedMovieslist() {
    results.textContent = "";
    for (var i in moviesmatching) {
        var li = document.createElement("li");
        li.innerHTML = `
        <img height="80" src="${moviesmatching[i].Poster}">
        <div>
        <h2 style="display:inline-block; width: 96%;">
        <a class="displaymovie" id="${moviesmatching[i].displayid}" href="moviepage.html">
        ${moviesmatching[i].Title}
        </a>
        </h2>
        <img src="${moviesmatching[i].favorite ? 'fav.jpg' : 'cccd311820e509964ce02c3b1a2a91ed.jpg'}" height="25" width="20" id="${moviesmatching[i].id}" class="favorite">
        </div>
        `;
        results.append(li);
    }
}



//Toggle the favorite property from the moviematching list and rerender the list  
document.addEventListener('click', function (event) {

    if (event.target.className == 'favorite') {
        event.preventDefault();
        var target = event.target;
        console.log(target.id);
        for (var i in moviesmatching) {
            if (moviesmatching[i].id == target.id) {
                moviesmatching[i].favorite = !moviesmatching[i].favorite;
                let retString = localStorage.getItem("favoriteval");
                retArray = JSON.parse(retString);
                retArray[target.id] = !retArray[target.id];
            }
        }
        myFavouriteList = []
        for (var i in arrMov) {
            if (arrMov[i].favorite)
                myFavouriteList.push(arrMov[i]);
        }
        renderSearchedMovieslist(moviesmatching);
        let string = JSON.stringify(retArray);
        localStorage.setItem("favoriteval", string);
    }

    if (event.target.className == "displaymovie") {
        target = event.target;
        console.log(target.id);
        for (var i in moviesmatching) {
            if (moviesmatching[i].displayid == target.id) {
                let retString = localStorage.getItem("display");
                retArray = JSON.parse(retString);
                retArray[(target.id).substr(1)] = true;
                arrMov[i].displaymovie = true;

            }
        }
        let string = JSON.stringify(retArray);
        localStorage.setItem("display", string);
    }
})

fetch("http://www.omdbapi.com/?i=tt3896198&apikey=a46da47&s=batman&plot=short").then(response => response.json())
    .then(function (data) {
        allMoviesAPI = data;
    })
    .catch(function (error) {
        console.log(error);
    })

// Push the API data in the arrMov array
setTimeout(() => {
    arrMov = allMoviesAPI.Search;
    let retString = localStorage.getItem("favoriteval");
    let retArray = JSON.parse(retString);
    retString = localStorage.getItem("display");
    let arr= JSON.parse(retString);
    for (var i in arrMov) {
        arrMov[i].favorite = retArray[i];
        arrMov[i].id = i;
        arrMov[i].displayid = "T" + i;
        arrMov[i].displaymovie = arr[i];
    }
    myFavouriteList = []
    for (var i in arrMov) {
        if (arrMov[i].favorite)
            myFavouriteList.push(arrMov[i]);
    }
}, 1000);

// trigger the displayResults function when inputchange event
//  takes place on input tag 
var input = document.getElementById("input");
input.addEventListener("input", displayResults);


