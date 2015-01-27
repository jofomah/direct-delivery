'use strict';

angular.module('directDelivery', [
    'core',
    'navbar',
    'footer',
    'home',
    'auth',
    'log',
    'login',
    'schedules',
    'schedules.round',
    'schedules.daily',
    'packing',
    'packing.all',
    'packing.item',
    'delivery',
    'facilities'
  ])
  .run(function($rootScope, $state, AuthService, $http, pouchdbService) {
    $http.get("fixtures/pouch-views.json")
      .then(function(response){
        var res = response.data.designDocs;
        for(var prop in res){
          pouchdbService.createView(res[prop]);
        }
      })
      .catch(function(err){
        console.log(err);
      })
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!AuthService.isLoggedIn && toState.name !== 'login') {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });
  });
