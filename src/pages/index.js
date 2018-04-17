import '../scss/pages/index.scss';

const deviceWidth = screen.width;
const homeHeight = document.getElementsByClassName('home-wrap')[0].scrollHeight;
const projects = document.getElementsByClassName('project');
const pointers = document.getElementsByClassName('point');

if(deviceWidth <= 768) {
  for(let i = 1; i <= projects.length; i++){
    document.querySelector('.p'+i).style.transform = "translateX(500%)";
  }
}

window.onscroll = function() {
  if(window.pageYOffset >= (homeHeight - 300)){
    for(let i = 1; i <= projects.length; i++){
      document.querySelector('.p'+i).style.transform = "translateX(0%)";
    }
  }
}

for(let i = 0; i < pointers.length; i++){
  pointers[i].addEventListener("click", function() {
    window.scrollTo(0, homeHeight * i);
  })
}
