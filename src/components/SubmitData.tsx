import React from "react"
import axios from "axios"

import Header from "./Header"

interface State {
    user_name: string,
    project_link: string,
    issue_link: string,
    pr_link: string,
    reference_link: string,
    points: Number | string,
    error: string,
    loading: Boolean
}

class SubmitData extends React.Component<any, State> {

    state = {
        user_name: '',
        project_link: '',
        issue_link: '',
        pr_link: '',
        reference_link: '',
        points: '',
        error: '',
        loading: false
    }

    handleSubmit = (e:any) => {
        e.preventDefault()
        const points_array = [10, 20, 30, 50]

        if( points_array.includes(Number(this.state.points)) ) {
            const user_data = {
                user_name: this.state.user_name[0],
                project_link: this.state.project_link[0],
                issue_link: this.state.issue_link[0],
                pr_link: this.state.pr_link[0] || '',
                reference_link: this.state.reference_link[0] || '',
                points: this.state.points
            }

            this.setState({loading: true})
            axios.post("https://opencode-leaderboard.herokuapp.com/points/new", user_data)
            .then(data => {
                this.setState({
                    user_name: '',
                    project_link: '',
                    issue_link: '',
                    pr_link: '',
                    reference_link: '',
                    points: ''
                })

                this.setState({loading: false})
                window.location.href = "/"
                
            }).catch(err => {
                this.setState({error: "Except PR Link field, all fields are mandatory"})
            })
        } else {
            this.setState({error: "Invalid Points Value. Enter 10, 20, 30 or 50"})
        }
        

    }

    handleChange = (e: any) => {
        this.setState({error: ''})
        this.setState({
            [e.target.name]: [e.target.value]
        } as Pick<State, 'user_name' | 'project_link' | 'issue_link' | 'pr_link' | 'points'>)
    }

    handleChangeNumber = (e:any) => {
        this.setState({
            points: parseInt(e.target.value)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                    <section style={{width: "40%", margin: "0 auto"}}>
                        <h3 className="title">Submit your Points</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label className="label">Username</label>
                                <input type="text" 
                                    className="input" 
                                    name="user_name" 
                                    placeholder="Enter Username"
                                    onChange={this.handleChange} 
                                    value={this.state.user_name}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label className="label">Project Link</label>
                                <input type="text" 
                                    className="input" 
                                    placeholder="Enter Project Link"
                                    name="project_link" 
                                    onChange={this.handleChange} 
                                    value={this.state.project_link}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label className="label">Issue Link</label>
                                <input type="text" 
                                    className="input" 
                                    placeholder="Enter Issue Link"
                                    name="issue_link" 
                                    onChange={this.handleChange} 
                                    value={this.state.issue_link}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label className="label">PR Link</label>
                                <input type="text" 
                                    className="input" 
                                    name="pr_link" 
                                    placeholder="Enter PR Link"
                                    onChange={this.handleChange} 
                                    value={this.state.pr_link}
                                />
                            </div>

                            <div className="field">
                                <label className="label">Points</label>
                                <input type="number" 
                                    className="input" 
                                    name="points" 
                                    placeholder="Enter Points"
                                    onChange={this.handleChangeNumber} 
                                    value={this.state.points} 
                                    required
                                />
                            </div>

                            <div className="field">
                                <label className="label">Reference Link</label>
                                <input type="text" 
                                    className="input" 
                                    name="reference_link" 
                                    placeholder="Enter Reference Link"
                                    onChange={this.handleChange} 
                                    value={this.state.reference_link}
                                />
                            </div>

                            {this.state.error == "" ? undefined: <p className="help is-danger">{this.state.error}</p> }

                            <div className="field">
                                {!this.state.loading ? <button className="button is-fullwidth is-primary" onClick={this.handleSubmit}>Submit</button> : <button className="button is-fullwidth is-primary is-loading">Loading</button> }
                                
                            </div>
                            
                            <p className="help">
                                Note: Omit PR Link field if the issue was such that a PR was not made.(Ex. Staring a Repository).
                                    In refernce link you need to enter links of comments or blogs which are required in some issues.
                            </p>
                        </form>
                    </section>
            </React.Fragment>
        )
    }
}

export default SubmitData