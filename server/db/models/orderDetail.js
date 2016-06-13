'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');
var math = require('math');

module.exports = function (db) {
  return db.define('order_detail', {
      quantity: {
        type: Sequelize.INTEGER
      },
      originalPrice: {
        type: Sequelize.FLOAT
      }
    },{
    classMethods: {
      numberOfOrders: function(currSockId, dateStart){
        var Sock = db.model('sock');
        var today = new Date();

        return this.findAll({ where:
            { sockId: currSockId,
              createdAt : { $between: [dateStart, today] }
              }}).
          then(function(res){
            var sum = 0;
            for(var i = 0; i < res.length; i++){
              sum += res[i].quantity;
            }
            return sum;
        });
      }
    },
    hooks: {
      afterCreate: function (orderDet) {
        //week ago
        var endDate = new Date();
        var startDate = new Date(endDate.setDate(endDate.getDate() - 7));

        var Sock = db.model('sock');

        this.numberOfOrders(orderDet.sockId, startDate).then(function(numOfOrders){
          if ((+numOfOrders > 40 || +numOfOrders < 5) && orderDet.originalPrice > 3) {
            console.log("orderdet", orderDet.sockId)
              Sock.increasePrice(orderDet.sockId, math.round((orderDet.originalPrice * 0.9),2))
                .then(function (res) {
                  console.log("hereree!!!!!!---->", res)
            })
          }
        });
      }
    }
  })
};
