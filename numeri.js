//ESERCIZIO DEI NUMERI:

//VARIABILI:
//array delle unità:
units = ["", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"];
//array delle decine da 10 a 19:
f11To19 = ["dieci", "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"]
//array delle decine tonde da 20 a 90:
dozens = ["venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"];

/*funzione che toglie l'ultima lettera agli elementi dell'array dozens.
Questa funzione viene chiamata per i numeri che finiscono per 1 e per 8:*/
function getDozensWithoutLastLetter(x) {
    len = dozens[x].length;
    dozens[x] = dozens[x].substring(0, len - 1);
    return dozens[x];
};

//COSTANTI:
const CENTO = "cento";
const MILLE = "mille";
const MILA = "mila";

//funzione che restituisce il risultato in lettere e lo inserisce nel paragrafo html con id="stringNumber":
function setNumberToString() {
    var num = $('#numberToConvert').val();
    var sNum = numberToString(num);
    $('#stringNumber').html(sNum);
}

//funzione che viene chiamata da setNumberToString()
function numberToString(x) {

    if (x == '') {
        return "Inserire un numero valido";
    } else if (x > 999999) {
        return "Il numero inserito è troppo grande!";
    } else if (x < 0) {
        return "Il numero inserito è troppo piccolo!"
    } else if (x == 0) { /*il numero 0*/
        return "zero";
    } else if (x < 10) {
        return getFirstTen(x);
    } else if (x < 20) {
        return getFrom11To19(x);
    } else if (x < 100) {
        return getFrom20To99(x);
    } else if (x < 200) {
        return CENTO + getFrom100To199(x);
    } else if (x < 1000) {
        return getFrom200to999(x);
    } else if (x < 1100) {
        return getFrom1000To1100(x);
    } else if (x < 2000) {
        return getFrom1100To1199(x);
    } else if (x < 10000) {
        return getFrom2000To9999(x);
    } else if (x < 20000) {
        return getFrom10000To19999(x);
    } else if (x < 100000) {
        return getFrom20000To99999(x);
    } else if (x < 110000) {
        return getFrom100000To109999(x);
    } else if (x < 120000) {
        return getFrom110000To119999(x);
    } else if (x < 200000) {
        return getFrom120000To199999(x);
    } else {
        return getFrom200000FirstTenTo999999(x);
    }

}

//Da qui in poi ci sono le funzioni che scrivono i numeri in lettere e che vengono chiamate dalla funzione numberToString().
//Le prime 4 funzioni sono quelle base che poi vengono richiamate anche dalle funzioni successive per scrivere i numeri più grandi.
//da 1 a 9
function getFirstTen(x) {
    return units[x];
}

//da 10 a 19
function getFrom11To19(x) {
    return f11To19[x - 10];
}

// da 20 a 99 compresi quelli che finiscono per 1 e per 8
function getFrom20To99(x) {
    if (x - Math.floor(x / 10) * 10 == 1 || x - Math.floor(x / 10) * 10 == 8) {
        return getDozensWithoutLastLetter(Math.floor(x / 10) - 2) + getFirstTen(x - Math.floor(x / 10) * 10);
    } else {
        return dozens[Math.floor(x / 10) - 2] + getFirstTen(x - Math.floor(x / 10) * 10);
    }
}

// da 100 a 199
function getFrom100To199(x) {
    if ((x - Math.floor(x / 100) * 100) < 10) {
        var y = getFirstTen(x - Math.floor(x / 100) * 100);
    } else if ((x - Math.floor(x / 100) * 100) < 20) {
        var y = getFrom11To19(x - Math.floor(x / 100) * 100);
    } else if ((x - Math.floor(x / 100) * 100) <= 99) {
        var y = getFrom20To99(x - Math.floor(x / 100) * 100);
    }
    return y;
}

//Da qui in poi vengono richiamate le 4 funzioni precedenti per scrivere i numeri più grandi:
// da 200 a 999
function getFrom200to999(x) {
    return getFirstTen(Math.floor(x / 100)) + CENTO + getFrom100To199(x);
}

//da 1000 a 1099
function getFrom1000To1100(x) {
    return MILLE + getFrom100To199(x);
}

//da1100 a 1199
function getFrom1100To1199(x) {
    if (x < 1199) {
        return MILLE + CENTO + getFrom100To199(x);
    } else if (x <= 1999) {
        return MILLE + getFrom200to999(x - Math.floor(x / 1000) * 1000);
    }
}

function getFromMILA(x) {
    if (x - Math.floor(x / 1000) * 1000 < 100) {
        var a = MILA + getFrom100To199(x);
    } else if (x - Math.floor(x / 1000) * 1000 <= 199) {
        var a = MILA + CENTO + getFrom100To199(x);
    } else {
        var a = MILA + getFrom200to999(x - Math.floor(x / 1000) * 1000);
    }
    return a;
}

//da 2000 a 9999
function getFrom2000To9999(x) {
    return getFirstTen(Math.floor(x / 1000)) + getFromMILA(x);
}

//da 10000 a 19999
function getFrom10000To19999(x) {
    return getFrom11To19(Math.floor(x / 1000)) + getFromMILA(x);
}

//da 20000 a 99999
function getFrom20000To99999(x) {
    return getFrom20To99(Math.floor(x / 1000)) + getFromMILA(x);
}

function f(x) {
    var f = Math.floor(x / 1000);
    return f;
}

//da 100000 a 109999
function getFrom100000To109999(x) {
    return CENTO + getFirstTen(f(x) - Math.floor(x / 100000) * 100) + getFromMILA(x);
}

//da 110000 a 119999
function getFrom110000To119999(x) {
    return CENTO + getFrom11To19(f(x) - Math.floor(x / 100000) * 100) + getFromMILA(x);
}

//da 120000 a 199999
function getFrom120000To199999(x) {
    return CENTO + getFrom20To99(f(x) - Math.floor(x / 100000) * 100) + getFromMILA(x);
}

function getFromCENTOtoMILA(x) {
    if (f(x) - Math.floor(x / 100000) * 100 < 10) {
        var b = CENTO + getFirstTen(f(x) - Math.floor(x / 100000) * 100) + getFromMILA(x);
    } else if (f(x) - Math.floor(x / 100000) * 100 < 20) {
        var b = CENTO + getFrom11To19(f(x) - Math.floor(x / 100000) * 100) + getFromMILA(x);
    } else {
        var b = CENTO + getFrom20To99(f(x) - Math.floor(x / 100000) * 100) + getFromMILA(x);
    }
    return b;
}

//da 200000 a 999999
function getFrom200000FirstTenTo999999(x) {
    return getFirstTen(Math.floor(x / 100000)) + getFromCENTOtoMILA(x);
}


