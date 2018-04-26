import '../scss/pages/index.scss';

const deviceWidth = screen.width;
const homeHeight = document.getElementsByClassName('home-wrap')[0].scrollHeight;
const projects = document.getElementsByClassName('project');
const pointers = document.getElementsByClassName('point');
const mobileSide = document.querySelector('.side-inner-mobile');
const side = document.querySelector('.side');
const sectionDetail = document.querySelector('.section-detail');
const sectionInner = document.querySelector('.section-detail h3');
const currentNavPosition = document.querySelector('.dott');

/*
============================ Initial params ======================================
*/

sectionDetail.style.top = "-123px";
sectionInner.innerHTML = "Home";

/*
============================ Sidebar/mobile sidebar =============================
*/

window.onresize = function() {
  if(screen.height < 650 || screen.width < 768) {
    side.style.display = "none";
    mobileSide.style.display = "flex";
  }
  else {
    side.style.display = "flex";
    mobileSide.style.display = "none";
  }
}

//==================== Mobile projects animation direction changed ===============

if(deviceWidth <= 768) {
  for(let i = 1; i <= projects.length; i++){
    document.querySelector('.p'+i).style.transform = "translateX(100vw)";
  }
}

window.onscroll = function() {

  //================== Projects block animation =============================

  if(window.pageYOffset >= (homeHeight - 300)){
    for(let i = 1; i <= projects.length; i++){
      document.querySelector('.p'+i).style.transform = "translateX(0)";
    }
  }

  //================== Active slide pointer animtion ==========================

  if(window.pageYOffset < homeHeight-200) {
    sectionDetail.style.transform = "translateY(0px) rotate(-45deg)";
    sectionInner.innerHTML = "Home";
    currentNavPosition.style.transform = "translateY(0px) rotate(-45deg)";
  }
  else {
    sectionDetail.style.transform = "translateY(90px) rotate(-45deg)";
    sectionInner.innerHTML = "Projects";
    currentNavPosition.style.transform = "translateY(84px) rotate(-45deg)";
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
