// custom array methods
// below, I implemented some of array methods from scratch

// Array.map()
const mapAlt = function(callback){
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        newArray[i] = callback(this[i], i);
    }
    return newArray;
}
Array.prototype.mapFromScratch = mapAlt;

arr = [1,2,3];
const res = arr.mapFromScratch(i=> i*2);
console.log(res);