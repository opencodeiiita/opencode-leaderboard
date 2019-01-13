import React from "react"
import axios from "axios"

import Header from "./Header"
class UserList extends React.Component {

    state = {
        gotdata: false,
        data: []
    }

    componentDidMount() {
        axios.get("https://opencode-leaderboard.herokuapp.com/users/").then(data => {
            this.setState({data: data.data, gotdata: true})
        })
    }

    render() {
        return (
            <div>
                <Header />

                <div id="userlist">
                    <h2 className="title has-text-centered is-4">List of Users Registered on Leaderboard</h2>
                    {!this.state.gotdata ? <h3 className="title has-text-centered is-3">Loading....</h3> :
                        <table className="table is-narrow is-hoverable" id="userlist_display">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((item:any) => (
                                    <tr>
                                        <th key={item._id} className="has-text-centered">{item.user_name}</th>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    }
                </div>
            </div>
        )
    }
}

export default UserList