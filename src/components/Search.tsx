import React from "react"
import axios from "axios"

import Header from "./Header"

interface State {
    username: String,
    data: {
        data: any,
        total_score: Number
    },
    gotData: Boolean,
    error: String
}
class Search extends React.Component<any, State> {

    state = {
        username: '',
        data: {
            data: [],
            total_score: 0
        },
        gotData: false,
        error: ''
    }

    handleEnter = (e:any) => {
        if(e.key === "Enter") {
            axios.get(`https://opencode-leaderboard.herokuapp.com/points/data/${this.state.username}`).then(data => {
                this.setState({data: data.data, gotData: true, username: ""})
            }).catch(err => {
                this.setState({error: "Some Error Occured. Try again later", username: ''})
            })
        }
    }

    handleChange = (e: any) => {
        this.setState({username: e.target.value, error: '', gotData: false})
    }

    render() {
        return (
            <div>
                <Header />
                <section id="search">
                    <h3 className="title">Search Username</h3>
                    <div className="field is-horizontal">
                        <div className="control has-icons-right field-label ">
                            <span className="icon is-small is-right">
                                <img src={require("../assets/search.png")} alt=""/>
                            </span>
                            <input 
                                type="text" 
                                className="input"
                                onKeyPress={this.handleEnter}
                                onChange={this.handleChange}
                                value={this.state.username}
                                name="username"
                                placeholder="Enter your Username"
                            />
                        </div>
                    </div>

                    {!this.state.gotData ? undefined :
                        <div>
                            <h2 className="title">Total Score: {this.state.data.total_score}</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Project Link</th>
                                        <th>Issue Link</th>
                                        <th>PR Link</th>
                                        <th>Approved Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {console.log(this.state.data.data)}
                                    {
                                        this.state.data.data.map((e:any) => (
                                            <tr key={e._id}>
                                                <td> {e.user_name} </td>
                                                <td> <a href={e.project_link}> <img src={require("../assets/link.png")} alt=""/> Link </a> </td>
                                                <td> <a href={e.issue_link}> <img src={require("../assets/link.png")} alt=""/> Link </a> </td>
                                                <td> {e.pr_link === "" ? "--" : <a href={e.pr_link}> <img src={require("../assets/link.png")} alt=""/>Link </a>} </td>
                                                <td> {e.approved_by_mentor ? "Approved": "Pending"} </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Search