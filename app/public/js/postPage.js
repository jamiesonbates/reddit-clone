(function() {
  'use strict';

  angular.module('app')
    .component('postPage', {
      controller: controller,
      template: `
        <main>
          <section class="single-post">
            <div>
              <img src="#">
            </div>
            <div class="details">
              <div class="opening">
                <h3>{{ $ctrl.post.title}}</h3>
                <h4>{{ $ctrl.post.author }}</h4>
              </div>
              <p>{{ $ctrl.post.body }}</p>
            </div>
          </section>
        </main>
      `
    });

  controller.$inject = ['$http', '$stateParams'];
  function controller($http, $stateParams) {
    const vm = this;

    vm.$onInit = function() {
      console.log($stateParams.id);
    }
  }
})();
