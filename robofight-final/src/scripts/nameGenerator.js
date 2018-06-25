import getRandomInt from './getRandomInt'

export default function nameGenerator() {
  var firstNameArr = ['Alan', 'Peter', 'Max', 'John', 'Miles', 'Fred'];
  var adjectiveArr = ['Rusty', 'Tricky', 'Smart', 'Freaky', 'Fancy'];
  var typeNameArr = ['Android', 'Cyborg', 'Bot', 'Robot', 'Machine'];
  var fullName = firstNameArr[getRandomInt(0, firstNameArr.length)] + ", " + adjectiveArr[getRandomInt(0, adjectiveArr.length)] + " " + typeNameArr[getRandomInt(0, typeNameArr.length)];
  document.querySelector(".enemy-name span").innerText = fullName;
}