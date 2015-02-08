/**
 * Created by phiro on 7/02/15.
 * Class to extract data from PVOutput and assign it to the scope variable.
 */
var meterManModel = function ($scope) {
    this.currentValuesFromPVOutput = function (sourceButtonId) {
        var baseURLtoGetDataFromPVOUTPut = "";
        return function (dateToRetrieve) {
            alert("Calling function for id " + sourceButtonId + "Retrieving " + dateToRetrieve + " got access as well to scope : " + $scope.meterFields[0].id);
            // Set values like: $scope.meterFields[0].value = "777";
        }
    }
}


var meterManDatabase = function ($scope) {


    this.storeSettings = function () {
        return function() {
            if (localStorage != null) {
                localStorage.setItem("systemID", $scope.settingsFields[0].value);
                localStorage.setItem("keyRO", $scope.settingsFields[1].value);
                localStorage.setItem("keyRW", $scope.settingsFields[2].value);
            }
        }
    }

    this.getSettings = function(){
        return function () {
            if(localStorage != null) {
                $scope.settingsFields[0].value = localStorage.getItem("systemID");
                $scope.settingsFields[1].value = localStorage.getItem("keyRO");
                $scope.settingsFields[2].value = localStorage.getItem("keyRW");
            }
        }
    }
}