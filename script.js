"use strict";


const account1 = {
  owner: "Tornike Ozbetelashvili",
  movements: [200, 1120, 980, 23120, -400, 1543, -190, -200],
  interestsRate: 1.2,
  pin: 1111,
  movementsDate: [
    "2022-07-11T23:50:21.817Z",
    "2022-07-12T23:50:21.817Z",
    "2022-08-12T23:50:21.817Z",
    "2022-09-12T23:50:21.817Z",
    "2023-01-12T23:50:21.817Z",
    "2023-02-12T23:50:21.817Z",
    "2023-03-28T23:50:21.817Z",
    "2023-03-31T23:50:21.817Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "levani Ozbetelashvili",
  movements: [10, 320, -280, 15320, 100, -543, 2290, -100],
  interestsRate: 0.9,
  pin: 2222,
  movementsDate: [
    "2022-07-11T23:50:21.817Z",
    "2022-07-12T23:50:21.817Z",
    "2022-08-12T23:50:21.817Z",
    "2022-09-12T23:50:21.817Z",
    "2023-01-12T23:50:21.817Z",
    "2023-02-12T23:50:21.817Z",
    "2023-03-28T23:50:21.817Z",
    "2023-03-31T23:50:21.817Z",
  ],
  currency: "GBP",
  locale: "en-GB",
};

const account3 = {
  owner: "giorgi Ozbetelashvili",
  movements: [300, 3120, -280, 420, 2410, -843, 10990, -100],
  interestsRate: 1.0,
  pin: 3333,
  movementsDate: [
    "2022-07-11T23:50:21.817Z",
    "2022-07-12T23:50:21.817Z",
    "2022-08-12T23:50:21.817Z",
    "2022-09-12T23:50:21.817Z",
    "2023-01-12T23:50:21.817Z",
    "2023-02-12T23:50:21.817Z",
    "2023-03-28T23:50:21.817Z",
    "2023-03-31T23:50:21.817Z",
  ],
  currency: "GEL",
  locale: "ka-GE",
};

const accounts = [account1, account2, account3];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const date = document.querySelector(".balance__date");
const containerApp = document.querySelector(".app");
const movements = document.querySelector(".left");
const movDate = document.querySelector(".movements__date");

const btnLogin = document.querySelector(".login__btn");
const transferBtn = document.querySelector(".btn-input");
const btnClose = document.querySelector(".btn-close");
const btnLoan = document.querySelector(".btn-request");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const transferTo = document.querySelector(".transfer-input");
const transferAmount = document.querySelector(".amount-input");
const closeInput = document.querySelector(".close-input");
const closePin = document.querySelector(".close-pin");
const loanInput = document.querySelector(".request-input");

const balValue = document.querySelector(".balance__value");

const summaryIn = document.querySelector(".summary__in");
const summaryOut = document.querySelector(".summary__out");
const summaryInt = document.querySelector(".summary-interest");
let setTime = document.querySelector(".time");


const formatedDate = function (date) {

    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    let daysPassed = calcDaysPassed(new Date(), date)  
    console.log(daysPassed)
    if(daysPassed === 0) return 'today'
    if(daysPassed === 1) return 'yesterday'
    if(daysPassed <= 7) return `${daysPassed} days ago`;
    
      let day = `${date.getDate()}`.padStart(2, 0);
      let month = `${date.getMonth() + 1}`.padStart(2, 0);
      let year = `${date.getFullYear()}`;
      return `${day}/${month}/${year}`;
    
  };

  let displayCur = function (value,locale,currency) {
   return new Intl.NumberFormat(locale,{style: 'currency', currency:currency }).format(value)
  }
let displayMovements = function (acc) {
  movements.innerHTML = "";

  acc.movements.forEach(function (mov, i) {
    let type = mov > 0 ? "deposit" : "withdrawal";

    let curDate = new Date(acc.movementsDate[i])
    let options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }
    let displayDate = formatedDate(curDate);

    let currencies = displayCur(mov, acc.locale, acc.currency)
    

    let html = `
  <div class="movements__row">
     <div class="movements__type 
       movements__type--${type}">${i + 1} ${type}</div>
       <div class="movements__date">${displayDate}</div>
     <div class="movements__value">${currencies}</div>
 </div>`;
    movements.insertAdjacentHTML("afterbegin", html);
  });
};

