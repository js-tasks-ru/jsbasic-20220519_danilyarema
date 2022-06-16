/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
 export default class UserTable {
  constructor(rows) {
  this.elem = deleteRows(rows)
  }
 }
function makeTable(user) {
  return `
  <tr>
  <td>${user.name}</td>
  <td>${user.age}</td>
  <td>${user.salary}</td>
  <td>${user.city}</td>
  <td><button>X</button></td>
</tr>
  `
}
function makeHTML(users){
  return `
  <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
        </tr>
    </thead>
    <tbody>
        ${users.map(makeTable).join('')}
    </tbody>`

}

function deleteRows(array){
  const table = document.createElement("table");
  table.innerHTML = makeHTML(array);
  const buttons = table.querySelectorAll("button")
  for (const button of buttons){
    button.addEventListener('click', (event) =>
    event.target.closest("tr").remove())
  }
  return table;
}
