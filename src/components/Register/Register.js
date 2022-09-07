/* eslint-disable react/prop-types */
import React, { Component } from "react";
import 'tachyons';

const API_BASE_URL = process.env.API_BASE_URL

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }
    onSubmitRegistration = () => {
        console.log(this.state)
        let { registerName, registerEmail, registerPassword } = this.state

        if (!registerName || !registerEmail || !registerPassword) {
            return alert("Missing information - please complete all fields")
        }

        if (registerPassword.length < 8) {
            return alert("Passwords must be 8 or more characters")
        }
        fetch(`${API_BASE_URL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            console.log("Registration response data -", user)
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            } else {
                return alert(user)
            }
        })
    }

    render() {
        const { onRouteChange } = this.props.onRouteChange
        return (
            <main className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <article className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                        onChange={this.onNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="name"  id="name" />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange={this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        onChange={this.onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="">
                <input 
                    onClick={() => this.onSubmitRegistration()}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Register" />
                </div>
                <div className="lh-copy mt3" >
                <p onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign In</p>
                </div>
            </div>
            </article>
            </main>
            )
        }
}

export default Register;
