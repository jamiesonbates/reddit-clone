(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      templateUrl: '/js/states/home.template.html',
      controller: controller
    });

  controller.$inject = ['$http'];
  function controller($http) {
    const vm = this;

    vm.$onInit = function() {
      $http.get('/api/posts')
        .then((res) => {
          vm.posts = res.data;
          vm.contentHeight = `{
            height: ${vm.posts.length * 37}vh;
          }`;
        });
    }

    vm.onPost = function(post) {
      console.log('here');
      vm.posts.push(post);
      vm.contentHeight = `{
        height: ${vm.posts.length * 37}vh;
      }`;
      console.log(vm.posts);
      console.log(vm.contentHeight);
    }
  }
})();
