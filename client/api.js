import request from 'superagent'

const winePair = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?maxPrice=50&food='

export function getWine (food) {
    const searchTerm = food.split(' ').join('+')
    return request.get(winePair + searchTerm)
    .set('X-RapidAPI-Key', '346fa7c002msh97d65e27ce9d193p147455jsn1c331c693727')
    .then(res => {return res.body})
}