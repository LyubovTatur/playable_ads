export default class IndexedMap {

    map = []


    set(key, value) {

        return this.map.push([key, value]);
    }

    has(key) {
        let hasKey = false
        this.map.forEach(elem => (elem[0] === key) && (hasKey = true));
        return hasKey;
    }

    hasIndex(index) {
        return index < this.map.length ;
    }

    get(key) {
        return this.map.find(elem=>elem[0]===key)[1];
    }

    getByIndex(index) {
        return this.map[index][1];
    }

    remove(key) {
        const deleted = this.get(key)
        this.map = this.map.filter(elem=>elem[0]!==key)
        return deleted;
    }

    size() {
        return this.map.length;
    }
    forEach(callback) { //, function=>{}
        return this.map.forEach((value, key, index)=>callback(value,key,index));
    }

    union(...maps) {
        return this.map = this.map.concat(...maps);
    }

    uniq() {
        const uniqElems = [this.map[0]]
        this.map.forEach(thisMapElem=>{
            let hasElem = false
            uniqElems.forEach(elem => (thisMapElem[1] === elem[1]) && (hasElem=true));
            if(!hasElem) uniqElems.push(thisMapElem)
        })
        return uniqElems;
    }

    uniqKeys() {
        const uniqElems = [this.map[0]]
        this.map.forEach(thisMapElem=>{
            let hasElem = false
            uniqElems.forEach(elem => (thisMapElem[0] === elem[0]) && (hasElem=true));
            if(!hasElem) uniqElems.push(thisMapElem)
        })
        return uniqElems;
    }

    sort(fn=(a, b) => a.key < b.key ? 1 : -1) { // fn()callback
        //(value1,value2,key1,key2)=>callback(value1,value2,key1,key2)
        return this.map.sort(fn);
    }

    sortIndexes(fn=(a, b) => a.index < b.index ? 1 : -1) //fn(index1, index2)
    {
        this.map.sort(fn)
        return this.map;
    }

    setTo(index, value) {
        return this.map[index] = value;
    }

    removeAt(index, count = 1) {
        this.map = this.map.filter((_,elemIndex) => (elemIndex<index) || (elemIndex>=index+count))
        return this.map;
    }

    toString(){
        return this.map.reduce((string,curr)=>string+`\n${curr[0]}:${curr[1]} `,'')
    }
}