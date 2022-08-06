// Problem Set below: 

// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

class RangeList {
    constructor() {
        this._ranges = []
    }

    /**
     *  Merge two range (a, b) with the assume that (a, b) is mergeable
     * @param {Array<number>} a range a
     * @param {Array<number>} b range b
     * @returns {Array<number>}
     */
    mergeRange([aStart, aEnd], [bStart, bEnd]) {
        return [Math.min(aStart, bStart), Math.max(aEnd, bEnd)]
    }

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        let [start, end] = range
        // attention the equal setuation
        if (start < end) {
            let i = 0
            while (i < this._ranges.length) {
                let [a, b] = this._ranges[i]
                if (end < a) {
                    this._ranges.splice(i, 0, range)
                    return
                }
                if (start <= b) {
                    // recursion，merge until not mergeable
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

    /**
     * Minus range a and b, return a - b which is a list of range, invalid range filtered
     * @param {Array<number>} a - range a
     * @param {Array<number>} b - range b
     * @returns {Array<Array<number>>}
     */
    rangeMinus([aStart, aEnd], [bStart, bEnd]) {
        let ret = [
            [aStart, bStart],
            [bEnd, aEnd]
        ]
        return ret.filter(([a, b]) => b > a)
    }

    /**
     * Check whether a and b have common parts
     * @param {Array<number>} a - range a
     * @param {Array<number>} b - range b
     * @returns {boolean}
     */
    isRangesIntersected(a, b) {
        let [aStart, aEnd] = a
        let [bStart, bEnd] = b
        return !(aEnd <= bStart || bEnd <= aStart)
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        let [start, end] = range
        // attention the equal setuation
        if (end <= start) {
            return
        }
        let i = 0
        while (i < this._ranges.length) {
            let [a, b] = this._ranges[i]
            if (end < a) {
                return
            }
            if (this.isRangesIntersected([a, b], range)) {
                let rs = this.rangeMinus([a, b], range)
                this._ranges.splice(i, 1, ...rs)
                // those adds is  NOT mergeable so can use it's length to skip
                // rs.map((v, _) => this.add(v))
                i += (rs.length - 1)
            }
            i += 1
        }
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        let result = this._ranges.map(([start, end], _) => `[${start}, ${end})`).join(' ')
        console.log(result)
    }
}

// Example run
const rl = new RangeList();

rl.add([1, 5]);
rl.print(); // [1, 5)

rl.add([10, 20]);
rl.print(); // [1, 5) [10, 20)

rl.add([20, 20]);
rl.print(); // [1, 5) [10, 20)

rl.add([20, 21]);
rl.print(); // [1, 5) [10, 21)

rl.add([2, 4]);
rl.print(); // [1, 5) [10, 21)

rl.add([3, 8]);
rl.print(); // [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print(); // [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print(); // [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print(); // [1, 8) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print(); // [1, 3) [19, 21)

rl.remove([20, 20]);
rl.print();