// check if there is a local storage color option
let mainColors = localStorage.getItem("color_option");
//console.log(mainColors);
if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));

  // remove active class from all colors list Item 
  document.querySelectorAll(".colors-list li").forEach(element => {
      element.classList.remove("active");

      // Add Class on element with data-color === local stroage item
      if (element.dataset.color === mainColors) {
         element.classList.add("active");
      }
});
}

// random Background option 
let backgroundOption = true;

// variable to control the Background interval
let backgroundInterval;

// check if there's local stroage background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local stroage is not empty
if (backgroundLocalItem !== null) {

   if (backgroundLocalItem === 'true') {
      backgroundOption = true;
   } else {
      backgroundOption = false;
   }
   // remove active class from all spans
   document.querySelectorAll(".random-backgrounds span").forEach(element => {
   
   element.classList.remove("active");
   });
   if (backgroundLocalItem === "true") {
     document.querySelector(".yes").classList.add("active");
   } else {
      document.querySelector(".no").classList.add("active");
   }
}
// click on toggle settings gear
// toggle spin class on Icon 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  // toggle class open on main settings box
  let settingsBox = document.querySelector(".settings-box");
  settingsBox.classList.toggle("open");
};

// siwtch colors 
const colorsli = document.querySelectorAll(".colors-list li");
 // loop on All list items
colorsli.forEach(li => {
   // click on every list items
   li.addEventListener("click", (e) => {
       
 // set color on root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // set color on local stroage 
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
     
   });

});
// siwtch random background option  
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
 // loop on All list items
randomBackEl.forEach(span => {
   // click on every span items
   span.addEventListener("click", (e) => {
       
     handleActive(e);

    if (e.target.dataset.background === 'yes') {
      //console.log("yes");
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", "true")
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", "false")
    }
   });

});

// select landing page elements
let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// console.log(imgsArray);

//change background image url 
// get random number
let randomNumber = Math.floor(Math.random () * imgsArray.length);


// function to randomize images
function randomizeImgs() {

  if (backgroundOption === true) {

  backgroundInterval = setInterval(() => {
   let randomNumber = Math.floor(Math.random () * imgsArray.length);
   landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
},1000);

  };
};

randomizeImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // skills offset top 
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height 
  
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height 
  let windowHeight = this.innerHeight;

  // window scroll Top
  let windowScrollTop = this.pageYOffset;

  //console.log(skillsOffsetTop);

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
   
    let allskills = this.document.querySelectorAll(".skill-box .skill-progress span");

    allskills.forEach(skill => {
     skill.style.width = skill.dataset.progress;
    });

   };

};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
// let imagesArray = Array.from(ourGallery);
//console.log(imagesArray);
ourGallery.forEach(img => {
  img.addEventListener("click", (e) => {

  // create overlay element 
  
  let overlay = document.createElement("div");
  
  // add class to overlay
  overlay.className = 'popup-overlay';

  // append overlay to body 
  document.body.appendChild(overlay);

  // creat the popup box 
  let popupBox = document.createElement("div");

  //add class to popup box 
  popupBox.className = 'popup-box';

   if (img.alt !== null) {}
    // create heading 
    let imgHeading = document.createElement("h3");
    // create text for heading 
    let headingText = document.createTextNode(img.alt );
    // append text to heading 
    imgHeading.appendChild(headingText);
    //append imgHeading to popup box
    popupBox.appendChild(imgHeading);


  //create the image 
  let popupImage = document.createElement("img");
   
  // set Image source
  popupImage.src = e.target.src;
  // console.log(popupImage);

  // add image to box
  popupBox.appendChild(popupImage);

  //append popup box to body

  document.body.appendChild(popupBox);
 
  // create the close span 
  let closeButton = document.createElement("span");
 // create the close text 
  let closeText = document.createTextNode("X");
  // append text to button
  closeButton.appendChild(closeText);
  //add class to close B
  closeButton.className = 'close-button';
  // add colse b to popup box
  popupBox.appendChild(closeButton);

  });
});

//close popup box
document.addEventListener("click", function (e) {
  
  if (e.target.className == 'close-button') {

    // remove the current the popup
    e.target.parentNode.remove();

    //remove overlay 
    document.querySelector(".popup-overlay").remove();
  }

});
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// console.log(allBullets);
 
const allLinks = document.querySelectorAll(".links a");
// console.log(allBullets);
 
function scrollToSomewhere(element) {
element.forEach(ele => {

  ele.addEventListener("click", (e) => {
     
    e.preventDefault();

    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// handle active state 
function handleActive(ev) {
    // remove Active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");

    });
    // add active class on self
    ev.target.classList.add("active");  
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
  span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets-option .yes").classList.add("active");
  }else {
    bulletsContainer.style.display = 'none';
    
  }
}
bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
   handleActive(e)
    if (span.dataset.display === 'show') {
      localStorage.setItem("bullets_option", 'block')
      bulletsContainer.style.display = 'block';
    }else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets_option", 'none')
    }
  });
});

// rest button
document.querySelector(".settings-box .reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
}

//toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propagation 
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");

};

//click any where outside menu and toggle btn
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {
     // check if menu is open
     if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
     tLinks.classList.toggle("open");
     }
  }

});


tLinks.onclick = function () {
  e.stopPropagation();
}