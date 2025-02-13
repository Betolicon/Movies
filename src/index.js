import "./style.css"
const KEY =  '3499950c'
const button = document.querySelector('button')
const items = document.querySelectorAll('li')
let DEFAULT_OPTION = 'movie'

async function data() {
    const input = document.querySelector('input').value
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${input}&type=${DEFAULT_OPTION}&apikey=${KEY}`)
        const info = await response.json()
        console.log(info)
        showInfo(info)
    } catch (error) {
        const content = document.querySelector('.content')
        content.textContent = 'Error fetching data. Please try again.'
    }
}

function showInfo (info){
    const img = document.querySelector('img')
    img.src = info.Poster || 'https://www.industrialcontroldirect.com/bmz_cache/4/45d96986ccc97bb6e86efb9d1173efac.image.300x245.png'
    img.alt = 'Poster'
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
    console.log(rating)
    if (rating  >= 70)
        value.style.color = 'green'
    else if (rating  >= 50)
        value.style.color = 'gold'
    else if (rating >= 40)
        value.style.color = 'orange'
    else
        value.style.color = 'red'
}

function option(event){
    DEFAULT_OPTION = event.target.textContent == 'Movies' ? 'movie' : 'series' 
    const content = document.querySelector('.content')
    content.textContent = ''
}

button.addEventListener('click', data)
items.forEach(item => {
    item.addEventListener('click', option)
});