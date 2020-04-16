const DEVIATION = 0.05;
const REMOVEDITEM = 10;

const N = parseInt(readline());
let input = [];
for (let i = 0; i < N; i++) {
    var inputs = readline();
    input.push(inputs);
}

class Data {
    
    constructor(dataString) {
        this.item;
        this.time;
        this.ratio;
        this.log;
        this.initData(dataString);
    }
    
    initData(dataString) {
        dataString = dataString.split(' ');
        this.item = parseInt(dataString[0]);
        this.time = parseInt(dataString[1]);
        this.ratio = this.time / this.item;
        this.log = Math.log(this.item);
    }
    
}

class Datas {
    
    constructor(dataStrings) {
        this.dataList = [];
        this.createDataList(dataStrings);
    }
    
    createDataList(dataStrings) {
        for (let i = 0; i < dataStrings.length; i++) {
            this.dataList.push(new Data(dataStrings[i]));
        }
    }
    
}

class Algorithm {
    
    constructor(dataStrings) {
        this.datas = new Datas(dataStrings);
        this.dataList = this.datas.dataList;
    }
    
    complexity() {
        if (this.o1() < DEVIATION) {
            return "O(1)";
        } else if (this.on() < DEVIATION) {
            return "O(n)";
        } else if (this.ologn() < DEVIATION) {
            return "O(log n)";
        } else if (this.onlogn() < DEVIATION) {
            return "O(n log n)";
        } else if (this.on2() < DEVIATION) {
            return "O(n^2)";
        } else if (this.on2logn() < DEVIATION) {
            return "O(n^2 log n)";
        } else if (this.on3() < DEVIATION) {
            return "O(n^3)";
        }  else if (this.o2n() < DEVIATION) {
            return "O(2^n)";
        }
    }
    
    o1() {
        let n = this.dataList.length;
        let avgTime = this.average().avgTime;
        let s = 0;
        for (let i = 0; i < n; i++) {
            let d = Math.abs((this.dataList[i].time / avgTime) - 1);
            s += d;
        }
        let averageDeviation = s / n;
        return averageDeviation;
    }
    
    ologn() {
        let n = this.dataList.length;
        let avgOlogN = this.average().avgOlogN;
        let s = 0;
        for (let i = 0; i < n; i++) {
            let OlogN = this.dataList[i].ratio / (this.dataList[i].log / this.dataList[i].item);
            let d = Math.abs((OlogN / avgOlogN) - 1);
            s += d;
        }
        let averageDeviation = s / n;
        return averageDeviation;
    }
    
    onlogn() {
        let n = this.dataList.length;
        let avgOnlogN = this.average().avgOnlogN;
        let s = 0;
        for (let i = 0; i < n; i++) {
            let OnlogN = ((this.dataList[i].ratio / this.dataList[i].item) / (this.dataList[i].log / (this.dataList[i].item * this.dataList[i].item))) / (this.dataList[i].item );
            let d = Math.abs((OnlogN / avgOnlogN) - 1);
            s += d;
        }
        let averageDeviation = s / n;
        return averageDeviation;
    }
    
    on2logn() {
        let n = this.dataList.length;
        let avgOn2LogN = this.average().avgOn2LogN;
        let s = 0;
        for (let i = 0; i < n; i++) {
            let On2LogN = ((this.dataList[i].ratio / this.dataList[i].item) / (this.dataList[i].log / (this.dataList[i].item * this.dataList[i].item))) / (this.dataList[i].item * this.dataList[i].item);
            let d = Math.abs((On2LogN / avgOn2LogN) - 1);
            s += d;
        }
        let averageDeviation = s / n;
        return averageDeviation;
    }
    
    o2n() {
        let n = this.dataList.length;
        let avgO2n = this.average().avgO2n;
        let s = 0;
        for (let i = REMOVEDITEM; i < n; i++) {
            let O2n = this.dataList[i].time / (Math.pow(2, this.dataList[i].item));
            let d = Math.abs((O2n / avgO2n) - 1);
            s += d;
        }
        let averageDeviation = s / (n - REMOVEDITEM);
        return averageDeviation;
    }
    
    on3() {
        let n = this.dataList.length;
        let avgOn3 = this.average().avgOn3;
        let s = 0;
        for (let i = REMOVEDITEM; i < n; i++) {
            let On3 = this.dataList[i].ratio / (this.dataList[i].item * this.dataList[i].item);
            let d = Math.abs((On3 / avgOn3) - 1);
            s += d;
        }
        let averageDeviation = s / (n - REMOVEDITEM);
        return averageDeviation;
    }
    
    on2() {
        let n = this.dataList.length;
        let avgOn2 = this.average().avgOn2;
        let s = 0;
        for (let i = 0; i < n; i++) {
            let On2 = this.dataList[i].ratio / this.dataList[i].item;
            let d = Math.abs((On2 / avgOn2) - 1);
            s += d;
        }
        let averageDeviation = s / n;
        return averageDeviation;
    }
    
    on() {
        let n = this.dataList.length;
        let avgRatio = this.average().avgRatio;
        let s = 0;
        for (let i = 0; i < n; i++) {
            let d = Math.abs((this.dataList[i].ratio / avgRatio) - 1);
            s += d;
        }
        let averageDeviation = s / n;
        return averageDeviation;
    }
    
    average() {
        let sumItem = 0;
        let sumTime = 0;
        let sumRatio = 0;
        let sumOlogN = 0;
        let sumOnlogN = 0;
        let sumOn2 = 0;
        let sumOn2LogN = 0;
        let sumOn3 = 0;
        let sumO2n = 0;
        let n = this.dataList.length;
        for (let i = 0; i < n; i++) {
            sumItem += this.dataList[i].item;
            sumTime += this.dataList[i].time;
            sumRatio += this.dataList[i].ratio;
            sumOlogN += this.dataList[i].ratio / (this.dataList[i].log / this.dataList[i].item);
            sumOnlogN += ((this.dataList[i].ratio / this.dataList[i].item) / (this.dataList[i].log / (this.dataList[i].item * this.dataList[i].item))) / (this.dataList[i].item);
            sumOn2 += this.dataList[i].ratio / this.dataList[i].item;
            sumOn2LogN += ((this.dataList[i].ratio / this.dataList[i].item) / (this.dataList[i].log / (this.dataList[i].item * this.dataList[i].item))) / (this.dataList[i].item * this.dataList[i].item); 
            if (i >= REMOVEDITEM) {
                sumOn3 += this.dataList[i].ratio / (this.dataList[i].item * this.dataList[i].item);
                sumO2n += this.dataList[i].time / (Math.pow(2, this.dataList[i].item));
            }
        }
        return {avgItem: sumItem/n, avgTime: sumTime/n, avgRatio: sumRatio/n, 
                avgOlogN: sumOlogN/n, avgOnlogN: sumOnlogN/n, avgOn2: sumOn2/n,
                avgOn2LogN: sumOn2LogN/n, avgOn3: sumOn3/(n - REMOVEDITEM), avgO2n: sumO2n/(n - REMOVEDITEM)};
    }
    
    outlier() {
        let n = this.dataList;
        let minTime = n[0].time;
        let maxTime = n[0].time;
        for (let i = 0; i < n.length; i++) {
            if (minTime > n[i].time) {
                minTime = n[i].time;
            }
            if (maxTime < n[i].time) {
                maxTime = n[i].time;
            }
        }
        return {minTime: minTime, maxTime: maxTime};
    }
    
}

let algo = new Algorithm(input);
console.log(algo.complexity());