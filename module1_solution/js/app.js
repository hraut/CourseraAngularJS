(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.checkIfTooMuch = function () {
        if(!$scope.dishes){
            $scope.message = "Please enter data first";
            $scope.messageStyle = {color:'red'};
            $scope.textboxStyle = {border: 'solid 1px red'};
        }else{
            $scope.message = (numberOfDishes($scope.dishes) <= 3) ? "Enjoy!" : "Too much!"
            $scope.messageStyle = {color:'green'};
            $scope.textboxStyle = {border: 'solid 1px green'};
        }
    };

    function numberOfDishes(dishes){
        return dishes
            .split(",")
            .filter(function(s){ return s.length != 0}) // do not count empty items
            .length;
    }
}
})();
