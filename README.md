Debug extend
============
Extends [debug](https://www.npmjs.com/package/debug) with verbosity levels

```javascript
//Require this only one time in your entry file
require('debug-extend')

//Require debug as usual
const debug = require('debug')('app')

debug.verbose('logtrace5') // VERBOSE Level 5
debug('logtrace4')         // DEBUG Level 4
debug.info('logtrace3')    // INFO Level 3
debug.warn('logtrace2')    // WARN Level 2
debug.error('logtrace1')   // ERROR Level 1
```
Output
```bash
$ DEBUG=app node index.js
app VERBOSE logtrace5 +0ms
app logtrace4 +0ms
app INFO logtrace3 +0ms
app WARN logtrace2 +0ms
app ERROR logtrace1 +0ms
```

### Level filtering
You can filter your output debugs with:
```javascript
const Debug = require('debug')
Debug.level(4)
```
or by environment variable DEBUG_LEVEL
```bash
DEBUG_LEVEL=4 node index.js
```

To disable all output just use level 0

