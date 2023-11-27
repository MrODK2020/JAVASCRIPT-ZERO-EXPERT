// 'use strict';

// function calcAge (birthyear) {
//     const age = 2023 - birthyear;

//     function prinyAge() {
//         const  output = `you are ${age} born in ${birthyear}`
//         console.log(output)
//     }

//     prinyAge();

//     console.log(firstName);
//     return age
// }

// const firstName = "odk";
// calcAge(1998);



//hoisting in practice 
//variable
// console.log(me);
// // console.log(job);
// console.log(year);

// var me = "odk";
// let job = "dev";
// const year = 1998;


// function

// console.log(addDecl(5,3));

// console.log(addExp(5,3));

// console.log(addArrw(5,3));


// function addDecl (a,b) {
//     return a +b ;

// }
// const addExp = function (a,b) {
//     return a + b;
// }

// const addArrw = (a,b) => a+b ;


// // this keyword

// console.log(this);

// const  odk = {
//     firstName : "dunsin",
//     job: "dev",
//     year: 1998,
//     calcAge:function(){
//         console.log(2023 - this.year);
//     }

// }

// odk.calcAge()

// const anotherOdk = {
//     year: 2017,
// }


// anotherOdk.calcAge = odk.calcAge;
// anotherOdk.calcAge();


// const  odk = {
//     firstName : "dunsin",
//     job: "dev",
//     year: 1998,
//     calcAge:function(){
//         console.log(2023 - this.year);

//     const isMillenum = function (){
//         console.log (this.year >= 1981 && this.year <= 1998)    
//         };  
    
//         isMillenum();
//     }
    

// }

// odk.calcAge();

//argument keyword
const addExp = function(a,b) {
    console.log(arguments)
    return a + b
}

addExp(2,4,5,6);

//PRIMITIVES AND OBJECT(REFRENCE)

let lastName = 'KAYODE';
let oldLastName  = lastName;
lastName = 'oluwadunsin';

console.log(lastName);
console.log(oldLastName);



const funky = {
    firstName : "olufunke",
    lastName : "Aanuoluwa",
    age:25,
}

const addedFunky = Object.assign({}, funky);
addedFunky.lastName = "oluwasakin";

console.log("before",funky);
console.log("after",addedFunky);


















