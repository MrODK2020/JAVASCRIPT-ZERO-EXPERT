'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

  const openingHours = {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  };


// // Dat needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order (starterIndex, mainIdex) {
          return [this.starterMenu[starterIndex], this.mainMenu[mainIdex]];

  },

// spred opertor with function
  orderPasta (ing1 , ing2 , ing3) {
      console.log(`here is your delicious pasta with ${ing1} ,${ing2},${ing3}`)

  },
//Enhanced object literals
  openingHours,

 
};

// // destruturing object

//   // const {name, openingHours, categories} = restaurant;
//   // console.log(name,openingHours,categories);
 
//   // destructuring with different name i.e changing the property name

//   const { 
//     name : restaurantName ,
//     openingHours:Hours ,
//     categories : tag
//   } = restaurant
//   console.log(restaurantName,Hours,tag);

// //default destructuring 
//   const { menu = {}, starterMenu : starters ={} } = restaurant
//   console.log(menu ,starters);


//   //mutating varaible  values
//   let r = 123;
//   let t = 342;
//   const obj = { r:12, t:16 ,};
//   ({r,t} = obj);
//   console.log(r,t);

//   //nested obj
//   const {fri: {close:d, open: o}} = openingHours;
//   console.log(d,o);










// // destructing array 

// //normal array
// const arr = [ 1,2,3];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// console.log(b)

// //destructuring
// const [x,y,z] = arr;
// console.log(x,y,z);

// let [main, , , secondary] = restaurant.categories;
// console.log(main,secondary);

// //switch between variables in destructuring 

// //without destructuring 

// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main ,secondary)

// // with destructuring
// [main , secondary] = [secondary, main];
// console.log(main ,secondary)

// //recived two return value from a function
// const [starter , mainfood] = (restaurant.order(2,0));
// console.log(starter,mainfood);

// // nested array 
// const num = [1,2,4, [5,6]];
// const [q , ,  , w ] = num;
// console.log(q,w);

// //nested destructing 
// const numDigit = [1,2,4, [5,6]];
// const [e, f ,g ,h , i] = numDigit;
// console.log(e, f ,g ,h );

// //default value
// const [j,k,l=1]=[8,9]
// console.log(j,k,l);


// // THE SPREAD OPERATOR
// //without spreed (...)
// const arrNew = [ 7,8,9];
// const arrBad = [1,2, arrNew[0],arrNew[1],arrNew[2]];
// console.log(arrBad);

// //with spread(...)

// const newArr = [1,2, ...arrNew];
// console.log(newArr);

// //more examples by adding new array to our main menu 

// const newMenu = [...restaurant.mainMenu , 'iyan']
// console.log(newMenu);

// //Two use cases of spread operator 
// // 1 copy array 
// // 2 merge two array

// // copy array
//  const mainMenuCopy = [ ...restaurant.mainMenu];
//  console.log(mainMenuCopy);

//  // merge or join two arrays 
//  const mergeArrays = [...restaurant.mainMenu, ...restaurant.starterMenu];
//  console.log(mergeArrays);

//  //ITERABLE : array,string ,maps,sets but not object .
//  //string and (...) operator

//  const str = "oluwadunsin";
//  const letters = [...str];
//  console.log(letters);

// const recipe = [prompt("let create your pasta recipe - add ingrident 1"),
//                 prompt("input ingrident 2"),
//                 prompt("input your third ingrident")
// ];

// console.log(recipe);

// restaurant.orderPasta(recipe[0],recipe[1],recipe[2]);
// restaurant.orderPasta(...recipe);

// //object and spread operator 

const newResturant = { founder : "odk",...restaurant};
newResturant.location = "ADO, IBADAN,LAGOS"
console.log(newResturant.location);
 console.log(restaurant.location);

// //REST PATTERN

const arry = [1,3,4,5,6, ...[9,8,10]];//spread operator because it comes after the assignment operator = (the right side)
console.log(arry);
const [n,m, ...others] = [1,2,3,4,5] // rest pattern because it at left side of the assignment operator = 
console.log(n,m,others);

