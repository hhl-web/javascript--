// getElementsByTagName


function getAllTags(){
    const tags =document.getElementsByTagName('*');
    const result =[];
    for(let i=0;i<tags.length;i++){
        const tagName =tags[i].localName;
        if(!result.includes(tagName)){
            result.push(tagName)
        }
    }
    return result;
}