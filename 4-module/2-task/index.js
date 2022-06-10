function makeDiagonalRed(table) {
  const temp = document.body.childNodes[1].childNodes[1]
  for (let i = 0; i <= 5; i++)
    temp.rows[i].cells[i].style.backgroundColor = "red"
}
