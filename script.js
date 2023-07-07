'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Modal window
const openModal = function () {
  e.preventDefault();
  //When we click the (open account in the scrolling position) So we'll see that the page scroll to back to the top, and that is because the (' <a class="nav__link nav__link--btn btn--show-modal" href="#"') is actually a link and not a button and on the link when we have this # here as the hyperlink. So, HRF, then that will make the page jump to the top. So that's the default behaviour when we click the link that has this hyperlink.
  //And if that's the default we already know a way of preventing default. Well all we need here in this function is to get access of the event and then on the event we call prevent default.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); //So we have this btnsOpenModal, which is a nodelist and it's a nodelist because it's the result of querySelectorAll, now remember this that a nodelist is not an array, but still does have the forEach() method. So it doesn't have most of the methods that arrays have but forEach() is one of the methods that a node list has as well. And so let's use that now.

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/*
------------------------------------------------------------------------------------------------------------------------------------------------
Page Navigation
------------------------------------------------------------------------------------------------------------------------------------------------
*/
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //By default clicking one of these links, will scroll to the position in the HTML. And that's because of these so-called anchors.  So #, and then some name here, will automatically move to page to the element which has the ID.
//     console.log('LINK');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });});});Now as you see this actually works just fine, but the problem is that it's not really efficient. So we are adding here the exact same callback function, we are adding it once to each of these three elements. So the exact same fucntion is now attached to these three elements. And that's kind of unnecessary. Of course it would be fine for only three elements but what if we had 1000, or like 10,000 elements. If we would attach an event handler to 10,000 elements like this, so like we did here with the forEach function, then we would effectively be creating 10,000 copies of this same function here. And that would certainly would impact the performance. And it's really just not a clean solution in that case. And so the better solution without a doubt is to use 'event delegation'.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/*
------------------------------------------------------------------------------------------------------------------------------------------------
Event Delegation :
------------------------------------------------------------------------------------------------------------------------------------------------

So in event delegation, we use the fact that events 'bubble up'. 

And we do that by putting the eventListener on a 'common parent' of all the elements that we are interested in. And so in our example, it's this container that's around all of these links, and that we saw in the previous video. So remember, that is this element here. So we will put our event handler on this element here, and then when a user clicks one of the links the event is generated, and bubbles up, just as we saw in the last video. 

ANd then we can basically catch that event in this common parent element, and handle it there.

// 1. Add event listner to a common parent element
// 2. Determine what element originated the event.
*/
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //console.log(e.target); the place where the event actually happend.

  //Matching strategy:
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//Building a tabbed component : Now a tabbed component can appear in many different ways, but what they all have in common is that they have some kind of tabs. And when you click the tab then the content of this area below will change.

//Tabbed component :

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));//now, however as we already learned in the last video doing this here is the bad practice because what if we had like 200 tabs. then we would have 200 copies of this callback function here and that would simply slow down the page.

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked); //it looked like we are clicking on the button here but actually we are clicking on this span element. We are not actually clicking the button but we need button. So no matter if we click on this button itself or here on the span element we actually need the button element itself because from that button we will need to read this 'data tab attribute' here because as we mentioned earlier this would contain the number of the tab that should become visible. So here this data attribute becomes really important to store information in the DOM. Now one simple way to fix it, which would not simply fix it actually is to do DOM traversing and simply select the parent element.

  //Guard Clause
  if (!clicked) return; //so it's basically an if statement which will return early if some condition matched. So, in this case if there's nothing clicked then we want to immediately finish this function. And in this case when we have null which is a faulty value, then 'not faulty' will become true and then the function will return and none of the code that's after it will be executed. But offcourse, if clicked does exist then this return will not be executed and the rest of the code will be executed just fine.

  //Remove the active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  //Active TAb

  clicked.classList.add('operations__tab--active'); //So now clicking outside nothing happens. Of course , we still get to the null here but no error occurs because now JavaScript is no longer tryign to execute this line of code here.

  // Activate content area
  //Now remember that the information about which content area should be displayed is here in this data attribute. So the number is encoded basically in the data attribute. So, having the no.2 here means that we want to select the element which has the class of "operations_content_2".

  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//Menu fade animation :

const handleHover = function (e) {
  // console.log(this, e.currentTarget); //now, remember that usually the this keyword is equal to current target. But currentTarget will, of course, remain unaltered. So, by default the this keyword is the same as the current target, so the element on which the event listener is attached to, but when we set the this keyword manually, of course it becomes whatever we set it to.

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //now we need to select the sibling elements so basically, all the other links, and remember that we can do that by going to the parent and then selecting the children from there. Now in this case actually the parent of nav_link is the nav_item. And the only thing that nav_item includes is always just one link. So, you see that each of the link is actually inside of one nav_item. So, now we would have to move up manually not once but twice. And so instead of doing that we would again use the closet method. WE CAN SIMPLY SEARCH FOR A PARENT WHICH MATCHES A CERTAIN QUERY.

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); //Mouseover is actually similar to mouse enter, with the big difference that mouseenter does not bubble. But here we need the event to bubble so that it can even reach the navigation element. There are also opposite events of mouse enter and mouse over, and "we use these to basically undo what we do on the hover". So, the opposite of the mouse enter is "mouseleave", and the opposite of this mouseover is "mouse out".

nav.addEventListener('mouseout', handleHover.bind(1)); //always remember that bind actually returns a new function.

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// Sticky Navaigation:  now to implement this we are gonna use the scroll event for now.
// const intialCoords = section1.getBoundingClientRect();
// // console.log(intialCoords); //so now we get the current top value of the section1.

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY); //so the scroll event is not really efficient and usually it should be avoided. So on the console we'll get the value of the position basically, from the point in the view port to the very top of page. That's why in the beginning we start at the 0 because now the visible part of the site is exactly also at the top of the page.

//   if (window.scrollY > intialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
/*

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


------------------------------------------------------------------------------------------------------------------------------------------------
Sticky navigation: Intersection Observer API
------------------------------------------------------------------------------------------------------------------------------------------------

Well, this API allows our code to basically, observe changes to the way that a certain target element intersects another element, or the way it intersects the viewport. 


*/
// const obsCallback = function (entries, observer) {
//   //these entries here are actually an array of threshold entries.
//   entries.forEach(entry => {
//     console.log(entry); //here the target element is intersecting with the entire viewport.
//   });
// }; //so, this callback function here will get called each time that the "observed element", so our target element here, is intersecting(pass or lie across each other) the root element at the threshold that we defined. So in the current example whenever the first section, "so our target here, is intersecting the viewport at 10%",
// //so the viewport because that's the root and 10% because that's the threshold. So, whenever that happens, then this function here will get called and that's no matter if we are scrolling up or down. And this function will get called with two arguments.

// //when we scroll the page down, we actually get our first real "intersectionObserverEntry" on the console, which appeared in the console because our target element came into the viewport.

// //So, when we scroll up again, then we get a new entry on the console, and so again it should be close to 10%, but now it happened as we were moving up. And so again it was at 10%, but now, it's no longer intersecting.

