import React, { Component } from 'react';

var strava = require('strava-v3')
var config = require('../config');

export default class AuthorizationRedirect extends Component {
    oAuthRedirect() {
        strava.config({
            "client_id"     : config.strava.client_id,
            "client_secret" : config.strava.client_secret,
            "redirect_uri"  : config.strava.redirect_uri
      });
        strava.oauth.getToken(new URLSearchParams(this.props.location.search).get("code"), function(err, payload) {
            console.log(payload.body.access_token);
            var url = '/?access_token=' + payload.body.access_token;
            return window.location.href = url;
        });
    }

    render() {
        return (
            <div>
                { this.oAuthRedirect() }
            </div>
        )
    }
}
