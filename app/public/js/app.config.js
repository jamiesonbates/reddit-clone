(function() {
  'use strict';

  angular.module('app').config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'parent',
        url: '/',
        component: 'parent'
      })
      .state({
        name: 'postPage',
        url: '/post/:id',
        component: 'postPage'
      })
  }
})();