// //And it's not intersecting because the threshold at 10%. And so now less than 10% basically of "our target here are inside of the root, so inside of the viewport". And so you start to see why this is more efficient. So it's because we only get this kind of event here in the situation that we're actually intrested in. So, you can think of this threshold here at the percentage that we want to have visible in our root. So, in our viewport in this case.

// const obsOptions = {
//   root: null, //this root is the element that the target is intersecting. so again the section 1 is the target and the root element will be the element that we want our target element to intersect.  And again this will all make more sense once you see this in action. So, we could now here select an element or as an alternative, we can write null, and then "we will be able to observe our target element intersecting the entire viewport". So, basically this entire viewport here which shows the current portion of the page. And 2nd we can define a threshold

//   threshold: [0.2, 0], // this is basically the percentage of intersection at which the observer callback will be called,

/*
------------------------------------------------------------------------------------------------------------------------------------------------
TASK FOR RESEARCH PURPOSE : Look out for the array threshold in the MDN documentation. What is "isintersecting" property means in the "IntersectionObserverEntry" ?
------------------------------------------------------------------------------------------------------------------------------------------------

*/

//   //so 0% here means that our callback will trigger each time that the "target element" moves completely out of the view, and also as soon as it enters the view. And that's because the "call back function will be called when the threshold is passed when moving into the view" and "when moving out of the view",
//   //On the other hand if we specify 1 here, then that means that the callback will only be called when 100% of the target is actually visible in the viewport. So, in the case of the section1 that would be impossible because the section itself is already bigger then the view port
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); //now we have this observer to observe a certain target and the method from which we are going to observe the target element which is section 1 in this case.

const headeR = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //so when 0% of the header here is visible, then we want something to happen.
  rootMargin: `-${navHeight}px`, //when the distance between the start of the section and the viewport here is just the same as the navigation. And so like this, the navigation doesn't overlap the section right in the beginning.

  //So here the navigation comes exactly before the first section starts. WE can do it by specifying the property here which is rootmargin. And this root margin here, for example 90, is a box of 90 pixel that will be applied outside of our target element, so of our header here. And 90 is the height of the navigation. Indeed now the navigation appeared exactly 90 pixels before the threshold was actually reached.
});
headerObserver.observe(headeR);

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/* 
------------------------------------------------------------------------------------------------------------------------------------------------                                                  REVEALING ELEMENTS ON SCROLL 
------------------------------------------------------------------------------------------------------------------------------------------------
this is an another modern feature using the intersection observer API. And this time we are gonna reveal elements as we scroll close to them. And this effect can give your pages a very nice touch. And you can infact easily implement it without any external library.*/

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry); // NOw there is no target element because this first, so to say "event" is always triggered no matter what. There is a problem in this statement.

  if (!entry.isIntersecting) return; //if it's not intersecting, then return the entry right away. But if it is intersecting than the function will not return, and simply the rest of our code is gonna be executed.

  entry.target.classList.remove('section--hidden'); //the target is important because we want to make exactly this section which are entred in the viewport visible, not all of the sections. But we are observing all of the sections here with the same observer here. So now we need a way of which is the section that actually intersected the viewport. And that's what we can use the target for.

  //The reason for section1 appearing in the view port very fast is the first entry that always get printed in the beggining

  observer.unobserve(entry.target); //you see, as we keep scrolling, the observer keeps observing the sections. As we keep scrolling here more and more of these events entry, keep getting added. But infact, they are actually no longer necessary, because we already did the work that we wanted. And so we can now unobserve. So, after adding this method the first time of course, we get these logs or events entry here in the console, because of course, work is being done, but right after that each of this section is being unobserved.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.18, //we would set it greater than 0 because we don't want to show the section right at it enters the viewport, but a little bit later.
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); //And actually, since we're already looing over all these sections, it would probably be a  better idea to add the section-hidden class here, also using JavaScript, so not do it manually here in the HTML, and instead, do it in JavaScript. Because some people actually diable JavaScript in their browser. And then for those users the page wouldn't really be visible. They would then have no way of removing this class. And so this is probably not a good idea.

  //section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/* 
------------------------------------------------------------------------------------------------------------------------------------------------                                                  Lazy loading Images 
-----------------------------------------------------------------------------------------------------------------------------------------------
One of the most important things when building any websites is "performance". And "images have by far the biggest impact on page loading". 

And so, it's very important that images are optimized(rearrange or rewrite data to improve efficiency and processing) on any page. 

And for that we can use a startegy called "Lazy Loading" Images. 

So, when you see the pictures on the page as we approach it, it basically starts to load and then once it finished, it will get displayed and that placeholder which is there in the beginning gets replaced. 

It's these features here in the index.html and each of these features has an image. 

So, "main ingridient" to this lazy loading strategy is that "we have a very low resolution image", which is very small and which is loaded, right in the beginning. And you see it's really small and it's only 16 kilobytes while the real one, so the digital, is almost half a megabyte. 

So, that's a "huge huge difference" and "that image we then reference here" in the "data-source attribute". So, that's the "special attribute" that we can use but any other would work as well. 

So "this data-src attribute" is not "a standard HTML attribute" but instead it's one of these "special data attributes" that we can do ourselves. 

And so basically the idea is to "as we scroll to one of these low resolution images" we will then "replace this low resolution image with the one that is here specified in the data-src attribute which is a high resolution image". 

And we then also are gonna remove this class here which is named "lazy-image" which is kind of filter "which makes this image blurred" because without this filter, so the image will look really pixelated and really ugly. So this filter hides the fact that it is actually way too small for its size.
*/

