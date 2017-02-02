(function() {
  'use strict';

  angular.module('app')
    .component('newPost', {
      templateUrl: '/js/newPost/newpost.template.html',
      controller: controller,
      bindings: {
        posts: '='
      }
    });

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this;

    vm.$onInit = function() {
      vm.newPost = false;
      vm.hoverNewPost = false;
    }

    vm.showPost = function() {
      vm.hoverNewPost = !vm.hoverNewPost;
      vm.newPost = !vm.newPost;
    }

    vm.hoverPost = function() {
      if (vm.newPost) {
        return;
      }

      vm.hoverNewPost = !vm.hoverNewPost;
    }

    vm.createPost = function() {
      vm.post.vote_count = 0;

      $http.post('/api/post', vm.post)
        .then((res) => {
          const addedPost = res.data;
          addedPost.allComments = [];
          vm.posts.push(addedPost);
        })
        .catch((err) => {
          console.log(err);
        })
      vm.post = null;
      vm.newPost = false;
    }

  }
})();
