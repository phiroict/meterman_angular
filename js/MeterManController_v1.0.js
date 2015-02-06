var metermanApp = angular.module('metermanApp', []);

metermanApp.controller('MeterManCtrl', function($scope){

    $scope.testFunc = function(){
        alert("Clicked");
    }


    $scope.meterFields = [
        { text : "Meter In High", value:0, id:"meterInHigh" },
        { text : "Meter In Low", value:0, id:"meterInLow" },
        { text : "Meter Out High", value:0, id:"meterOutHigh" },
        { text : "Meter In Low", value:0, id:"meterOutLow" },
        { text : "Meter PV In", value:0, id:"meterPvIn" }
    ]
    $scope.buttons = [
        {text:"Clear",id:"cmdClear"},
        {text:"Get PV",id:"cmdGetPV"},
        {text:"Submit pvoutput",id:"cmdSubmitPVOutput"}
    ]
    $scope.footers = [
        {text:"Meter values",id:"cmdMeterValues"},
        {text:"PVOutput",id:"cmdPVOutput"},
        {text:"Settings",id:"cmdSettings"}
    ]
})



