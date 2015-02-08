/**
 * Created by phiro on 7/02/15.
 * Class to extract data from PVOutput and assign it to the scope variable.
 */
var meterManModel = function ($scope) {
    var baseURLtoGetDataFromPVOUTPut = "http://pvoutput.org/service/r2/getstatus.jsp?" ;
    this.currentValuesFromPVOutput = function (sourceButtonId) {
        return function ($scope, $http) {
            $http.defaults.headers.common = {
                'X-Pvoutput-Apikey':$scope.settingsFields[1].value,
                'X-Pvoutput-SystemId':$scope.settingsFields[0].value
            };
            var url = baseURLtoGetDataFromPVOUTPut + "d=" + "20150208";
            alert(url)
            $http.get(url).
                success(function(data) {
                    $scope.meterFields[4].value = data.split(',')[2];
                });
        }
    }
}


var meterManDatabase = function ($scope) {


    function zeroPad(num, numZeros) {
        var n = Math.abs(num);
        var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
        var zeroString = Math.pow(10,zeros).toString().substr(1);
        if( num < 0 ) {
            zeroString = '-' + zeroString;
        }

        return zeroString+n;
    }

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

    this.storeMeters = function(){
        return function () {
            storageItem = {
                "date": $scope.meterFields[5].value,
                "meterInHigh":$scope.meterFields[0].value,
                "meterInLow":$scope.meterFields[1].value,
                "meterOutHigh":$scope.meterFields[2].value,
                "meterOutLow":$scope.meterFields[3].value,
                "meterPVIn":$scope.meterFields[4].value
            }
            if (localStorage != null){
                var date = $scope.meterFields[5].value;
                var dateString = date.getFullYear() + "-" + zeroPad(Number(date.getMonth()) + 1,2) + "-" + zeroPad(date.getDate(),2)
                localStorage.setItem(dateString,JSON.stringify( storageItem) );

            }

        }
    }
}