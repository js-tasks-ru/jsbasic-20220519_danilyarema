function makeFriendsList(friends) {
  let ul = document.createElement('ul')
  ul.innerHTML = friends.map(friend => `<li>${Object.values(friend).join(' ')}</li>`).join('');
  return ul;
}
