(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menu-app/menu-items/item-list.template.html',
  bindings: {
    items: '<'
  }
});

})();
