'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-10-17T14:11:59.604Z',
    '2023-10-18T17:01:17.194Z',
    '2023-10-19T23:36:17.929Z',
    '2023-10-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
 
const formatMovementDate = function(date , locale){
    const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(),date)
    console.log(daysPassed);

    if(daysPassed === 0) return 'Today';
    if(daysPassed === 1) return 'Yesterday';
    if(daysPassed <= 7) return `${daysPassed} days ago`;
    // else {
    //   const day = `${date.getDay()}`.padStart(2,0);
    //   const month =`${date.getMonth() +1}`.padStart(2, 0);
    //   const year = date.getFullYear();
    //   return`${day}/${month}/${year}`;
    // }
    return new Intl.DateTimeFormat(locale).format(date)
  };
  
  //formating curr
  const formatCur = function(value,locale,currency) {
    return new Intl.NumberFormat(locale, {
      style : 'currency',
      currency : currency,
    }).format(value)
  };

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
       <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out),acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


const startLogOutTimer = function() {
  // set time to 5 min
  let time = 100;
  // call the timer every second
  const timer = setInterval(()=> {
    const min = String(Math.trunc(time / 60)).padStart(2,0);
    const sec = time % 60;
    // in each call , print the remaining time to Ul
      labelTimer.textContent =`${min} : ${sec}`
      
      //decrease time 
      time--;

      //when 0 secs,stop timer and logout user
      if(time === 0) {
        clearInterval(timer)
        labelWelcome.textContent = 'Login to get started'
        containerApp.style.opacity = 0;
      }
    },1000);

}


///////////////////////////////////////
// Event handlers
//fake login 
let currentAccount ;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Creating  Date and time..
    const now = new Date();
    const options = {
      hour : 'numeric',
      minute : 'numeric',
      day : 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short',
    };
    // const locale = navigator.language
    // console.log(locale);
    
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    // const now = new Date();
    // const day = `${now.getDay()}`.padStart(2,0);
    // const month =`${now.getMonth() +1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const mins = `${now.getMinutes()}`.padStart(2,0);
    // labelDate.textContent= `${day}/ ${month}/ ${year}, ${hour}:${mins}`

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function(){
    // Add movement
    currentAccount.movements.push(amount);

    // creating loan date
    currentAccount.movementsDates.push(new Date().toISOString);
   
    
    // Update UI
    updateUI(currentAccount);
    //reset timer
    clearInterval(timer)
    timer = startLogOutTimer()
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// conversion
console.log( typeof Number('23'));
console.log( typeof +23);


//parsing
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('e30px'));

console.log(Number.parseFloat('4.5'));

console.log(Number.isNaN('35'))
console.log(Number.isFinite(+'35'))

//math 
console.log(Math.sqrt(25))

// round
console.log(Math.round(23.9))
console.log(Math.ceil(23.3))
console.log(Math.ceil(23.9))

console.log(Math.floor(23.3));
console.log(Math.floor(23.9))

//reminder operator

const isEven = n => n % 2 === 0 ;
console.log(isEven(8))
console.log(isEven(17))
console.log(isEven(9))
console.log(isEven(20))

//Numeric operator
const millon = 100_000_000_0000
console.log(millon);

// create date 
// const now = new Date();
// console.log(now);

console.log(new Date('May 28, 1998'))
console.log(new Date(account1.movementsDates[0]));


// operation with date
const future = new Date(2037, 10 , 19 , 15 , 23);
console.log(+future)

const calcDaysPassed = (date1, date2) => 
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

const days = calcDaysPassed(new Date(2037, 3 , 14 ),new Date(2037, 3 , 4 ));
console.log(days);

//internationalizing num

const num = 39988889.87
console.log( 'Us :',new Intl.NumberFormat('en-US').format(num))
console.log( 'Germany :',new Intl.NumberFormat('de-DE').format(num))

// Timer -- set timeout 
setTimeout(()=> console.log(`Here is your pizza🍕`), 5000,);

//set timeout with arguments
 const ingredients = ['olives','spinach']
 setTimeout((ing , ing2)=> 
 console.log(`here is your pizza🍕${ing} and ${ing2}`),5000, ...ingredients);

 //setInterval
setTimeout(()=> {
  const now = new Date();
  const options = {
    hour : 'numeric',
    minute : 'numeric',
    weekday : 'long',
  }
  const daytime = new Intl.DateTimeFormat('en-US', options).format(now);
  console.log(daytime)
}, 2000);