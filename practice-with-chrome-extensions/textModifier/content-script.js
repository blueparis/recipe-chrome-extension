// console.log('content-script.js')
//
//
// let lines = document.getElementsByTagName('li')
// for (let i = 0, len = lines.length; i < len; i++) {
//     let substrings = ["regression","Regression"];
//
//     for (let j = 0, len = substrings.length; j < len; j++) {
//         let html = lines[i].innerHTML;
//         let substr = substrings[j];
//
//         let newHTML = html.replace(substr, `<s>${substr}</s> <b>rEgResSiOn</b>`);
//         lines[i].innerHTML = newHTML;
//
//     }
// }