const imgTargets = document.querySelectorAll('img[data-src]'); // we can actually select for elements which contain the property of data-src cause we only want to lazy load specifically those images. We select all the images which have the property of data-src.
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry); //now the image appeared a little bit before and that's because remember that our sections are actually little bit shifted because of the "section-hidden" class that we added to them, they are shifted 8rem down. Because of the "translateY property" in the section-hidden class of CSS they are moved 8rem down. And so, this event will fire a little bit early but that's not a problem at all. What matters is that the event fired correctly and that it is indeed intersecting.

  //And then, as we're moving out of them, then we get even more because now they are no longer intersecting. And once again we need to only do something if they actually intersecting.

  if (!entry.isIntersecting) return; //this propery called "guard clause". From where the event comes from without any target in the entry object.

  // Replace src with data-src : so as we reach the img it's finally time to replace the placeholder image, which is at the src, with the one we actually want, which is data-src.
  entry.target.src = entry.target.dataset.src; //remember that, dataset.src is the place where the "special data-src property" is actually stored.

  //If we inspect right now, we already see that the src is now actually already the original image while the other ones are still lazy ones which are not come in the viewport. Now all we need to do is to then remove that class that has the blurred filter. So that's the "lazy-img" class.

  //Now how we do that, well it's a little bit tricky because this replacing of the "source attribute" actually basically happens behind the scenes. So,

  //"JavaScript finds the real image that it should load and display here". And "it does that behind the scenes".

  //And once it's finished loading that image it will emit the "load event". And the load event is just like the any other event. And so we can just listen for it and then do something so on that image.

  //entry.target.classList.remove('lazy-img'); //and well in this case, the loading happens so fast that we don't even see a problem. Maybe we can change that in the network tab. So this is a completely new tab but what we can do here is to simulate or speed. So, we are gonna come back to this network tab later when we start loading data from "remote sources" on the internet. So, this is the very important tab in the browser tools. And so by the time this loading finishes it will emit the "load event". And so, it's best to only remove that blurry filter once that's done.

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); //and you see that, now it keeps being blurred and it will only disappear once the image is in fact loaded.
    //let's set the network back to online and so now all of it happens basically at the same time because we are working on our local development machine. And there of course the image basically arrives instantaneously.

    observer.unobserve(entry.target); //now we already did our task now we can stop observing the images so we no longer need this.
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,

  //Actually we want probably to load the images a little bit before we actually reached them. So ideally we don't want our users to notice that we are lazy loading these images so all of this should basically happen in the background without our user noticing that. And so we should make these images load a little bit earlier.

  rootMargin: '200px', //so, this is just the same as we did previously here with the navigation. So, to make the navigation load a little bit before the threshold was actually reached and here we're doing the same. By doing that we don't see any dealy in the loading when we browse the page.
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/* 
------------------------------------------------------------------------------------------------------------------------------------------------                                                  Building a A Slider Componenet : Part 1 
-----------------------------------------------------------------------------------------------------------------------------------------------
*/
//Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide'); //now the content inside each of these slides is completely irrelevant for our purposes. So, all we are concerned with in the index.html element is the slider element and then this slide.

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots'); //So this dots elements is a empty container, in which we are gonna create the dots.

  let curSlide = 0;
  const maxSlide = slides.length; //so, basically the length of this nodelist here, and the nodelist, we can also read the length property, just like on an array.

  // const slider = document.querySelector('.slider'); //So, this is the slider component and then each slider has a couple of slides. So 3 slides and they are in fact, all side by side. And so you can see this by blue area that are all side by side. So, here in the slider we can turn off this overflow property which is set to hidden and then you can actually see the next slide already waiting there, basically. So, what happens when we click this button is that all the slides move a little bit to the left side.

  // //Let's maybe temporarily "scale down" the entire slider. So just to make this a little bit easier for us to see.
  // slider.style.transform = `scale(0.9) translateX(-250px)`; //so translateX property can move the images into the left side.

  // slider.style.overflow = 'visible'; //Now we need to change that overflow, so that overflow here, we need to set to visible. So, also in the slider, so otherwise, we cannoto see the other slides.

  //Once again all slides are on top of each other. And we can see that when we inspect them. So indeed all of these slides are in the same position. And so let's create that starting condition which is putting all the slieds side by side.
  //so basically translateX will basically move them to position 100%. So, the width of each of these images is 100%. And the second image will start right here at the end of the firsst one. Then the first one will start right after the first one which is at position 200% and then 300.
  //0%, 100%, 200%, 300%

  //Next Slide : So, remember going to the next slide is basically simply changing the value here in the "transform property". so, this 'transalteX all we will do is to change the percentages. So basically the slide that we want to move to is the one that has "zero percent". So, in the beginning we are at slide 0, but then when we want to go to the next slide, we need to increase that.

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      ); //Each dot is gonna be one element with the class of "dots dot". And then it will have this 'data attribute of slide' "with the number of the slide" that clicking the button will go to. So, once again the "data attribute" 'holds some data that we need in order to make the functionality work'.

      //"beforeend property" means adding it as last child as always.
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event-Listners
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  /* 
------------------------------------------------------------------------------------------------------------------------------------------------                                                  Building a A Slider Componenet : Part 2   
-----------------------------------------------------------------------------------------------------------------------------------------------

Attaching an event handler to a keyboard event so that we can also slide through the slider using the left and right arrow keys.
*/
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide(); //this is also a reason why we created a separate function for this.
    e.key === 'ArrowRight' && nextSlide(); //Short circuiting in JavaScript (and other languages) is when only part of a boolean expression is evaluated in order to get the result of the entire expression.
  });

  //let's now make our dots work:
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //and now for make it even better we can now use destructuring because the name of the variable is exactly same as the source of the data-slide element and so we are reading this form the entry object and so we can simply destructure it.
      goToSlide(slide); //so the goToSlide function and then with slide number that we just read from the data-set.
      activateDot(slide);
    }
  });
};
slider(); //we could now actually even pass in some values here as an arguments, and to make this even more complete we could actually pass in, like some options here. So, we could make the slider function accept a couple of options. So, an object for example which contains these options and then work with that.

