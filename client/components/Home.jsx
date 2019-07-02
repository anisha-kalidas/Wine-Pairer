import React from 'react'
import { Redirect } from 'react-router-dom'
import { getWine, getDish } from '../api'

export default class Home extends React.Component {

    state = {
        food: null,
        wines: null,
        wine: null,
        dishes: null,
        redirect: null
    }

    handleChange = (event) => {
        this.setState({ food: event.target.value })
    }

    handleSubmit = () => {
        getWine(this.state.food)
            .then(wines => this.setState({ wines }))
            .then(() => this.setState({ redirect: 'getWine' }))
    }

    handleClick = () => this.setState({ redirect: 'food' })

    handleChangeWine = (event) => {
        this.setState({ wine: event.target.value })
    }

    handleSubmitWine = () => {
        getDish(this.state.wine)
            .then(dishes => this.setState({ dishes }))
            .then(() => this.setState({ redirect: 'getFood' }))
    }


    renderRedirect = () => {
        if (this.state.redirect === 'getWine') {
            return <Redirect to={{ pathname: '/wines', state: this.state }} />
        } else if (this.state.redirect === 'getFood') {
            return <Redirect to={{ pathname: '/dishes', state: this.state }} />
        }
    }

    render() {
        return (
            <div className='landing'>
                <div id='card-a'>
                    {this.renderRedirect()}
                    <h1>What's on your Menu?</h1>
                    <input className='input' placeholder="Enter food or cuisine, eg. Pizza, Mexican" onChange={this.handleChange} />
                    <button className='go' onClick={this.handleSubmit}>Wine Me Up!</button>
                    <br /><br /><br />
                </div>
                <div id='or'>
                </div>
                <div id='card-b'>
                    <h1>What's on your Wine List?</h1>
                    <input className='input' placeholder='Enter wine, eg. Merlot' onChange={this.handleChangeWine} />
                    <button className='go' onClick={this.handleSubmitWine}>Bring Me The Menu!</button>
                    <br /><br /><br />
                </div>
            </div>

        )
    }

}