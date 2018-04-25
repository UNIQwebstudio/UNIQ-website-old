import '../scss/pages/index.scss';

const deviceWidth = screen.width;
const homeHeight = document.getElementsByClassName('home-wrap')[0].scrollHeight;
const projects = document.getElementsByClassName('project');
const pointers = document.getElementsByClassName('point');
document.querySelector('.section-detail').style.top = "-123px";
document.querySelector('.section-detail h3').innerHTML = "Home";

/*
============================ Sidebar/mobile sidebar =============================
*/

window.onresize = function() {
  if(screen.height < 650 || screen.width < 768) {
    const side = document.querySelector('.side');
    side.style.display = "none";
    const mobileSide = document.querySelector('.side-inner-mobile');
    mobileSide.style.display = "flex";
  }
  else {
    const side = document.querySelector('.side');
    side.style.display = "flex";
    const mobileSide = document.querySelector('.side-inner-mobile');
    mobileSide.style.display = "none";
  }
}

if(deviceWidth <= 768) {
  for(let i = 1; i <= projects.length; i++){
    document.querySelector('.p'+i).style.transform = "translateX(500%)";
  }
}

window.onscroll = function() {

  //================== Projects block animation =============================

  if(window.pageYOffset >= (homeHeight - 300)){
    for(let i = 1; i <= projects.length; i++){
      document.querySelector('.p'+i).style.transform = "translateX(0%)";
    }
  }

  //================== Active slide pointer animtion ==========================

  if(window.pageYOffset < homeHeight-200) {
    document.querySelector('.section-detail').style.transform = "translateY(0px) rotate(-45deg)";
    document.querySelector('.section-detail h3').innerHTML = "Home";
    document.querySelector('.dott').style.transform = "translateY(0px) rotate(-45deg)";
  }
  else {
    document.querySelector('.section-detail').style.transform = "translateY(90px) rotate(-45deg)";
    document.querySelector('.section-detail h3').innerHTML = "Projects";
    document.querySelector('.dott').style.transform = "translateY(84px) rotate(-45deg)";
  }
}

//======================== Desktop sidebar event listener ========================

for(let i = 0; i < pointers.length; i++) {
  pointers[i].addEventListener("click", function() {
    window.scrollTo(0, homeHeight * i);
  })
}

/*
================================= Mobile sidebar ========================================
*/


window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

let _animationActive = false;

function pointEventListener(point) {
  return point.addEventListener('click', () => {
    const activePoint = $('.side-inner-mobile__dot-mobile--active');

    if (_animationActive || point === activePoint) return;

    _animationActive = true;

    const offset = point.getBoundingClientRect().top - activePoint.getBoundingClientRect().top;

    activePoint.style.transform = `translateY(${offset}px) scale(1.2)`;
    point.style.transform = `translateY(${-offset}px)`;

    activePoint.addEventListener('transitionend', () => {
      activePoint.style.transform = '';
      point.style.transform = '';

      const _point = point.cloneNode();
      const _activePoint = activePoint.cloneNode();

      pointEventListener(_point);
      pointEventListener(_activePoint);

      activePoint.replaceWith(_point);
      point.replaceWith(_activePoint);

      for (let i = 0, points = $$('.side-inner-mobile__dot-mobile'); i < points.length; i++) {
        points[i].dataset.screen = i + 1;
      }

      _animationActive = false;
    });
  });
}

for (const point of $$('.side-inner-mobile__dot-mobile')) {
  pointEventListener(point);
}
