(function() {
  'use strict';

  angular.module('app')
    .component('singlePost', {
      templateUrl: '/js/states/singlepost.template.html',
      controller: controller
    })

    controller.$inject = ['$http', '$stateParams', 'commentService', 'votesService'];
    function controller($http, $stateParams, commentService, votesService) {
      const vm = this;

      vm.$onInit = function() {
        vm.comment = false;
        vm.editingImage = false;
        vm.editingTitle = false;
        vm.editingAuthor = false;
        vm.editingBody = false;

        $http.get(`/api/posts/${$stateParams.id}`)
          .then((res) => {
            vm.post = res.data;
          })
          .catch((err) => {
            next(err);
          })
      }

      vm.editImage = function() {
        vm.editingImage = !vm.editingImage;
      }

      vm.editTitle = function() {
        vm.editingTitle = !vm.editingTitle;
      }

      vm.editAuthor = function() {
        vm.editingAuthor = !vm.editingAuthor;
      }

      vm.editBody = function() {
        vm.editingBody = !vm.editingBody;
      }

      vm.updatePost = function() {
        delete vm.post.allComments;
        vm.editingImage = false;
        vm.editingTitle = false;
        vm.editingAuthor = false;
        vm.editingBody = false;

        $http.patch(`/api/posts/${$stateParams.id}`, vm.post)
          .then((res) => {
            vm.post = res.data;
            console.log(vm.post);
          })
          .catch((err) => {
            console.log(err);
          })
      }

      vm.addComment = function(post) {
        post.newComment = vm.newComment;
        delete vm.newComment;

        commentService.addComment(post)
          .then((comment) => {
            vm.post.allComments.push(comment);
          })
      }

      vm.updateVotes = function(post, vote) {
        if (vote === 'up') {
          post.vote_count += 1;
        }
        else if (post.vote_count === 0) {
          post.vote_count += 0;
        }
        else {
          post.vote_count -= 1;
        }

        votesService.updateVotes(post)
          .then((updatedPost) => {
            vm.post.vote_count = updatedPost.vote_count;
          })
          .catch((err) => {
            console.log(err);
          })
      }

      vm.toggleComments = function() {
        vm.post = vm.post;
        vm.comment = !vm.comment;
      }
    }

})();
