/*Old standby
function gooi() {
    console.log('Er is gegooid');
    const worp = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0
    };
    var result = Math.floor(Math.random() * (7-1)+1);
    console.log(result);
    worp[result]++
    let randomArray = [];
    for(i=0;i<8;i++){
        randomArray[i] = Math.floor(Math.random() * (7-1)+1);
        worp[randomArray[i]]++;
    }
        console.log(randomArray);
        console.log(worp);
    //write to HTML, once for each dice result    
    for(i=1;i<7;i++){
        var id = 'worp'+i;
        document.getElementById(id).innerHTML = worp[i];
    }
    console.log('Einde worp')
}
*/
const unicodeDice = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
const result = []
function throwDice() {
    for(i=0; i<5; i++){
    result[i] = Math.ceil(Math.random() * 6);
    }
}
throwDice();
result.sort((a,b) => a - b)
console.log(result)
