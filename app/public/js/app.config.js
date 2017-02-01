(function() {
  'use strict';

  angular.module('app').config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'landingPage',
        url: '/',
        component: 'landingPage'
      })
      .state({
        name: 'postPage',
        url: '/post/:id',
        component: 'postPage'
      })
  }
})();
