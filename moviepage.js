var movie = document.getElementById("name");
var plot = document.getElementById("plot");
var img = document.getElementById("img");


let retString = localStorage.getItem("display");
arr = JSON.parse(retString);
setTimeout(function(){
    for (var i in arrMov) {
        if (arr[i]) {
            console.log("hi");
            movie.innerHTML = arrMov[i].Title;
            plot.innerHTML = arrMov[i].imdbID + " is the Imdb id of this movie. \n Plot: " + "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos perspiciatis magnam unde aut sint labore quis, ut quas excepturi doloremque animi repellendus neque amet suscipit nostrum nobis nisi quidem dolorem!";
            img.setAttribute('src', arrMov[i].Poster);
            arr[i]=false;
        }
    }
string = JSON.stringify(arr);
localStorage.setItem("display", string);
},1000);
