(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu-app/home.template.html'
  })

  //Category list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menu-app/categories/categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categoryList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categoryId}',
    templateUrl: 'src/menu-app/menu-items/items.template.html',
    controller: 'MenuItemsController as menuItemsCtrl',
    resolve: {
      menuItems: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryId)
                .then(function (result) {
                    return result.menu_items;
                  //return items[$stateParams.itemId];
                });
            }]
    }
  });
}

})();
