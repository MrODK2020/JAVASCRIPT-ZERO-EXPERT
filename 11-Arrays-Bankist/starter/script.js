'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// personal solution

const displayMovement = function(movements , sort=false){

  
  containerMovements.innerHTML= '';

  const movs = sort ? movements.slice().sort((a,b) => a- b) : movements
  
  movs.forEach(function(mov, i){
  const type = mov > 0 ? "deposit" : "withdrawal";

  const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov} €</div>
 </div
`;

containerMovements.insertAdjacentHTML("afterbegin", html)

});
};

const displayBalance = function(acc) {
  acc.balance = acc.movements.reduce(function(acc, mov){
    return acc + mov 
  }, 0);
  labelBalance.textContent =`${acc.balance} €`
}


const displaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov, 0);
  labelSumIn .textContent = `${incomes}€`;

  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const intrest =acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate)/100) 
  .filter(int => int >= 1)
  .reduce((acc, int) => acc+ int ,0);
  labelSumInterest.textContent = `${intrest} €`;

}

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);


const upDateUi = function(acc){
   // display movements
   displayMovement(acc.movements)
   // display balance
       displayBalance(acc)
   // display summary
   displaySummary(acc)
  
}

// EVENT HANDLER
 let currentAccount ;

btnLogin.addEventListener('click', function(e){

  e.preventDefault();

  currentAccount= accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount.pin === Number(inputLoginPin.value)){
      // display Ui welcome message
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ') [0]}`;
      containerApp.style.opacity = 100;
      // clear inputfeild
       inputLoginUsername.value =inputLoginPin.value = '';

     upDateUi(currentAccount);
  }
})
// implementing transfer
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && receiveAcc && currentAccount.balance >= amount && receiveAcc ?.username !== currentAccount.username ){
    //doing the transfer    
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);
    //update the ui
    upDateUi(currentAccount);      

  }

})

// some // request loan
btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    //adds movement
    currentAccount.movements.push(amount);

    // update ui
    upDateUi(currentAccount);
  }
  inputLoanAmount.value = '';

})

//findindex
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  // console.log('delete');
  if(inputCloseUsername.value === currentAccount.username &&  Number(inputClosePin.value) === currentAccount.pin) {
    console.log(`correct✅`);
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    //delete accounts
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  };
  inputCloseUsername.value =inputClosePin.value = '';

})

//sorting

let sorted ;
btnSort.addEventListener('click', function(e){
  e.preventDefault()
  displayMovement(currentAccount.movements, !sorted);
  sorted =!sorted;
});



 

 



// const createUserName = function(user) {
//   const userName = user
//   user.toLowerCase()
//   .split( ' ')
//   .map(name => name[0])
//   .join('');
//   return userName; 
// }

// console.log(createUserName('Steven Thomas Williams'));

const user = 'Steven Thomas Williams' //stw
const userName = user.toLowerCase().split( ' ').map(name => name[0]) .join('')
console.log(userName)

//Tutorial work

// const displayMessage = function(movements) {
//   containerMovements.innerHTML = '';

//   movements.forEach(function(mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";

//     const html = `
//     <div class="movements__row">
//       <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//       <div class="movements__value">${mov}</div>
//     </div>
//     `;

//     containerMovements.insertAdjacentHTML('afterbegin', html)
    
//   });
// };

// displayMessage(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//slice
let arr = ['A','B','C','D','E','F'];
console.log(arr.slice(4));
console.log(arr.slice(2, 6));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);
console.log(arr);

//SPLICE
console.log(arr);
// console.log(arr.splice(2));
console.log(arr);
console.log(arr.splice(1,2));

// reverse
let arr1 = [1,2,3,4,5,6];
console.log(arr1.reverse());

//concat
let letters = arr.concat(arr1);
console.log(letters);

//JOIN
arr.join('-')

//at method

const arr3 = ["book", "pen", "movie"]
console.log(arr3[0]);
console.log(arr3.at(1));

//getting the last element
console.log(arr3[arr3.length-1]);


