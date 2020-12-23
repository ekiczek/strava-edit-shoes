import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.strava.com/api/v3/'; // the prefix of the URL

export default class EditDevice extends Component {

    constructor(props) {
        super(props);

        this.onChangeGearID = this.onChangeGearID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            gear_id: '',
            start_date: ''
        }
    }

    componentDidMount() {
        var access_token = new URLSearchParams(this.props.location.search).get("access_token")
        axios.get('/activities/'+this.props.match.params.id, {
            headers: {
                'authorization': 'Bearer ' + access_token
              }
            })
            .then(response => {
                this.setState({
                    name: response.data.name,
                    gear_id: response.data.gear_id,
                    start_date: response.data.start_date
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    onChangeGearID(e) {
        this.setState({
            gear_id: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            gear_id: this.state.gear_id,
            start_date: this.state.start_date
        }

        var access_token = new URLSearchParams(this.props.location.search).get("access_token")
        axios.put('/activities/'+this.props.match.params.id, obj, {
            headers: {
                'authorization': 'Bearer ' + access_token
              }
            })
            .then(res => console.log(res.data));

        this.props.history.push('/?access_token='+access_token);
    }

    render() {
        return (
            <div>
                <h3>Update Activity</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.name}
                                readOnly
                                />
                    </div>
                    <div className="form-group">
                        <label>Gear ID:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.gear_id}
                                onChange={this.onChangeGearID}
                                />
                    </div>
                    <div className="form-group">
                        <label>Last Contact:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.start_date}
                                readOnly
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <input type="submit" value="Save Activity" className="btn btn-primary" />

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
