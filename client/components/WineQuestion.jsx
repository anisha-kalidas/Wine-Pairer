import React from 'react'
import { Redirect } from 'react-router-dom'

import { getDish } from '../api'

export default class WineQuestion extends React.Component {
    state = {
        wine: '',
        dishes: null,
        redirect: ''
    }

    handleChange = (event) => {
        this.setState({ wine: event.target.value })
    }

    handleSubmit = () => {
        getDish(this.state.wine)
            .then(dishes => this.setState({ dishes }))
            .then(() => this.setState({ redirect: 'getFood' }))
    }

    handleClick = () => this.setState({ redirect: 'home' })

    renderRedirect = () => {
        if (this.state.redirect === 'getFood') {
            return <Redirect to={{ pathname: '/dishes', state: this.state }} />
        } else if (this.state.redirect === 'home') {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                What's on your wine list?
                <input type="text" value={this.state.wine} onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Bring me the menu!</button>
                <button onClick={this.handleClick}>Click here to find a wine for your dish!</button>
            </div>
        )
    }
}

