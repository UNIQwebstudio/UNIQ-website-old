import '../scss/pages/index.scss';

var done = false;
var homeHeight = document.getElementsByClassName('home-wrap')[0].scrollHeight;

var pointers = document.getElementsByClassName('point');

window.onscroll = function() {
  if(window.pageYOffset >= (homeHeight - 500) && !done){
    console.log("true");
    document.getElementsByClassName('p1')[0].style.transform = "translateX(0%)";
    document.getElementsByClassName('p2')[0].style.transform = "translateY(0%)";
    document.getElementsByClassName('p3')[0].style.transform = "translateX(0%)";
    document.getElementsByClassName('p4')[0].style.transform = "translateY(0%)";
    document.getElementsByClassName('p5')[0].style.transform = "translateX(0%)";
    done = true;
  }
}

setTimeout(function(){
  window.scrollTop = 4330;
  console.log("done scroll");
}, 1000);
