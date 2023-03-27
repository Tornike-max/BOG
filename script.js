"use strict";

const account1 = {
  owner: "Tornike Ozbetelashvili",
  movements: [200, 1120, 980, 23120, -400, 1543, -190, -200],
  interestsRate: 1.2,
  pin: 1111,
  movementsDate: [
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
  ]
};

const account2 = {
  owner: "levani Ozbetelashvili",
  movements: [10, 320, -280, 15320, 100, -543, 290, -100],
  interestsRate: 0.9,
  pin: 2222,
  movementsDate: [
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
  ],
  currency: 'USD',
  locale:'ka-GE'
};

const account3 = {
  owner: "giorgi Ozbetelashvili",
  movements: [300, 120, -280, 420, 2410, -843, 10990, -100],
  interestsRate: 1.0,
  pin: 3333,
  movementsDate: [
    "2020-05-12T23:50:21.817Z",
    "2021-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
    "2020-05-12T23:50:21.817Z",
  ]
};

const accounts = [account1, account2, account3];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const date = document.querySelector(".balance__date")
const containerApp = document.querySelector(".app");
const movements = document.querySelector(".left");
const movDate = document.querySelector(".movements__date")

const btnLogin = document.querySelector(".login__btn");
const transferBtn = document.querySelector(".btn-input");
const btnClose = document.querySelector(".btn-close");
const btnLoan = document.querySelector('.btn-request');

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const transferTo = document.querySelector('.transfer-input');
const transferAmount = document.querySelector('.amount-input')
const closeInput = document.querySelector('.close-input');
const closePin = document.querySelector('.close-pin');
const loanInput = document.querySelector('.request-input')

const balValue = document.querySelector('.balance__value');

const summaryIn = document.querySelector('.summary__in');
const summaryOut = document.querySelector('.summary__out');
const summaryInt = document.querySelector('.summary-interest');
let setTime = document.querySelector('.time')


const displayMovements = function (acc,sort = false) {
    movements.innerHTML = '';

    let movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;

    movs.forEach(function (mov, i) {
    const type = mov < 0 ? 'withdrawal' : 'deposit';

    const displayTime = new Date(acc.movementsDate[i]);
    let year = displayTime.getFullYear();
    let month = `${displayTime.getMonth() + 1}`.padStart(2,0);
    let day = `${displayTime.getDate()}`.padEnd(2,0);
    const displayDate = movDate.textContent =`${month}/${year}/${day}`

    const html = 
    `<div class="movements__row">
        <div class="movements__type 
        movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${Math.abs(mov).toFixed(2)}₾</div>
    </div>`;
     movements.insertAdjacentHTML('afterbegin', html)
  });
};

const updateUi = function (acc){
    calcSummary(acc)

    calcBallance(acc)

    displayMovements(acc);
}


const calcBallance = function(acc) {
   acc.balance = acc.movements.reduce((accum,cur) => accum + cur,0)
   
   balValue.textContent = `${acc.balance.toFixed(2)} ₾`;
   console.log(acc)
}


let calcSummary = function (acc){
  acc.income = acc.movements
    .filter(mov => mov > 0)
    .reduce((accum,cur) => accum + cur,0)
    summaryIn.textContent = `${Math.round(acc.income).toFixed(2)}₾`;

  acc.out = acc.movements
  .filter(mov => mov < 0)
  .reduce((accum,cur) => accum + cur,0)
  summaryOut.textContent = `${Math.abs(Math.round(acc.out)).toFixed(2)}₾`;

  acc.interest = acc.movements
  .filter(mov=> mov > 0)
  .map(mov => (mov * acc.interestsRate) / 100)
  .reduce((accum,cur) => accum + cur)
  summaryInt.textContent = `${Math.round(acc.interest).toFixed(2)}₾`
}


const login = function(accs) {
  accs.forEach(function(acc){
    acc.userName = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name.at(0)) 
    .join('')
  });
}

