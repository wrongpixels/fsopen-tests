const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}



const average = (array) => {
    return array.length === 0?0:array.reduce((acc, val) => acc + val, 0) / array.length;
};

module.exports = { average, reverse }