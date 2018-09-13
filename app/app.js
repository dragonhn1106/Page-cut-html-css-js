function elementSlide(btnRight, btnLeft, slideContainer) {
  this.btnRight = btnRight;
  this.btnLeft = btnLeft;
  this.slideContainer = slideContainer;

  var page_current = 0;
  status = 'stopSlideMotion ';

  function confirm_move_slide(btn_element) {
    if (status == 'moveSlider') {
      return false;
    }
    status = 'moveSlider';
    var stateOfstatus = 0;
    var element_current = slideContainer[page_current];

    if (btn_element == 'btn_left') {
      if (page_current > 0) {
        page_current--;
      } else {
        page_current = slideContainer.length - 1;
      }
    } else if (btn_element == 'btn_right') {
      if (page_current < slideContainer.length - 1) {
        page_current = page_current + 1;
      } else {
        page_current = 0;
      }
    }
    var element_following = slideContainer[page_current];

    var finish_current_move = function () {
      this.classList.remove('display_on');
      if (btn_element == 'btn_left') {
        this.classList.remove('disappear_push_prev');
      } else if (btn_element == 'btn_right') {
        this.classList.remove('disappear_push_next');
      }
      stateOfstatus++;
      if (stateOfstatus == 2) {
        status = 'stopSlideMotion';
      }
    };
    var handling_next_move = function () {
      if (btn_element == 'btn_left') {
        this.classList.remove('go_to_push_Prev');
      } else if (btn_element == 'btn_right') {
        this.classList.remove('go_to_push_next');
      }

      this.classList.add('display_on');
      stateOfstatus++;
      if (stateOfstatus == 2) {
        status = 'stopSlideMotion';
      }
    };

    element_following.addEventListener(
      'webkitAnimationEnd',
      handling_next_move
    );
    element_current.addEventListener('webkitAnimationEnd', finish_current_move);

    if ((btn_element = 'btn_left')) {
      element_current.classList.add('disappear_push_next');
      element_following.classList.add('go_to_push_Prev');
    } else if (btn_element == 'btn_right') {
      element_current.classList.add('disappear_push_next');
      element_following.classList.add('go_to_push_Prev');
    }
  }

  var move_slide_btn_right = function () {
    confirm_move_slide('btn_right');
  };

  var move_slide_btn_left = function () {
    confirm_move_slide('btn_left');
  };

  btn_next.addEventListener('click', move_slide_btn_right);
  btn_prev.addEventListener('click', move_slide_btn_left);
  this.next = move_slide_btn_right;
  this.prev = move_slide_btn_left;
  this.loop = loop;

  function loop(interval) {
    move_slide_btn_right();
    setTimeout(function () {
      loop(interval);
    }, interval);
  }
}
var btn_prev = document.querySelector('b.nuts--btn-left');
var btn_next = document.querySelector('b.nuts--btn-right');
var slides = document.querySelectorAll('.slides ul li');
var x = new elementSlide(btn_next, btn_prev, slides);
x.loop(500);

//active menu

var header = document.getElementById("menu--navbar");
var navbarBrand = header.getElementsByClassName("menu--fontStyle-a");
console.log(navbarBrand);

for (var i = 0; i < navbarBrand.length; i++) {
  navbarBrand[i].addEventListener('click', function () {
    var current = document.getElementsByClassName("active");
    console.log(current);

    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  })
}