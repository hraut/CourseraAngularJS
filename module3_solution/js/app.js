(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems);

    function FoundItems() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            onRemove: '&'
        }
      };
      return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchItems = function() {
            if(menu.searchTerm!==''){ // search only if search term is entered
                var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
                promise.then(function(response) {
                    menu.found = response;
                    if(menu.found.length === 0){
                        menu.message = "Nothing found!"
                    }else{
                        menu.message = ""; // clear off message
                    }
                })
                .catch(function(error) {
                    console.log("Something went terribly wrong.");
                });
            }else{
                menu.message = "Nothing found!"
                menu.found = []; // clear entries from found array
            }
        }

        menu.removeItem = function(index){
            menu.found.splice(index,1);
        }
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            })
            .then(function(response){
                // filter items to include only ones with search term in their description
                var foundItems = response.data.menu_items.filter(function isMatch(menu_item){
                    return menu_item.description.includes(searchTerm);
                });
                return foundItems;
            })
            .catch(function(error) {
                console.log("Error calling service!");
            });
        };
    }

})();
