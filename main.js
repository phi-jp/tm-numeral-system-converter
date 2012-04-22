var $id = function(id) { return document.getElementById(id); };

var CARDINALITY_MAP = {
    "Decimal"   : 10,
    "Hex"       : 16,
    "Binary"    : 2,
};

var calc = function(nums) {
    var strings = $id("src").value.split('\n');
    var nums    = []; 
    var radioCardinality = document.mainForm.cardinality;
    var cardinality = 10;
    for (var i=0,len=radioCardinality.length; i<len; ++i) {
        if (radioCardinality[i].checked == true) {
            cardinality = CARDINALITY_MAP[ radioCardinality[i].value ];
            break;
        }
    }
    
    for (var i=0,len=strings.length; i<len; ++i) {
        var num = parseInt(strings[i], cardinality);
        nums.push( num );
    }
    
    refresh(nums);
};

var refresh = function(nums) {
    var eDecimalDest= $id("decimal-dst");
    var eHexDest    = $id("hex-dst");
    var eBinaryDest = $id("binary-dst");
    eDecimalDest.value  = "";
    eHexDest.value      = "";
    eBinaryDest.value   = "";
    
    for (var i=0,len=nums.length; i<len; ++i) {
        var num = nums[i];
        eDecimalDest.value  += num + '\n';
        eHexDest.value      += num.toString(16) + '\n';
        eBinaryDest.value   += num.toString(2) + '\n';
    }
};

window.onload = function() {
    tm.FormObserver.observeAll();
    
    $id("src").onchange = calc;
    
    var radioCardinality = document.mainForm.cardinality;
    for (var i=0,len=radioCardinality.length; i<len; ++i) {
        radioCardinality[i].onchange = calc;
    }
    
    // 一度実行しておく
    calc();
};