// //using both rest and spread on both side 
// const [pizza , , risotto, ...othersfood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(pizza,risotto,othersfood);

// // REST PATTERN AND OBJECT 
//  const {sat, ...weekdays} = restaurant.openingHours;
// console.log(sat, weekdays);

// //rest nd functions (rest parameters)

// const add = function (...numbers){
//   let sum = 0;
//   for (let i = 0; i<numbers.length; i++)
//     sum += numbers[i];
//     console.log(sum);
// }

// add(2,3);
// const v = [10,10,10]
// add(...v);


//Short circutting ...
//logical operator use any data type,return any data type and short circuiting 
console.log(`--- OR----`)
console.log( 3 || "odk");
console.log("" || "ODK");
console.log(true|| 0);
console.log(undefined || null)

 console.log(`--- AND ----`)
 console.log(0 && "odk");
 console.log(7 && "odk");
 
 console.log("hello" && 23 && null && "odk")


  //NULLISH OPERATOR 
 //normal OR operator
 const numGuess= 0;
 const guess = numGuess || 10;
 console.log(guess);

//with nullish operator
//nullish operator includes null and undefined not 0 or '')
 const guessCorrect = numGuess ?? 10;
 console.log(guessCorrect);

//  // logical operator
//  const rest1 = {
//   name : "funky",
//   numQuess : 20,
//  }

//  const rest2 = {
//   name : "Anny",
//   owner  : "odk",
//  }
//  //OR ASSIGNMENT OPERATOR
// //  rest1.numQuess = rest1.numQuess || 10;
// //  rest2.numQuess = rest2.numQuess || 10;

//  rest1.numQuess ||= 10;
//  rest2.numQuess ||= 10;

//  console.log(rest1);
//  console.log(rest2);

 

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },

// };

// //challenge 
// //task 1
// const [players1, players2] = game.players;
// console.log(players1,players2);

// //task 2
// const [gk, ...fieldplayers] = [...players1];
// console.log(gk,fieldplayers);

// // task 3
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// //task 4
// const playersFinal = [...players1, 'thiago', 'courtiho','peresic'];
// console.log(playersFinal);

// //task 5
// const {odds: {team1, x:draw,team2}}= game;
// console.log(team1, draw, team2);

// //FOR OF LOOP

// // const foodMenu = [...restaurant.mainMenu,...restaurant.starterMenu];

//  for(let i =0; i<foodMenu.length; i++) {
//   console.log(foodMenu[i]);
// }

// for(const foodList of foodMenu) console.log(foodList);

// for (const foodList of foodMenu.entries()){
//   console.log(foodList);
// }

// //enhanced object literals
// console.log(restaurant);

// //Lopping objects: object.keys,object.value, object.entries

// //property name
// const properties = Object.keys(openingHours);
// console.log(properties);

// for (const day of properties) {
//   console.log(day)
// }

// //property value
// const values = Object.values(openingHours);
// console.log(values)

// //entries object 
// const entries = Object.entries(openingHours);
// console.log(entries);

// challenge 
//task1

// for (const [i,players] of game.scored.entries())
//      console.log(`Goal${i +1}: ${players}`);
 

// //2 
// const odds = Object.values(game.odds);
// let average = 0;

// for (const odd of odds)
//   average += odd ;
//   average /= odds.length;
//   console.log(average);

//   // 3
//   for(const [team , odds] of Object.entries(game.odds)) {
//     const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`
//     console.log(`ODDS of ${teamStr} ${odds}` )
//   }
  
  //SET 
  const orderPhone = new Set([
    'samsung',
    'iphone',
    'samsung',
    'redmi',
    'oppo',
    'iphone',
  ]);
  console.log(orderPhone);
  console.log(orderPhone.size);
  console.log(orderPhone.has('lenovo'));//false
  console.log(orderPhone.has('oppo'));//true
  orderPhone.add('Nokia');
  orderPhone.delete('redmi');
  console.log(orderPhone);

  for(const order of orderPhone) console.log(order);

  //Examples 
  //solve duplicates arrays 
