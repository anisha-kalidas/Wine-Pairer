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
            .then(options => this.setState({ options }))
    }

    handleHome = () => this.setState({ redirect: 'home' })

    renderRedirect = () => {
        return this.state.redirect && (
            <Redirect to='/' />
        )
    }

    render() {
        const { wine, dishes, options } = this.state
        return (
            <>
                {this.renderRedirect()}
                <>
                    <div>
                        <h2>{this.capitaliseArray(wine.split(' '))}</h2>
                        <p>{dishes.text}</p>
                    </div>

                    <div>
                        <p>The dishes that work well with {this.capitaliseArray(wine.split(' '))} are:</p>
                        <ol>
                            {dishes.pairings.map(x => <li key={x}>{this.capitaliseArray(x.split(' '))}</li>)}
                        </ol>
                    </div>
                </>

                {options && (

                    <>
                        <div>
                            <h2 className='carousel-title'>Our Top Picks for {this.capitalise(wine)}</h2>
                        </div>
                        <Carousel wrapAround={true}>
                            <div className='slide'>
                                <br/><br/>
                                <div className='inner container'>
                                    <div>
                                    <h3 className='text'>{options.recommendedWines[0].title}</h3>
                                    <p className='description'>{options.recommendedWines[0].description}</p>
                                    </div>
                                    <div>
                                    <img src={options.recommendedWines[0].imageUrl} />
                                    </div>
                                </div>
                            </div>
                            <div className='slide'>
                            <br/><br/>
                                <div className='inner container'>
                                    <div>
                                    <h3 className='text'>{options.recommendedWines[1].title}</h3>
                                    <p className='description'>{options.recommendedWines[1].description}</p>
                                    </div>
                                    <div>
                                    <img src={options.recommendedWines[1].imageUrl} />
                                    </div>
                                </div>
                            </div>
                            <div className='slide'>
                            <br/><br/>
                                <div className='inner container'>
                                    <div>
                                        <h3 className='text'>{options.recommendedWines[2].title}</h3>
                                        <p className='description'>{options.recommendedWines[2].description}</p>
                                    </div>
                                    <div>
                                        <img src={options.recommendedWines[2].imageUrl} />
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </>
                )}
                <button onClick={this.handleHome}>Match another wine!</button>
            </>
        )
    }
}