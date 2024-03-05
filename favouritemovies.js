// Render favourite movies list
function renderfavouritemovieslist(){
    favouritemovies.innerText='';
    for (var i in myFavouriteList) {
        var li = document.createElement("li");
        li.innerHTML = `
        <img height="250" src="${myFavouriteList[i].Poster}">
        <div>
        <h1>${myFavouriteList[i].Title}<h1>
        <h3>Year : ${myFavouriteList[i].Year}</h3>
        <img src="${myFavouriteList[i].favorite ? 'fav.jpg' : 'cccd311820e509964ce02c3b1a2a91ed.jpg'}" height="25" width="20" id="${myFavouriteList[i].id}" class="like">
        </div>
        `;
    favouritemovies.append(li);
    }
}
// Render the favorite movies list on page load
setTimeout(renderfavouritemovieslist, 1000);

var favouritemovies = document.getElementById("favouritemovies");

//Toggle the favorite property from the my Favourite movies list and rerender the list
document.addEventListener('click', function (event) {

    if (event.target.className == 'like') {
        var target = event.target;
        console.log(target.id);
        for (var i in myFavouriteList) {
            if (myFavouriteList[i].id == target.id) {
                myFavouriteList[i].favorite = !myFavouriteList[i].favorite;
                let retString = localStorage.getItem("favoriteval");
                retArray = JSON.parse(retString);
                retArray[target.id] = !retArray[target.id];
            }
        }
        myFavouriteList=[]
        for (var i in arrMov) {
            if(arrMov[i].favorite)
            myFavouriteList.push(arrMov[i]);
        }
        renderfavouritemovieslist();
        let string = JSON.stringify(retArray);
        localStorage.setItem("favoriteval", string);
    }
})