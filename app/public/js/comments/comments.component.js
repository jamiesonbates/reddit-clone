(function() {
  'use strict';

  angular.module('app')
    .component('comments', {
      templateUrl: '/js/comments/comments.template.html',
      controller: controller,
      bindings: {
        post: '=',
        comment: '<'
      }
    });

  controller.$inject = ['$http', 'commentService'];
  function controller($http, commentService) {
    const vm = this;

    vm.addComment = function(thisPost) {
      thisPost.newComment = vm.newComment;
      delete vm.newComment;

      commentService.addComment(thisPost)
        .then((comment) => {
          vm.post.allComments.push(comment);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
})();
