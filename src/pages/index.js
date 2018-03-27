import '../scss/pages/index.scss';

document.body.onload = function(){
    setTimeout(function(){
        let identifier = document.body.getElementsByClassName('preloader');
        identifier[0].classList.add('preloader-done');
    }, 5000);
};
