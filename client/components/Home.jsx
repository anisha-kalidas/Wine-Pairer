import React from 'react'

import { getWine } from '../api'

export default class Home extends React.Component {
    state = {
        food: '',
        wines: null
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

    handleChange = (event) => {
        this.setState({ food: event.target.value })
      }

    handleSubmit = () => {
        getWine(this.state.food)
            .then(wines => this.setState({wines}))
    }

    render() {
        return (
        <>
            <div>
                What's on your menu?
                <input type="text" value={this.state.food} onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Wine Me Up</button>
            </div>

            {this.state.wines && (
                <>
                <div>
                    <ol>
                        {this.state.wines.pairedWines.map(x => <li key={x}>{this.capitaliseArray(x.split(' '))}</li>)}
                    </ol>
                </div>

                <div>
                    <p>{this.removeLastSentence(this.state.wines.pairingText) + '.'}</p>
                </div>

                <div>
                    <h2>Our Recommendation</h2>
                    <h3>{this.state.wines.productMatches[0].title}</h3>
                    <img src={this.state.wines.productMatches[0].imageUrl}/>
                    <p>{this.state.wines.productMatches[0].description}</p>
                </div>
                </>
            )}
        </>
    )}
}