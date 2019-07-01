import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Home extends React.Component {
    state = {
        food: this.props.location.state.food,
        wines: this.props.location.state.wines,
        redirect: false
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
        this.setState({redirect: true})
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{pathname: '/', state: {food: '', wines: null, redirect: false}}} />
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
                <br/><br/><br/>
                <button onClick={this.handleClick}>Get another match!</button>
                <br/><br/>
                <div>
            </div>

                </>
            )}
        </>
    )}
}