"use strict";

let fst;
let revFST;


// for testing the FST class from an HTML file
function readFile(input) {
    let f = input.files[0];
    const r = new FileReader();
    r.onload = function() {
        let startTime = window.performance.now(); 
        fst = new FST(r.result);
        let reverseStart = window.performance.now();
        revFST = fst.invert();
        let endTime = window.performance.now();
        let toPrint = "Read " + fst.numTransitions + " transitions in ";
        toPrint += (reverseStart - startTime) + " milliseconds.\n";
        toPrint += "Reversed FST in " + (endTime - reverseStart) + " milliseconds."
        //toPrint += "\nReversed FST has " + revFST.numTransitions + " transitions.";
        document.getElementById("load_time").innerText = toPrint;
    };
    r.onerror = function() { console.log(r.error); };
    //r.onloadstart = function() { console.log("loading started"); }
    r.readAsText(f);
}
  
function transduce(transducer, input_id, output_id) {
    try {
        let startTime = window.performance.now();
        let res = transducer.transduce(document.getElementById(input_id).value);
        let endTime = window.performance.now();
        let text = "Found " + res.length + " transductions in " + (endTime - startTime) + " milliseconds:\n"
        text += toStringRecursive(res);
        document.getElementById(output_id).innerText = text;
    }
    catch(err) {
        if (err.message.endsWith("is undefined")) {
            document.getElementById(output_id).innerText = err.name + ": " + err.message + "\n" +
            "Please choose an AT&T file before transliterating.";
        }
        else {
            document.getElementById(output_id).innerText = err.name + ": " + err.message;
        }
    }
}
  