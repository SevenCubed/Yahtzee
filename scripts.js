//TODO remake layout
//Variables
const unicodeDice = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
let result = []
let diceMap = [0,0,0,0,0,0]
const game = 1
const strCheck= (arr, target) => target.every(n => arr.includes(n));
let sumDice = 0
//Score object
const scores = {
    //add a subobject for the single die scores?
    trips : {
        name: 'Three of a Kind',
        flag: false,
        value: [sumDice],
        id: document.getElementById('trips'),
        locked: false,
        check: function(arr){
            return arr.some((n) => n >= 3);
        }
    },
    quads : {
        name: 'Four of a Kind',
        flag: false,
        value: [sumDice],
        id: document.getElementById('quads'),
        locked: false,
        check: function(arr){
            return arr.some((n) => n >= 4);
        }
    },
    fullHouse : {
        name: 'Full House',
        flag: false,
        value: 25,
        id: document.getElementById('fullHouse'),
        locked: false,
        check: function(arr){
            return ((arr.some((n) => n == 3) && arr.some((n) => n >= 2)) || arr.some((n) => n == 5));
        }
    },
    smallStr : {
        name: 'Small Straight',
        flag: false,
        value: 30,
        id: document.getElementById('smallStr'),
        locked: false,
        check: function(arr){
            return (arr.slice(0,4).filter((n) => n >= 1).length == 4 || arr.slice(1,5).filter((n) => n >= 1).length == 4  || arr.slice(2,6).filter((n) => n >= 1).length == 4);
        }
    },
    largeStr : {
        name: 'Large Straight',
        flag: false,
        value: 40,
        id: document.getElementById('largeStr'),
        locked: false,
        check: function(arr){
            return (arr.filter((n) => n == 1).length >= 5 && arr[0]!=arr[5]);
        }
    },
    yahtzee : {
        name: 'Yahtzee',
        flag: false,
        value: 50,
        id: document.getElementById('yahtzee'),
        locked: false,
        check: function(arr){
            return arr.some((n) => n == 5);
        }
    },
    chance : {
        name: 'Chance',
        flag: true,
        value: sumDice,
        id: document.getElementById('chance'),
        locked: false,
        check: function(arr){
            return true;
        }
    }
}

//Event Listener Functions
let previousEvent = 'empty';
function scoreClick() {
    document.getElementById(previousEvent).style.backgroundColor = 'transparent';
    document.getElementById(event.target.id).style.backgroundColor = 'salmon';
    previousEvent=event.target.id;
}

//Event listeners
document.getElementById('rollButton').addEventListener('click', roll, false);
for(const key of Object.keys(scores))
    {
        scores[key].id.addEventListener('click', scoreClick, false);
    }

//
function roll() {
    console.clear();
    //result = [1,6,3,4,3];
    diceMap = [0,0,0,0,0,0];
    for(i=0; i<5; i++){
    result[i] = Math.ceil(Math.random() * 6);
    diceMap[(result[i]-1)]++
    document.getElementById('dice'+(i+1)).innerHTML = unicodeDice[result[i]-1];
    }
//Upper Section
    for(i=1;i<7;i++){
        var id = game +'roll'+ i;
        document.getElementById(id).innerHTML = i*diceMap[(i-1)];
    }
sumDice = result.reduce((x, y) => x + y)   
console.log(sumDice)
scores.chance.value = sumDice;
scores.trips.value = sumDice; 
scores.quads.value = sumDice;
//Lower Section
for(const key of Object.keys(scores))
    {
        console.log(`${scores[key].name}? ${scores[key].check(diceMap)} which is worth ${scores[key].value}`);
        scores[key].id.innerHTML = scores[key].check(diceMap) ? scores[key].value : 0;
    }

}



/*
console.log('Result: ' + result);
console.log('Map: ' + diceMap);
console.log('SS ' + (strCheck(result, [3,4,5,6])||strCheck(result, [1,2,3,4])||strCheck(result, [2,3,4,5])) + ' 30'); //Small Straight(30)
console.log('LS ' + (strCheck(result, [2,3,4,5,6])||strCheck(result, [1,2,3,4,5])) + ' 40'); //Large Straight(40)
console.log('FH ' + (((diceMap.some((n) => n == 3) && diceMap.some((n) => n >= 2)) || diceMap.some((n) => n == 5))) + ' 25'); //Full House(25). Yahtzee is technically also a Full House, depending on the ruleset
console.log('YZ ' + diceMap.some((n) => n == 5) + ' 50'); //Yahtzee(50)
console.log('4k ' + diceMap.some((n) => n >= 4) + ' ' + sumDice); //Quads(sum)
console.log('3k ' + diceMap.some((n) => n >= 3) + ' ' + sumDice); //Trips(sum)
console.log('Ch ' + result.reduce((x, y) => x + y)); //Chance score
//Alt small straight using the mapped result. Only 3 possible results, which all result in a 1111+ dicemap, so I slice out the ends before checking.
console.log('SS ' + (diceMap.slice(0,4).filter((n) => n >= 1).length == 4 || diceMap.slice(1,5).filter((n) => n >= 1).length == 4  || diceMap.slice(2,6).filter((n) => n >= 1).length == 4) + ' 30')
//Alt large straight using the mapped result. 
console.log('LS ' + (diceMap.filter((n) => n == 1).length >= 5 && diceMap[0]!=diceMap[5]) + ' 40'); 
//There are only two possible BS maps, [0,1..] and [.. 1,0], so there is EITHER a 1 or 6. Checking for that to eliminate gapped straights 
*/




//Upper Section
//Aces, Twos, etc.
