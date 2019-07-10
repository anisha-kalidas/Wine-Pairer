import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import GetDishes from './GetDishes'
import GetWines from './GetWines'
import GetWine from './GetWine'
import WineQuestion from './WineQuestion'
import ErrorPage from './ErrorPage'

const App = () => {
  return (
    <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/wines" component={GetWines} />
      <Route path="/dishes" component={GetDishes} />
      <Route path="/getWine" component={GetWine} />
      <Route path="/wineHome" component={WineQuestion} />
      <Route path="/notFound" component={ErrorPage} />
    </Switch>
    </>
    )
  }
export default App