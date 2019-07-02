import React from 'react'
import { Redirect } from 'react-router-dom'

import { getRec } from '../api'

export default class Home extends React.Component {
    state = {
        food: this.props.location.state.food,
        wines: this.props.location.state.wines,
        wine: null,
        redirect: null,
        options: null
    }

    capitalise = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    capitaliseArray = (arr) => {
        let transformed = arr.map(word => this.capitalise(word))
        return transformed.join(' ')
    }

    removeLastSentence = (string) => {
        let splitString = string.split('. ')
        splitString.pop()
        return splitString.join('. ')
    }

    handleClick = () => {
        this.setState({ redirect: 'home' })
    }

    handleLink = (e) => {
        const wine = e.target.id
        getRec(wine)
            .then(options => this.setState({ options, redirect: 'getWine', wine }))
    }

    renderRedirect = () => {
        if (this.state.redirect === 'home') {
            return <Redirect to={{ pathname: '/', state: { food: '', wines: null, redirect: false } }} />
        } else if (this.state.redirect === 'getWine') {
            return <Redirect to={{ pathname: '/getWine', state: { options: this.state.options, wine: this.state.wine, food: this.state.food, wines: this.state.wines } }} />
        }
    }

    render() {
        return (
            <>
                {this.renderRedirect()}
                {this.state.wines && (
                    <>
                        <div>
                            <h2>Your wine matches for {this.capitalise(this.state.food)}</h2>
                            <ol>
                                {this.state.wines.pairedWines.map(wine => {
                                    return <li key={wine}>
                                            <a href='localhost:3000/wines' onClick={this.handleLink} id={wine}>
                                                {this.capitaliseArray(wine.split(' '))}
                                            </a>
                                           </li>
                                })
                                }
                            </ol>
                        </div>

                        <div>
                            <p>{this.removeLastSentence(this.state.wines.pairingText) + '.'}</p>
                        </div>

                        <div>
                            <h2>Our Recommendation</h2>
                            <h3>{this.state.wines.productMatches[0].title}</h3>
                            <img src={this.state.wines.productMatches[0].imageUrl} />
                            <p>{this.state.wines.productMatches[0].description}</p>
                        </div>
                        <br /><br /><br />
                        <button onClick={this.handleClick}>Get another match!</button>
                        <br /><br />
                        <div>
                        </div>

                    </>
                )}
            </>
        )
    }
}