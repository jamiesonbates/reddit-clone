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
          author: 'Barstool Sports',
          votes: 2
       },
        {
          image: 'https://3hsyn13u3q9dhgyrg2qh3tin-wpengine.netdna-ssl.com/wp-content/uploads/2017/01/SplitShire-8418-1024x682.jpg',
          title: 'Man sits alone in pub',
          body: 'But he is not alone, he is surrounded by a few of his favorite things',
          author: 'Bar Times',
          votes: 0
       },
        {
          image: 'https://3hsyn13u3q9dhgyrg2qh3tin-wpengine.netdna-ssl.com/wp-content/uploads/2017/01/SplitShire-0424-1024x768.jpg',
          title: 'Paraglide your way to paradise',
          body: 'From mountain top to valley bottom, you will spend amazing moments in the air above an incredibly vibrant forest.',
          author: 'Outdoor Mag',
          votes: 5
       },
       {
         image: 'https://3hsyn13u3q9dhgyrg2qh3tin-wpengine.netdna-ssl.com/wp-content/uploads/2017/01/SplitShire-3600.jpg',
         title: 'Skiing Changes You',
         body: 'Get out there this winter. Skiing is an excistential experience where you you experience speed, agility, and utter remoteness all in one.',
         author: 'Skiing News',
         votes: 7
      }];

      vm.options = [
        {
          id: 1,
          label: 'Sort by votes',
          orderBy: `-votes`
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
      vm.newPost = !vm.newPost;
    }

    vm.createPost = function() {
      vm.post.votes = 0;
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
            post.votes += 1;
          }
          else {
            if (post.votes === 0) {
              return;
            }
            post.votes -= 1;
          }
        }
      });
    }

    vm.searchByTitle = function() {
      console.log(vm.search);
    }
  }

  angular.module('app', [])
    .component('redditClone', {
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
              <div class="votes">
                <i class="material-icons" ng-click="$ctrl.updateVotes(post, 'up')">keyboard_arrow_up</i>
                <p>{{post.votes}}</p>
                <i class="material-icons" ng-click="$ctrl.updateVotes(post, 'down')">keyboard_arrow_down</i>
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



})();
