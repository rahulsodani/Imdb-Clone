var movie = document.getElementById("name");
var plot = document.getElementById("plot");
var img = document.getElementById("img");
var imdbRating=document.getElementById("imdbRating");
var Year=document.getElementById("Year");
url="https://www.omdbapi.com/?apikey=a46da47&i=" + localStorage.display;

fetch(url).then(response => response.json())
        .then(function (data){
            
            movie.innerHTML = data.Title;
            plot.innerHTML =  data.Plot;
            img.setAttribute('src', data.Poster);
            imdbRating.textContent="Imdb Rating: "+ data.imdbRating;
            Year.innerText="Released: "+ data.Year;
            console.log(data);
        })
