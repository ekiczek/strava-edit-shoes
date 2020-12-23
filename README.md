# strava-edit-shoes-poc
Client-only proof-of-concept React app using the Strava API to edit shoes on activities.

## Why?
I use Strava to track my exercise, including runs and walks. I like the Strava feature that tracks your shoe usage. It tracks the shoe miles logged and will remind you when you approach the  lifetime miles limit so that you can replace them.

 Not surprisingly, I use running shoes for the runs and walking shoes for the walks. Strava, however, uses the same pair of shoes for both running and walking by default. Seems silly to me, but whatev.

You can use the UI to change shoes for each workout, but without getting into too much detail... it's annoying. One day I was so annoyed, I decided to learn about the Strava API and build a simple React app to let me edit shoes in an easy-to-use table format.

I just fire up the dev container in VSCode, run npm start, browse to the app, login to Strava, and edit my activities.

*Overkill?* Of course!

*Did I learn something?* Yeah. So that's cool.

## Instructions for use
NOTE: You must have Docker, Visual Studio Code and the VSCode Remote Containers extension installed in order for these instructions to work. For info about how to install these, see https://code.visualstudio.com/docs/remote/containers.
1. Clone this repo.
1. In VSCode, open the repo in a container.
1. Follow the steps at https://developers.strava.com/docs/getting-started/ under "B. How to Create an account". In this process, note your Client ID and Client Secret.
1. Copy `src/components/config.js.orig` to `src/components/config.js`. In `src/components/config.js`, enter your `config.strava.client_id` and `config.strava.client_secret` values. For `config.strava.redirect_uri`, enter `localhost`. Save the file.
1. In the VSCode terminal, type `npm install`. This will install the node modules.
1. In the VSCode terminal, type `npm start` to start the app.
1. Browse to http://localhost:3000. You should be re-directed to Strava.
1. Login to Strava if asked.
1. You may need to authorize your app. Select all of the checkboxes and click "Authorize".
1. You should be re-directed to the app.
1. Edit the gear for any entry by clicking the Edit link, editing the gear ID, and clicking the Save button.

## References
* https://www.npmjs.com/package/strava-v3
* https://developers.strava.com/docs/getting-started/
* https://developers.strava.com/playground/
