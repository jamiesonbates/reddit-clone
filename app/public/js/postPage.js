(function() {
  'use strict';

  angular.module('app')
    .component('postPage', {
      controller: controller,
      template: `
        <main>
          <section class="single-post">
            <form ng-submit="$ctrl.updatePost()">
              <div class="image">
                <img src="{{ $ctrl.post.image_url }}">
                <a href="#" ng-click="$ctrl.editImage()">Edit Image</a>
                <input type="text" ng-model="$ctrl.post.image_url" ng-if="$ctrl.editingImage">
              </div>
              <div class="post-details">
                <div class="post-title">
                  <h3 ng-show="$ctrl.editingTitle===false">{{ $ctrl.post.title}}</h3>
                  <input type="text" ng-model="$ctrl.post.title" ng-if="$ctrl.editingTitle">
                  <a href="#" ng-click="$ctrl.editTitle()">(edit)</a>
                </div>

                <div class="post-author">
                  <h4 ng-show="$ctrl.editingAuthor===false">{{ $ctrl.post.author }}</h4>
                  <input type="text" ng-model="$ctrl.post.author" ng-if="$ctrl.editingAuthor">
                  <a href="#" ng-click="$ctrl.editAuthor()">(edit)</a>
                </div>

                <div class="post-body">
                  <p ng-show="$ctrl.editingBody===false">{{ $ctrl.post.body }}</p>
                  <input type="text" ng-model="$ctrl.post.body" ng-if="$ctrl.editingBody">
                  <a href="#" ng-click="$ctrl.editBody()">(edit)</a>
                </div>
              </div>

              <button type="submit" ng-if="$ctrl.editingImage || $ctrl.editingTitle || $ctrl.editingAuthor || $ctrl.editingBody">Submit</button>
            </form>

            <div class="post-comments">
              <div class="comment-meta">
                <i class="material-icons">comment</i>
                <h3>Comments</h3>
              </div>

              <div class="post-comments-form">
                <form ng-submit="$ctrl.addComment(post)">
                  <input ng-model="$ctrl.newComment" placeholder="Write Comment">
                  <button type="submit">Comment</button>
                </form>

                <div ng-repeat="comment in post.allComments">
                  <p>{{ comment.content }}</p>
                </div>
              </div>
            </div>

            <div class="post-votes">
              <i class="material-icons" ng-click="$ctrl.updateVotes(post, 'up')">keyboard_arrow_up</i>
              <p>{{post.vote_count}}</p>
              <i class="material-icons" ng-click="$ctrl.updateVotes(post, 'down')">keyboard_arrow_down</i>
            </div>
          </section>
        </main>
      `
    });

  controller.$inject = ['$http', '$stateParams'];
  function controller($http, $stateParams) {
    const vm = this;

    vm.$onInit = function() {
      vm.editingImage = false;
      vm.editingTitle = false;
      vm.editingAuthor = false;
      vm.editingBody = false;

      $http.get(`/api/${$stateParams.id}`)
        .then((res) => {
          console.log(res.data);
          vm.post = res.data;
          console.log(vm.post);
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

      $http.patch(`/api/${$stateParams.id}`, vm.post)
        .then((res) => {
          vm.post = res.data;
          console.log(vm.post);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
})();