/*    
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

____________________________________________________________________________________________________________________                                        HOW THE DOM REALLY WORKS BEHIND THE SCENES
_____________________________________________________________________________________________________________________
And MORE SPECIFICALLY HOW THE DOM IS ORGANISED INTERNALLY.

1. Remember the DOM is basically the interface(a point where two systems meet and interact) between all JavaScript code and the browser, or more specifically HTML documents that are rendered in(interpreted or caused to become) and by the browser.
_______________________________________________________________________________________________________________________________________________
What is DOM ?
The Document Object Model, usually referred to as the DOM, is an essential part of making websites interactive. It is an interface that allows a programming language to manipulate the content, structure, and style of a website. JavaScript is the client-side scripting language that connects to the DOM in an internet browser. The DOM is often referred to as the DOM tree, and consists of a tree of objects called nodes. 
Almost any time a website performs an action, such as rotating between a slideshow of images, displaying an error when a user attempts to submit an incomplete form, or toggling a navigation menu, it is the result of JavaScript accessing and manipulating the DOM. 

At the most basic level, a website consists of an HTML document. The browser that you use to view the website is a program that interprets HTML and CSS and renders the style, content, and structure into the page that you see.

In addition to parsing the style and structure of the HTML and CSS, 
the browser creates a representation of the document known as the Document Object Model.
This model allows JavaScript to access the text content and elements of the website document as "objects".

Why DOM is required?

HTML is used to structure the web pages and Javascript is used to add behavior to our web pages. When an HTML file is loaded into the browser, the javascript can not understand the HTML document directly. So, a corresponding document is created(DOM). 

DOM is basically the representation of the same HTML document but in a different format with the use of objects. 
Javascript interprets DOM easily i.e javascript can not understand the tags(<h1>H</h1>) in HTML document but can understand object h1 in DOM. Now, Javascript can access each of the objects (h1, p, etc) by using different functions.

Structure of DOM: DOM can be thought of as a Tree or Forest(more than one tree). The term structure model is sometimes used to describe the tree-like representation of a document.  Each branch of the tree ends in a node, and each node contains objects  Event listeners can be added to nodes and triggered on an occurrence of a given event.


Window Object: Window Object is object of the browser which is always at top of the hierarchy.  It is like an API that is used to set and access all the properties and methods of the browser. It is automatically created by the browser.

Document object: When an HTML document is loaded into a window, it becomes a document object. The ‘document’ object has various properties that refer to other objects which allow access to and modification of the content of the web page. If there is a need to access any element in an HTML page, we always start with accessing the ‘document’ object. Document object is property of window object.

What is DOM node ? 
DOM document consists of a hierarchy of nodes. Each node can have a parent and/or children.
_______________________________________________________________________________________________________________________________________________



Now we have written a ton of JavaScript code in this course so far, but many times completely without interacting with the browser so without using DOM. But now we are back to working with web pages and therefore with the DOM and this time we're going to learn as much as possible about the DOM and how to create amazing dynamic effects. So let's remember what we already know about the DOM, which is we can use it to make JavaScript interact with the browser and again more specifically we can create and modify and delete elements, set styles and classes and attributes and listen and responds to events in practice this works because a DOM tree is generated from any HTML document and a DOM tree is a tree like structure made out of nodes.

Now how does that interaction actually work?
Well the DOM is a very complex API which remember stands for application prgramming interface. So it's the interface that we can use to programatically interact with the DOM. In practice that means that DOM contains a ton of methods and properties that we use to interact with the DOM tree such as the querySelector and addEventListner or createElemenets methods, or also the innerHTML, textContent or children properties and many more. Now in the DOM there are different types of the nodes just as I mentioned before. For example some nodes are HTML elements but others are just text. And this is very important to understand because all this methods and properties are organized into these different types of objects.

_____________________________________________________________________________________________________________________                                     How The DOM API is organized behind the scenes
_____________________________________________________________________________________________________________________
So, first every single node in the DOM tree is of the type, node. And such as everything else in JavaScript, each node is represented in JavaScript by an object. 
This object gets access to special node methods and properties, such as text content, child nodes and many others. 

Now we already know that there are different types of nodes.
So how should these be represented?

Well, this node type has a couple of child types so to say.
And these are 

"the element type", "the text type", "the comment type" and also "the document type". 
__________________________________________________________________________________________________________________

So whenever there is a text inside any element, we already know that it gets its own node. 
And that node will be of the type, text. 
__________________________________________________________________________________________________________________

And the same actually happens for HTML comments and that's because the rule is that everything that's in the HTML has to go into the DOM as well. 

_________________________________________________________
ELEMENT TYPE NODE :
_________________________________________________________

Now for the element itself there is the element type of node: 
And this type of node gives each HTML access to a ton of useful properties such as 
"innerHTML, classList, children or parent element". 
There are also many useful methods like 
"append, remove, insertAdjacentHTML, query Selector, closest" and that's just to name a few. 
So again, each element will be represented internally as an 'object'.

Now, just to make this complete the 'element type' has internally an 'HTML element child type' :
And that element type itself has exactly one child type for each HTML element that exists in HTML.

So we have a special type for buttons, a special type for images, for links, and so on and so forth.


And that's important because each of these HTML elements can have different unique properties.

For e.g : 
image has a source attribute in HTML which no other HTML has
 OR 
the anchor element for links has the HREF attribute which also no other element has.

And so the DOM needs a way of storing these different attributes and therefore different types of HTML elements were created in the DOM API.

Now comes the really important part, because what makes all of this work is something called inheritance.
So, what is inheritance 
Well, inheritance means that all the child types will also get access to the methods and properties of all their parent node types.
For example an HTML element will get access to everything from the element type, like innerHTML, or classList or all these other methods and properties. And besides that it will also get access to everything from the node type because that is also its parent type.
So, we can think of this as if the HTML button element for example, is also an element and also a node. 

The DOM API is broken up into different types of nodes. Each of these types of nodes has access to different properties and methods and some of them even inherit more properties and methods from thier ancestors in this organization.
_________________________________________________________
Document node type: 
_________________________________________________________

So document , which we use all the time in DOM manipulation is in fact just another type of node so it contains important methods, such as querySelector, createElement and getElement by ID.
And note how querySelector is available on both the "document" and "element types".
________________________________________________________________________________________________________________________________________________
The DOM API actually needs a way of allowing all the node types to listen to events. And remember we usually listen for events by calling the addEventListner() method on an element or the document.
So, why does that actually work ? 
Well its because there is a special node type called 'Event Target' which is a parent of both the node type and also the 'window node type'. 
And so with this, thanks to inheritance, we can call addEventListner on evry single type of node in the DOM API because all elements as well as document and window, and even text and comment will inherit this method and therefore we will be able to use addEventListner on all of them just as if it was their own method.

_________________________________________________________________________________________________________________________________________

Now, just to be clear we will never manually create an eventTarget object. This is just an abstract type that we do not use in practice. This all really happens behind the scenes to make all the functionality work as we expected to work.
Now if you want to go even deeper than this there is still tons of material that you can check out in the MDN documentation.
________________________________________________________________________________________________________________________________________________

*/
/*
________________________________________________________________________________________________________________________________________                                       How to select, create and delete elements 
________________________________________________________________________________________________________________________________________


_______________________________________
Selecting Element : 
_______________________________________

This is a special way of selecting the entire document of any webpage, so of any document and that's document element.
So just document, here is not enough to select the 'document element' because this is not the real DOM element, So for example if you want to apply CSS style to the entire page we always need to select document element.
*/

console.log(document.documentElement); //we will get the entire html here.
console.log(document.head);
console.log(document.body); //so for these special element we do not need to write any selector

const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); //it is used to select multiple elements. So here in this page we have multiple elements with the section class. But as you know already this will return node list and that will contain all of the elements that are a section so that are selected by this selector.
console.log(allSections);
//Now as you learned in the previous lecture these are available not only on the 'document' here but also on all the 'elements'. And actually we use this alot when we want to select child elements.

document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button'); //we want all the elements with the name of 'button' basically. Now this method actually returns an HTML collection. So that's different from a nodelist because an HTML collection is actually is a so-called 'life collection' and that means if the DOM changes then this collection is also immediately updated automatically.
//Sometimes it's actually quite helpful to have an HTML collection like this which updates automatically because ofcourse we can also delete element from the DOM programatically not just manually.
console.log(allButtons);

/*
__________________________________________________________________________________________________________________;

//NOw the same does not happen with a node list. And that because the variable 'section' was created by the time that this section still existed. And it didn't update itself as we deleted one of its elements.
__________________________________________________________________________________________________________________;
*/
console.log(document.getElementsByClassName('btn')); //Here we can specify basically the className. And once again we don't need a selector. So it's not a dot it's simply the name of the classes. And this will also return a live HTML collection.

//Creating and inserting Elements : Now we can create HTML elements using the insert adjacent HTML function that we used before in the Bankist application.

//so we used the .insertAdjacentHTML to create elements.

//Sometimes it's more useful to actually build the element a bit more from scratch, like more programmatically using a combination of other methods.

const message = document.createElement('div'); //this will return a DOM element and stores that element into the message. And that element is not yet anywhere in our DOM.

//All this is a DOM object that we can now use to do something on it but it is not yet in the DOM itself. So it's nowhere to be found on our webpage. If we wanted it on the page than we need to manually insert it into the page.

//We can add classes. So now this is like any other selection that we have. So if we have an element in our DOM and select it for example using 'querySelector' here then the result is also a DOM object that we can use in our code.

