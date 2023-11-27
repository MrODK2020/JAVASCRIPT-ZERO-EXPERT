'use strict';
// default parameter 
// const bookings = [];

// const createBookings = function(flightNum, numPasseger =1, price='$60'){

//     const booking = {
//         flightNum,
//         numPasseger,
//         price,
    
//     }
//     console.log(booking);
//     bookings.push(booking);
// };

// createBookings('Ek632', 340 , '$32000');

//function accepting callbacks

const onWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(),...others].join(' ');
}
console.log(upperFirstWord('oluwsakin oluwadunsin'))

//higher order function
const transformer = function(str,fn) {
    console.log(`Original :${str}`);
    console.log(`transformed string : ${fn(str)}`);
    console.log( `transformed by : ${fn.name}`);

}

transformer('javascript is the best!',upperFirstWord);
transformer('javascript is the best!',onWord);

//function returning function

const greetings = function(greet){
    return function(name) {
        console.log(`${greet} ${name}`);
    };
}

const greeter = greetings('Hey!');
greeter('dunsin')
greeter('funke')

//arrow function returning another arrow function
const greettings = greets => name=> console.log(`${greets} ${name}`)


const greethello = greetings('hello')
greethello('seyi');
greethello('blessing');

// 

const  odk = {
    airline : 'odkAirWays',
    instaCode : 'OD',
    booking : [],

    book (flightNumm,name) {
        console.log(`${name} booked a seat on ${this.airline} flight with ${this.instaCode}
        ${flightNumm}`);
    this.booking.push({flight : `${this.instaCode}, ${flightNumm}` ,name})
    },
}
odk.book('367OD','OLUWADUNSIN KAYODE');
odk.book('245OD', 'SEYI FADAHUNSI');
console.log(odk);

const eurrowing = {
    airline:'euroeing',
    instaCode : 'EU',
    booking : [],
};

const book = odk.book;
//dose not work
// book(23, 'sarah joe');

// CALL METHOD
book.call(eurrowing, 23 ,'sarah JOE');
console.log(eurrowing);

book.call(odk, 321, 'OLUFUNKE OLORUNSOMO');
console.log(odk);

const swiss ={
    airline : 'swiss Air Ways',
    instaCode: 'SAW',
    booking : []
}

book.call(swiss, 890, 'blessing pelumi');
console.log(swiss);

//apply method 
 const flightData = [ 567, 'ajayi tomilola'];
 book.apply(swiss,flightData);
 console.log(swiss);
 book.call(swiss, ...flightData);

 //Bind method
 const bookEU = book.bind(eurrowing);
 bookEU(456 , 'david daniel')

 const bookEU23 =book.bind(eurrowing, 23);
 bookEU23('david mark');
 bookEU23('ayo fayose');

 //bind with event listeners 
 odk.planes = 300;
 odk.buyplanes = function() {
    console.log(this);

    this.planes++
    console.log(this.planes)
 };
 document.querySelector('.buy').addEventListener('click', odk.buyplanes.bind(odk));
 console.log(odk)

 // partial application 
 const addTax = (rate, value)=> value + value * rate ;
 console.log(addTax(0.1,200));

 const addVat = addTax.bind(null,0.23);
 console.log(addVat(100));
 console.log(addVat(200));

 //small challenge
 const addtax = function(rate) {
    return function(value){
       return value+ value * rate;
    }

 }

 const addvat = addtax(0.50)
 console.log(addvat(500 ));


   // small challenge 
 const greeters = greetung => {
     
 }

 //call
 const listOfCars = {
    model:"ferrari",
    price : "$500000",
    color : "red",
    ID: "FER110",

    Summary () {
        console.log(`the picked items IS ${this.model} with color of ${this.color}
         with current value at ${this.price} with tracking of ${this.ID}`)
    }
 }

 const listOfCars2 = {
    model:"bugati",
    price : "70000 ",
    color : "yellow",
    ID: "buga123",
 }
 
 const listOfCar = listOfCars.Summary;
listOfCar.call(listOfCars2,);
console.log(listOfCars2)

 //apply 

 // bind

const newMerge = listOfCar.bind(listOfCars2);
newMerge("toyota", 9000, "purple","to124"); 

//TASK
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        prompt(``)
    }
}

//IIFE
// normal function
const runOnce = function(){
    console.log(`i am feeling good`);
};

runOnce();

(function(){
    console.log(`i am good but hungry`)
})();

//IIFE IN ARROW
(()=> {
    console.log(`can only run once`);
})();

//closure
const secureBooking = function () {
    let passengerCount = 0;

    return function(){
        passengerCount++;
        console.log(`${passengerCount} passengers`)
    }
};

 const booker = secureBooking();
 booker();
 booker();
 

 let f ;

 const g = function(){
    const a = 23;

    f = function() {
       console.log(a * 2);
    }
 }


g();
f();
console.dir(f);

const boardPassengers = function(n , wait){
    const perGroup = n/3;

    setTimeout(function(){
        console.log(`we are now boarding all ${n} passengers`)
    }, wait * 1000);

        console.log(`there are 3 groups with ${perGroup} passengers`)

    console.log(`i will start bording in ${wait} seconds`)
}

boardPassengers(200,5);