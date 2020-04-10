const L = 3;
const H = 3;
var rows = ['OOO', 'OOO', 'OOO'];
const N = 3;
var coordToTest = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
var coordVisitedLake = [];

for (let i = 0; i < N; i++) {
    var r = checkCoord(rows, coordToTest[i], coordVisitedLake);
    console.log(r);
}

function checkCoord(map, coord, visitedMap) {
    var visited = [];
    var q = [];
    var queue = [];
    var actualCoord = coord;
    if (map[coord.y][coord.x] !== "O") {
        return 0;
    }
    if (isNotVisited(visitedMap, actualCoord) === true) {
        queue.push(actualCoord);
        visitedMap.push([]);
        while (queue.length > 0) {
            queue = getNeighbords(queue[0], queue, map, visitedMap);
            q = queue.shift();
            visited.push(q);
            visitedMap[visitedMap.length - 1].push(q);
        }
    } else {
        return isNotVisited(visitedMap, actualCoord);
    }
    return visited.length;
}

function getNeighbords(coord, queue, map, visitedMap) {
    if ((coord.x + 1) < L) {
        if (map[coord.y][coord.x + 1] === "O") {
            if (isNotVisited(visitedMap, { y: coord.y, x: coord.x + 1 }) === true) {
                queue.push({ x: coord.x + 1, y: coord.y });
            }
        }
    }
    if ((coord.x - 1) >= 0) {
        if (map[coord.y][coord.x - 1] === "O") {
            if (isNotVisited(visitedMap, { y: coord.y, x: coord.x - 1 }) === true) {
                if (isNotInQueue()
                queue.push({ x: coord.x - 1, y: coord.y });
            }
        }
    }
    if ((coord.y + 1) < H) {
        if (map[coord.y + 1][coord.x] === "O") {
            if (isNotVisited(visitedMap, { y: coord.y + 1, x: coord.x }) === true) {
                queue.push({ x: coord.x, y: coord.y + 1 });
            }
        }
    }
    if ((coord.y - 1) >= 0) {
        if (map[coord.y - 1][coord.x] === "O") {
            if (isNotVisited(visitedMap, { y: coord.y - 1, x: coord.x }) === true) {
                queue.push({ x: coord.x, y: coord.y - 1 });
            }
        }
    }
    return queue;
}

function isNotVisited(coordVisitedLake, coord) {
    if (coordVisitedLake.length > 0) {
        for (var i = 0; i < coordVisitedLake.length; i++) {
            if (coordVisitedLake[i].length > 0) {
                for (var j = 0; j < coordVisitedLake[i].length; j++) {
                    if (coordVisitedLake[i][j].x === coord.x && coordVisitedLake[i][j].y === coord.y) {
                        return coordVisitedLake[i].length;
                    }
                }
            }
        }
    }
    return true;
}

function isNotInQueue(queue, coord) {
    if (queue.length > 0) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].x === coord.x && queue[i].y === coord.y) {
                return false;
            }
        }
    }
    return true;
}

function isNotVisited2(coordVisitedLake, coord) {

    for (var i = 0; i < coordVisitedLake.length; i++) {
        console.error("hee");
        for (var j = 0; j < coordVisitedLake[j].length; j++) {
            if (coordVisitedLake[i][j].x === coord.x && coordVisitedLake[i][j].y === coord.y) {
                return coordVisitedLake[i].length;
            }
        }
    }
    return true;
}