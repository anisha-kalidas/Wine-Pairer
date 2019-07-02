import React from 'react'
import { Redirect } from 'react-router-dom'
import Carousel from 'nuka-carousel'

export default class getWine extends React.Component {
    state = {
        wine: this.props.location.state.wine,
        options: this.props.location.state.options,
        food: this.props.location.state.food,
        wines: this.props.location.state.wines,
        redirect: false
    }

    capitalise = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    handleClick = () => {
        this.setState({ redirect: true })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/wines', state: { food: this.state.food, wines: this.state.wines } }} />
        }
    }

    render() {
        const { wine, options } = this.state
        return (
            <>
                {this.renderRedirect()}
                {options && (
                    <>
                        <div>
                            <h2>Our top picks for {this.capitalise(wine)}</h2>
                        </div>
                        <Carousel wrapAround={true}>
                            <div className='slide'>
                                <br /><br />
                                <div className='inner container'>
                                    <div>
                                        <h3>{options.recommendedWines[0].title}</h3>
                                        <p>{options.recommendedWines[0].description}</p>
                                    </div>
                                    <div>
                                        <img src={options.recommendedWines[0].imageUrl} />
                                    </div>
                                </div>
                            </div>
                            <div className='slide'>
                                <br /><br />
                                <div className='inner container'>
                                    <div>
                                        <h3>{options.recommendedWines[1].title}</h3>
                                        <p>{options.recommendedWines[1].description}</p>
                                    </div>
                                    <div>
                                        <img src={options.recommendedWines[1].imageUrl} />
                                    </div>
                                </div>
                            </div>
                            <div className='slide'>
                                <br /><br />
                                <div className='inner container'>
                                    <div>
                                        <h3>{options.recommendedWines[2].title}</h3>
                                        <p>{options.recommendedWines[2].description}</p>
                                    </div>
                                    <div>
                                        <img src={options.recommendedWines[2].imageUrl} />
                                    </div>
                                </div>
                            </div>
                        </Carousel> 
                    </>
                )}
                <button onClick={this.handleClick}>Back</button>
            </>
        )
    }
}