//And the message here is now just the same it's just an object that represents a DOM element. And so just like before we can use, for example classlist, and then we can add a class called 'cookie-message'. And that's because here we will now programatically built an element which will display a small cookie message on the bottom of the screen.
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analystics.'; //so this inserts simply text but of course we can also insert a HTML.
message.innerHTML =
  'We use cookies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it!</button>'; //and remeber we can use both of these properties to 'read' and to 'set content'.

//Anyway, we now have this element and all we have to do now is to insert it into our DOM. And let's do it in our header.

//header.prepend(message); //so, prepending basically adds the element as the first child of header element. But we can also add it as the last child. So that is append.
header.append(message); //so now we see it's really appended. Now what we see here is the element was actually only insert at once, now that's because this element here so message is now indeed a life element living in the DOM. And so therefore it cannot be at multiple places at the same time. It's just like a person that also cannot be at two places simultaneously. So what's happend here is that we first prepended the element and then we appended it.

//And what this append did here was to basically move the element from being the first child to being the last child. So basically, it moved the element and didn't really insert it because it was already inserted here by prepend.

//so what this means is  that we can use the prepend and append methods not only to insert elements but also to move them. And again that is because a DOM element is unique. So it can always only exist at one place at a time.

//But now, what if we actually wanted to insert multiple copies of the same element?

//Well in that case we actually would have to first copy the first element.

//header.append(message.cloneNode(true));//true simply means that all the child element will also be copied. And now as you see, we get the same cookie message in both places.

//header.before(message);//and so, as the name says this one will insert the message before the header element. so as a sibling.
//header.after(message); //and this one here after header element, so also as a sibling.

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove(); //and again here we don't have to select the message element again because we already have it in memory. So we already have it stored in a variable. So there's no need to run document or query selector of course we could do it and it would work as well. But again that's not necessary because we already have it stored in memory.
    message.parentElement.removeChild(message); //DOM TRAVERSING
  });

//Now this remove method here is actually very recent. Before this method existed all we could do was to remove child elements. And so back then we have to select the parent element first and then remove the child from there.

//And by the way this way of moving up and down in the DOM tree like selecting, the parent element is called 'DOM traversing'.

/*
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
__________________________________________________________________________________________________________________                                            Styles, Attributes and Classes
__________________________________________________________________________________________________________________

Styles :
*/
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
//So remember that these styles are actually set as inline styles, so styles set directly here in the DOM.

//Now you might think that we are able to read style using the style property.
console.log(message.style.height); //and we get basically nothing, and that's because using the style property like this here only works for inline styles that we set ourselves also using this style property. So, it's gonna work for example, for the background color,
console.log(message.style.backgroundColor); //and again because it is an inline style so style that we set manually ourselves, but we cannot get a style that is hidden inside of a class or maybe that doesn't even exist.

console.log(message.style.color); // So the color is defined in the style sheet, but if we try to log it here, then it's nowehere to be found.

//Now we still get the style, if we really want to, all we need to do is to use the getComputedStyle function,
console.log(getComputedStyle(message).color); //here the message element contains a very massive object here and this object contains all of the properties with all of the values.

console.log(getComputedStyle(message).height); // So this is the computed style which means that it's the real style as it appears on the page. And even if we do not declare it in CSS. So, for example, the height, we didn't define ourselves, but the browser of course needed to calculate the height to display it and so we can then get access to that value.

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//CSS CUSTOM PROPERTIES : which we usually just call CSS VARIABLES : They are called custom properties but again, they are more like 'variables'. And the idea of CSS variables is offcourse very similar to the idea of variables in JavaScript, so this way we can change values in many places all over our CSS files by simply changing the value all over in the ":root section" of CSS Style.
//'Now if we can change the value in our CSS, then we can also change it right from JavaScript'

//So let's see where the properties are defined, so they are defined in the document :root, and so in JavaScript that is equivalent to the document, so basically the document element.

document.documentElement.style.setProperty('--color-primary', 'orangered'); //so you see that everywhere in our style where we used this green color, now turned orange. So with this we can easily change the style of our page, simply by setting one property. Then we pass in the name of the property and the value. And by the way we can do the same for all properties, so we could also use setPRoperty to set the color, or the background color, or the width.

// ATTRIBUTES : IN HTML all of 'class', 'src', 'alt' and 'id' all of these are simply attributes of the HTML element like of image. And so in JavaScript we can offcourse access and change these different attributes.

const logo = document.querySelector('.nav__logo'); //and so now we can access some of these default properties so like the alt or the source attribute.
console.log(logo.alt);
console.log(logo.src); //so you see here we get the alternative text, which is this alt and then also this source. NOw this src looks different that we have in the HTML file. So, this URL here of the image is basically the 'absolute URL', while what we have in HTML files is just a 'relative URL', so relative to the folder, in which index.HTML file is located.
// And if we want to get just literally this URL that we have in our HTML file then we have to use 'getAttribute()'.
console.log(logo.getAttribute('src')); //And the same is actually true for the href attribute on links.

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href')); //while in this case they are probably the same anyway, because of them were already absolute anyway. So, in this case that is not a big deal but for example, in one of these links here in the top, there it might be relevant.
const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href);
console.log(link2.getAttribute('href')); //and now indeed you see the href property is the absolute URL once again, while using getAttribute() simply returns the URL as we wrote in the HTML.

/*
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


------------------------------------------------------------------------------------------------------------------------------------------------
//SPECIAL TYPE OF ATTRIBUTES:
------------------------------------------------------------------------------------------------------------------------------------------------

*/
//DATA ATTRIBUTES : They are the special kind of attributes that start with data.
console.log(logo.dataset.versionNumber); // So, just like property names we need to transform this here so the html attribute into camelCase. And that's so important to remember.

//So for these special attributes they are always stored in the dataset object and indeed in the console we have '3.0' So "we use data attributes quite a lot when we work with the UI and especially when we need to store data in user interface." So, basically in the HTML code.

//Classes :
logo.classList.add('c', 'j'); //and keep in mind that you can also add multiple classes by passing in multiple values.
logo.classList.remove('c', 'j');
logo.classList.toggle('c', 'j'); //if the element has a class, the classList toggle method behaves like classList.remove() and the class is removed from the element. And if the element does not have the specified class., then classList.toggle, just like classList.add(), adds this class to the element.
logo.classList.contains('c', 'j'); //not includes.

//Now just as we could read the class name using the className() property, we could also use that to set a class.
//Don't use this because this will overwrite all the exitisng classes and also it allows us to only put one class on any element.
logo.className = 'jonas';

//So this works because on images they are supposed to have the alt, and the source attributes on them and so if we specify them in HTML, then JavaScript will automatically create these properties on the object, but if we add some other property that is not a standard then JavaScript will not automatically create a property on the object.

console.log(logo.className); //so the class name of this element is 'nav__logo'.

// Non-standard
console.log(logo.designer); //that's not going to work cause designer is not a standard property that is expected to be on images.

