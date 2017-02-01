(function() {
  'use strict';

  angular.module('app')
    .component('postPage', {
      controller: controller,
      template: `
        <main>
          <section class="single-post">
            <form ng-submit="$ctrl.updatePost()">
              <div>
                <img src="{{ $ctrl.post.image_url }}">
                <a href="#" ng-click="$ctrl.editImage()">Edit Image</a>
                <input type="text" ng-model="$ctrl.post.image_url" ng-if="$ctrl.editingImage">
              </div>
              <div class="details">
                <div class="opening">
                  <h3>{{ $ctrl.post.title}}</h3>
                  <a href="#" ng-click="$ctrl.editTitle()">Edit Title</a>
                  <input type="text" ng-model="$ctrl.post.title" ng-if="$ctrl.editingTitle">

                  <h4>{{ $ctrl.post.author }}</h4>
                  <a href="#" ng-click="$ctrl.editAuthor()">Edit Author</a>
                  <input type="text" ng-model="$ctrl.post.author" ng-if="$ctrl.editingAuthor">
                </div>
                <p>{{ $ctrl.post.body }}</p>
                <a href="#" ng-click="$ctrl.editBody()">Edit Body</a>
                <input tyoe="text" ng-model="$ctrl.post.body" ng-if="$ctrl.editingBody">
              </div>

              <button type="submit" ng-if="$ctrl.editingImage || $ctrl.editingTitle || $ctrl.editingAuthor || $ctrl.editingBody">Submit</button>
            </form>
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
      console.log(vm.post);
      delete vm.post.allComments;
      const image_url = vm.post.image_url;
      console.log(image_url);
      const title = vm.post.title;
      console.log(title);
      const author = vm.post.author;
      console.log(author);
      const body = vm.post.body;
      console.log(body);

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
