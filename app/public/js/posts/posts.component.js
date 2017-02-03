(function() {
  'use strict';

  angular.module('app')
    .component('allPosts', {
      templateUrl: '/js/posts/posts.template.html',
      controller: controller,
        bindings: {
          posts: '<',
          contentHeight: '<'

        }
    });

  controller.$inject = ['$http', 'votesService'];
  function controller($http, votesService) {
    const vm = this;

    vm.$onInit = function() {
      vm.postHeight = {
        'height': '35vh'
      };
      vm.commentHeight = {
        'height': '15%'
      }
      vm.infoHeight = {
        'height': '80%'
      }
      vm.comment = false;

      vm.options = [
        {
          id: 1,
          label: 'Sort by votes',
          orderBy: `-vote_count`
        },
        {
          id: 2,
          label: 'Sort by date',
          orderBy: `date`
        },
        {
          id: 3,
          label: 'Sort by title',
          orderBy: `title`
        }
      ];

      vm.selected = vm.options[0];
    }

    vm.updateVotes = function(thisPost, vote) {
      if (vote === 'up') {
        thisPost.vote_count += 1;
      }
      else if (thisPost.vote_count === 0) {
        thisPost.vote_count += 0;
      }
      else {
        thisPost.vote_count -= 1;
      }

      votesService.updateVotes(thisPost)
        .then((updatedPost) => {
          vm.posts.map((post, i) => {
            if (updatedPost.id === post.id) {
              vm.posts[i].vote_count === updatedPost.vote_count;
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }

    vm.toggleComments = function() {
      if (vm.comment) {
        vm.postHeight = {
          'height': '35vh'
        };
        vm.commentHeight = {
          'height': '15%'
        }
        vm.infoHeight = {
          'height': '80%'
        }
      }
      else {
        vm.postHeight = {
          'height': '55vh'
        };
        vm.commentHeight = {
          'height': '40%'
        };
        vm.infoHeight = {
          'height': '55%'
        }
      }
      vm.comment = !vm.comment;
    }

  }
})();
