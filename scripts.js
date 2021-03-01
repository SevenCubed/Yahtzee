/*TODO  - remake layout 
        - validate score function
        - 3 throw max, but not min
        - consolidate upper and lower?
*/
//Variables
const unicodeDice = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
let lockedDice = [false, false, false, false, false, false];
let result = [1,2,3,4,5];
let diceMap = [1,1,1,1,1,0];
let game = 1;
let sumDice = 0;
let rollNumber = 0;
let totalScore = 0;
//Score objects
const lowerScores = {
    trips : {
        name: 'Three of a Kind',
        flag: false,
        get value(){
            return sumDice;
        },
        id: document.getElementById('trips'),
        locked: false,
        check: function(arr){
            return arr.some((n) => n >= 3);
        }
    },
    quads : {
        name: 'Four of a Kind',
        flag: false,
        get value(){
            return sumDice;
        },
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
            return ((arr.some((n) => n == 3) && arr.some((n) => n == 2)) || arr.some((n) => n == 5));
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
        get value(){
            return sumDice;
        },
        id: document.getElementById('chance'),
        locked: false,
        check: function(arr){
            return true;
        }
    }
}
const upperScores = {
    ones: {
        name: 'Ones',
        flag: false,
        get value(){
            return 1*diceMap[(0)];
        },
        id: document.getElementById('ones'),
        locked: false,
        check: function(arr){
            return true;
        }
    },
    twos: {
        name: 'Twos',
        flag: false,
        get value(){
            return 2*diceMap[(1)];
        },
        id: document.getElementById('twos'),
        locked: false,
        check: function(arr){
            return true;
        }
    },
    threes: {
        name: 'Threes',
        flag: false,
        get value(){
            return 3*diceMap[(2)];
        },
        id: document.getElementById('threes'),
        locked: false,
        check: function(arr){
            return true;
        }
    },
    fours: {
        name: 'Fours',
        flag: false,
        get value(){
            return 4*diceMap[(3)];
        },
        id: document.getElementById('fours'),
        locked: false,
        check: function(arr){
            return true;
        }
    },
    fives: {
        name: 'Fives',
        flag: false,
        get value(){
            return 5*diceMap[(4)];
        },
        id: document.getElementById('fives'),
        locked: false,
        check: function(arr){
            return true;
        }
    },
    sixes: {
        name: 'Sixes',
        flag: false,
        get value(){
            return 6*diceMap[(5)];
        },
        id: document.getElementById('sixes'),
        locked: false,
        check: function(arr){
            return true;
        }
    }
}
//Event listeners
document.getElementById('rollButton').addEventListener('click', roll);
document.getElementById('confirmButton').addEventListener('click', confirm);
for(const key of Object.keys(lowerScores)){
    lowerScores[key].id.addEventListener('click', scoreClick);
}
for(const key of Object.keys(upperScores)){
    upperScores[key].id.addEventListener('click', scoreClick);
}
for(i=1;i<6;i++){
    document.getElementById('dice'+i).addEventListener('click', diceClick);
}
//Event Listener Functions
let previousEvent = 'chance';
function scoreClick() {
    document.getElementById(previousEvent).style.backgroundColor = 'transparent';
    document.getElementById(event.target.id).style.backgroundColor = 'salmon';
    previousEvent=event.target.id;
}
function diceClick() {
    lockedDice[event.target.id.substring(4)] = !lockedDice[event.target.id.substring(4)];
    document.getElementById(event.target.id).style.color = lockedDice[event.target.id.substring(4)] ? 'red' : 'black';
    console.log(`Die number ${event.target.id.substring(4)} was just clicked. Its status is now ${lockedDice[event.target.id.substring(4)] ? 'locked' : 'unlocked'}.`);
}
function confirm() {
    console.log('Confirming scores and resetting the dice...');
    rollNumber = 0;
    console.log(previousEvent)
    console.log(lowerScores[previousEvent].name);
    upperScores[previousEvent].locked = true;
    lowerScores[previousEvent].locked = true;
    totalScore += upperScores[previousEvent].value;
    document.getElementById(previousEvent).style.backgroundColor = 'transparent';
    console.log(totalScore);
    document.getElementById('rollButton').addEventListener('click', roll);
    for (i=1; i<6; i++){
        lockedDice[i] = false;
        document.getElementById('dice'+i).style.color = 'black';
    }
    document.getElementById('rollButton').innerHTML = `Roll! (${3-rollNumber})`;
}
function roll() {
    rollNumber++
    console.clear();
    diceMap = [0,0,0,0,0,0];
    for(i=0; i<5; i++){
        result[i] =  lockedDice[i+1]!=true ? Math.ceil(Math.random() * 6) : result[i];
        diceMap[(result[i]-1)]++;
        document.getElementById('dice'+(i+1)).innerHTML = unicodeDice[result[i]-1];
    }
//Upper Section
    for(const key of Object.keys(upperScores)){
        upperScores[key].id.innerHTML = upperScores[key].value;
    }
sumDice = result.reduce((acc, cv) => acc + cv);
//Lower Section
for(const key of Object.keys(lowerScores))
    {
        console.log(`${lowerScores[key].name}? ${lowerScores[key].check(diceMap)} which is worth ${lowerScores[key].value}`);
        lowerScores[key].id.innerHTML = lowerScores[key].check(diceMap) ? lowerScores[key].value : 0;
    }
document.getElementById('rollButton').innerHTML = `Roll! (${3-rollNumber})`;
if (rollNumber >= 3){document.getElementById('rollButton').removeEventListener('click', roll);}

}


/* Score check reference
//const strCheck= (arr, target) => target.every(n => arr.includes(n)); Unnecessary Straight Check
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