co-cloudant
=======

Exposes [cloudant](https://github.com/cloudant/nodejs-cloudant) library API as thunks for use with [co](github.com/visionmedia/co) and [koa](github.com/koajs/koa).

Install with `npm install co-cloudant` (Not published yet)

cloudant methods return `(err, body, header)`, meaning the co-cloudant wrappers will throw `err`, and yield `[body, header]`.

Usage: (Destructuring syntax not yet in V8 / node)

    var co = require('co');
    var cloudant = require('cloudant')('https://myuser.cloudant.com');
    var coCloudant = require('co-cloudant')(cloudant);
  
    co(function *() { // Or inside a koa handler
      yield coCloudant.db.create('myDb');
    
      var db = coCloudant.use('myDb'); 
      // with destructuring: 
      var [body, headers] = yield db.insert({hello: 'world'}, 'myDocument');
      
      // without destructuring:
      var res = yield db.insert({hello: 'world'}, 'myDocument');
      var body = res[0], headers = res[1];
    })();

Based on [co-nano](https://github.com/OlavHN/co-nano)