//AT least it doesn't work like this but of course there is another way of reading this value from the DOM,
console.log(logo.getAttribute('designer')); //and that indeed returns to us Jonas.

// Now just as we can read these values for these attributes, we can also set them.
logo.alt = 'Beautiful minimalist logo';

//There is also the opposite of getAttribute() which is setAttribute().
logo.setAttribute('company', 'Bankist');

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

//btnScrollTo.addEventListener('click', function (e) {
//So in the first way that we're going to do, we need to first get the coordinates of the element that we want to scroll to.
//const s1coords = section1.getBoundingClientRect();
//console.log(s1coords); //so when we click this, then we get this "DOM rectangle" now, and it has all of these properties so, the 'X position' which is measured from the left side, the 'Y position' "which is measured from the top", and then the 'width' of the element the 'height', and then a lot of other properties. So this element is probably not the best one to understand this , so let's get this rectangle for the button.

//So that's the element that we clicked. So, e.target is essentially this element so the one that was clicked.
//console.log(e.target.getBoundingClientRect()); //So, this 30 pixels here is the distance between the border of the browser, and then the Y is the distance from the top. Then we also have the width, which is this 112, the height. Here we also get the top, which is in this case, similar to Y, but it isn't always because when we scroll then X and Y actually change. And if we click the button again, then you'll see that Y is now only 168 pixels. And so, that's the distance between the (learn more) element and the top of this viewport. So this BoundingClientRect is basically relative to the visible view port.

//VIEWPORT : A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view.

//And infact we can also get the currentScroll position
//console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //AFter clicking the button we get the current scroll is 0 from X so there is 'no horizontol scroll and vertically, we already scrolled 160 pixels here at this point. So when we're at the very top, then these two values should both be zero. So, basically this Y coordinate here is the distance between the current position here of the view port, and at the top of the page.
//So the distance, for example, is now 421. So that means that from this very edge off the browser now, all the way to the top of the page, it is 421 pixels.

//pageXOffset = The pageXOffset property returns the pixels a document has scrolled from the upper left corner of the window. The pageXOffset property is equal to the scrollX property.

//And if you're even more curious then since we're talking about coordinates and stuff, we can also read the height and the width of the view port. So again this rectangle in which we can see the current portion of the page, so height and width of view port,
//console.log(
// 'height/width viewport',
// document.documentElement.clientHeight,
// document.documentElement.clientWidth
//); //These client height and width here are bit counting with the scroll bars. It's just the dimensions of the view port, that are actually available for the content. And of course that excludes any scroll bars.

// Scrolling
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// ); //so here we get all kinds of intresting information about coordinates scrolling and dimensions of the view port. But anyway the goal of actually getting these coordinates is because we need them to scroll to this first section. So basically we need these coordinates here to tell JavaScript where it should scrollTo() so that's a global function that's available on the window object and here, the first argument is the left position. Then the second one we're gonna be interested in the top, which is again, the position from the top of the viewport. And so indeed now it worked, so we are now here at the top of section one.
//And so that's because the top was at 713pixels. And so that's the distance that was scrolled. However watch again when we click the button again. So now it doesn't really work, well that's because this top here that we specified is always relative to the view port, but not to the document.

//So, not to the top of the page basically. And it works when we are on the top of the website and that's because the Y position here in the section1 which is the same as the this top, 713, which is basically the distance between the border of the section-1 and to the top of the website.

//But when we do it by scrolling the view port a little then the distance between the line of the section-1 and top of the viewport becomes a lot less. So, it's only like 200 or something. So basically it only scorlled 200 pixels while in fact we want it to scroll all the way to 713 pixels,

//The solution to this problem is to simply add the current scroll position to the top value here. And with this we will then determine the position of the section here, not relative to the viewport. So, to the top of this browser window here, but instead to the top of the page. So the position of the section here is always this top, which is from the line of section-1 to the viewport + the current scroll position. And so that's the distance from the scrollling postion here all the way to the top.

//Now we can even make this better. There is a way of making this scrolling nice and smooth. And this works by passing in an object , instead of just one argument.
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

//All right so this is kind of old school way of doing it. So manually calculating all of these values here, and then saying that we want to scroll to this position.
//MORDEN WAY OF SCROLLING :

//WE simply take the element that we want to scroll to and that is section 1, and on that we call, scrollIntoView and then we passin a object and specify again, behavior and set it to smooth.
//   section1.scrollIntoView({
//     behavior: 'smooth',
//   });
// });

/*

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

_____________________________________________________________________________________________________________________
Types of events and event handlers : 
_____________________________________________________________________________________________________________________
An event is basically a signal that is generated by a certain DOM node, and that signal means that something has happend, for example, a click somewhere or the mouse moving, or the user triggering the full screen mode and really anything of importance, that happens on our webpage, generates an event.  And as we already know that we can then handle them if we'd like. But no matter if we handle a certain event or not, for example, a click, that event will always happen when a user clicks. So it's doesn't matter if we actually listening for it or not.

DOM node : an element is a node that's written using a tag in the HTML document. <html>, <head>, <title>, <body>, <h2>, <p> are all elements because they are represented by tags.

*/
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter',alertH1);//So, after we listned for an event and then handle that event, here in this function we can remove that event listner. So, we need to export the function into its own function for the removing purpose. So, this makes it that we can only listen for the event once. So, this is a nice pattern whenever you only want to listen to any event just once. But of course this doesn't have to be in here. So, you can remove the EventListner at any place in our code. For example we could remove it after a certain time has passed.
};

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

//So the mouseenter event here, is a little bit like the hover event in CSS. So, it fires whenever a mouse enters a certain element.
// const h1 = document.querySelector('h1');
// h1.addEventListener(
//   'mouseenter',
//   alertH1 //and indeed, as we hovered over it, we got this alert.
// );

//Another way of attaching an eventListner to an element:
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
//Each of the events that we just show in the table, there is one on-event property like this one. For example also : onclick.

//There are two ways why addEventListener() is better: 1. It allows us to add multiple event listners to the same event.  2. We can actually remove an event handler in case we don't need it anymore.

//Finally there is also a 3rd way of handeling events which is by using HTML attribute. But this one should not be used. This handling event is on the 46 line number.

