function makeDiagonalRed(table) {
  for (let i = 0; i <= table.rows.length - 1; i++)
    table.rows[i].cells[i].style.backgroundColor = "red"
}
