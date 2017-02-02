(function() {
  'use strict';

  angular.module('app')
    .service('commentService', service)

  service.$inject = ['$http'];
  function service($http) {
    this.addComment = function(post) {
      return $http.post('/api/comment/', post)
        .then((res) => {
          return res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
})();
