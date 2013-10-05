var testFunc = function(){
    alert("Clicked");
}

function MeterManCtrl($scope) {
   $scope.meterFields = [
       { text : "Meter In High", value:0, id:"meterInHigh" },
       { text : "Meter In Low", value:0, id:"meterInLow" },
       { text : "Meter Out High", value:0, id:"meterOutHigh" },
       { text : "Meter In Low", value:0, id:"meterOutLow" },
       { text : "Meter PV In", value:0, id:"meterPvIn" }
   ]
   $scope.buttons = [
        {text:"Clear",id:"cmdClear",onClick:"testFunc()"},
        {text:"Get PV",id:"cmdGetPV",onClick:"testFunc()"},
        {text:"Submit pvoutput",id:"cmdSubmitPVOutput",onClick:"testFunc()"}
    ]
    $scope.footers = [
        {text:"Meter values",id:"cmdMeterValues",onClick:"testFunc()"},
        {text:"PVOutput",id:"cmdPVOutput",onClick:"testFunc()"},
        {text:"Settings",id:"cmdSettings",onClick:"testFunc()"}
    ]
};


