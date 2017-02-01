(function() {
  'use strict';

  angular.module('app')
    .component('landingPage', {
      controller: controller,
      template: `
        <main>
          <section class="filters">
            <div class="filter-container">
              <input class="text-filter type="text" ng-model="$ctrl.search" ng-change="$ctrl.searchByTitle()">
              <select class="select-filter" ng-options="option as option.label for option in $ctrl.options track by option.id" ng-model="$ctrl.selected">
              </select>
            </div>
          </section>

          <section ng-style={{ $ctrl.contentHeight }}>
            <div class="post" ng-repeat="post in $ctrl.posts | filter:$ctrl.search | orderBy:$ctrl.selected.orderBy">
              <div class="image">
                <img src={{post.image_url}}>
              </div>

              <div class="details">
                <div class="details-container">
                  <div class="opening">
                    <h3>{{ post.title}}</h3>
                    <h4>{{ post.author }}</h4>
                  </div>
                  <p>{{ post.body }}</p>
                  <div class="meta">
                    <div class="from-now">
                      <p am-time-ago="post.modified_at"></p>
                    </div>
                    <div class="comments">
                      <div class="comment-meta">
                        <i class="material-icons">comment</i>
                        <a href="#" ng-click="$ctrl.toggleComments()">{{post.allComments.length}} Comments</a>
                      </div>

                      <div ng-if="$ctrl.comment">
                        <form ng-submit="$ctrl.addComment(post)">
                          <input ng-model="$ctrl.newComment" placeholder="Write Comment">
                          <button type="submit">Comment</button>
                        </form>

                        <div ng-repeat="comment in post.allComments">
                          <p>{{ comment.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="votes">
                <i class="material-icons" ng-click="$ctrl.updateVotes(post, 'up')">keyboard_arrow_up</i>
                <p>{{post.vote_count}}</p>
                <i class="material-icons" ng-click="$ctrl.updateVotes(post, 'down')">keyboard_arrow_down</i>
              </div>

            </div>
          </section>
        </main>

        <aside ng-class="{
            'active-post' : $ctrl.newPost,
          }">

          <header ng-click="$ctrl.showPost()" ng-class="{ 'hover-post' : $ctrl.hoverNewPost }" ng-mouseenter="$ctrl.hoverPost()" ng-mouseleave="$ctrl.hoverPost()" ng-class="{ 'align-post-header' : $ctrl.post }">
            <h2>Create Post</h2>
          </header>

          <div class="post-form" ng-show="$ctrl.newPost">
            <form novalidate ng-submit="$ctrl.createPost()"" name="post-form">
              <div class="form-input">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  ng-model="$ctrl.post.title">
              </div>

              <div class="form-input">
                <label>Body</label>
                <input
                  type="text"
                  name="body"
                  ng-model="$ctrl.post.body">
              </div>

              <div class="form-input">
                <label>Author</label>
                <input
                  type="text"
                  name="author"
                  ng-model="$ctrl.post.author">
              </div>

              <div class="form-input">
                <label>Image Url</label>
                <input
                  type="text"
                  name="image"
                  ng-model="$ctrl.post">
              </div>

              <div class="form-submit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </aside>
      `
    });

    controller.$inject = ['$http'];
    function controller($http) {
      const vm = this;

      vm.$onInit = function() {
        vm.newPost = false;
        vm.hoverNewPost = false;
        vm.comment = false;

        $http.get('/api/')
          .then((res) => {
          vm.posts = res.data;
          console.log(vm.posts);
          })
          .catch((err) => {
            next(err);
          })

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
          vm.post.votes = 0;
          vm.post.comments = [];
          vm.posts.push(vm.post);
          vm.contentHeight = `{
            height: ${vm.posts.length * 37}vh;
          }`;
          vm.post = null;
          vm.newPost = false;
        }

        vm.updateVotes = function(thisPost, vote) {
          vm.posts.map((post) => {
            if (thisPost === post) {
              if (vote === 'up') {
                post.vote_count += 1;
              }
              else {
                if (post.votes === 0) {
                  return;
                }
                post.vote_count -= 1;
              }
            }
          });
        }

        vm.searchByTitle = function() {
          console.log(vm.search);
        }

        vm.toggleComments = function() {
          vm.comment = !vm.comment;
        }

        vm.addComment = function(post) {
          console.log(post);
          post.comments.push(vm.newComment);
          delete vm.newComment;
        }
      }


})();
