import React from 'react'
import { Redirect } from 'react-router-dom'
import Carousel from 'nuka-carousel'

import { getDish, getRec } from '../api'

export default class getDishes extends React.Component {
    state = {
        wine: this.props.location.state.wine,
        dishes: this.props.location.state.dishes,
        options: null,
        redirect: ''
    }

    capitalise = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    capitaliseArray = (arr) => {
        let transformed = arr.map(word => this.capitalise(word))
        return transformed.join(' ')
    }

    handleChange = (event) => {
        this.setState({ wine: event.target.value })
    }

    handleSubmit = () => {
        getDish(this.state.wine)
            .then(dishes => this.setState({ wine: '', dishes }))
    }

    componentDidMount = () => {
        getRec(this.state.wine)
            .then(options => {
                if (options.totalFound !== 0) {
                   return this.setState({ options })
                }
            })
    }

    handleHome = () => this.setState({ redirect: 'home' })

    firstThreeSentences = string => {
        let splitString = string.split('.')
        let newString = [splitString[0], splitString[1]]
        return newString.join('.')
    }

    renderRedirect = () => {
        return this.state.redirect && (
            <Redirect push to='/wineHome' />
        )
    }

    render() {
        const { wine, dishes, options } = this.state
        return (
            <>
                {this.renderRedirect()}
                <>
                    <div className='body result'>
                        <div>
                            <h2>{this.capitaliseArray(wine.split(' '))}</h2>
                        </div>
                        <div className='container'>
                            <div className='wine-left'>
                                <ol>
                                    <li key={'a'}>{this.capitaliseArray(dishes.pairings[0].split(' '))}</li>
                                    <li key={'b'}>{this.capitaliseArray(dishes.pairings[1].split(' '))}</li>
                                    <li key={'c'}>{this.capitaliseArray(dishes.pairings[2].split(' '))}</li>
                                    <li key={'d'}>{this.capitaliseArray(dishes.pairings[3].split(' '))}</li>                                    
                                </ol>
                            </div>
                            <div className='wine-right'>
                                <br/><br/>
                                <p>{dishes.text}</p>
                            </div>
                        </div>

                        {options && (
                            <>
                                <div>
                                    <h2 className='carousel-title'>Our Top Picks for {this.capitalise(wine)}</h2>
                                </div>
                                <Carousel wrapAround={true}>
                                    <div className='slide'>
                                        <div className='inner-slide'>
                                            <div>
                                                <h3 className='text'>{options.recommendedWines[0].title}</h3>
                                                </div>
                                                <div className='container'>
                                                <div className='left-rec'>
                                                <p className='description'>{this.firstThreeSentences(options.recommendedWines[0].description)}.</p>
                                            </div>
                                            <div className='right-rec'>
                                                <img className='thumb' src={options.recommendedWines[0].imageUrl} />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide'>
                                        <div className='inner-slide'>
                                            <div>
                                                <h3 className='text'>{options.recommendedWines[1].title}</h3>
                                                </div>
                                                <div className='container'>
                                                <div className='left-rec'>
                                                <p className='description'>{this.firstThreeSentences(options.recommendedWines[1].description)}.</p>
                                            </div>
                                            <div className='right-rec'>
                                                <img className='thumb' src={options.recommendedWines[1].imageUrl} />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide'>
                                        <div className='inner-slide'>
                                            <div>
                                                <h3 className='text'>{options.recommendedWines[2].title}</h3>
                                                </div>
                                                <div className='container'>
                                                <div className='left-rec'>
                                                <p className='description'>{this.firstThreeSentences(options.recommendedWines[2].description)}.</p>
                                            </div>
                                            <div className='right-rec'>
                                                <img className='thumb' src={options.recommendedWines[2].imageUrl} />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel>
                            </>
                        )}
                        <button className='go nav' onClick={this.handleHome}>Get Another Match</button>
                    </div>
                </>
            </>
        )
    }
}
