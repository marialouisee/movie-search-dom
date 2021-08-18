
const body = document.querySelector("body")
const input = body.querySelector("#input")


class Movie {
    constructor(){
        this.movies = body.querySelector('#movies')
        this.more = body.querySelector('#more')
    }

// this will get the max 10 movies from the api omdb api

    async createMovie(){
        if(input.value !== ""){
            //to empty movies
            movies.innerHTML = ""

            //fetch from api
            const res = await fetch(`http://www.omdbapi.com/?apikey=c5f25104&s=${input.value}`)
            const result = await res.json()
        
            result.Search.forEach(item => {
                // if no poster available
                if(item.Poster == "N/A") {
                    this.movies.insertAdjacentHTML('beforeend',
                    `<section class="card">
                        <div class="staticCard">
                            <img class="img" src="./img/noImg.jpg">
                            <div class="info">
                                <h3 > MOVIE DETAILS</h3>
                                <h2 id="title">${item.Title}</h2>
                                <p>Released ${item.Year}</p>
                                <button id="${item.imdbID}"  class="moreInfo">more infos</button>
                            </div>
                        </div>
                    
                    </section>
                    `)
        
                } else {
                    this.movies.insertAdjacentHTML('beforeend',
                    `<section class="card">
                        <div class="staticCard">
                            <img class="img" src="${item.Poster}">
                            <div class="info">
                                <h3 > MOVIE DETAILS</h3>
                                <h2 id="title">${item.Title}</h2>
                                <p>Released ${item.Year}</p>
                                <button id="${item.imdbID}"  class="moreInfo">more infos</button>
                            </div>
                        </div>
                    </section>
                    `)
                }  
            })
        }       
    }

// this will get the x-tra info to the selected movie from api omdb api

   async getMovieInfo(movieID , selector){
        // alert(movieID);
        console.log(selector);
        const response = await fetch(`http://www.omdbapi.com/?apikey=c5f25104&i=${movieID}`)
        const result = await response.json()

        console.log(result);

        selector.insertAdjacentHTML('beforeend',
                ` <div class="pMoreInfo">
                    <p>imdb Rating: ${result.imdbRating}</p>
                    <p>${result.Plot}</p>
                   </div>
                 `)
    }

    clear(){
        movies.innerHTML = ""
        input.value = ""
    }


}
const movie = new Movie()

body.addEventListener('click', (e)=>{

    if(e.target.id === "search"){
        movie.createMovie()
    }

    if(e.target.className === "moreInfo"){
        movie.getMovieInfo(e.target.id ,e.target.parentElement.parentElement.parentElement)
        e.target.disabled = true
    }
    if(e.target.id === "clear"){
        movie.clear()

    }
});
