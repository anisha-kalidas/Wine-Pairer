import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import GetDishes from './GetDishes'
import GetWines from './GetWines'
import GetWine from './GetWine'
import WineQuestion from './WineQuestion'

const App = () => {
  return (
    <>
      <Route path="/Wine-Me-Up" exact component={Home} />
      <Route path="/wines" component={GetWines} />
      <Route path="/dishes" component={GetDishes} />
      <Route path="/getWine" component={GetWine} />
      <Route path="/wineHome" component={WineQuestion} />
    </>
    )
  }
export default App