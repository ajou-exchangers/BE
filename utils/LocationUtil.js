exports.buildSearchRegex = (searchParam) => {
    const searchTermWithoutSpaces = searchParam.replace(/\s/g, '');
    const searchRegexString = searchTermWithoutSpaces.split('').join('.*');
    return new RegExp(searchRegexString, 'i');
}