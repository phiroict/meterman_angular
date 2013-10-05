var meterValues={};
meterValues.currentValues = {};
meterValues.currentValues.pvInout = 0;
meterValues.yesterdaysValues = {};


var pvOutPut = {};

pvOutPut.pvOutputAPIKey='953f37eae53be83a0e4ab3f64b585840c9ed217a';
pvOutPut.pvOutputID=19112
pvOutPut.uploadURL='http://pvoutput.org/service/r2/addoutput.jsp';
pvOutPut.calculateDailyResult = function(meterValues){
    console.log("Processing " + meterValues.toString());
    meterValues.difference = {};
    meterValues.difference.meterInHigh = Math.round(( parseFloat( meterValues.currentValues.meterInHigh) - parseFloat( meterValues.yesterdaysValues.meterInHigh ))*1000).toFixed(0);
    meterValues.difference.meterInLow = Math.round((parseFloat(meterValues.currentValues.meterInLow) - parseFloat(meterValues.yesterdaysValues.meterInLow))*1000).toFixed(0);
    meterValues.difference.meterOutHigh = Math.round((parseFloat(meterValues.currentValues.meterOutHigh) - parseFloat(meterValues.yesterdaysValues.meterOutHigh))*1000).toFixed(0);
    meterValues.difference.meterOutLow = Math.round((parseFloat(meterValues.currentValues.meterOutLow) - parseFloat(meterValues.yesterdaysValues.meterOutLow))*1000).toFixed(0);
    pvOutPut.getCurrentEnergyInputForToday(meterValues);
    //DEBUG:
    meterValues.currentValues.pvInout = 12900;
    //END DEBUG
    meterValues.difference.pv_exported =  Math.abs((meterValues.difference.meterOutHigh/1000 + meterValues.difference.meterOutLow/1000));
    meterValues.difference.pv_internal = meterValues.currentValues.pvInout/1000 - meterValues.difference.pv_exported;

    meterValues.difference.energy_imported=(meterValues.difference.meterInHigh/1000 + meterValues.difference.meterInLow/1000) - meterValues.difference.pv_internal/1000;
    meterValues.difference.energy_bruto= meterValues.difference.energy_imported +  meterValues.difference.pv_internal;

    $("#PBrutoTot").html("Bruto Energy : "+ parseFloat(meterValues.difference.energy_bruto*1000).toFixed(0) + " Wh");
    $("#PInternTot").html("Internal Energy : "+ parseFloat(meterValues.difference.pv_internal*1000).toFixed(0) + " Wh");
    $("#PVInTot").html("PV Energy : "+ meterValues.currentValues.pvInout + " Wh");

}



pvOutPut.updateToPVOutput = function(meterValues){
    var getRequest = pvOutPut.uploadURL + "?" + "key=" + pvOutPut.pvOutputAPIKey + "&sid=" +pvOutPut.pvOutputID + "&d=" + meterValues.currentValues.date.replace('-','').replace('-','') +"&e=" + (meterValues.difference.meterOutHigh +  meterValues.difference.meterOutLow)/10 +"&ip=" + parseFloat(meterValues.difference.meterInHigh).toFixed(0)  + "&io=" + parseFloat(meterValues.difference.meterInLow).toFixed(0)  +"&c="+ parseFloat( meterValues.difference.energy_bruto*1000 ).toFixed(0);
    console.log("Calling " + getRequest);

    $.ajax({
        type:"GET",
        url:getRequest,
        dataType: "text",
        headers:
        {
            "X-Pvoutput-Apikey":pvOutPut.pvOutputAPIKey,
            "X-Pvoutput-SystemId":pvOutPut.pvOutputID
        },
        error:function(req,status,errorCode){
            alert(status + "::" + errorCode);
        }
    }).done(function(data) {
            alert(data);
        });

}

pvOutPut.getCurrentEnergyInputForToday = function (meterValues){
    var getRequest = "http://pvoutput.org/service/r2/getstatistic.jsp?df=" + meterValues.currentValues.date.replace('-','').replace('-','') + "&dt=" + meterValues.currentValues.date.replace('-','').replace('-','') + "&sid=" + pvOutPut.pvOutputID + "&key=" + pvOutPut.pvOutputAPIKey;
    //alert(getRequest);
    $.ajax({
        type:"GET",
        url:getRequest,
        dataType: "text",
        headers:
        {
            "X-Pvoutput-Apikey":pvOutPut.pvOutputAPIKey,
            "X-Pvoutput-SystemId":pvOutPut.pvOutputID
        },
        error:function(req,status,errorCode){
            alert(status + "::" + errorCode);
        }
    }).done(function(data) {

            var values = data.split(',');

            meterValues.currentValues.pvInout = values[0]
            var power = values[0]/1000;
            $("#pvIn").val(power);
            $("#PVIn").html("PV Energy : "+ meterValues.currentValues.pvInout + " Wh");
        });
}


