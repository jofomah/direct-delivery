/**
 * Created by ehealthafrica on 1/20/15.
 */

angular.modular('facilities')
  .service('facilityService', function(){

    this.get = function(uuid){

    };

    this.getByWard = function(wardId){

    };

    this.getByLga = function(){

    };

    this.getByZone = function(){

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

    };

  });