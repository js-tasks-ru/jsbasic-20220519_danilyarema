//Напишите функцию `checkSpam(str)`, возвращающую `true`, если `str` содержит `'1xBet'` или `'XXX'`, а иначе `false`.
//
//Функция должна быть нечувствительна к регистру:
//```js
//checkSpam('1XbeT now') === true
//checkSpam('free xxxxx') === true
//checkSpam('innocent rabbit') === false
//```


function checkSpam(str) {
  let spam = (str.toLowerCase().includes('xxx')) ? true :
   (str.toLowerCase().includes('1xbet')) ? true :
   false;
 return spam
}