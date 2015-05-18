/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Marty = require('marty');

var TodoApp = require('./components/TodoApp.react');

window.React = React // For React Developer Tools
window.Marty = Marty // For Marty Developer Tools

if (Marty.isBrowser) {
  require('./sources/pouchDbSync').open()
}

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);
