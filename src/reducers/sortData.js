import moment from 'moment';

/**************************************
 * This module will return an array of hashes ordered by their date property with the following structure:
 * {
 *      date: String,
 *      games: Array<GameProperties> (see ./mapData.js for info on structure of GameProperties),
 * }
 * Each array of GameProperties is ordered by the home team district. Thus, 6A is
 * given priority over 5A and 3A II is given prioity over 3A III. TAPPS is placed below,
 * followed by Independent with any unaccounted for districts at the bottom of this list.
 ***************************************/

// Convert roman numerals to numbers
const fromRomanNumeral = str => {  
    let result = 0;

    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];

    for (let i = 0; i <= decimal.length; i++) {
        while (str.indexOf(roman[i]) === 0) {
            result += decimal[i];
            str = str.replace(roman[i],'');
        }
    }
    
    return result;
}

// Basic number sort to be used with Array.sort
const basicSort = (a, b) => {
    if (a > b) {
        return -1;
    } else if (b > a) {
        return 1;
    } else {
        return 0;
    }
}

// Higher order sort function used to sort TAPPS schools
const sortTAPPS = (dist1, dist2) => {
    const num1 = dist1.slice(dist1.lastIndexOf(' ') + 1);
    const num2 = dist2.slice(dist2.lastIndexOf(' ') + 1);

    let result = basicSort(num1.split('-')[0], num2.split('-')[0]);
    if (result === 0) {
        return basicSort(fromRomanNumeral(num1.split('-')[1]), fromRomanNumeral(num2.split('-')[1]));
    } else {
        return result;
    }
};

// Higher order sort function used to sort all classed schools (eg: 6A) by
// Class then roman numeral
const sortClass = (dist1, dist2) => {
    const arr1 = dist1.split('-');
    const arr2 = dist2.split('-');

    let result = basicSort(parseInt(arr1[1], 10), parseInt(arr2[1], 10));
    if (result === 0) {
        if (!arr1[2] && !arr2[2]) {
            return 0;
        } else if (arr1[2] && !arr2[2]) {
            return -1;
        } else if (!arr1[2] && arr2[2]) {
            return 1;
        } else {
            return basicSort(-fromRomanNumeral(arr1[2]), -fromRomanNumeral(arr2[2]));
        }
    } else {
        return result;
    }
};

// If no specific sort function exists, check to see if district is null. If so,
// put at bottom, otherwise just return.
const sortGutter = (dist1, dist2) => {
    const num1 = dist1 === 'null' ? -1 : 1;
    const num2 = dist2 === 'null' ? -1 : 1;
    return basicSort(num1, num2);
}

// Here we split the districts under each date into a hash of categories ("containers").
// All additional functions written above are used to sort these different categories
// At the bottom of sortByDistrict we concatenate all these ordered games back into a
// singe array and return a hash in the format of the expected module output.
const sortByDistrict = dateTree => {
    const keys = Object.keys(dateTree.districts);

    const containers = {
        tapps: [],
        independent: [],
        a: [],
        b: [],
        gutter: [],
    };
    
    // place the district keys into the containers.
    keys.forEach(key => {
        if (key.indexOf('TAPPS') !== -1) {
            containers.tapps.push(key);
        } else if (key.indexOf('Independent') !== -1) {
            containers.independent.push(key);
        } else if (key.split('-')[1] && key.split('-')[1].indexOf('A') === 1) {
            containers.a.push(key);
        } else if (key.split('-')[1] && key.split('-')[1].indexOf('B') === 1) {
            containers.a.push(key);
        } else {
            containers.gutter.push(key);
        }
    });

    // sort each container and then concatenate them in order of priority
    const games = [].concat(
        containers.a.sort(sortClass).reduce((res, dist) => res.concat(dateTree.districts[dist].games), []),
        containers.b.sort(sortClass).reduce((res, dist) => res.concat(dateTree.districts[dist].games), []),
        containers.tapps.sort(sortTAPPS).reduce((res, dist) => res.concat(dateTree.districts[dist].games), []),
        containers.independent.reduce((res, dist) => res.concat(dateTree.districts[dist].games), []),
        containers.gutter.sort(sortGutter).reduce((res, dist) => res.concat(dateTree.districts[dist].games), [])
    );

    return Object.assign({}, { 
        date: dateTree.date,
        games,
    });
};

// sort date strings from past to future
const sortDateKeys = keys => keys.sort((date1, date2) => moment(date1, 'YYYY-MM-DD') > moment(date2, 'YYYY-MM-DD') ? 1 : -1);

export default gameTree => {
    const sortedDates = sortDateKeys(Object.keys(gameTree));
    return sortedDates.map(key => sortByDistrict(gameTree[key]));
}
