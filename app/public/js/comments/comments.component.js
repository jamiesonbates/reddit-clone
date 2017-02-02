(function() {
  'use strict';

  angular.module('app')
    .component('comments', {
      templateUrl: '/js/comments/comments.template.html',
      controller: controller,
      bindings: {

      }
    })

  controller.$inject = ['$http', 'commentService'];
  function controller($http, commentService) {
    const vm = this;

    vm.addComment = function(thisPost) {
      thisPost.newComment = vm.newComment;
      delete vm.newComment;

      commentService.addComment(thisPost)
        .then((comment) => {
          vm.posts.map((post, i) => {
            if (post.id === comment.post_id) {
              vm.posts[i].allComments.push(comment);
            }
          });
        });
    }
  }
})();