function pad(width, str, padding) {
    return (width <= str.length) ? str : pad(width, padding + str, padding)
}

$(document).ready(function() {
    var myDate = new Date();
    var prettyDate = pad(2,"" + myDate.getFullYear(),'0')+ '-' + pad(2,"" +(myDate.getMonth()+1),'0')+ '-'+  pad(2,"" + (myDate.getDate()),'0');
    $("#forDate").val(prettyDate);

    var retrieveValuesFromPVOutput = function(date){

    }

    var html5rocks = {};
    html5rocks.webdb = {};
    html5rocks.webdb.db = null;
    html5rocks.webdb.getAllTodoItems = function(previousDay){
        console.log("Created db and running now.");
    }

    html5rocks.webdb.open = function() {
        var dbSize = 5 * 1024 * 1024; // 5MB
        html5rocks.webdb.db = openDatabase("Solardb", "1.0", "SolarDB", dbSize);
    }

    html5rocks.webdb.onError = function(tx, e) {
        alert("There has been an error: " + e.message);
    }

    html5rocks.webdb.onSuccess = function(tx, r) {
        // re-render the data.
        // loadTodoItems is defined in Step 4a
        html5rocks.webdb.getAllTodoItems(loadTodoItems);
    }
    $("#meterOpnameForm").submit(function (e) {
        e.preventDefault()
        html5rocks.webdb.open();
        if ($("#deleteDB").is(':checked')){
            html5rocks.webdb.db.transaction(function(tx){
                tx.executeSql("DELETE FROM solar_data")

            })};

        html5rocks.webdb.db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS solar_data(dateString TEXT PRIMARY KEY , meterHighIn REAL, meterLowIn REAL,meterHighOut REAL, meterLowOut REAL)");
            tx.executeSql("INSERT INTO solar_data (dateString,meterHighIn,meterLowIn,meterHighOut,meterLowOut) VALUES('" + $("#forDate").val() + "'," + parseFloat( $("#meterInHigh").val())+ "," + parseFloat($("#meterInLow").val())+ "," + parseFloat($("#meterOutHigh").val())+ "," + parseFloat($("#meterOutLow").val()) + ")");
            meterValues.currentValues.date=  $("#forDate").val();
            meterValues.currentValues.meterInHigh=  $("#meterInHigh").val();
            meterValues.currentValues.meterInLow=   $("#meterInLow").val();
            meterValues.currentValues.meterOutHigh= $("#meterOutHigh").val();
            meterValues.currentValues.meterOutLow = $("#meterOutLow").val();

        })
        var today  = new Date(Date.parse($("#forDate").val()));
        today.setDate(today.getDate() -1);
        var dateToRetrieve = today;
        var yesterdayString = pad(2,"" + dateToRetrieve.getFullYear(),'0')+ '-'  + pad(2,"" +(dateToRetrieve.getMonth()+1),'0')+ '-' +  pad(2,"" + (dateToRetrieve.getDate()),'0');
        console.log("Yesterday is : " + yesterdayString);
        var selectstatement = "SELECT * FROM solar_data WHERE dateString=?";
        html5rocks.webdb.db.transaction(function(tx){
            tx.executeSql(selectstatement, [yesterdayString] , function(tx,results){
                if (results.rows.length == 0){
                    alert("You have no data from yesterday, will record today so you can use it tomorrow");
                    return;
                }
                row = results.rows.item(0);
                meterValues.yesterdaysValues.date=  yesterdayString;
                meterValues.yesterdaysValues.meterInHigh=   row.meterHighIn;
                meterValues.yesterdaysValues.meterInLow=    row.meterLowIn;
                meterValues.yesterdaysValues.meterOutHigh=  row.meterHighOut;
                meterValues.yesterdaysValues.meterOutLow =  row.meterLowOut;
                pvOutPut.calculateDailyResult(meterValues);
                pvOutPut.updateToPVOutput(meterValues);
            }, function(tx,error){
                console.log("Error occured : " + error );
            });
        });
    });
    $("#GetThePower").click(function(e){
        e.preventDefault();
        meterValues.currentValues = {};
        meterValues.currentValues.date= $("#forDate").val();

        pvOutPut.getCurrentEnergyInputForToday(meterValues)
    });
});

