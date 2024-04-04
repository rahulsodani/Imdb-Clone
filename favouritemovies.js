// Render favourite movies list
function renderfavouritemovieslist(){
    favouritemovies.textContent="";
    for (let i in myFavouriteList) {
        let li = document.createElement("li");
        let url="https://www.omdbapi.com/?apikey=a46da47&i=" + myFavouriteList[i];

        fetch(url).then(response => response.json())
                .then(function (data){
                    li.innerHTML = `
                    <img height="250" src="${data.Poster}">
                    <div>
                    <h1>${data.Title}<h1>
                    <h3>Year : ${data.Year}</h3>
                    <img src='fav.jpg' height="25" width="20" id="${data.imdbID}" class="like">
                    </div>
                    `;
                    console.log(data);
                    favouritemovies.append(li);
                })
    }
}
var retString = localStorage.getItem("favoriteval");
retArray = JSON.parse(retString);
myFavouriteList=retArray;

var favouritemovies = document.getElementById("favouritemovies");

// Render the favorite movies list on page load
renderfavouritemovieslist();


//Toggle the favorite property from the my Favourite movies list and rerender the list
document.addEventListener('click', function (event) {
    
    if (event.target.className == 'like') {
        var target = event.target;
        console.log(target.id);
        for (var i in myFavouriteList) {
            if (myFavouriteList[i] == target.id) {
                myFavouriteList.splice(i, 1);
                retArray.splice(i, 1);
                break;
            }
        }
        renderfavouritemovieslist();
        let string = JSON.stringify(retArray);
        localStorage.setItem("favoriteval", string);
    }
})
