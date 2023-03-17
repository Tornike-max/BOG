"use strict";

const account1 = {
  owner: "Tornike Ozbetelashvili",
  movements: [200, 1120, 980, 120, -400, 1543, -190, -200],
  interestsRate: 2.0,
  pin: 1111,
};

const account2 = {
  owner: "levani Ozbetelashvili",
  movements: [10, 320, -280, 5320, 100, -543, 290, -100],
  interestsRate: 0.9,
  pin: 2222,
};

const account3 = {
  owner: "giorgi Ozbetelashvili",
  movements: [300, 120, -280, 420, 2410, -843, 990, -100],
  interestsRate: 1.0,
  pin: 3333,
};

const accounts = [account1, account2, account3];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const containerApp = document.querySelector(".app");
const movements = document.querySelector(".left");

const btnLogin = document.querySelector(".login__btn");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");

const balValue = document.querySelector('.balance__value');

const summaryIn = document.querySelector('.summary__in');
const summaryOut = document.querySelector('.summary__out');
const summaryInt = document.querySelector('.summary-interest');


containerApp.classList.remove('hidden')

const displayMovements = function (movement) {
    movements.innerHTML = ''
     movement.forEach(function (mov, i) {
    const type = mov < 0 ? 'withdrawal' : 'deposit';

    const html = 
    `<div class="movements__row">
        <div class="movements__type 
        movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}₾</div>
    </div>`;
     movements.insertAdjacentHTML('afterbegin', html)
  });
};



const calcBallance = function(movements) {
   const balance = movements.reduce((accum,cur) => accum + cur)
   balValue.textContent = `${balance} ₾`
}



let calcSummary = function (movements){
  let income = movements
  .filter(mov => mov > 0)
  .reduce((accum,cur)=> accum + cur,0)
  summaryIn.textContent =`${income}₾:`;

  const out = movements
  .filter(mov => mov < 0)
  .reduce((accum,cur) => accum + cur, 0)
  summaryOut.textContent = `${Math.abs(out)}₾:`;

  //try to do this part 
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

let curAccount ;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  curAccount = accounts.find(acc => 
    acc.userName === inputLoginUsername.value
  );
  console.log(curAccount)

  if(curAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `welcome back ${
      curAccount.owner.split(' ')[0]
    }`;
    containerApp.classList.add('active');
    inputLoginUsername.value = inputLoginPin.value = '';

    calcSummary(curAccount.movements)

    calcBallance(curAccount.movements)

    displayMovements(curAccount.movements);
  }
  
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



