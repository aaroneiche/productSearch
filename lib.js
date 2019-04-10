/* 
    filterKeyword takes an array of objects, and searches 
    for a keyword in the objects based on the provided field.
*/
filterKeyword = (searchSet, keyword, field) => {
    const keyMatch = new RegExp(keyword,'i');

    return searchSet.filter(item=>{
        return item[field].match(keyMatch);
    })
}


module.exports.filterKeyword = filterKeyword;