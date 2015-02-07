var metermanApp = angular.module('metermanApp', []);

metermanApp.controller('MeterManCtrl', function ($scope) {

    var model = null;

    function getModel(){
        if (model == null){
            model = new meterManModel($scope);
        }
        return model;
    }

    $scope.processSubmitFunc = function (screenID) {
        m = getModel();
        data = m.currentValuesFromPVOutput(screenID);
        data("20150207");
    }

    $scope.changeScreen = function(screenToShow){
        $scope.template = $scope.templates[screenToShow];
    }

    $scope.templates =
        [{name: 'main.html', url: 'fragments/main.html'},
         {name: 'pvoutput.html', url: 'fragments/pvoutput.html'},
         {name: 'settings.html', url: 'fragments/settings.html'}
        ];

    $scope.template = $scope.templates[0];
    $scope.meterFields = [
        {text: "Meter In High", value: 0, id: "meterInHigh"},
        {text: "Meter In Low", value: 0, id: "meterInLow"},
        {text: "Meter Out High", value: 0, id: "meterOutHigh"},
        {text: "Meter In Low", value: 0, id: "meterOutLow"},
        {text: "Meter PV In", value: 0, id: "meterPvIn"}
    ];

    $scope.settingsFields = [
        {text: "System id", value: 0, id: "pvoutputSystemID"},
        {text: "API key RO", value: 0, id: "pvoutputAPIKeyRO"},
        {text: "API key RW", value: 0, id: "pvoutputAPIKeyRW"}
    ];

    $scope.pvOutputFields = [
        {text: "Total today", value: 0, id: "pvoutputToday"},
        {text: "Total this week", value: 0, id: "pvoutputWeek"},
        {text: "Total this month", value: 0, id: "pvoutputMonth"}
    ];

    $scope.meterValueButtons = [
        {text: "Clear", id: "cmdClear"},
        {text: "Get PV", id: "cmdGetPV"},
        {text: "Submit pvoutput", id: "cmdSubmitPVOutput"}
    ];

    $scope.settingButtons = [
        {text: "Clear", id: "cmdClearSettings"},
        {text: "Save", id: "cmdSaveSettings"}
    ];

    $scope.pvoutputButtons = [

        {text: "Refresh", id: "cmdRefresh"}
    ];

    $scope.footers = [
        {text: "Meter values", id: "cmdMeterValues", screenVal:0},
        {text: "PVOutput", id: "cmdPVOutput", screenVal:1},
        {text: "Settings", id: "cmdSettings", screenVal:2}
    ];
})