let updateUi = function (acc) {
  displayMovements(acc);
  calcBalance(acc);
  calcSummary(acc);
};

let logIn = function (accs) {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    console.log(acc.userName);
  });
};
logIn(accounts);

let logOutTimer = function (){
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2,0)
    const sec = String(time % 60).padStart(2,0)

    setTime.textContent = `${min}:${sec}`;

    if(time === 0){
      clearInterval(timer)
      containerApp.classList.remove('active');
      labelWelcome.textContent = 'Log in to get started';
    }
    time--
  }

  let time = 120;

  tick()
  const timer = setInterval(tick,1000)
  return timer
}

let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  setTimeout(function () {
    if (currentAccount.pin === Number(inputLoginPin.value)) {
      containerApp.classList.add("active");
      labelWelcome.textContent = `Welcome back ${
        currentAccount.owner.split(" ")[0]
      }`;
      const now = new Date();
      let options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
      }
      date.textContent = new Intl.DateTimeFormat('ka-GE',{ dateStyle: 'full', timeStyle: 'short'}).format(now)
      // let day = `${now.getDate()}`.padStart(2, 0);
      // let month = `${now.getMonth() + 1}`.padStart(2, 0);
      // let year = now.getFullYear();
      // date.textContent = `${day}/${month}/${year}`;
    }
    console.log(currentAccount);

    inputLoginUsername.value = inputLoginPin.value = "";
    if(timer) clearTimeout(timer);
    timer = logOutTimer()
    updateUi(currentAccount);
  }, 1000);
});

let calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, cur) => accum + cur);
  labelBalance.textContent = displayCur(acc.balance, acc.locale, acc.currency);
};

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = Number(transferAmount.value);
  let receiverAcc = accounts.find((acc) => acc.userName === transferTo.value);
  console.log("comes here");

  transferTo.value = transferAmount.value = "";
  setTimeout(function () {
    if (
      amount > 0 &&
      receiverAcc &&
      receiverAcc.userName !== currentAccount.value &&
      currentAccount.balance >= amount
    ) {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      currentAccount.movementsDate.push(new Date().toISOString());
      receiverAcc.movementsDate.push(new Date().toISOString());
    }
    console.log(amount, receiverAcc);
    
    clearInterval(timer);
    timer = logOutTimer()

    updateUi(currentAccount);
  }, 1000);
});

let calcSummary = function (acc) {
  acc.income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((accum, cur) => accum + cur, 0);
  summaryIn.textContent = displayCur(acc.income, acc.locale, acc.currency);

  acc.out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((accum, cur) => accum + cur, 0);
  summaryOut.textContent = displayCur(acc.out, acc.locale, acc.currency);

  acc.interest = acc.movements
    .filter((mov) => mov > 0)
    .map((item) => (item * acc.interestsRate) / 100)
    .reduce((accum, cur) => accum + cur, 0);
  summaryInt.textContent = displayCur(acc.interest, acc.locale, acc.currency);
};

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  setTimeout(function () {

  if (
    closeInput.value === currentAccount.userName &&
    Number(closePin.value) === currentAccount.pin
  ) {
    let index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);

    containerApp.classList.remove("active");
    labelWelcome.textContent = "Log in to your account";
    console.log(index);
  }
},1000)
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  setTimeout(function () {
    let amount = Number(loanInput.value);
    if (currentAccount.balance > amount && amount > 0) {
      currentAccount.movements.push(amount);
      currentAccount.movementsDate.push(new Date().toISOString());
      console.log("loan", amount,currentAccount);
    }

    clearInterval(timer);
    timer = logOutTimer()
    updateUi(currentAccount);
  }, 2000);
});





//old project

// let arr = [1,2,3,4,5,[6,[7],8],9,10,[11,12]];
// console.log(arr.flatMap(arr=> arr > 5))

// let arrMovs = accounts
// .flatMap(acc=> acc.movements)
// .reduce((accum,cur)=> accum + cur, 0)
// console.log(arrMovs)

// const x = Array.from({length: 7},(cur,i) => i +1)
// console.log(x)

