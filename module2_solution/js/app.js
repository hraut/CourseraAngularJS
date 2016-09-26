(function() {
    'use strict';

angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();
        toBuy.boughtItem = function(itemIndex) {
            ShoppingListCheckOffService.boughtItem(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtItemsList = this;
        alreadyBoughtItemsList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var toBuyItems = [{
            name: "cookies",
            quantity: 10
        }, {
            name: "chips",
            quantity: 2
        }, {
            name: "sodas",
            quantity: 5
        }, {
            name: "eggs",
            quantity: 12
        }, {
            name: "muffins",
            quantity: 4
        }];

         var boughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function() {
            return boughtItems;
        };

        service.boughtItem = function(itemIndex) {
            // remove from to buy and place it in already bought
            boughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex, 1);
        };
    }
})();