/*


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


------------------------------------------------------------------------------------------------------------------------------------------------
EVENT PROPAGATION (the action of widely spreading and promoting an idea, theory, etc) : BUBBLING AND CAPTURING 
------------------------------------------------------------------------------------------------------------------------------------------------

Javascript 'events' has a very important property. They have a so-called 'capturing phase' and a 'bubbling phase'.

So, here we have a very simple 'HTML document' along with a 'DOM tree', but only for the anchor element that's represented in the red. 
So, here we can see all the parent elements of that red anchor element. 
And that's because we're gonna simulate what exactly happens with an event when someone clicks on that link. 

And as we already know the dom then generates a click event right away. 

However this event is not generated at the target element. So at the element, where the event happened, in this case, the click on the anchor element. 
Instead, the event is actually generated at the root of the document, so at the very top of the dom tree. 

And from there, the so-called "capturing phase" happens, where the event then travels all the way down from the document root to the target element. And as the event travels down the tree, it will pass through every single parent element of the "target element". So, in our example here the html element, the body element, the section, then the paragraph, until it finally reaches its target. 

As soon as the 'event' reaches the target, the "target phase" begins 'where events can be handled right at the target'. 

And as we already know, we do that with event listeners. 
So 'event listeners' wait for a certain event to happen on a 'certain element', and as soon as the event occurs, it runs the attached callback function. 
In this example, it will simply create this alert window. And again this happens in the target phase. 


NOw, after reaching the target the event then actually travels all the way up to the document root again, in the so-called 'bubbling phase'. 
So, we say that the events bubble up from the target to the document root. 
And just like in the capturing phase the event passess through all its parent elements, and really just the parents, so not through any sibling elements.

Well indeed this information is very important because basically, it's as if the event also happend in each of the parent elements. 

So, again as the event bubbles through a parent element, it's as if the event had happened right in that very element. 

"What this means is that if we attached the same event listener, also for example: to the section element, then we would get the exact same alert window for the section element as well". 

So, 'we would have handled the exact same event twice', "once at its target", and "once at one of its parent elements". And this behaviour will allow us to implement really powerful patterns, as we will see throughout the rest of the section.
So, this really is very, very important to understand.
Now by default, "events can only be handled in the target, and in the bubbling phase". However we can set up event listeners in a way that they listen to events in the capturing phase instead. 

Also actually not all types of events do have a capturing and bubbling phase. 
Some of them are created right on the target element, and so we can only handle them there. But really most of the events do capture and bubble such as I described it here in this lecture.
We can also say that events propogate((with reference to motion, light, sound, etc.) transmit or be transmitted in a particular direction or through a medium), which is really what capturing and bubbling is. 
It's events propagating from one place to another

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
*/

// rgb(255,255,255)
// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(); //this keyword is pointing to the element in which the event handler attatched.

//   console.log('LINK', e.target, e.currentTarget);

//the current target is indeed the element on which the event handler is attatched. So if we click the nav__link then we'll see that the currentTarget is not the same. Well, in the link it is of course the same, because that's where the event happened and it's also where the handler is attached to. But then in the container and the whole navigation element it is, of course the nav_links.

//   console.log(e.currentTarget === this); So, the this keyword and event.currentTarget are gonna be exactly the same in any event handler.

//   //Stop propogaiton:
//   //e.stopPropagation();//So now the two parent element did not change their background color which means that the event never arrived at those elements, now in practice it's never a good idea to stop the propogation. So, stopping the event propogation like this can sometimes fix problems in very complex applications with many handlers for the same events, but in general it's really not a good idea to stop the propagation of events.

//So as we just saw, these 3 events handlers that we set up here recieve events from the target elements and also from the bubbling phase. So in another words the event handler functions are listening for click events that happen on the click event itself and they are listening up for the events that keep bubbling up from their child elements and that's the reason the color changes in all of the parent elements here as well.

//Captureing phase, well as we learned, events are captured when they come down from the document root all the way to the target, but our event handlers are not picking up these events during the capture phase. The capturing phase is usually irrelvent for us it's just not that useful. On the other hand the bubbling phase can be very useful for soething called 'event delegation'.
// });

//however if we really do want to capture events during the capturing phase, we can define a 3rd parameter in the addEventListener function. And so in this case wher the used capture parameter is set to true, the event handler will no longer listen to bubbling events, but instead to capturing events. Now in practice that's gonna look same here but as we take a look here in our log, you will see that now, the NAV is actually the first appering. And the reason for that is that this element is now actually listening for the event as it travels down from the DOM, while these other ones are listening for the event, as it travels back up and so that happens later and therefore the NAv is now the first one to show up becaue this offcourse the first one to happen. because event travels down all the way to the target only then it bubbles back up.

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------------------------------------------------------------------------
//DOM Traversing : So dom traversing is basically walking through the Dom. Which means that we can select the element based on another element. And this is very important because sometimes we need to select the element relative to a certain other element. For example a direct child or a direct parent element or sometimes we don't even know the structure of the DOM at runtime. And in all these cases we need DOM traversing.
-----------------------------------------------------------------------------------------------------------------------------------------------

*/

const h1 = document.querySelector('h1');

// Going downwards: child
//as we already know that querySelector also works on elements.
console.log(h1.querySelectorAll('.highlight')); //so this here indeed selects all the elements with the highlight class that are children of the h1 element. And that would work no matter how deep these these child element would be inside of the h1 element. Also if there were other highlight elements on the page, so elements with the highlight class, they would not get selected because they would not be children of the h1 element.

//Now sometimes all we need is direct Children
console.log(h1.childNodes); //so this gives us every single node of every single type that there exists. But many times we are simply intrested in the elements themselves.
console.log(h1.children); //and this then gives us an HTML Collection which remembers is a live collection, so it's updated, and so here we indeed only get the 3 elements that are actually inside of the h. But this one works only for direct children.

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'blue';

//Going upwards : parents
console.log(h1.parentNode); //as we open this up, we see that indeed this h here, is inside of header title. And so this is the direct parent, and so that's why we get this.
console.log(h1.parentElement); //it's same as parentNode.

//however most of the times we need a parent Element which is not a direct parent. Or in other words, we might need to find a parent element no matter how far away it is in the DOM tree. And for that we have the "closest method".

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //so let's say at page we have multiple headers so multiple elements with a class of header, but for some reason we only wanted to find the one that is the parent element of h. And so for that we can use the closest, and the closest method receives a 'query string' just like querySelectorAll.

//Now this selector here actually matches the element on which we are calling closest, then that's actually the element that's gonna be returned.
// h1.closest('h1').style.background = 'var(--gradient-primary)'; //so we can think of the closest here as basically being the opposite of querySelector. So both receive a query string as an input, but querySelector finds children no matter how deep in the DOM tree, while the "closest method finds parents". And also no matter how far up in the DOM tree.

//Going sideways: siblings
//and so for some reasons in JavaScript we can only access direct siblings. So, basically only the previous and the next one.
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// trick to access all the siblings :
// console.log(h1.parentElement.children); //and so now we get all the siblings and that of course is gonna include itself.
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'; //and indeed all the other three siblings are now like 50% smaller.
// });

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/* 
-----------------------------------------------------------------------------------------------------------------------------------------------                                                         Lifecycle DOM Events   
-----------------------------------------------------------------------------------------------------------------------------------------------
let's take a quick look at a 'couple of different events that occur in the DOM' during a "webpage's life cycle". 

And when we say "lifecycle", "we mean right from the movement that the page is first accessed", until the user leaves it. 


-------------------
DOM content loaded:
-------------------
And this event is fired by the 'document' as soon as 'the HTML is completely parsed', "which means that the HTML has been downloaded and been converted to the DOM tree". 

Also '"all scripts" must be downloaded and executed' before 'the DOM content loaded event can happen'. 

And of course we can listen to that event. And since it happens on the 'document', we call the "add event listener" method on the document. 
*/
document.addEventListener('DOMContentLoaded', function (e) {
  //Now this event actually does not wait for "images and other external resources to load". So, just HTML and JavaScript need to be laoded.
  console.log('HTML parsed and DOM tree built!', e); //down in the network part of the browser you can actually see the time that it takes for the event to be fired.
});
//So, this here we can now "execute code" that should only be executed after the "DOM is available".

