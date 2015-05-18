/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var _ = require('lodash');
var Marty = require('marty');
var TodoConstants = require('../constants/TodoConstants');
var pouch = require('../pouch/PouchDb');

var TodoStore = Marty.createStore({
  id: 'TodoStore',
  handlers: {
    create: TodoConstants.TODO_CREATE,
    toggleComplete: TodoConstants.TODO_TOGGLE_COMPLETE_ALL,
    undoCompleteTodo: TodoConstants.TODO_UNDO_COMPLETE,
    completeTodo: TodoConstants.TODO_COMPLETE,
    updateText: TodoConstants.TODO_UPDATE_TEXT,
    destroyTodo: TodoConstants.TODO_DESTROY,
    destroyCompleted: TodoConstants.TODO_DESTROY_COMPLETED,
    updatedOrInserted: TodoConstants.TODO_UPDATED_OR_INSERTED
  },

  getInitialState: function () {
    return {};
  },

  getAll: function () {
    return this.fetch({
      id: 'all-todos',
      locally: function () {
        if (this.hasAlreadyFetched('all-todos')) {
          return this.state;
        }
      },
      remotely: function () {
        var state = this.state
        return pouch.db.allDocs({include_docs: true})
        .then(function (res) {
          var results = {}
          if (res && res.rows) {
            res.rows.forEach(function (row) {
              results[row.id] = {
                id: row.id,
                complete: row.doc.done,
                text: row.doc.title
              }
            })
          }
          _.extend(state, results)
        })
      }
    });
  },

  /**
   * Create a TODO item.
   * @param  {string} text The content of the TODO
   */
  create: function (text) {
    text = text.trim();

    if (text) {
      // Hand waving here -- not showing how this interacts with XHR or persistent
      // server-side storage.
      // Using the current timestamp + random number in place of a real id.
      var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this.state[id] = {
        id: id,
        complete: false,
        text: text
      }
      var self = this
      pouch.db.put({
        _id: id,
        title: text,
        done: false,
        type: 'todo',
        order: _.size(self.state) // FIXME: Unreliable
      }).then(function () {
        self.hasChanged()
      })
    }
  },
  toggleComplete: function () {
    this.updateAll({
      complete: !this.areAllComplete()
    });
  },
  undoCompleteTodo: function (id) {
    this.update(id, { complete: false });
  },
  completeTodo: function (id) {
    this.update(id, { complete: true });
  },
  updateText: function (id, text) {
    text = text.trim();
    if (text !== '') {
      this.update(id, {text: text});
    }
  },

  /**
   * Update a TODO item.
   * @param  {string} id
   * @param {object} updates An object literal containing only the data to be
   *     updated.
   */
  update: function (id, props) {
    var self = this
    this.state[id] = _.extend({}, this.state[id], props);
    pouch.db.get(id)
    .then(function (doc) {
      return pouch.db.put({
        _id: id,
        _rev: doc._rev,
        title: self.state[id].text,
        done: self.state[id].complete,
        type: 'todo',
        order: doc.order
      })
    })
    .then(function (result) {
      self.hasChanged()
    })
    .catch(function (err) {
      console.log('Pouch update rrror', err)
    })
  },

  /**
   * Update all of the TODO items with the same object.
   *     the data to be updated.  Used to mark all TODOs as completed.
   * @param  {object} updates An object literal containing only the data to be
   *     updated.

   */
  updateAll: function (props) {
    for (var id in this.state) {
      this.update(id, props);
    }
  },

  /**
   * Delete a TODO item.
   * @param  {string} id
   */
  destroyTodo: function (id, options) {
    var self = this
    delete this.state[id];
    if (options && options.noSave) {
      this.hasChanged()
      return
    }
    pouch.db.get(id)
    .then(function (doc) {
      pouch.db.remove(doc)
    })
    .then(function () {
      self.hasChanged()
    })
    .catch(function (err) {
      console.log('Error destroying pouch doc', err)
    })
  },

  /**
   * Delete all the completed TODO items.
   */
  destroyCompleted: function () {
    for (var id in this.state) {
      if (this.state[id].complete) {
        this.destroyTodo(id);
      }
    }
  },

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in this.state) {
      if (!this.state[id].complete) {
        return false;
      }
    }

    return true;
  },

  /**
   * Update or insert a TODO item from a pouchdb doc
   * @param {object} doc The PouchDb doc representing the item
   */
  updatedOrInserted: function (doc) {
    this.state[doc._id] = {
      id: doc._id,
      complete: doc.done,
      text: doc.title
    };
    this.hasChanged();
  },

});

module.exports = TodoStore;
