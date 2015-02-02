'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', function($window, pouchDB, config){

    /**
     * we set default adapter to 'websql' because of the following:
     * 1. it is fast and
     * 2. the target device  "explore rangerx" supports websql by default.
     *
     * @param dbName
     * @returns {*}
     */
    this.create = function(dbName, opt) {
      var options = opt || {
        /*eslint-disable camelcase */
        /*jshint camelcase:false */
        auto_compaction: true
        /*eslint-enable camelcase */
      };
      if (hasWebSQL()) {
        options.adapter = 'websql';
      } else {
        options.adapter = 'idb';
      }
      return pouchDB(dbName, options);
    };

    this.remote = function(dbUrl, options) {
      return pouchDB(dbUrl, options);
    };

    this.query = function(viewName, param){
      var dbName = config.localDB;
      var db = this.create(dbName);
      return db.query(viewName, param)
        .then(function(response){
          return response;
        })
        .catch(function(err){
          console.log(err);
        })
    }
  });
