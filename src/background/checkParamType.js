
function regCheckDomain(str){
    const checkDomain = /^([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*(\[\.\]|\.))+[a-zA-Z]{2,}$/.test(str);
    return checkDomain;
}

function regCheckIPAddr(str){
    const checkIPAddr = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\[\.\]|\.)){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(str);
    return checkIPAddr;
}

function regCheckHash(str){
    const checkMD5 = /(?:[^a-fA-F\d]|\b)([a-fA-F\d]{32})(?:[^a-fA-F\d]|\b)/.test(str);
    const checkSHA1 = /(?:[^a-fA-F\d]|\b)([a-fA-F\d]{40})(?:[^a-fA-F\d]|\b)/.test(str);
    const checkSHA256 = /(?:[^a-fA-F\d]|\b)([a-fA-F\d]{64})(?:[^a-fA-F\d]|\b)/.test(str);

    const checkHash = checkMD5 || checkSHA1 || checkSHA256;

    return checkHash;
}

export {regCheckDomain, regCheckIPAddr, regCheckHash};