//And in fact "we want all our code only to be executed" after 'the DOM is ready'. So, does that mean that we should wrap our entire code into an event listner like this.

//Well, actually no we don't need to do that. And that's becuase we have this 'script tag' "which is the one that imports our JavaScript into the HTML", right at the end of the 'body'.

//So, basically it's the last thing that is going to be read in the HTML. And so "basically the browser will only find our script" when the rest of the HTML is already parsed anyway.

//So, "when we have the script tag here at the end of the HTML", then we do not need to listen for the 'DOM content loaded event'.

/*
-------------
Load Event : 
-------------
and the 'load event' is fired by the window as soon as, not only the HTML is parsed, but also 'all the images' and 'external resources' like "CSS files are also loaded". So basically when the complete page has finished loading is when this event gets fired.
*/
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); //Now in some browsers to make this work, we need to call prevent default here. In chrome it's not necessary, but some browsers require it.
//   console.log(e);
//   //and actually in order to display a leaving confirmation, we need to set the return value on the event to an empty string.
//   e.returnValue = '';
// }); //and this event here is created immediately before a user is about to leave a page. So, we can basically use this event to ask users if they are 100% sure that they want to leave the page.

//Don't abuse this kind of feature becuase a message like this is of course pretty intrusive(causing disruption or annoyance through being unwelcome or uninvited) and it should only be displayed when necessary. So don't be one of the developers who abuses of too much power. So the only time you should prompt the user, if they really want to leave the page is for example, "when the user is leaving in the middlle of filling out the form", "or like writing a blog post or something like that". So, a situation in which data could actually be lost by accident.

/*
-----------------------------------------------------------------------------------------------------------------------------------------------
Efficient Script Loading: 'Defer' And 'Async' 
-----------------------------------------------------------------------------------------------------------------------------------------------

There are different ways of loading a 'JavaScript script' in HTML. We have always used the "regular way of including JavaScript" into our HTMl, however we can also add the "async attribute" to the script tag, or the "defer attribute". 

And these attributes are gonna influnence the way in which the JavaScript file is fetched, which basically means "downloaded" and then "executed". 


_______________________________________________________________________________________________________________________________________________
Now in the HTML, we can write the "script tag" in the "document head", or usually at the end of the "body". 
_______________________________________________________________________________________________________________________________________________


So these are the "two situations" that we're gonna be comparing in this lecture.

So when we include script "without any attribute" in the head, what will the "page loading" process look like over time? 

Well, as the user loads the page and receives the HTML, 
the HTML code will start to be parsed by "the browser" and parsing the HTML is basically building the DOM tree from the HTML elements. 

Then "at a ceratin point" it will find our script tag, start to fetch the script, and then execute it. 
Now during all this time, the HTML parsing will actually stop. 

So, it will be waiting for the script to get fetched and executed. Only after that, the rest of the HTML can be parsed. 
And at the end of that parsing the "DOM content loaded event" will finally get fired, as we learned in the last video.

Now, "this is not ideal at all", we don't want the browser to be just sitting there doing nothing, 
because this can have a huge impact on the "pages performace". 

Plus in this case, the script will actually be executed before the DOM is ready. And so, again that's not ideal. 
So never do this, "never include the script in the head like this". 

That's why we usually always put the script tag at the end of the body, so that all the HTML is already parsed, when it finally reaches the script tag. 

However "this is not still perfect" because the 'script' could have been downloaded before, while the HTML was still being parsed. 

So, what about the async attribute? 
When we use "async script" loading in the head of document. So as you can see, the difference is that the script is loaded at the same time as the HTML is parsed. So in asynchronous(not existing or occurring at the same time) way, so that's already an advantage. 
_______________________________________________________________________________________________________________________________________________
However the "HTML parsing still stops for the 'script execution'". 
_______________________________________________________________________________________________________________________________________________

So, the 'script' is actually downloaded asychronously. 
But then it's executed right away in a synchronous(existing or occurring at the same time) way. 
And so "the HTML code has to wait for being parsed". 
But anyway, as we can see from the length of the diagrams, 

"this still makes page loading time shorter".


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

But now, what about the "defer attribute"? 

Well, when differing what happens is that the script is still loaded asynchronously. But the "execution of the script is deffered(postponed or delayed) until the end of the 'HTML parsing'". 

So, in practice, "loading time is 'similar' to the async attribute", 
but with the key difference that would 'defer', 
the HTML parsing is never interrupted, because the script is only executed at the end.

And many times this is exactly what we want. 

"Async" and "defer" attribute in the body actually does not make any sense there. 
Because in a body, 'fetching' and 'executing' the script always happens after parsing the HTML anyway. And so async and defer have no practical effect their.
_______________________________________________________________________________________________________________________________________________
Now there are offcourse "usecases" for all these strategies. So let's compare them: 
_______________________________________________________________________________________________________________________________________________

1) So one important thing about loading an "async script" is that the 'DOM content loaded event' will not wait for the script to be downloaded and executed. 

Usually the "DOMContentLoaded" event waits for all scripts to execute, except for "async scripts". So, DOMContentLoaded does not wait for an async script.


Now using 'defer' on the other hand forces, the DOMContentLoaded event to only get fired after the whole script has been downloaded and executed. And this is the more traditional way that this event works. 

2) Another very importatnt aspect is that "async scripts" are not guaranteed to be 'executed' in the exact order that they are declared in the code". 
So, the script that arrives first gets executed first. 

On the other hand by using 'defer', that is not the case. 

So "using the 'defer attribute' "guarantees that the scripts are actually executed in the order" that they are declared or written in the code". And that is usually what we want to happen.

So, in conclusion and also keeping in mind, using "defer" in "HTML head" is overall the best solution. So, you should use these scripts where the 'order of the execution is important'. 

for e.g. if your script relies on some third party "library" that you need to include, you will include that library before your own script, so that your script can then use the library's code. And in this case you have to use defer and not async. Because "defer will guarantee the correct order of execution". 

Now for the "thrid party script" where the order does not matter, for e.g. an analytics software like 'Google Analytics', or an ad script, or something like that, then in this case you should totally use 'async'. 

_______________________________________________________________________________________________________________________________________________
So, for any code that your own code will not need to interact with, async is just fine. 
_______________________________________________________________________________________________________________________________________________

So, it's a good usecase for this kind of scripts. YOu can use different loading stratigies for different scripts in your web application or website. 
Remember that only modern browser support "async" and "defer". And they will basically get "ignored in old browsers". 

So if you need to support "old browsers" then you need to put your script tag at the end of the body not in the head. That's because this is not a JavaScript feature but an HTML5 feature. 
And so you can really work around this limitation like you can do with modern JavaScript features by "transpiling" or "poly-filling".







*/