//for each method

 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//for of
for(const movement of movements){
  if(movement > 0 ) {
    console.log(`you deposited ${movement}`)
  }
  else {
    console.log(`you withdrew ${Math.abs(movement)}`)
  }
}

console.log(`---FOREACH----`)
movements.forEach(function(mov, i , arr){
  if(mov> 0 ) {
    console.log(`${ i + 1 }you deposited ${mov}`)
  }
  else {
    console.log(` ${i +1} you withdrew ${Math.abs(mov)}`)
  }
})

// //understand for each 
// const shoesDesigners = ['nike', 'addidas','gucci','dior'] 
// console.log(shoesDesigners);

// shoesDesigners.forEach(function(anything , i ){
//   if(anything === "nike"&& "addidas"){
//     console.log(`${anything[i]} and ${anything[i]} is my preferred designers`)
//   }
//   else{
//     console.log(`${anything.at(i)} is not a bad choice`)
//   }
// });

// for each with map

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const currencies = new Map([
  ['USD', 'United States dolLar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterlling'],
]);
//map
currencies.forEach(function(value, key, map){
  console.log(`${key} : ${value}`)
});

//
// let arra = [1, 2, 3];
// let newarra = arra;
// newarra.push(4);

// console.log(arra.length);
// console.log(newarra.length);

//challenge

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate =  [4, 1, 15, 8, 3];
// console.log(dogsJulia);

const checkDogs = function(dogsJulia,dogsKate){
  const dogsJuliaCopy = [...dogsJulia];
  dogsJuliaCopy.shift(1);
  dogsJuliaCopy.splice(-2)
  const dogsjuliaKate = [...dogsJuliaCopy,...dogsKate];
  dogsjuliaKate.forEach(function(dogsAge , i){
  if (dogsAge >= 3 ) {
    console.log(`dog number ${i + 1 } is an adult, and it is ${dogsAge} year old `)
  }
  else {
    console.log(`dog number ${i + 1 } is a still a puppy , and it is ${dogsAge} year old `)
  }
 })
  
} 

checkDogs(dogsJulia,dogsKate);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// map method

const euroUsd = 1.1;

const conMovements = movements.map(function(mov){
  return mov * euroUsd;

});

console.log(conMovements);

// for of method
const movementsUSSD = []
for(const mov of movements) movementsUSSD.push(mov * euroUsd);
console.log(movementsUSSD);

// map and arrow function
const convertMovments = movements.map(mov => mov * euroUsd)

 const movementDescription = movements.map((mov,i, arr) =>
 `Movement ${i + 1} : you ${mov > 0 ? 'deposited': 'deposited'}`);

 console.log(movementDescription);

 //filter method

 const deposit = movements.filter(function(mov){
  return mov > 0;
 })
 console.log(movements);
 console.log(deposit);

const withdrawal= movements.filter(function(mov){
  return mov < 0;
 })

 console.log(withdrawal);

 

 //reduce 
 console.log(movements);

 const total =movements.reduce(function(acc, cur, i, arr){
  console.log(`intration ${i}: ${acc}`)
  return acc + cur;
 },0);

 console.log(total);

 // 
 let balace = 0;
 for (const mov of movements) balace += mov;
 console.log(balace);

 // reduce for maximum num
  const maxi =  movements.reduce(function(acc, mov){
    if(acc > mov) return acc;
    else return mov ;
  }, movements[0]);

console.log(maxi);
// shorter form
const maxi1 = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0]);
console.log(maxi1); 


// challenge
// const calcAverageHumanAge = function(ages){
//   let humanAge = 0;
//   let dogAge= 0;
//   const calcDogHumanAge = ages.map(function(curA, i){
//     if (curA <=2) {
//       return humanAge = 2 * dogAge; 
//     }
//     else if (curA > 2){
//       return humanAge = 16 + dogAge + 4 ; 
  
//     }
//     console.log(calcDogHumanAge);
//   })

//  const dogLess18 = calcDogHumanAge.filter(function( cur ){
//     if( cur > 18 ){
//       return dogLess18;
//     }
//     console.log(dogLess18);
//   })

