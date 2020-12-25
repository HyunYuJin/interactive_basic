(function() {
    const houseElem = document.querySelector('.house');
    const maxScrollValue = document.body.offsetHeight - window.innerHeight;

    window.addEventListener('scroll', function(e) {
        // console.log(pageYOffset); // scroll을 얼마나 했는지!
        const zMove = pageYOffset / maxScrollValue * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
    })
})();