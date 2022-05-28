let calculator = {};

calculator.read = function(a,b){
  this.a = a;
  this.b = b;
};

calculator.mul = function(){
  return this.a * this.b  
};

calculator.sum = function(){
  return this.a + this.b
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
