import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Error extends React.Component {
    state = {
        redirect: null
    }

    handleClick = () => {
        this.setState({ redirect: 'home' })
    }

    renderRedirect = () => {
        if (this.state.redirect === 'home') {
            return <Redirect to='/'/>
        }
    }

    render() {
        return (
            <>
                {this.renderRedirect()}
                <div className='body result'>
                    <br /><br />
                    <h1 className='sorry'>Sorry, no matches!</h1>
                    <svg className='svg' id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.2 590.79">
                        <title>food-s-line-wine</title>
                        <g>
                            <path className=" FYLEWBOQ_0 cls-1 " points="97.52 2.5 45.68 2.5 52.46 62.37 90.75 62.37 97.52 2.5" d="M0,0A0,0 0,1,1 0,0A0,0 0,1,1 0,0"></path>
                            <g>
                                <path className=" FYLEWBOQ_1 cls-1 " d="M56.58,93.25h-10a8.59,8.59,0,1,1,0-17.17h70.72a8.59,8.59,0,0,1,0,17.17H107.24" transform="translate(-10.36 -5.13)"></path>
                                <path className=" FYLEWBOQ_2 cls-1 " d="M53.59,90.8V195.54a69,69,0,0,0-40.73,62.94V593.42h138.2V258.48a69,69,0,0,0-40.68-62.92V90.8" transform="translate(-10.36 -5.13)"></path>
                            </g>
                            <path className=" FYLEWBOQ_3 cls-1 " d="M138.42,292.16v-28a68.85,68.85,0,0,0-26.09-54" transform="translate(-10.36 -5.13)"></path>
                            <path className=" FYLEWBOQ_4 cls-1 " x1="128.06" y1="577.71" x2="128.06" y2="482.9" d="M128.06,577.71L128.06,482.9"></path>
                        </g>
                        <path className=" FYLEWBOQ_5 cls-1 " x1="2.5" y1="291.64" x2="140.7" y2="291.64" d="M2.5,291.64L140.7,291.64"></path>
                        <path className=" FYLEWBOQ_6 cls-1 " x1="2.5" y1="475.54" x2="140.7" y2="475.54" d="M2.5,475.54L140.7,475.54"></path>
                    </svg>
                    <br/><br/>
                    <button className='retry' onClick={this.handleClick}>Try Again</button>

                </div>
            </>
        )
    }
}