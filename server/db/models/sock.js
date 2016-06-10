'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {
  return db.define('sock', {
    complete: {
      type: Sequelize.BOOLEAN
    },
    title: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING // How to limit char length
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 4.99
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
      set: function (tags) {

        tags = tags || [];

        if (typeof tags === 'string') {
          tags = tags.split(' ').map(function (str) {
            return str.trim();
          });
        }

        this.setDataValue('tags', tags);

      }
    }
  },

  {
      // TODO
    //hooks: {
    //  beforeCreate: function () {
    //    var titleTerms = this.title.split(' ')
    //    this.tags.push(titleTerms)
    //  }
    //
    //}

  }

  )
}
