(function() {
  'use strict';

  const controller = function() {
    const vm = this;

    vm.$onInit = function() {
      vm.newPost = false;
      vm.posts = [
        {
          image: 'https://images.pexels.com/photos/226576/pexels-photo-226576.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
          title: 'Darts are Awesome',
          body: 'Darts are so awesome that I play at least 15 games a day. One at home and 14 at the bar.',
          author: 'Barstool Sports'
       }
      ];
    }

    vm.showPost = function() {
      vm.newPost = !vm.newPost;
    }

    vm.createPost = function() {
      vm.posts.push(vm.post);
      vm.contentHeight = `{
        height: ${vm.posts.length * 37}vh;
      }`;
      vm.post = null;
      vm.newPost = false;
      console.log(vm.contentHeight);
      console.log(vm.posts);
    }
  }

  angular.module('app', [])
    .component('redditClone', {
      controller: controller,
      template: `
        <main>
          <section class="filters">
            <div class="filter-container">
              <input class="text-filter type="text">
              <select class="select-filter">
                <option>Sort by Votes</option>
                <option>Sort by Date</option>
                <option>Sort by Title</option>
              </select>
            </div>
          </section>

          <section ng-style={{ $ctrl.contentHeight }}>
            <div class="post" ng-repeat="post in $ctrl.posts">
              <div class="votes">
                <i class="material-icons">thumb_up</i>
                <p>5</p>
                <i class="material-icons">thumb_down</i>
              </div>

              <div class="image">
                <img src={{post.image}}>
              </div>

              <div class="details">
                <div class="details-container">
                  <div class="opening">
                    <h3>{{post.title}}</h3>
                    <h4>{{post.author}}</h4>
                  </div>
                  <p>{{post.body}}</p>
                  <div class="meta">
                    <p>2 minutes ago</p>
                    <p>2 Comments</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>

        <aside ng-class="{
            'active-post' : $ctrl.newPost
          }">

          <header ng-click="$ctrl.showPost()" ng-class="{ 'align-post-header' : $ctrl.post }">
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
                  ng-model="$ctrl.post.image">
              </div>

              <div class="form-submit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </aside>
      `
    });



})();
