// Compare two arrays
// https://www.30secondsofcode.org/articles/s/javascript-array-comparison
export function equals(a, b) {
    return( a.length === b.length &&
    a.every((v, i) => v === b[i]));
}

// Remove an element from an array by value
// https://love2dev.com/blog/javascript-remove-from-array/
export function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele !== value;
    });
}

// Translate cube reference labels into coordinates that can be used in the matrix representation
// Cube row and column start at 1 whereas position is a zero-referenced range covering the whole grid
export function labelsToCoords(cube_level, row, column) {
    let level = 0
    if (cube_level === 'middle') {
      level = 1
    }
    else if (cube_level === 'bottom') {
      level = 2
    }

    return {
        level: level,
        position: (row - 1) * 5 + (column - 1)
    }
}

// Translate matrix coordinates into cube labels - see above
export function coordsToLabels(level, position) {
    let cube_level = 'top'
    if (level === 1) {
      cube_level = 'middle'
    }
    else if (level === 2) {
      cube_level = 'bottom'
    }
    return {
        cube_level: cube_level,
        row: position % 5 - 1,
        column: position / 5 - 1
    }
}

// Take any string and capitalise only the first letter
export function sentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

