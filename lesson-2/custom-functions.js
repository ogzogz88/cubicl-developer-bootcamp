// custom array methods
// below, I implemented some of array methods from scratch

// Array.map()
const mapAlt = function (callback) {
    const newArray = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
        newArray[i] = callback(this[i]);
    }
    console.log("custom Array.mapFromScratch() method output");
    return newArray;
}
// not recommended, educational purposes only
Array.prototype.mapFromScratch = mapAlt;
arrMap = [1, 2, 3];
const resultMap = arrMap.mapFromScratch(i => i * 2);
console.log(resultMap);
console.log("--------------------");


// Array.filter()
const filterAlt = function (callback) {
    const newArray = [];
    //tihs refers to the array
    const len = this.length;
    for (let i = 0; i < len; i++) {
        if (callback(this[i])) {
            newArray.push(this[i]);
        }
    }
    console.log("custom Array.filterFromScratch() method output");
    return newArray;
}
// not recommended, educational purposes only
Array.prototype.filterFromScratch = filterAlt;
arrFilter = [2, 4, 6, 8, 10, 12, 14, 16];
const resultFilter = arrFilter.filterFromScratch(i => i > 8);
console.log(resultFilter);
console.log("--------------------");

// Array.find()
const findAlt = function (callback) {
    let firstResult;
    //tihs refers to the array
    const len = this.length;
    for (let i = 0; i < len; i++) {
        if (callback(this[i])) {
            firstResult = this[i];
            break;
        }
    }
    console.log("custom Array.findFromScratch() method output");
    return firstResult;
}
// not recommended, educational purposes only
Array.prototype.findFromScratch = findAlt;
arrFind = [2, 4, 6, 8, 10, 12, 14, 16];
const resultFind = arrFind.findFromScratch(i => i > 8);
console.log(resultFind);
console.log("--------------------");


// Array.indexOf()
const IndexOfAlt = function (search, index) {
    const len = this.length
    if (len <= 0) return -1
    if (typeof index == 'undefined') index = 0;
    if (typeof index == 'number') {
        index = index >= 0 ? index : 0
    } else {
        return 'err'
    }
    for (let i = index; i < len; i++) {
        if (this[i] === search) return i;
    }
    return -1
}
// not recommended, educational purposes only
Array.prototype.indexOfFromScratch = IndexOfAlt;
arrIndexOf = [2, 4, 6, 2, 6, 9, 8, 4, 6, 9];
const resultIndexOf = arrIndexOf.indexOfFromScratch(4, 5);
console.log("custom Array.indexOfFromScratch() method output");
console.log(resultIndexOf);
console.log("--------------------");
