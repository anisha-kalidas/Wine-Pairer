import React from 'react'
import { Redirect } from 'react-router-dom'
import { getWine } from '../api'

export default class Home extends React.Component {

    state = {
        food: '',
        wines: null,
        redirect: ''
    }

    handleChange = (event) => {
        this.setState({ food: event.target.value })
      }

    handleSubmit = () => {
        getWine(this.state.food)
            .then(wines => this.setState({wines}))
            .then(() => this.setState({redirect: 'wine'}))
    }

    handleClick = () => this.setState({redirect: 'food'})

    renderRedirect = () => {
        if (this.state.redirect === 'wine') {
          return <Redirect to={{pathname: '/wines', state: this.state}} />
        } else if (this.state.redirect === 'food') {
            return <Redirect to='/pairWine' />
        }
      }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                What's on your menu?
                <input type="text" value={this.state.food} onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Wine Me Up</button>
                <button onClick={this.handleClick}>Click here to find a dish for your wine!</button>
            </div>

        )
    }

}