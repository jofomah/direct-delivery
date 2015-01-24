'use strict';

angular.module('log')
  .constant('SUCCESS_MESSAGES', {
    packingSaved: {
      title: 'Packing saved',
      message: 'Packing list saved successfully'
    },
    authSuccess: {
      title: 'Authentication',
      message: 'Login success'
    },
    'deliveryCancelled': {
      title: 'Delivery cancelled',
      message: 'Delivery cancelled successfully'
    }
  });
