'use strict';

///////////////////////////////////////
// Modal window
//ELEMNTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 =  document.getElementById('section--1');
const nav = document.querySelector('.nav');

//MODAL WINDOW
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//implemeting a scroll

buttonScrollTo.addEventListener('click',function(){
  section1.scrollIntoView({behavior:'smooth'});
})


// PAGE NAVIGATION
document.querySelectorAll('.nav__link').forEach((el) =>
 el.addEventListener('click', function(e){
  e.preventDefault();
  const id = this.getAttribute('href');
  console.log(id);
  document.querySelector(id).scrollIntoView({behavior:'smooth'});
 }));

//  //event delegation
//  document.querySelector('.nav__links').addEventListener('click',function(e){
//    e.preventDefault();

//     //matching strategy
//     if(e.target.classList.contains('nav__link')){
//       document.querySelectorAll('.nav__link').forEach( function(el){
//         el.addEventListener('click',function(e){
//           const id = e.target.getAttributes('href');
//           console.log(id);

//         })
//       })
//     }
      
//  });

// TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
//event delegation
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if(!clicked) return;
  //remove active
  tabs.forEach(t=> t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__tab--active'));
  //active tab
  clicked.classList.add('operations__tab--active');

  // active content 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});

//menu hover fade animination
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo  = link.closest('.nav').querySelector('img');
      
      //opacity
      siblings.forEach(el => {
        if(el!== link) el.style.opacity = this;
      })
    
      logo.style.opacity = this;
    }
    
  };
  // best method : passsing arguments into handler
  nav.addEventListener('mouseover',handleHover.bind(0.5));
  nav.addEventListener('mouseout',handleHover.bind(1));

  //sticky navigation (focus nav bar)
//  const initailsCord = section1.getBoundingClientRect();
// //  console.log(initailsCord);

//   window.addEventListener('scroll',function(){
//     // console.log(window.scrollY);

//     if(window.scrollY > initailsCord.top)nav.
//     classList.add('sticky');
//     else nav.classList.remove('sticky');
//   });

// ----------------------------------------------
//----------------------------------------------
  // sticky navigation :intersection observer

    const obsCallBack = function (entries,observer){
      entries.forEach(entry => {
        // console.log(entry);
      })
    };

    const obsOptions = {
      root : null,
      threshold:[0, 0.2]
    };


    const observer = new IntersectionObserver(obsCallBack,obsOptions);
    observer.observe(section1)

