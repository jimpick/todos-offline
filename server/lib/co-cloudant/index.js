var thunkify = require('thunkify');

var thunker = function thunker(methods, object) {
  var thunked = {};
  methods.forEach(function(method) {
    switch (typeof method) {
      case 'string':
        thunked[method] = thunkify(object[method]);
        break;
      case 'object':
        thunked[method.name] = thunker(method.methods, object[method.name]);
        break;
    }
  });
  return thunked;
};

var methods = [
  'create',
  'get',
  'destroy',
  'list',
  'compact',
  'replicate',
  'changes',
  'follow'
];

var db_methods = [
  'insert',
  'destroy',
  'get',
  'head',
  'copy',
  'bulk',
  'list',
  'fetch',
  'view',
  'show',
  'atomic',
  'search',
  'index',
  'find',
  {
    name: 'attachment',
    methods: ['insert', 'get', 'destroy']
  },
  {
    name: 'multipart',
    methods: ['insert', 'get']
  }
];

module.exports = function(cloudant) {
  thunkedCloudant = {
    db: thunker(methods, cloudant.db),
    use: function(db_name) { return thunker(db_methods, cloudant.use(db_name)) },
    request: thunkify(cloudant.request),
    auth: thunkify(cloudant.auth),
    session: thunkify(cloudant.session),
    generate_api_key: thunkify(cloudant.generate_api_key.bind(cloudant)),
    set_permissions: thunkify(cloudant.set_permissions.bind(cloudant)),
    config: cloudant.config
  };

  thunkedCloudant.db.use = thunkedCloudant.use;
  
  return thunkedCloudant;
};
