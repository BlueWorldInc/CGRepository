var fs = require('fs');
var path = process.cwd();
var buffer = fs.readFileSync(path + "\\network.txt");
let txt = [];
txt.push(buffer.toString().split('\n'));
txt = txt[0];
var index = 0;


class Readline {

    constructor() {
    }

    readline(txt) {
        index++;
        return txt[index - 1];
    }
}

let R = new Readline();
const startPoint = R.readline(txt, index);
const endPoint = R.readline(txt, index);
let stopNames = [];
const N = parseInt(R.readline(txt, index));
for (let i = 0; i < N; i++) {
    const stopName = R.readline(txt, index);
    stopNames.push(stopName);
}
const M = parseInt(R.readline(txt, index));
var routes = [];
for (let i = 0; i < M; i++) {
    const route = R.readline(txt, index);
    routes.push(route);
}




class Link {

    constructor(departure) {
        this.departure = departure;
        this.destinations = [];
        this.visited = false;
        this.parentAcronyme = null;
        this.parentVisited = [];
        this.distance = null;
    }

    addDestination(destination) {
        this.destinations.push(destination);
    }

    getDeparture() {
        return this.departure;
    }

    getDepartureAcronyme() {
        return this.departure.getAcronyme();
    }

    getDestinations() {
        return this.destinations;
    }

    setVisited(bool) {
        this.visited = bool;
    }

    setParent(Acronyme) {
        this.parentAcronyme = Acronyme;
    }

    addParentVisited(parent) {
        this.parentVisited.push(parent);
    }

    visitedBy(parent) {
        for (let i = 0; i < this.parentVisited.length; i++) {
            if (parent === this.parentVisited[i]) {
                return true;
            }
        }
        return false;
    }

    getLastParent() {
        if (this.parentVisited.length === 0) {
            return null;
        } else {
            return this.parentVisited[this.parentVisited.length - 1];
        }

    }

    getFirstParent() {
        if (this.parentVisited.length === 0) {
            return null;
        } else {
            return this.parentVisited[0];
        }

    }
}

class Network {

    constructor(stations) {
        this.links = [];
        this.stations = stations;
    }

    updateLink(linkString) {
        let departStation = this.stations.searchStation(linkString.substring(9, 13));
        let destStation = this.stations.searchStation(linkString.substring(23, 27));
        let foundStation = false;
        for (let i = 0; i < this.links.length; i++) {
            if (departStation.getAcronyme() === this.links[i].getDepartureAcronyme()) {
                this.links[i].addDestination(destStation);
                foundStation = true;
                break;
            }
        }
        if (!foundStation) {
            this.createLink(departStation, destStation);
        }
    }

    updateLinks(linkArray) {
        for (let i = 0; i < linkArray.length; i++) {
            this.updateLink(linkArray[i]);
        }
    }

    createLink(departStation, destStation) {
        var link = new Link(departStation);
        if (destStation !== null) {
            link.addDestination(destStation);
        }
        this.links.push(link);
    }

    getLinks() {
        return this.links;
    }

    getLink(stationAcronyme) {
        let link;
        for (let i = 0; i < this.links.length; i++) {
            if (this.links[i].getDepartureAcronyme() === stationAcronyme) {
                link = this.links[i];
                break;
            }
        }
        return link;
    }

}

class Station {

    constructor(acronyme, name, lat, lon, type) {
        this.acronyme = acronyme;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.type = type;
    }

    getAcronyme() {
        return this.acronyme;
    }

}

class Stations {

    constructor() {
        this.stationList = [];
    }

    addStation(stationString) {
        let stationArray = stationString.substring(9).split(',');
        let station = new Station(
            stationArray[0],
            stationArray[1],
            stationArray[3],
            stationArray[4],
            stationArray[7]
        );
        this.stationList.push(station);
    }

    addStations(stationArray) {
        for (var i = 0; i < stationArray.length; i++) {
            this.addStation(stationArray[i]);
        }
    }

    getStations() {
        return this.stationList;
    }

    searchStation(stationAcronyme) {
        let station;
        for (var i = 0; i < this.stationList.length; i++) {
            if (this.stationList[i].getAcronyme() === stationAcronyme) {
                station = this.stationList[i];
                break;
            }
        }
        return station;
    }
}

class Algorithm {

    constructor(network) {
        this.network = network;
        this.links = this.network.getLinks();
    }


    searchPath(departStation, destStation) {
        departStation = this.network.stations.searchStation(departStation.substring(9, 13));
        destStation = this.network.stations.searchStation(destStation.substring(9, 13));
        let departLink;
        let destFound = false;
        let visitedList = [];
        let queue = [];

        if (departStation.getAcronyme() === destStation.getAcronyme()) {
            visitedList.push(departStation.name);
            return visitedList;
        }

        departLink = this.network.getLink(departStation.getAcronyme());

        let currentLink = { link: departLink };
        currentLink.link.distance = 0;
        queue.push(currentLink);
        let q;
        let parentList = null;
        while (queue.length > 0) {

            q = queue.shift();
            currentLink.link = q.link;

            for (let i = 0; i < currentLink.link.getDestinations().length; i++) {

                let iLink = this.network.getLink(currentLink.link.getDestinations()[i].getAcronyme());
                let distanceToStart = this.distance(currentLink.link.getDeparture(), currentLink.link.getDestinations()[i])
                    + currentLink.link.distance;

                if (iLink === undefined) {
                        this.network.createLink(currentLink.link.getDestinations()[i], null);
                        iLink = this.network.getLink(currentLink.link.getDestinations()[i].getAcronyme());
                }

                if (iLink.distance === null || iLink.distance > distanceToStart) {
                    iLink.distance = distanceToStart;
                    iLink.parentAcronyme = currentLink.link.getDepartureAcronyme();

                    if (currentLink.link.getDestinations()[i].getAcronyme() === destStation.getAcronyme()) {
                        destFound = true;
                        parentList = this.getVisitedList(iLink);
                    } else {
                        queue.push({ link: iLink });
                    }
                }
            }
        }

        if (!destFound) {
            return false;
        }

        return parentList;

    }

    getVisitedList(currentLink) {
        let visitedList = [];
        let i = 0;
        while (currentLink.parentAcronyme !== null && i < 200000) {
            visitedList.push(currentLink.getDeparture().name);
            currentLink = this.network.getLink(currentLink.parentAcronyme);
        }
        visitedList.push(currentLink.getDeparture().name);
        visitedList.reverse();
        return visitedList;
    }

    printVisitedList(visitedList) {
        if (visitedList !== false) {
            for (var i = 0; i < visitedList.length; i++) {
                console.log(visitedList[i].slice(1, -1));
            }
        } else {
            console.log("IMPOSSIBLE");
        }
    }

    distance(departStation, destStation) {

        let deslon = destStation.lon * (Math.PI / 180);
        let deplon = departStation.lon * (Math.PI / 180);
        let deslat = destStation.lat * (Math.PI / 180);
        let deplat = departStation.lat * (Math.PI / 180);

        let x = (deslon - deplon) * Math.cos(parseFloat((deplat + deslat)) / 2);
        let y = (deslat - deplat);
        let d = Math.sqrt((x * x) + (y * y)) * 6371;
        return d;
    }
}

let stations = new Stations();
stations.addStations(stopNames);
let network = new Network(stations);
network.updateLinks(routes);
console.error(startPoint);
console.error(endPoint);
console.error("*********");
let algorithm = new Algorithm(network);
algorithm.printVisitedList(algorithm.searchPath(startPoint, endPoint));