login(accounts)
console.log(accounts)

let logOut = function(){
  let time = 300
  setInterval(function(){
    let min = String(Math.trunc(time / 60)).padStart(2,0);
    let sec = String(Math.trunc(time % 60)).padStart(2,0);
    setTime.textContent = `${min}:${sec}`;
    time = time - 1;
    if(time === 0){
      containerApp.classList.remove('active');
      clearInterval(time)
    }
  },1000)
}

let curAccount ;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  curAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
  console.log(curAccount)

  if(curAccount.pin === Number(inputLoginPin.value)){
     
    containerApp.classList.add('active');
    labelWelcome.textContent = `Welcome back ${
      curAccount.owner.split(' ')[0]}`
      

      logOut()
      updateUi(curAccount)
  }
  
});


transferBtn.addEventListener('click', function(e){
  e.preventDefault();
 
  let amount = Number(transferAmount.value);
  let receiverAcc = accounts.find(cur => cur.userName === transferTo.value);

  if(amount > 0 && receiverAcc && curAccount.balance > amount && receiverAcc?.userName !== curAccount.userName){
    setTimeout(function(){

    
    curAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    curAccount.movementsDate.push(new Date());
    receiverAcc.movementsDate.push(new Date())
    updateUi(curAccount)
  },1000)
  }
  console.log(amount,receiverAcc)
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();

  const index = accounts.findIndex(acc => acc.userName === curAccount.userName)
  if(closeInput.value === curAccount.userName && Number(closePin.value) === curAccount.pin){
    setTimeout(function(){

    accounts.splice(index,1)
    console.log(index)
    containerApp.classList.remove('active')
    labelWelcome.textContent = `Account deleted`
    closeInput.value = closePin.value = '';
  },3000)
  }
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  let amount = Number(loanInput.value);
  if(amount > 0 && curAccount.movements.some(mov => mov >= amount * 0.1)){
    setTimeout(function(){

      curAccount.movements.push(amount)
      curAccount.movementsDate.push(new Date())
      updateUi(curAccount)
    },2000)
  }
})

const currentTime = new Date()
let curTime = {
  hour: `numeric`,
  minute: `numeric`,
  day: `numeric`,
  month: `long`,
  year: `numeric`,
  weekday: `short`,
}
date.textContent = Intl.DateTimeFormat('ka-GE', curTime).format(currentTime)


labelBalance.addEventListener('click', function (){
  [...document.querySelectorAll('.movements__row')]
  .forEach(function(row,i){
    if(i % 2 === 0){
      row.style.backgroundColor = 'orange'
    }
    if(i % 3 === 0){
      row.style.backgroundColor = 'yellow'
    }
  })
})



















// let account = accounts.find(name => name.owner === 'levani Ozbetelashvili');
// console.log(account)

// for(let name of accounts){
//   let own = name.owner === 'levani Ozbetelashvili';
//   console.log(own)
// }





// const login = function(user,pin){
// document.querySelector('.login__input--user').textContent = user
// document.querySelector('.login__input--user').textContent = pin

// btnLogin.addEventListener('click', function(e){
//   e.preventDefault()
//     let [first, second] = user.split('').map(item => item.charAt(0).toLowerCase())
//     let changedString = [first.concat(second)].join('');
//     if(changedString === 'to' && pin === 1111){
//         console.log('login')
//         containerApp.classList.add('active')
//     }else{
//         console.log('invalid pass')
//     }
// })
// }
// login(account1.owner,account1.pin)


// let deposits = account1.movements.filter(function(mov){
//    return mov > 0
// })
// console.log(deposits)


// let withdrawal = account1.movements.filter(draw => draw < 0)
// console.log(withdrawal)

// //accumulator is like a snowBall ყოველ ჯერზე ემატება ერთმანეთს
// let balance = account1.movements.reduce((accumulator, cur) => accumulator + cur)
// console.log(balance)



