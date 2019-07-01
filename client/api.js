import request from 'superagent'

const winePair = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?maxPrice=50&food='
const dishPair = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/dishes?wine='
const wineRec = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation?maxPrice=50&minRating=0.7&number=3&wine='

export function getWine (food) {
    const searchTerm = food.split(' ').join('+')
    return request.get(winePair + searchTerm)
    .set('X-RapidAPI-Key', '346fa7c002msh97d65e27ce9d193p147455jsn1c331c693727')
    .then(res => {return res.body})
}

export function getDish (wine) {
    const searchTerm = wine.split(' ').join('+')
    return request.get(dishPair + searchTerm)
    .set('X-RapidAPI-Key', '346fa7c002msh97d65e27ce9d193p147455jsn1c331c693727')
    .then(res => {return res.body})
}

export function getRec (wine) {
    const searchTerm = wine.split(' ').join('+')
    return request.get(wineRec + searchTerm)
    .set('X-RapidAPI-Key', '346fa7c002msh97d65e27ce9d193p147455jsn1c331c693727')
    .then(res => {return res.body})
}