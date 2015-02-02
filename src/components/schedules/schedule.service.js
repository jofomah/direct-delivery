/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, couchdb, couchUtil, utility, dbService){

    this.all = function() {
      return dbService.queryView("deliveries/by-driver-date")
        .then(function(response){
          return response;
        })
        .catch(function(err){
          console.log(err);
        })
    };

    this.getDaySchedule = function() {
      return this.all()
        .then(couchUtil.pluckDocs)
        .then(utility.first);
    };
  });