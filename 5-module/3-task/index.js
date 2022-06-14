function initCarousel() {
  const right = document.querySelector('.carousel__arrow_right')
  const left = document.querySelector('.carousel__arrow_left')
  const inner = document.querySelector('.carousel__inner')
  let pos = 0 //счётчик
  drawArrows();

  function drawArrows() {  
    switch(pos){
      case 0: left.style.display = 'none';
      right.style.display = '';
      break;
  
      case 3: left.style.display = '';
      right.style.display = 'none';
      break;
  
      default:left.style.display = '';
      right.style.display = '';
    };
  }
  
  right.addEventListener('click',(event) => {
    if (pos <= 2) {
      pos = pos + 1
    } 
    
    let translateDist =  inner.offsetWidth * pos
    inner.style.transform = 'translateX(-' + translateDist + 'px)'  
    drawArrows();
  })

  left.addEventListener('click', (event) => {
    if (pos >= 1 ) {
      pos = pos - 1
    } 
    
    let translateDist =  inner.offsetWidth * pos
    inner.style.transform = 'translateX(-' + translateDist + 'px)' 
    drawArrows();
  })
}

