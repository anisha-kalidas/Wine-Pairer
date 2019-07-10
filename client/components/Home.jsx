import React from 'react'
import { Redirect } from 'react-router-dom'
import { getWine } from '../api'

export default class Home extends React.Component {
    state = {
        food: null,
        wines: {},
        redirect: null
    }

    componentWillUnmount() {
  
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

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            getWine(this.state.food)
                .then(wines => this.setState({ wines }))
                .then(() => this.setState({ redirect: 'getWine' }))
        }
    }

    changeQuestion = () => {
        this.setState({ redirect: 'changeQuestion' })
    }

    renderRedirect = () => {
        if (this.state.wines.status === 'failure') {
            return <Redirect push to='/notFound' />
        } else if (this.state.redirect === 'getWine') {
            return <Redirect push to={{ pathname: '/wines', state: this.state }} />
        } else if (this.state.redirect === 'changeQuestion') {
            return <Redirect push to={{ pathname: '/wineHome', state: this.state }} />
        }
    }

    render() {
        return (
            <div className='landing'>
                {this.renderRedirect()}
                <div className='name'>
                    <h3 className='title'>Wine Me Up.</h3>
                </div>
                <div className='card'>
                    <h1>What's on your Menu?</h1>
                    <input className='input' placeholder="Enter food or cuisine, eg. Pizza, Mexican" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                    <button className='go' onClick={this.handleSubmit}>Wine Me Up!</button>
                    <br /><br /><br />
                </div>
                <div>
                    <button className='home' onClick={this.changeQuestion}>Get Wine Recommendation</button>
                </div>
            </div>

        )
    }

}