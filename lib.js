/* 
    filterKeyword takes an array of objects, and searches 
    for a keyword in the objects based on the provided field.
*/
const filterKeyword = (searchSet, keyword, field) => {
    const keyMatch = new RegExp(keyword,'i');

    return searchSet.filter(item=>{
        return item[field].match(keyMatch);
    })
}
/* 
delay 
*/
async function delay(length) {
    return await new Promise(resolve=>{
        setTimeout(function(){
            resolve();
        }, length);
    })
}

module.exports.delay = delay;
module.exports.filterKeyword = filterKeyword;