import "./style.css"
const KEY =  '3499950c'
const button = document.querySelector('button')
const input = document.querySelector('input')
const items = document.querySelectorAll('li')
let DEFAULT_OPTION = 'movie'

async function data() {
    const input = document.querySelector('input')
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    clearScreen()
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${input.value}&type=${DEFAULT_OPTION}&apikey=${KEY}`)
        const info = await response.json()

        if(info.Response === 'True'){
            showInfo(info)
        }
        else{
            input.setCustomValidity(`${DEFAULT_OPTION} not found. Please try again.`)
            input.reportValidity();
        }
    } catch (error) {
        input.setCustomValidity('Error fetching data. Please try again.')
        input.reportValidity();
    } finally{
        loading.style.display = 'none'
    }
}

function showInfo (info){
    const img = document.getElementById('Poster')
    img.src = info.Poster
    img.alt = `${info.Title} Poster`

    const title = document.querySelector('h1')
    title.textContent = info.Title 

    const director = document.getElementById('director')
    director.textContent = `Director: ${info.Director}` || 'No director available'

    const actors = document.getElementById('actors')
    actors.textContent = `Actors: ${info.Actors}` || 'No actors available'

    const ratings = document.getElementById('source')    
    const value = document.getElementById('value')

    const foundRatings = info.Ratings.find(rating => rating.Source === 'Rotten Tomatoes')
    displayRating(foundRatings, value, ratings)

    const awards = document.getElementById('awards')
    awards.textContent = `Awards: ${info.Awards}` || 'N/A'

    const genre = document.getElementById('genre')
    genre.textContent = info.Genre || 'N/A'

    const runtime = document.getElementById('runtime')
    runtime.textContent = `Runtime: ${info.Runtime}` || 'N/A'

    const plot = document.getElementById('plot')
    plot.textContent = info.Plot  || 'No plot available'
}

function displayRating (foundRatings, value, ratings){
    if(foundRatings){
        ratings.textContent = foundRatings.Source
        value.textContent = foundRatings.Value
        setRatingColor(value, foundRatings.Value)
    }
    else{
        ratings.textContent = 'No ratings available'
        value.textContent = ''
    }
}

function setRatingColor (value, info){
    let rating = parseInt(info)
    if (rating  >= 70)
        value.style.color = 'green'
    else if (rating  >= 50)
        value.style.color = 'gold'
    else if (rating >= 40)
        value.style.color = 'orange'
    else
        value.style.color = 'red'
}

function clearScreen() {
    const img = document.getElementById('Poster');
    img.src = ''; 
    img.alt = '';

    const title = document.querySelector('h1');
    title.textContent = '';

    const director = document.getElementById('director');
    director.textContent = '';

    const actors = document.getElementById('actors');
    actors.textContent = '';

    const ratings = document.getElementById('source');
    const value = document.getElementById('value');
    ratings.textContent = '';
    value.textContent = '';

    const awards = document.getElementById('awards');
    awards.textContent = '';

    const genre = document.getElementById('genre');
    genre.textContent = '';

    const runtime = document.getElementById('runtime');
    runtime.textContent = '';

    const plot = document.getElementById('plot');
    plot.textContent = '';
}

function option(event){
    DEFAULT_OPTION = event.target.textContent === 'Movies' ? 'movie' : 'series' 
    setClass(DEFAULT_OPTION)
    clearScreen();
}

function setClass(event){
    if(event === 'movie'){
        document.getElementById('movie').classList.add('active')
        document.getElementById('series').classList.remove('active')
    }
    else{
        document.getElementById('series').classList.add('active')
        document.getElementById('movie').classList.remove('active')
    }
}

setClass(DEFAULT_OPTION)

button.addEventListener('click', data)
input.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        event.preventDefault()
        data()
    }
}
)
items.forEach(item => {
    item.addEventListener('click', option)
});