import max from './js/max';
import andrii from './js/andrii';
import './css/sveta.css';

console.log('Log > max:', max);
console.log('Log > andrii:', andrii);

class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  info() {
    console.log(this.#name);
  }
}

const sveta = new User('Sveta');
sveta.info();
