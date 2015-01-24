/**
 * Created by ehealthafrica on 1/20/15.
 */

angular.module('facilities')
  .service('facilityService', function($http){

    var HFServer = 'http://dev.lomis.ehealth.org.ng:5984/facilities';
    this._get = function(urlFraction){
      var url = HFServer + urlFraction;
      return $http.get(url)
        .then(function(response){
          return response;
        })
        .catch(function(err){
          console.err(err);
        })
    };
    this._fetch = function(url){
      return this._get(url)
        .then(function(response){
          return response.data.rows.map(function(row){
            return row.doc;
          });
        })
        .catch(function(err){
          console.log(err);
        })
    };
    this.getAll = function(){
      var url = '/_design/facilities/_view/by_lga?include_docs=true';
      return this._get(url)
        .then(function(response){
          return response.data.rows.map(function(row){
            return row.doc;
          });
        })
    };

    this.getByWard = function(wardId){
      var url= '/_design/facilities/_view/by_ward?include_docs=true&reduce=false&endkey='+wardId +'&startkey='+wardId;
      return this._fetch(url);
    };

    this.getByLga = function(lgaId){
      var url = '/_design/facilities/_view/by_lga?include_docs=true&reduce=false&endkey='+lgaId +'&startkey='+lgaId;
      return this._fetch(url);
    };

    this.getByZone = function(zoneId){
      var url = '/_design/facilities/_view/by_zone?include_docs=true&reduce=false&endkey='+zoneId +'&startkey='+zoneId;
      return this._fetch(url);
    };

    this.getChildFacilities = function(facilityId){

    };
    this.getParentFacility = function(){

    };
    this.getWithCF = function(){

    };
    this.getByProximity = function(distance, ref){
      /*
        distance is the radius the search should cover in kilometers (km);
        ref can be the reference facility uuid, in which the function expects a string input,
        or a coord ({long:"", lat: ""}), in which case the function expects a obj as input
        NB:: this might be unsuitable for devices and browsers considering the resources it might require to compute
      */
    };
    this.set = function(data){
      $http.post(HFServer, data)
        .then(function(){

        })
        .catch(function(err){
          console.log(err);
        })
    };
  });