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

    capitalise = word => word.charAt(0).toUpperCase() + word.slice(1)

    capitaliseArray = (arr) => {
        let transformed = arr.map(word => this.capitalise(word))
        return transformed.join(' ')
    }

    removeLastSentence = (string) => {
        let splitString = string.split('. ')
        splitString.pop()
        splitString.pop()
        return splitString.join('. ')
    }

    handleClick = () => this.setState({ redirect: 'home' })

    handleLink = (e) => {
        const wine = e.target.id
        getRec(wine)
            .then(options => this.setState({ options, redirect: 'getWine', wine }))
    }

    renderRedirect = () => {
        if (this.state.redirect === 'home') {
            return <Redirect push to={{ pathname: '/', state: { food: '', wines: null, redirect: false } }} />
        } else if (this.state.redirect === 'getWine') {
            return <Redirect push to={{ pathname: '/getWine', state: { options: this.state.options, wine: this.state.wine, food: this.state.food, wines: this.state.wines } }} />
        } 
    }

    firstThreeSentences = string => {
        let splitString = string.split('.')
        let newString = [splitString[0], splitString[1], splitString[2]]
        return newString.join('.')
    }

    render() {
        return (
            <>
                {this.renderRedirect()}
                {this.state.wines && (
                    <>
                        <div className='body result'>
                                <h2>Your Wine Matches for {this.capitalise(this.state.food)}</h2>
                                <div className='container'>
                                    <div className='left'>
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

                                    <div className='right'>
                                        <p>{this.removeLastSentence(this.state.wines.pairingText) + '.'}</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className='carousel-title'>Our Recommendation</h2>
                                    <div className='inner container'>
                                        <div>
                                            <h3>{this.state.wines.productMatches[0].title}</h3>
                                            <p className='add-space-above'>{this.firstThreeSentences(this.state.wines.productMatches[0].description)}.</p>
                                        </div>
                                        <div>
                                            <img className='thumb' src={this.state.wines.productMatches[0].imageUrl} />
                                        </div>
                                    </div>
                                </div>

                                <button onClick={this.handleClick} className='go nav'>Get another match</button>

                            </div>
                    </>
                        )}
            </>
                )
                }
                }