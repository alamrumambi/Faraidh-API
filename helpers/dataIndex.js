function dataIndex (stringArr, param, arr) {
    let result = -1;
    for (let i in arr) {
        for (let j in stringArr) {
            if(arr[i][param] === stringArr[j]) {
                result = +i;
                break;
            } 
        }
        if (result !== -1) break;
    }
    return result;
}

module.exports = dataIndex;