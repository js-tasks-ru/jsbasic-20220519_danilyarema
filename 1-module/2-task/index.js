/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 * имя не пустое, без пробелов, минимум 4 символа.
 */
 function isValid(name) {
  
  if (( name !== null) && (name.length > 3) && (name !== undefined) && (!name.includes(' '))) {
    
    return true   
  }  
  else {
    
    return false   
  }
}


function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}

sayHello();

