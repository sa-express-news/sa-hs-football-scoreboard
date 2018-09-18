# What is this?

This is an app [deployed on MySanAntonio.com](https://www.mysanantonio.com/san-antonio-high-school-football-scoreboard/) that displays local high school football game scores and schedules for the current week during the season. It is built using VueJS and deployed with Webpack. 

If there are features you'd like to see added or bugs you'd like to see fixed, please [open an issue here](https://github.com/sa-express-news/sa-hs-football-scoreboard/issues).

# Development

## Getting started

 - Download the repo `git clone https://github.com/sa-express-news/sa-hs-football-scoreboard.git`

 - Run `npm install`

 - Run `npm run serve`

 - Cross your fingers and navigate to `http://localhost:8080/`

## App structure

The app was scaffolded using Vue-cli, which takes care of webpack configuration. This has been modified slightly via `vue.config.js`. We'll cover that later.

If you've never worked with Vue, it's a back-to-basics MVVM-ish framework and the documentation is great, [you can dig in here](https://vuejs.org/v2/guide/). The general standard is to create app components in `.vue` files that include all pieces of the architecture – css, template and js. In our case, our component styles feature the `lang=scss` tag that allows us to use the Sass preprocessor.

`public/index.html` is the static file into which the app will be injected, binding to `<div id="app"></div>`. During the build process, all CSS and JS will be concatenated and compressed into here.

`src/` is where the application files live. Lets look at it in-depth.

### `src/main.js`

Our app is initiated here, binding Vue to `#app` and instantiating the `src/components/Index/Index.vue` component.

### `src/components/Index/Index.vue`

Three things happen here:

 1. A new `Store` is instantiated, which adds two properties to the `data` object: `dispatch <Function>` for triggering store events and the app `state <Object>` object which, as of this writing, has only two properties: `isFetching <Boolean>` and `schedule <Array>` – an array of football game objects.
 2. The `getCurrentSeason` event is triggered via `this.dispatch` after the component mounts, this populates `state.schedule` with games.
 3. A `GameDay` component is instantiated for each game object in `state.schedule`.

Before digging into the `GameDay` component, lets investigate the `Store` class.

### `src/store.js`

The `Store` class manages the app state using a very basic [Flux-like](https://vuejs.org/v2/guide/state-management.html) architecture. Events are defined in the `actions/` directory and automatically bound to the `dispatch` method. The event responses are then passed to one of the reducers in the `reducers` directory which clone and parse them before the store adds them to the `state` object.

#### `actions/`

As of this writing, the app only calls one event, `this.dispatch('getCurrentSeason')`, which triggers the `getCurrentSeason` action found in `actions/index.js`. This action pings the newsengin.com endpoint found in `actions/endpoints.js`, which returns a json response with a `list` property. The `list` property is an array of high school football games for the current season in the San Antonio market. It includes each game played so far in the season plus the schedule of games for the next seven days.

#### `reducers/`

Action responses are then passed to the `reducers` function by the `Store`, which is defined in `reducers/index.js` and is just a switch statement that checks to see if the action `type` property can be associated with one of our reducers (if not, it just passes back the original response to the `Store`).

In the case of `getCurrentSeason`, our action passes the `RECIEVE_CURRENT_SEASON` type across, which is associated with the `parseGames` reducer defined in `reducers/utils.js`.

#### `reducers/utils.js`

`parseGames` does a lot of work and some tests should most definitely be written for it in the near future. In order, here's what it does:

 1. Each game is passed to `mapData` (`reducers/mapData.js`), which first runs the game through a series of filters (defined in `reducers/filterData.js`) that check to make sure the game is 1.) actually a game, 2.) a game being played by a local team (the SA market filter on TeamPlayer extends to cover all South Texas, so we have to filter the list further to just get local teams) and 3.) is a game occuring in the current week (The "current week" is defined as the upcoming Th-Su on Monday, Tuesday and Wednesday and as the ongoing Th-Su if the user visit the site on a Thursday, Friday, Saturday or Sunday). Each filter returns a boolean response.

 2. `mapData` then maps the filtered list of games to a more application friendly object structure – adding helmet images where they exist – before structuring the games into a hirearchal tree that can be used to sort them in the final step:

 3. The hirearchal game object is passed to `sortData` (`reducers/sortData.js`). It sorts the games by day and class (eg. 6A-I vs 5A-II vs TAPPS) and then flattens the sorted object back into an array of "game day" objects (Th, F, Sa, Su), each featuring a sorted array `games` property.

Finally, the sorted array of game day objects returned by `sortData` is returned by `parseData`, added to `state.schedule` and returned to the `Index.vue` component. `Index.vue` instantiates a `GameDay` component for each game day object.

## `src/components/GameDay/GameDay.vue`

`GameDay.vue`, and the rest of the `.vue` components, are fairly straightforward. For each game in the `GameDay.games` array a `GameBox` component is instantiated. `GameBox` is the actualy box rendered to HTML featuring game and team details, etc.

# Deployment

## Building the production application

When you are ready to deploy the app, run `npm run build`. This will build the compressed application into the `dist` directory. Note in `vue.config.js` that the `baseUrl` points at an Amazon S3 bucket.

## Deploying app assets to S3

The JS and CSS files for the application are stored on the Express News AWS account in an S3 bucket located at the path `s3.amazonaws.com/projects.expressnews.com/hs-football-scoreboard/`. If you don't have credentials to access this account email Luke Whyte or Howard Decker. 

Once in the S3 bucket, copy the `css/` and `js/` directories from the `dist/` directory to the bucket.

## Deploying app HTML to WCM

The production app HTML that has been compiled to `dist/index.html` will need to be added to the WCM site section that loads the app on MySA. To do this, open the freeform in the WCM found via the query `site:mysa AND id:89778`. Update the paths to the JS and CSS files found in the freeform to the new paths found in your `dist/index.html` file, which should be the paths to the folders/files you just uploaded to AWS.

Note that if you'd like to change the structure of the site section itself, it is stored under the id `19053` in the WCM and `site:mysa`. Currently it holds only the freeform discussed above and some CSS overrides in another freeform.
