/**
 * Created by phiro on 7/02/15.
 * Class to extract data from PVOutput and assign it to the scope variable.
 */
var meterManModel = function ($scope){
    this.currentValuesFromPVOutput = function(sourceButtonId){
        var baseURLtoGetDataFromPVOUTPut= "";
        return function (dateToRetrieve){
            alert ("Calling function for id " + sourceButtonId + "Retrieving " + dateToRetrieve + " got access as well to scope : " + $scope.meterFields[0].id);
            // Set values like: $scope.meterFields[0].value = "777";
        }
    }
}


var meterManDatabase = function ($scope){
    this.createOrOpenSettingsDatabase = function ($scope){
        var currentDatabase = null;
        return function(){
            if (currentDatabase == null) {
                currentDatabase = openDatabase('pvo_settings', '1.0', 'PVOutput settings database', 8 * 1024);
            }
            return currentDatabase;
        }
    }

    this.createOrOpenHistoricalDatabase = function ($scope){
        var currentDatabase = null;
        return function(){
            if (currentDatabase == null) {
                currentDatabase = openDatabase('pvo_history', '1.0', 'PVOutput history database', 4 * 1024 * 1024);
            }
            return currentDatabase;
        }
    }
}