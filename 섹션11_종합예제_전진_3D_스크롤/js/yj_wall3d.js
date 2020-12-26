(function() {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const mousePos = { x: 0, y: 0 };
    let maxScrollValue;

    function resizeHandler() {
       maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function(e) {
        // console.log(pageYOffset); // scroll을 얼마나 했는지!
        const scrollPer = pageYOffset / maxScrollValue;
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        // progress bar
        barElem.style.width = scrollPer * 100 + '%';
    });

    window.addEventListener('mousemove', function(e) {
      // console.log(e.clientX, e.clientY);
      // console.log(window.innerWidth, window.innerHeight);
      // console.log(mousePos);
      mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
      mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
      stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)';
    });

    stageElem.addEventListener('click', function(e) {
      new Character({
        xPos: e.clientX / window.innerWidth * 100
      });
    });

    window.addEventListener('resize', resizeHandler);
    resizeHandler(); // 처음에 문서 로드가 될 때 최초 실행을 한다.
})();
