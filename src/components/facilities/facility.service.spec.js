/**
 * Created by ehealthafrica on 1/28/15.
 */

describe('facility service', function(){

  var mockDBService, facilityService;
  beforeEach(module('facilities', 'db'));

  beforeEach(inject(function(_facilityService_){
    facilityService = _facilityService_;
  }));

  it('should be defined', function(){
    expect(facilityService).toBeDefined();

    expect(facilityService.getAll()).toBeDefined();
    expect(facilityService.getByWard()).toBeDefined();
    expect(facilityService.getByLga()).toBeDefined();
    expect(facilityService.getByZone()).toBeDefined();
    expect(facilityService.save({})).toBeDefined();

  })

});