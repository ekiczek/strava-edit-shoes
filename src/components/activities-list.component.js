import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var strava = require('strava-v3')
var config = require('../config');

axios.defaults.baseURL = 'https://www.strava.com/api/v3/'; // the prefix of the URL

const Activity = props => (
    <tr>
        <td>{props.activity.name}</td>
        <td>{props.activity.gear_id}</td>
        <td>{props.activity.start_date}</td>
        <td>
            <Link to={"/edit/"+props.activity.id+"?access_token="+props.activity.access_token}>Edit</Link>
        </td>
    </tr>
)

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {activities: []};
    }

    componentDidMount() {
        var access_token = new URLSearchParams(this.props.location.search).get("access_token")
        axios.get('/athlete/activities', {
            headers: {
                'authorization': 'Bearer ' + access_token
              }
            })
            .then(response => {
                console.log(response.data);
                this.setState({activities: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    activityList() {
        var access_token = new URLSearchParams(this.props.location.search).get("access_token")
        return this.state.activities.map(function(currentActivity, i) {
            currentActivity["access_token"] = access_token;
            return <Activity activity={currentActivity} key={i} />;
        })
    }

    oAuthRedirect() {
        if (!(new URLSearchParams(this.props.location.search).has("access_token"))) {
            strava.config({
                "client_id"     : config.strava.client_id,
                "client_secret" : config.strava.client_secret,
                "redirect_uri"  : config.strava.redirect_uri
              });
              
            // Generates the url to have full access
            var url = strava.oauth.getRequestAccessURL({
                scope:"profile:read_all,activity:read_all,activity:write"
            });
            // We have to grab the code manually in the browser and then copy/paste it into strava_config as "access_token"
            // console.log('Connect to the following url and copy the code: ' + url);
            return window.location.href = url;   
        }   
    }
    render() {
        return (
            <div>
                <h3>Activity List</h3>
                <table className="table table-striped" style={{marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gear ID</th>
                            <th>Start Date</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.activityList() }
                        { this.oAuthRedirect() }
                    </tbody>
                </table>
            </div>
        )
    }
}
