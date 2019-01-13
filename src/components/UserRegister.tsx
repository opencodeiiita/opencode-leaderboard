import React from "react"
import axios from "axios"

import Header from "./Header"

class UserRegister extends React.Component {

    state = {
        username: '',
        error: ''
    }

    handleSubmit = (e:any) => {
        if(this.state.username.trim() === "") {
            this.setState({error: "Please enter a username"})
        } else {
            axios.post("https://opencode-leaderboard.herokuapp.com/users", {
                user_name: this.state.username
            })
            .then(data => {
                window.location.href = "/"
            }).catch(err => {
                this.setState({error: "Couldn't create user or user already present"})
            })
        }
    }

    handleChange = (e: any) => {
        this.setState({username: e.target.value, error: ''})
    }

    render() {
        return (
            <div>
                <Header />
                <section id="user_register">
                    <h3 className="title">Register Yourself as a Participant</h3>
                    <div className="field">
                        <label className="label">Username</label>
                        <input 
                            type="text" 
                            className="input"
                            placeholder="Enter your GitHub Username to register"
                            value={this.state.username}
                            onChange={this.handleChange}
                            name="username"
                        />
                    </div>

                    {this.state.error === "" ? undefined : <p className="help is-danger">{this.state.error}</p> }
                
                    <div className="field">
                        <button onClick={this.handleSubmit} className="button is-primary is-fullwidth">Register</button>
                    </div>
                </section>
            </div>
        )
    }
}

export default UserRegister