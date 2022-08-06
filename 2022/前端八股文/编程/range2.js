class RangeList{
    constructor(range) {
        this._ranges = []
    }

    /**
     *  Merge two range (a, b) with the assume that (a, b) is mergeable
     * @param {Array<number>} a range a
     * @param {Array<number>} b range b
     * @returns {Array<number>}
     */
     mergeRange([aStart, aStop], [bStart, bStop]) {
        return [Math.min(aStart, bStart), Math.max(aStop, bStop)]
    }

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range) {
        let [start, stop] = range
        if(start < stop) {
            let i = 0
            while(i < this._ranges.length) {
                let [a, b] = this._ranges[i]
                // 
                if(stop < a) {
                    this._ranges.splice(i, 0, range)
                    return
                }
                if(start <= b) {
                    // merge until not mergeable
                    let r = this.mergeRange(range, [a, b])
                    this._ranges.splice(i, 1)
                    this.add(r)
                    return
                }

                i += 1
            }
            this._ranges.push(range)
        }
    }

    toString() {
        console.log(this._ranges);
        return this._ranges.map(([start, stop], _) => `[${start}, ${stop})`).join(' ')
    }

    print() {
        console.log(this.toString())
    }
}

let rl = new RangeList()

rl.add([1,3])
rl.add([2,6])
rl.print()
