# AwPubSub.js

AwPubSub.js provides a minimal higher-level wrapper around AwPubSub's API.

## Usage

```javascript
/*
   Data can be retrieved from the API either using callbacks (as in versions < 1.0)
   or using a new promise-based API. The promise-based API returns the raw Axios
   request promise.
 */
import AwPubSub from 'AwPubSub-api';

// unauthenticated client
const aw = new AwPubSub();
let user = gh.User(); // not a gist yet
user.updateProfile({
   }
}).then(function({data}) {
   // Promises!
   let createdGist = data;
   return gist.read();
}).then(function({data}) {
   let retrievedGist = data;
   // do interesting things
});
```

```javascript
var AwPubSub = require('AwPubSub-api');

// basic auth
var gh = new AwPubSub({
   username: 'FOO',
   password: 'NotFoo'
   /* also acceptable:
      token: 'MY_OAUTH_TOKEN'
    */
});

var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
me.listNotifications(function(err, notifications) {
   // do some stuff
});

var clayreimann = gh.getUser('clayreimann');
clayreimann.listStarredRepos(function(err, repos) {
   // look at all the starred repos!
});
```

## API Documentation


## Installation
AwPubSub.js is available from `npm` or [unpkg][unpkg].

```shell
npm install AwPubSub-api
```

```html
<!-- just AwPubSub-api source (5.3kb) -->
<script src="https://unpkg.com/AwPubSub-api/dist/AwPubSub.min.js"></script>

<!-- standalone (20.3kb) -->
<script src="https://unpkg.com/AwPubSub-api/dist/AwPubSub.bundle.min.js"></script>
```

## Compatibility
`AwPubSub.js` is tested on Node.js:
* 6.x

Note: `AwPubSub.js` uses Promise, hence it will not work in Node.js < 4 without polyfill.

