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
let result = []
let diceMap = [0,0,0,0,0,0,0]
const game = 1
let z = [0,1,2,3]
function roll() {
    result = [1,6,3,4,3];
    for(i=0; i<5; i++)
    {
    //result[i] = Math.ceil(Math.random() * 6);
    diceMap[(result[i])]++
    }
    for(i=1;i<7;i++){
        var id = game+'roll'+i;
        document.getElementById(id).innerHTML = i*diceMap[i];
    }
    console.log(result);
    console.log(diceMap);
    console.log('3s? ' + diceMap.some(n=>n>=3));
    console.log('4s? ' + diceMap.some(n=>n>=4));
    console.log('YAHTZEE?? ' + diceMap.some(n=>n===5));
    console.log('Full house? ' + (diceMap.some(n=>n===2)&&diceMap.some(n=>n===3)));
    console.log('Little straight ' )//+ (diceMap.filter(n => n >= 1).length >= 4));
    //console.log(result.some(b=>z.every(c=>result.includes(c+b)))) Why does this work?
    //console.log('Big straight? ' + //(diceMap.filter(n => n === 1).length === 5));
    console.log('Chance! ' + result.reduce((acc, cv) => acc + cv));
    diceMap = [0,0,0,0,0,0,0];
}








//console.log('BREAKPOINT')
