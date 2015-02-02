'use strict';

angular.module('directDelivery', [
    'core',
    'navbar',
    'footer',
    'home',
    'home.schedule',
    'home.packing',
    'auth',
    'log',
    'login',
    'schedules',
    'schedules.round',
    'packing',
    'packing.all',
    'packing.item',
    'delivery',
    'facilities'
  ])
  .run(function($rootScope, $state, AuthService, $http, pouchdbService) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!AuthService.isLoggedIn && toState.name !== 'login') {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });
  });
