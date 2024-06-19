/**
* My own implementation for stringifying a nested map or array.
* Uses [] for arrays, {key: val}  for Maps, "" for Strings.
* Items inside a Map or Array are separated by a comma.
* @param {Map/Array/String/Number} myObj the object to be stringified
* @return {String} a string denoting the nested Map or Array with all its contents and their contents.
*/
function toStringRecursive(myObj) {
    let res = "";
    if (myObj.constructor.name == "Map") {
      if (myObj.size === 0) {return "{}";}
      res += "{";
      for (const [key, value] of myObj.entries()) {
        res += toStringRecursive(key) + ": ";
        res += toStringRecursive(value) + ", ";
      }
      res = res.slice(0, -2);
      res += "}";
    }
    else if (myObj.constructor.name == "Array") {
      if (myObj.length === 0) {return "[]";}
      res += "[";
      for (const value of myObj) {
        res += toStringRecursive(value) + ", ";
      }
      res = res.slice(0, -2);
      res += "]";
    }
    else if (myObj.constructor.name == "String") {
      res += '"' + myObj + '"';
    }
    else {
      res += myObj;
    }
    return res;
  }