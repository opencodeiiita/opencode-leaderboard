import React from "react"
import axios from "axios"

import Header from "../components/Header"

class Leaderboard extends React.Component {

    state = {
        gotData: false,
        data: []
    }

    componentDidMount() {
        axios.get("https://opencode-leaderboard.herokuapp.com/users/leaderboard").then(data => {
            this.setState({gotData: true, data: data.data})
        })
    }

    render() {
        return (
            <div>
                <Header />

                <h4 className="title has-text-centered is-5" id="note">Note: To see yourself on the leaderboard, you first need to register yourself. See the Register Option in Navbar</h4>
                {!this.state.gotData ? <p className="title has-text-centered is-5">Loading....</p> : 
                    <div id="leaderboard_table">
                        <h3 className="title">Leaderboard</h3>
                        <table className="table is-fullwidth is-hoverable is-bordered" >
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>User Name</th>
                                    <th>Points Scored</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e:any, index) => (
                                    <tr key={e.user_id}>
                                        <td>{index+1}</td>
                                        <td>{e.user_name}</td>
                                        <td>{e.total_points_approved}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default Leaderboard