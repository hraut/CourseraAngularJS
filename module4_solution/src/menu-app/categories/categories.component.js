(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menu-app/categories/category-list.template.html',
  bindings: {
    items: '<'
  }
});

})();