// const dice = Array.from({length: 70}, (cur,i) => Math.trunc(Math.random(i) * 70 ) + 1 )
// console.log(dice)

// let bankBalance = accounts
//   .flatMap((movs) => movs.movements)
//   .filter((cur) => cur > 0)
//   .reduce((accum, cur) => accum + cur, 0);
// console.log(bankBalance);

// // let greaterThan1000 = accounts.flatMap(movs=> movs.movements)
// // .filter(mov=> mov > 1000).length
// // console.log(greaterThan1000)

// let greaterThan1000 = accounts
//   .flatMap((movs) => movs.movements)
//   .reduce((accum, cur) => (cur > 1000 ? accum + 1 : accum), 0);
// console.log(greaterThan1000);

// let { deposits, withdrawals } = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (accum, cur) => {
//       cur > 0 ? (accum.deposits += cur) : (accum.withdrawals += cur);
//       return accum;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);

// const future = new Date(2037, 10, 19, 15, 23)
// console.log(+future)
// const calcDaysPassed = (date1,date2) => Math.round(date2 - date1) / (1000 * 60 * 60 * 24)

// let day1  = calcDaysPassed(new Date(2037, 3, 28), new Date(2037, 3, 18))
// console.log(day1)



// const cur = 6374689;
// let options = {
//   style: 'unit',
//   unit: 'mile-per-hour'
// }
// let result = {
//   style: 'currency',
//   currency: 'USD',
// }
// ///Intl.NumberFormat('en-GB', options).format(cur)- ეს არის სინტაქსი. ამ კონკრეტულ შემთხვევაში როგრო აღინიშნება მოცემულ ქვეყნებში რიცხვები და mph.
// console.log('GREAT BRITAIN',Intl.NumberFormat('en-GB',options).format(cur));
// console.log(Intl.NumberFormat('ar-SY',options).format(cur));
// console.log(Intl.NumberFormat('en-GB',result).format(cur))
// console.log(Intl.NumberFormat('ja-JP',{ style: 'currency', currency: 'JPY' }).format(cur))

// //Intl.dateTimeFormat(იგივე სინტაქსი)
// console.log(Intl.DateTimeFormat('en-GB').format(cur))




// let past = new Date()
// console.log(past.getFullYear())
// console.log(past.getMonth() + 1)
// console.log(`${past.getHours()}:${past.getMinutes()}:${past.getSeconds()}`)
// console.log(past.getTime())

// const start = new Date(2023, 2, 1); // March 1, 2023
// const end = new Date(2023, 2, 31); // March 31, 2023
// const duration = end.getTime() - start.getTime(); // in milliseconds
// const days = duration / (1000 * 60 * 60 * 24); // convert to days
// console.log(days);

// const displayMovements = function (acc,sort = false) {
//     movements.innerHTML = '';

//     let movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;

//     movs.forEach(function (mov, i) {
//     const type = mov < 0 ? 'withdrawal' : 'deposit';

//     const displayTime = new Date(acc.movementsDate[i]);
//     let year = displayTime.getFullYear();
//     let month = `${displayTime.getMonth() + 1}`.padStart(2,0);
//     let day = `${displayTime.getDate()}`.padEnd(2,0);
//     const displayDate = movDate.textContent =`${month}/${year}/${day}`

//     const html =
//     `<div class="movements__row">
//         <div class="movements__type
//         movements__type--${type}">${i + 1} ${type}</div>
//         <div class="movements__date">${displayDate}</div>
//         <div class="movements__value">${Math.abs(mov).toFixed(2)}₾</div>
//     </div>`;
//      movements.insertAdjacentHTML('afterbegin', html)
//   });
// };

// const updateUi = function (acc){
//     calcSummary(acc)

//     calcBallance(acc)

//     displayMovements(acc);
// }

// const calcBallance = function(acc) {
//    acc.balance = acc.movements.reduce((accum,cur) => accum + cur,0)

//    balValue.textContent = `${acc.balance.toFixed(2)} ₾`;
//    console.log(acc)
// }

// let calcSummary = function (acc){
//   acc.income = acc.movements
//     .filter(mov => mov > 0)
//     .reduce((accum,cur) => accum + cur,0)
//     summaryIn.textContent = `${Math.round(acc.income).toFixed(2)}₾`;

