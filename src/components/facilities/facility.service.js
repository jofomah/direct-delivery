/**
 * Created by ehealthafrica on 1/20/15.
 */

angular.module('facilities')
  .service('facilityService', function(dbService){

    this._get = function(view){
      return dbService.queryView('')
        .then(function(response){
          return response;
        })
        .catch(function(err){
          console.err(err);
        })
    };
    this._fetch = function(viewName, params){
      return dbService.queryView(viewName, params)
        .then(function(response){
          return response;
        })
        .catch(function(err){
          console.log(err);
        })
    };
    this.getAll = function(){
      return this._fetch('facilities/by_id')
        .then(function(response){
          return response.data.rows.map(function(row){
            return row.doc;
          });
        })
    };

    this.getByWard = function(wardId){
      return this._fetch("facilities/by_ward")
        .then(function(response){
          return response;
        })
    };

    this.getByLga = function(lgaId){
      return this._fetch("facilities/by_lga")
        .then(function(response){
          return response;
        })
    };

    this.getByZone = function(zoneId){
      return this._fetch("facilities/by_zone")
        .then(function(response){
          return response;
        })
    };

    this.getChildFacilities = function(facilityId){

    };
    this.getParentFacility = function(){

    };
    this.getWithCF = function(){

    };

    this.save = function(data){
     return dbService.save(data)
        .then(function(response){
          return response;
        })
    };
  });