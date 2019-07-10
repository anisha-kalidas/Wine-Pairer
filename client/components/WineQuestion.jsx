import React from 'react'
import { Redirect } from 'react-router-dom'
import { getDish } from '../api'

export default class GetWine extends React.Component {
    state = {
        wine: null,
        dishes: {},
        redirect: null
    }

    handleChange = e => this.setState({ wine: e.target.value })

    handleSubmit = () => {
        getDish(this.state.wine)
            .then(dishes => this.setState({ dishes }))
            .then(() => this.setState({ redirect: 'getDishes' }))
            .catch(err => {
                if (err) this.setState({redirect: 'failure'})
            })
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            getDish(this.state.wine)
            .then(dishes => this.setState({ dishes }))
            .then(() => this.setState({ redirect: 'getDishes' }))
            .catch(err => {
                if (err) this.setState({redirect: 'failure'})
            })
        }
    }

    changeQuestion = () => this.setState({redirect: 'changeQuestion'})

    renderRedirect = () => {
        if (this.state.redirect === 'failure') {
            return <Redirect push to='/notFound' />
        } else if (this.state.redirect === 'getDishes') {
            return <Redirect push to={{ pathname: '/dishes', state: this.state }} />
        } else if (this.state.redirect === 'changeQuestion') {
            return <Redirect push to={{ pathname: '/', state: this.state }} />
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
                    <h1>What's in your Cellar?</h1>
                    <input className='input' placeholder='Enter wine, eg. Merlot' onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <button className='go' onClick={this.handleSubmit}>Match it!</button>
                    <br /><br /><br />
                </div>
                <div>
                    <button className='home' onClick={this.changeQuestion}>Get Wine Pairings</button>
                </div>
            </div>
        )
    }
}