//   acc.out = acc.movements
//   .filter(mov => mov < 0)
//   .reduce((accum,cur) => accum + cur,0)
//   summaryOut.textContent = `${Math.abs(Math.round(acc.out)).toFixed(2)}₾`;

//   acc.interest = acc.movements
//   .filter(mov=> mov > 0)
//   .map(mov => (mov * acc.interestsRate) / 100)
//   .reduce((accum,cur) => accum + cur)
//   summaryInt.textContent = `${Math.round(acc.interest).toFixed(2)}₾`
// }

// const login = function(accs) {
//   accs.forEach(function(acc){
//     acc.userName = acc.owner
//     .toLowerCase()
//     .split(' ')
//     .map(name => name.at(0))
//     .join('')
//   });
// }

// login(accounts)
// console.log(accounts)

// let logOut = function(){
//   let tick = function(){
//     let min = String(Math.trunc(time / 60)).padStart(2,0);
//     let sec = String(Math.trunc(time % 60)).padStart(2,0);
//     setTime.textContent = `${min}:${sec}`;

//     if(time === 0){
//       containerApp.classList.remove('active');
//       labelWelcome.textContent = 'Login to get started'
//       clearInterval(time)

//     }
//     time = time - 1;
//   }

//   let time = 20
//   tick()
//   const timer = setInterval(tick,1000)
//   return timer
// }

// let curAccount, timer;

// btnLogin.addEventListener('click',function(e){
//   e.preventDefault();

//   curAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
//   console.log(curAccount)

//   if(curAccount.pin === Number(inputLoginPin.value)){

//     containerApp.classList.add('active');
//     labelWelcome.textContent = `Welcome back ${
//       curAccount.owner.split(' ')[0]}`

//       if(timer) clearInterval(timer);
//       timer = logOut()
//       updateUi(curAccount)
//   }

// });

// transferBtn.addEventListener('click', function(e){
//   e.preventDefault();

//   let amount = Number(transferAmount.value);
//   let receiverAcc = accounts.find(cur => cur.userName === transferTo.value);

//   if(amount > 0 && receiverAcc && curAccount.balance > amount && receiverAcc?.userName !== curAccount.userName){
//     setTimeout(function(){

//     curAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     curAccount.movementsDate.push(new Date());
//     receiverAcc.movementsDate.push(new Date())
//     updateUi(curAccount)

//     clearInterval(timer);
//     timer = logOut()
//   },1000)
//   }
//   console.log(amount,receiverAcc)
// })

// btnClose.addEventListener('click', function(e){
//   e.preventDefault();

//   const index = accounts.findIndex(acc => acc.userName === curAccount.userName)
//   if(closeInput.value === curAccount.userName && Number(closePin.value) === curAccount.pin){
//     setTimeout(function(){

//     accounts.splice(index,1)
//     console.log(index)
//     containerApp.classList.remove('active')
//     labelWelcome.textContent = `Account deleted`
//     closeInput.value = closePin.value = '';
//   },3000)
//   }
// })

// btnLoan.addEventListener('click',function(e){
//   e.preventDefault();

//   let amount = Number(loanInput.value);
//   if(amount > 0 && curAccount.movements.some(mov => mov >= amount * 0.1)){
//     setTimeout(function(){

//       curAccount.movements.push(amount)
//       curAccount.movementsDate.push(new Date())
//       updateUi(curAccount)

//       clearInterval(timer);
//       timer = logOut()
//     },2000)
//   }
// })

// const currentTime = new Date()
// let curTime = {
//   hour: `numeric`,
//   minute: `numeric`,
//   day: `numeric`,
//   month: `long`,
//   year: `numeric`,
//   weekday: `short`,
// }
// date.textContent = Intl.DateTimeFormat('ka-GE', curTime).format(currentTime)

// labelBalance.addEventListener('click', function (){
//   [...document.querySelectorAll('.movements__row')]
//   .forEach(function(row,i){
//     if(i % 2 === 0){
//       row.style.backgroundColor = 'orange'
//     }
//     if(i % 3 === 0){
//       row.style.backgroundColor = 'yellow'
//     }
//   })
// })