//   const calcAverage = calcDogHumanAge.reduce(function(acc, cur, i){
//     if(cur / 2) return acc;

//   })
//   console.log(calcAverage);

// }

// calcAverageHumanAge([5,2,4,1,15,8,3]);

// //correction
// const calcAverageHumanAge = function(ages){
//   const humanAge = ages.map(age =>(age <=2 ? 2 * age : 16 + age * 4 ));
//   const adult = humanAge.filter(age => age >= 18 )
//   console.log(adult);
//   console.log(humanAge);

//   const average = adult.reduce((acc,age)=> acc+age, 0)/adult.length;
//   console.log(average);
// }

// calcAverageHumanAge([5,2,4,1,15,8,3]);

const eurToUsd = 1.1;

const totalDepositUsd = movements.filter(mov => mov > 0).map(mov => mov  * eurToUsd)
.reduce((acc, mov)=> acc + mov ,0);
console.log(totalDepositUsd);


//challenge
const calcAverageHumanAge = ages => ages
.map(age => (age <=2 ? 2* age : 16 + age * 4))
.filter(age => age >=18)
.reduce((acc,age, i, arr) => acc+ age/arr.length ,0);

 
calcAverageHumanAge([5,2,4,1,15,8,3]);
calcAverageHumanAge([16,6,10,5,6,1,4]);

// find method
const findmov = movements.find(mov => mov < 0 );
const filterMove = movements.filter(mov => mov < 0);
console.log(findmov);
console.log(filterMove);
console.log(movements);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for(const acct of accounts) {
  acct.owner === 'Jessica Davis';
  console.log(acct);
}

// some and every
console.log(movements);
// equality
console.log(movements.includes(-130));
//condition
 const depositMade = movements.some(mov => mov > 0);
 console.log(depositMade);

//every
const deposited = movements.every(mov => mov > 0);
console.log(deposited);

//flat 
const numArr = [[1, 2 ,3] , [4,5,6], 7, 8 ,9];
console.log(numArr.flat());

const addAllArray = accounts.map(acc => acc.movements).flat().reduce((acc,mov) => acc + mov)
console.log(addAllArray);

const addAllArray2 = accounts.flatMap(acc=>acc .movements).reduce((acc,mov)=> acc + mov);
console.log(addAllArray2);

// sorting 
//strings
const owners = ['zainab', 'kayode', 'seyi','iyanu']
console.log(owners.sort());
console.log(owners);

//num
console.log(movements);
console.log(movements.sort());

//filling and creating method 

// normal array 
let n = [1,,2,3,4,5]

let no = new Array(5)
console.log(no);
no.fill(8, 2,4)
console.log(no);

//Array.from
const numArry = Array.from({length:30}, () => 12);
console.log(numArry);

// more practice on array method
// 1.
const bankDepositSum = accounts
.flatMap(acc => acc.movements)
.filter(cur => cur > 0)
.reduce((sum, cur) => sum + cur,0)
console.log(bankDepositSum);

// 2
const numDeposit1000 = accounts.flatMap(acc => acc.movements).filter(acc => acc > 1000).length;
console.log(numDeposit1000)

//coding challenge
//TEST DATA
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

//1
// dogs.forEach(dog => (dog.recFood =  Math.trunc(dog.weight ** 0.75 * 28)));
// console.log(dogs);

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)))
console.log(dogs);

//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
 if(dogSarah.curFood > dogSarah.recFood){
  console.log(` Sarah Dog is Eating too much`)
 }

// 3 
 const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).map(dog => dog.owners).flat();
 console.log(ownersEatTooMuch);

 const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
 console.log(ownersEatTooLittle);

 //4

 console.log(`${ownersEatTooMuch .join(' and ')}'s dog eat too much `);
 console.log(`${ownersEatTooLittle.join(' and ')} 's dog eat too little`);

 //5
 console.log(dogs.some(dog => dog.curFood ===dog.recFood));
 //6


 

