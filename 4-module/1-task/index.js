function makeFriendsList(friends) {
  let list = ''
  for (let obj of friends)
    list += '<li>' + obj.firstName + ' ' + obj.lastName + '</li>'
  list = ('<ul>' + list + '</ul>')
  console.log(list)
  document.head.childNodes[1].insertAdjacentHTML('afterEnd', list)
}