//--------------------------------------------------------------------------------
   //sticky nav implementation with intersectionObserverAPI

    const header = document.querySelector('.header');
    const navHeight = nav.getBoundingClientRect().height
  

    const stickynav = function(entries) {
      const [entry] = entries;
      // console.log(entry);

      if(!entry.isIntersecting){
        nav.classList.add('sticky');
      } else {
        nav.classList.remove('sticky');
      }
    }

   const headerObserver = new IntersectionObserver(
      stickynav, {
        root:null,
        threshold:0,
        rootMargin: `${navHeight}px`, //

    });
    headerObserver.observe(header);
    //-------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------
    //REVEALING  SECTIONS ELEMENTS
    const allSections = document.querySelectorAll('.section');

    const revealSection = function(entries,observer){
      const [entry] = entries;
      // console.log(entry);

      
      if(!entry.isIntersecting) return;   //guardClause
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }

    const sectionOberserver = new IntersectionObserver(revealSection, {
      root:null,
      threshold:0.15,
    })
   allSections.forEach(function(section){
    sectionOberserver.observe(section);
    // section.classList.add('section--hidden');
   })

   //------------------------------------------------------------------------------------------------

   //-----------------------------------------------------------------------------------------------
   //lazyload image
   const imgTargets = document.querySelectorAll('img[data-src]');

   const loadImg = function(entries,observer){
        const [entry] = entries;
        // console.log(entry)

        if(!entry.isIntersecting) return;

        //replace src with data-src
        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load',function(){
          entry.target.classList.remove('lazy-img');
        });

        observer.unobserve(entry.target);
   };

  const imgObserver = new IntersectionObserver(loadImg,{
    root:null,
    threshold:0,
    rootMargin: '200px',
  })
  imgTargets.forEach(img => imgObserver.observe(img));

  //--------------------------------------------------------------------

  //-----------------------------------------------------------------------
  //Slider
  const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');
  
  let curSlide = 0;
  const maxSlide = slides.length; //to know the total slide
  
  // slider.style.transform = 'scale(0.4) translateX(-800px)'
  // slider.style.overflow = 'visible';
  
  //function
  // create a dots
  const createDots = function(){
      slides.forEach(function(_,i){
        dotsContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></
        button>`
        );
      });
    };
 
    //----------------------------------------------------
    
    //--------------------------------------------------
    //activeDots for the dot section
    const activateDot = function(slide){
    document.querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
    
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //go-to-slide
  //-100%,0%,100%,200%
  const gotoSlide = function(){
    slides.forEach((s,i)=>(s.style.transform = 
      `translateX(${100 * (i - curSlide)}%)`));
    }
  
    //Next slide
    const nextSlide = function(){
    if(curSlide === maxSlide - 1){
      curSlide = 0;
    } else{
      curSlide++;
    }
    gotoSlide(curSlide);
    activateDot(curSlide);
  }
  
//PrevSlide
const prevSlide = function(){
  if(curSlide === 0) {
    curSlide = maxSlide-1;
  }else{
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDot(curSlide)
}
//to initialialize our slider 
const init = function () {
  gotoSlide(0);
  createDots();

  activateDot(0);
};
init();

//events handsler
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);
//dot slide and using keyboard right and left key to navigate

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();//short circuting
});

dotsContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    gotoSlide(slide);
    nextSlide(slide);
    activateDot(slide);
  }
});
};
slider();










  // permited refractoring but the best yet
  // nav.addEventListener('mouseover', function(e){
  //   handleHover(e, 0.5);
  // })
    
  // nav.addEventListener('mouseout', function(e){
  //   handleHover(e, 1);
  // })
  


// nav.addEventListener('mouseover', function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo  = link.closest('.nav').querySelector('img');

//     //opacity
//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = 0.5;
//     })

//     logo.style.opacity = 0.5;
//   }

// });
// //hover out
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo  = link.closest('.nav').querySelector('img');

//     //opacity
//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = 1;
//     })

//     logo.style.opacity = 1;
//   }

// });










// //selecting documents
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);


// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButton = document.getElementsByTagName('button');
// console.log(allButton);

// document.getElementsByClassName('btn');






// creating and inserting elements
// .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookied for improved functionality and anlytics.<button class="btn btn--close--cookie">GOT IT </butt0n>';

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// document.querySelector('.btn--close--cookie').addEventListener('click',function(){
//   message.remove()
// })

// //styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// document.documentElement.style.setProperty('--color-primary', '#5ec576');

//classes
//add,remove,toggle,contains

// //implementing scroll
// const buttonScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.getElementById('section--1');

// buttonScrollTo.addEventListener('click',function(e){
//   const section1Cordinate = section1.getBoundingClientRect();
//   console.log(section1Cordinate);
//scrolling
  // window.scrollTo(section1Cordinate.left + window.pageXOffset, section1Cordinate.top +window.pageYOffset);

  //another way is rapping it in an object to add more behavior to the scrolling
  
  // window.scrollTo({
  //   left : section1Cordinate.left +window.pageXOffset,
  //   top  : section1Cordinate.top + window.pageYOffset,
  //   behavior : 'smooth',
  // })

  // // modern scrolling
//   section1.scrollIntoView({behavior: 'smooth'});
// })
//------------------------------------------------------------
// best scroll method
//----------------------------------------------------------


//events 
// //mousenter
// const h1 = document.querySelector('h1');
// const alertH1 = function(e) {
//   alert('GREAT: You are reading the headng')
// }

// setTimeout(()=> h1.removeEventListener('mouseenter', alertH1), 5000);
// h1.addEventListener('mouseenter', alertH1);

// // event propagation
// //random num / random color
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomInt(0,20));

// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// console.log(randomColor (0,255));


// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();

//   // e.stopPropagation();

// });

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();

// });

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// });

//-----DOM TRAVERSING----------------

// const h1 = document.querySelector('h1');

// // going dowmwards : child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'purple';

// //going upward : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'yellow';

// h1.closest('h1').style.background = 'blue';

document.addEventListener('DOMContentLoaded',function(e){
  console.log('html load',e)
})

window.addEventListener('load',function(e){
  console.log('page fully loaded',e);
})

window.addEventListener('beforeunload',function(e){
  e.preventDefault();
  console.log( before, e);
  e.returnValue = '';

})