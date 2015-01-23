/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, couchdb, couchUtil, facilityService, utility){
    facilityService.getByZone('"07f03e8c40bc11e4b3c53ca9f44c7824"')
     .then(function(response){
       console.log(response);
     });

    this.all = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver-date',
        reduce: false,
        include_docs: true
      };
      var key = couchUtil.key(user.email +"-"+ utility.formatDate(new Date()));
      angular.extend(params, key);
      return couchdb.view(params).$promise;
    };

    this.getCurrentRound = function(){
      return this.all()
        .then(function(response){
          return response;
        });
    };
    this.getDaySchedule = function(){
      return this.getCurrentRound()
        .then(function(response){
          return response.rows.map(function(row){
            return row.doc;
          })
        });
    }
  });