/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, dbService, couchUtil, utility, facilityService){

    facilityService.getByWard();
    this.all = function() {
      return dbService.queryView("deliveries/by-driver-date")
        .then(function(response){
          return response;
        })
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