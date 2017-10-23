$(document).ready( function() {
    var count = 0;
    var error;
    var temp;
    $('#calculate-button').click(function() {
        simpleCalc("display", "message");
        error = $("#message");
        error.delay(2000).fadeOut("fast", function() {
            error.html("").css('display', 'block')
        });
    });
    
    $("#b0").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "0";
            $("#display").html(temp);
        }
    });

    $("#b1").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "1";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "1";
            $("#display").html(temp);
        }
    });

    $("#b2").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "2";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "2";
            $("#display").html(temp);
        }
    });

    $("#b3").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "3";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "3";
            $("#display").html(temp);
        }
    });
    
    $("#b4").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "4";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "4";
            $("#display").html(temp);
        }
    });

    $("#b5").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "5";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "5";
            $("#display").html(temp);
        }
    });
    
    $("#b6").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "6";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "6";
            $("#display").html(temp);
        }
    });

    $("#b7").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "7";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "7";
            $("#display").html(temp);
        }
    });
    
    $("#b8").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "8";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "8";
            $("#display").html(temp);
        }
    });

    $("#b9").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "9";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "9";
            $("#display").html(temp);
        }
    });

    $("#backspace").click(function() {
        temp = $("#display").html();
        if(temp.length === 1) {
            temp = "";
            $("#display").html(temp);
            count = 0;
        } else {
            var string = temp.slice(0,-1);
            console.log(string);
            $("#display").html(string);
        }
    });

    $("#clear").click(function() {
        $("#display").html("0");
        count = 0;
    });

    $("#add").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "+";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "+";
            $("#display").html(temp);
        }
    });

    $("#substract").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "-";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "-";
            $("#display").html(temp);
        }
    });

    $("#multiply").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "*";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "*";
            $("#display").html(temp);
        }
    });

    $("#divide").click(function() {
        temp = $("#display").html();
        if(firstPoint === true && count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "/";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "/";
            $("#display").html(temp);
        }
    });

    var firstPoint = true;
    $("#point").click(function() {
        if(firstPoint) {
            firstPoint = false;
        }
        temp = $("#display").html();
        temp += ".";
        $("#display").html(temp);
    });

    $("#sign").click(function() {
        temp = $("#display").html();
        if(count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "-";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "-";
            $("#display").html(temp);
        }
    });

    $("#starting-bracket").click(function() {
        temp = $("#display").html();
        if(count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = "(";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += "(";
            $("#display").html(temp);
        }
    });

    $("#ending-bracket").click(function() {
        temp = $("#display").html();
        if(count === 0 && temp.charAt(0) === "0" && temp.charAt(1) !== ".") {
            temp = ")";
            $("#display").html(temp);
            count = 1;
        } else {
            temp += ")";
            $("#display").html(temp);
        }
    });
});