const afroBeatSingers = ['davido','olamide','wizkid','burnaboy','davido','olamide','rema','fireboy','rema'];
console.log(afroBeatSingers);
const solveDuplicate = [...new Set(afroBeatSingers)];
console.log(solveDuplicate);

console.log(new Set('oluwasakinoluwadunsin').size);

//maps
const eaterys = new Map();
eaterys.set('name', 'chickenRep');
eaterys.set(1, 'nova-junction');
eaterys.set (2, 'odo-Ado');
eaterys.set('categories',['jollof-rice', 'bucket-chicken', 'chiv -icecream']);
eaterys.set('open',8);
eaterys.set('close',12);
eaterys.set(true, 'we are open :D');
eaterys.set(false, 'we are close :D');

//to retreive data from the map we use get()
console.log(eaterys.get('name'));
console.log(eaterys.get(1));
console.log(eaterys.get('categories'));

console.log(eaterys.has('categories'));
eaterys.delete(2);
console.log(eaterys);

//maps iteration
const quiz = new Map([
  ['Question', 'what is the best programming language in the world ?'],
  [1, 'C'],
  [2, 'JAVA'],
  [3, 'JAVASCRIPT'],
  ['correct', 3],
  [true, 'correct!'],
  [false, 'try again!']
])

console.log(quiz);

//convert object to map
const hourMap = new Map(Object.entries(openingHours));
console.log(hourMap);

//quiz
console.log(quiz.get('Question'));
for(const [key,value] of quiz){
   if (typeof key === 'number') 
  console.log(`Answers ${key} : ${value}`);
}

const answer =Number(prompt('your answer'));
console.log(answer);
 answer === 3 ? console.log(quiz.get(true)) : console.log(quiz.get(false));
// another way
console.log(quiz.get(quiz.get('correct') === answer));

//challenge 

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

console.log(gameEvents);
//task 1
const events = [...new Set(gameEvents.values())]
console.log(events);

//task2

 gameEvents.delete(64);
 console.log(gameEvents);

 //task 3
 console.log ( `an events happens on average every ${90/gameEvents.size} mintues`)

 const time =[...gameEvents.keys()].pop();
 console.log(time);

 console.log(`an events happens on average every ${time/gameEvents.size} mintues`)

 //task 4 
 
 for(const [min , value] of gameEvents) {
  const half = min <45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min} : ${ value}`)

 }

 //working with strings
 const airline = 'QATAR AIRWAYS';
 

 console.log(airline[0]);
 console.log(airline.length);
 console.log(airline.indexOf('A'));
 console.log(airline.lastIndexOf('A'));
 console.log(airline.slice(6));
 console.log(airline.toLowerCase());

 const email = 'oluwasakindunsin@gmail.com';
 const loginEmail = ' OLuwasakin@gmail.com ';
 console.log(loginEmail.length);

 const lowerEmail = loginEmail.toLowerCase();
 const trimEmail = loginEmail.trim();
 console.log(trimEmail.length);

 //replacing 

 const priceUk = '234,45$';
 const priceNg = priceUk.replace('$','N').replace(',', '.')
 console.log(priceNg);

 const announcement = 'All passenger come to boarding door 23.Bording door 23'

 console.log(announcement.replaceAll('door', 'gate'))

 //booleans 
 const plane = 'A30CB'
 console.log(plane.includes('A30'));

 //split
 console.log('oluwasakin oluwadunsin'.split(' '))

const [firstName , lastName] = 'oluwasakin oluwadunsin'.split(' ');

const newName = ['MR.',firstName , lastName.toUpperCase()].join(' ');
console.log(newName);

//challenge
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener
('click', function(){
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  console.log(rows);

  for (const row of rows) {
    const [first ,second] = row.toLowerCase().trim().split('_');

    const output = `${first} ${second.replace(second[0], second[0].toUpperCase())}`;
    console.log(output.padEnd(20))
  }
});

