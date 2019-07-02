import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import GetDishes from './GetDishes'
import GetWines from './GetWines'
import WineQuestion from './WineQuestion'
import GetWine from './GetWine'

const App = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/pairWine" component={WineQuestion} />
      <Route path="/wines" component={GetWines} />
      <Route path="/dishes" component={GetDishes}/>
      <Route path="/getWine" component={GetWine} />
    </>
  )
}
export default App