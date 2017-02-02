(function() {
  'use strict';

  angular.module('app')
    .service('votesService', service)

  service.$inject = ['$http'];
  function service($http) {
    this.updateVotes = function(post) {
      return $http.patch('/api/votes/', post)
        .then((res) => {
          return res.data[0];
        })
    }
  }
})();
