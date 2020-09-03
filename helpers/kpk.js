function kpk(findKPK, pembilangSementara) {
    findKPK.sort((a, b) => b - a);
    let count = findKPK[0];
    let clearAll = false;
    while (clearAll === false) {
        clearAll = true;
        if (pembilangSementara % count === 0) {
            for (let i in findKPK) {
                if (count % findKPK[i] !== 0) {
                    clearAll = false;
                    count++;
                    break;
                }
            }
        }
        else {
            clearAll = false;
            count++;
        }
    }
    return count;
}

module.exports = kpk;
