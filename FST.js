"use strict";

class EpsCounter {
  /**
   * An object that keeps track of how many times each state of an FST has been visited while
   * not reading any input (except its epsilon symbol)
   * @param {FST} fst The FST for which this counter is made.
   */
  constructor(fst) {
    this.fst = fst;
    this.counter = new Map();
    for (let state of this.fst.states) {
      this.counter.set(state, 0);
    }
  }
  increase(state) {
    const newVal = this.counter.get(state)+1
    if (newVal > this.fst.loopMax) {
      return false;
    }
    else {
      this.counter.set(state, newVal);
      return true;
    }
  }
  copy() {
    const newCounter = new EpsCounter(this.fst);
    for (let state of this.counter.keys()) {
      newCounter.counter.set(state, this.counter.get(state));
    }
    return newCounter;
  }
}

class FST {
  /**
   * @constructor
   * @param {String} att an AT&T formatted string representing a weighted or unweighted FST
   * @param {Object} param1 a config object that can contain the following information:
   *   @param {String} epsilon_symbol Special symbol for empty string. Default: @0@
   *   @param {Number} loopMax How many times an epsilon transition (on the input side) can depart from
   *   a specific state without reading any input in between (to prevent infinite loops). Default: 3
   *   @param {Number} defaultWeight The weight to use in a weighted automaton when no weight is given.
   *   Default: 0 for additive, 1 for multiplicative
   *   @param {String} weightType either "additive" (default) or "multiplicative"
   */
  constructor(att = null, {epsilon_symbol = "@0@", loopMax = 3, defaultWeight = null, weightType="additive"}={}) {
    this.states = new Set();
    this.transitions = new Map();
    this.accepting = new Set();
    this.eps = epsilon_symbol;
    this.weightType = weightType;
    if (defaultWeight === null) {
      this.defaultWeight = this._startWeight;  // _startWeight was set in the setter of weightType
    }
    else {
      this.defaultWeight = defaultWeight;
    }
    this.loopMax = loopMax;
    // If att is given, directly read in the att file adding the transitions inside
    if (att) {
      this.readAsAtt(att);
    }
  }
  /**
   * Read an AT&T formatted string and add its transitions to the FST.
   * @param {String} att The AT&T formatted string.
   * @param {Object} param1 a config object that can contain the following information:
   *  @param {Boolean} firstLineDefinesStartState If true, the first state in the first line of att will be
   *    the new start state of this FST. Set to false when adding to an existing FST. Default: true
   *  @param {String} weightedness "weighted", "unweighted", "unchanged" or "autodetect". If "weighted"
   *    or "unweighted", the weighted property of the FST is set to true or false accordingly. If
   *    "unchanged", leaves the weighted property as it is. If "autodetect", weighted it is first set
   *    to false and changed to true if any line with 5 fields is found.
   */
  readAsAtt(att, {firstLineDefinesStartState=true, weightedness="autodetect"}={}) {
    if (weightedness === "autodetect" || weightedness === "unweighted") {
      this.weighted = false;
    } 
    else if (weightedness === "weighted") {
      this.weighted = true;
    }
    else if (!weightedness === "unchanged") {
      throw "weightedness must be 'weighted', 'unweighted', 'unchanged', or 'autodetect'"
    }
    const lines = att.includes("\r\n") ? att.trim().split("\r\n") : att.trim().split("\n");
    if (firstLineDefinesStartState) {
      this.initial = lines[0][0]
    }
    for (const l of lines) {        
      let splitLine = l.split("\t");
      if (splitLine.length === 5) {
        if (weightedness === "autodetect") {
          this.weighted = true;
        }
        this.addTransition(splitLine[0], splitLine[1], splitLine[2], splitLine[3], Number(splitLine[4]));
      }
      else if (splitLine.length === 4) {
        this.addTransition(splitLine[0], splitLine[1], splitLine[2], splitLine[3]);
      }
      else if (splitLine.length === 1) {
        this.addAccepting(splitLine[0]);
      }
      else if (splitLine.length === 2) {
        throw "Line '" + splitLine.join("\t") + "' can't be processed: Weights for accepting" +
        " states are not supported.";
      }
    }
  }
  /**
   * Return transitions for a specific source state or source state input combination.
   * @param {String} sourceState state to get transitions from
   * @param {String} input input to get transitions for
   * @returns {Array or Map} If input is given, returns a nested array with all
   * [output, targetState(, weight)] combinations for the given source state and input,
   * if input is not given, returns a Map with those combinations for each possible input
   * in the given source state.
   */
  getTransitions(sourceState, input=null) {
    if (!this.transitions.has(sourceState)) {
      return input === null ? new Map() : [];
    }
    if (input === null) {
      return this.transitions.get(sourceState);
    }
    else {
      if (!this.transitions.get(sourceState).has(input)) {
        return [];
      }
      return this.transitions.get(sourceState).get(input);
    }
  }
  hasTransition(sourceState, targetState, input, output) {
    if (!this.transitions.has(sourceState)) {
      return false;
    }
    if (!this.transitions.get(sourceState).has(input)) {
      return false;
    }
    return (this.transitions.get(sourceState).get(input).find((x) =>
      x[0] === output && x[1] === targetState) !== undefined);
  }
  set weightType(val) {
    if (!(val === "additive" || val === "multiplicative")) {
      throw "weightType must be either 'additive' or 'multiplicative'";
    }
    this._weightType = val;
    this._startWeight = val === "additive" ? 0 : 1;
  }
  get weightType() {
    return this._weightType;
  }
  get numTransitions() {
    let res = 0;
    for (let val of this.transitions.values()) {
        for (let list of val.values()) {
            res += list.length;
        }
    }
    return res;
  }
  addTransition(sourceState, targetState, input, output, weight) {
    // this.transitions: map{sourceState: map{input: array[array[output, targetState(, weight)]]}}
    if (!this.transitions.has(sourceState)) {
      this.transitions.set(sourceState, new Map());
    }
    if (!this.transitions.get(sourceState).has(input)) {
      this.transitions.get(sourceState).set(input, []);
    }
    if (weight !== undefined) {
      this.transitions.get(sourceState).get(input).push([output, targetState, weight]);
    }
    else {
      this.transitions.get(sourceState).get(input).push([output, targetState]);
    }
    this.states.add(sourceState);
    this.states.add(targetState);
  }
  addAccepting(state) {
    this.accepting.add(state);
  }
  /*changeWeight(sourceState, targetState, input, output, weight) {
    if (this.transitions.has(sourceState)) {
      if (this.transitions.get(sourceState).has(targetState)) {
        if (this.transitions.get(sourceState).get(targetState))
      }
    }
  }*/
  /**
  * Compute all possible outputs for a given input sequence.
  * @param {String} input_seq	A sequence from the input language to transduce.
  * @param {String} cur		The state to start the transduction from (defaults to this.initial).
  * @param {String} output_so_far	Used in recursion. If given, every outout will be prefixed with this string.
  * @param {String} weight_so_far	Used in recursion. The output weight will be the sum of
  					this weight and the weights of all the following transitions.
  * @return {Array[String] or Array[[String, Number]]}	An array with all possible output strings or
  							[output, weight] pairs if this.weighted.
  */
  transduce(input_seq, cur=null, output_so_far="", weight_so_far=this._startWeight, epsCounter=null) {
    if (cur === null) {
      if (this.initial === undefined) {
        throw "This FST does not have an initial state. Please set an initial state via 'myFst.initial = ...'"
      }
      cur = this.initial;
    }
    let outputs = []; // All valid outputs go here 
    if (input_seq === "") {
      if (this.accepting.has(cur)) {
      // reached an accepting state and no more input left, so we have a valid output
        if (this.weighted) {
          outputs.push([output_so_far, weight_so_far]);
        }
        else {
          outputs.push(output_so_far);
        }
      }
    }
    if (!this.transitions.has(cur)) {
      return outputs;  // no further transitions -> backtrack directly
    }
    if (input_seq !== "") {
      for (const seq of this.transitions.get(cur).keys()) {
        if (input_seq.startsWith(seq)) {
          if (this.weighted) {
            if (this.weightType === "additive") {
              for (const [output, targetState, weight] of this.transitions.get(cur).get(seq)) {
                if (weight === undefined) {
                  weight = this.defaultWeight;
                }
                outputs = outputs.concat(this.transduce(input_seq.substring(seq.length), targetState,
                output_so_far + (output === this.eps ? "" : output), weight_so_far + weight, null));
              }
            } 
            else if (this.weightType === "multiplicative") {
              for (const [output, targetState, weight] of this.transitions.get(cur).get(seq)) {
                if (weight === undefined) {
                  weight = this.defaultWeight;
                }
                outputs = outputs.concat(this.transduce(input_seq.substring(seq.length), targetState,
                output_so_far + (output === this.eps ? "" : output), weight_so_far * weight, null));
              }
            }
          }
          else {
            for (const [output, targetState] of this.transitions.get(cur).get(seq)) {
              outputs = outputs.concat(this.transduce(input_seq.substring(seq.length),
              targetState, output_so_far + (output === this.eps ? "" : output), 0, null));
            }
          }
        }
      }
    }
    if (this.transitions.get(cur).has(this.eps)) {
      // We encountered an epsilon transition, so we must keep track of how many times
      // each state is reached before the next non-epsilon input.
      if (epsCounter === null) {
        epsCounter = new EpsCounter(this);
      }
      if (!epsCounter.increase(cur)) {
        return outputs;
      }
      if (this.weighted) {
        for (const [output, targetState, weight] of this.transitions.get(cur).get(this.eps)) {
          outputs = outputs.concat(this.transduce(input_seq, targetState, output_so_far +
          (output === this.eps ? "" : output), weight_so_far + weight, epsCounter.copy()));
        }
      }
      else {
        for (const [output, targetState] of this.transitions.get(cur).get(this.eps)) {
          outputs = outputs.concat(this.transduce(input_seq, targetState, output_so_far +
          (output === this.eps ? "" : output), 0, epsCounter.copy()));
        }
      }
    }
    return outputs;
  }
  invert() {
    const res = new FST(null,
      {epsilon_symbol: this.eps, loopMax: this.loopMax, defaultWeight: this.defaultWeight,
        weightType: this.weightType});
    res.initial = this.initial;
    res.weighted = this.weighted;
    res.accepting = this.accepting;
    for (let sourceState of this.transitions.keys()) {
      for (let input of this.transitions.get(sourceState).keys()) {
        if (this.weighted) {
          for (let [output, targetState, weight] of this.transitions.get(sourceState).get(input)) {
            res.addTransition(sourceState, targetState, output, input, weight);
          }
        }
        else {
          for (let [output, targetState] of this.transitions.get(sourceState).get(input)) {
            res.addTransition(sourceState, targetState, output, input);
          }
        }
      }
    }
    return res;
  }
}