(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
    $scope.checkIfTooMuch = function () {
        if(!$scope.dishes){
            $scope.message = "Please enter data first";
        }else{
            $scope.message = (numberOfDishes($scope.dishes) <= 3) ? "Enjoy!" : "Too much!"
        }
    };

    function numberOfDishes(dishes){
        return dishes.split(",").length;
    }
}
})();
