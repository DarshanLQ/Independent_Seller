export const SortLDID = (rowA, rowB) => {

    const a = parseInt(rowA["LD ID"])
    const b = parseInt(rowB["LD ID"])

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;

}


export const SortCert = (rowA, rowB) => {
    const a = parseInt(rowA["Cert Num"])
    const b = parseInt(rowB["Cert Num"])

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;

}