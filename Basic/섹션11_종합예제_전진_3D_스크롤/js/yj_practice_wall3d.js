(function() {
  // 마우스 움직임에 따라 .stage 꿀렁꿀렁
  const stageElem = document.querySelector('.stage');
  // .house 내에서 스크롤을 할 것이다.
  const houseElem = document.querySelector('.house');
  let maxScrollValue; // 스크롤할 수 있는 범위 (문서 전체 사이즈 - 창의 사이즈)
  const barElem = document.querySelector('.progress-bar');
  let mousePos = { x: 0, y: 0 };
  const selectCharacterElem = document.querySelector('.select-character');

  // resize될 때마다 다시 계산
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener('scroll', function() {
    // 스크롤한 수치 (pageYOffset)
    // 스크롤한 수치를 비율로 계산
    let scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 970 - 490;
    houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

    barElem.style.width = scrollPer * 100  + '%';
  });

  window.addEventListener('mousemove', function(e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)';
  })

  window.addEventListener('resize', resizeHandler);

  stageElem.addEventListener('click', function(e) {
    new Character({
      xPos: e.clientX / window.innerWidth * 100,
      speed: Math.random() * 0.5 + 0.2
    });
  });

  selectCharacterElem.addEventListener('click', function(e) {
    const value = e.target.getAttribute('data-char');
    document.body.setAttribute('data-char', value);
  });

  resizeHandler();
})();
