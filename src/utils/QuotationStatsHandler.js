class StatsHandler {
    constructor() {
        this.n = 0;          // Number of data points
        this.mean = 0;       // Running mean
        this.M2 = 0;         // Sum of squares for variance
        this.freqMap = new Map();  // Map to store frequency of elements (for mode)
        this.mode = null;    // To store the mode value
        this.modeFrequency = 0; // To track frequency of the mode

        this.minHeap = [];   // Min-heap (stores larger half of the numbers)
        this.maxHeap = [];   // Max-heap (stores smaller half of the numbers)
    }

    // Utility to push into the heap while keeping it sorted
    pushHeap(heap, value, compareFunc) {
        heap.push(value);
        heap.sort(compareFunc);
    }

    // Add a new value and update all statistics
    add(value) {
        if (typeof value !== 'number') throw new Error(`StatsHandler Error: value must be a number, but received ${typeof value}`);

        this.n += 1;

        // Step 1: Update mean and variance using Welford's algorithm
        const delta = value - this.mean;
        this.mean += delta / this.n;
        const delta2 = value - this.mean;
        this.M2 += delta * delta2;

        // Step 2: Update frequency map for mode
        this.freqMap.set(value, (this.freqMap.get(value) || 0) + 1);
        if (this.freqMap.get(value) > this.modeFrequency) {
            this.modeFrequency = this.freqMap.get(value);
            this.mode = value;
        }

        // Step 3: Update median using two heaps
        if (this.maxHeap.length === 0 || value <= this.maxHeap[0]) {
            this.pushHeap(this.maxHeap, value, (a, b) => b - a);  // Max-heap (lower half)
        } else {
            this.pushHeap(this.minHeap, value, (a, b) => a - b);  // Min-heap (upper half)
        }

        // Balance the heaps if needed
        if (this.maxHeap.length > this.minHeap.length + 1) {
            this.pushHeap(this.minHeap, this.maxHeap.shift(), (a, b) => a - b);
        } else if (this.minHeap.length > this.maxHeap.length) {
            this.pushHeap(this.maxHeap, this.minHeap.shift(), (a, b) => b - a);
        }
    }

    getMean() {
        return this.mean;
    }

    // Get the variance
    getVariance() {
        if (this.n < 2) return 0;
        return this.M2 / (this.n - 1);  // Sample variance
    }

    // Get the standard deviation
    getStandardDeviation() {
        return Math.sqrt(this.getVariance());
    }

    // Get the mode
    getMode() {
        return this.mode;
    }

    // Get the median
    getMedian() {
        if (this.maxHeap.length > this.minHeap.length) {
            return this.maxHeap[0];  // Max-heap has the median if odd number of elements
        } else {
            return (this.maxHeap[0] + this.minHeap[0]) / 2;  // Average of two middle values
        }
    }

    // Get data points count
    getDataPointsCount() {
        return this.n;
    }
}

export default StatsHandler;