/**
 * 
 * The herein js script builds a navigation bar dynamically based on the number of sections and its respective ids. 
 * In the navigation menu, all options are anchored to a given section in the main body. All sections within the viewport
 * have active classes associated to them. When the screen size is 768 px and below, the menu switchs to a side-bar format.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * The three necessary global variables are defined.
 */
const burgerLines = document.querySelector(".hamburger-lines");
const sectionList = document.querySelectorAll("section");
const navigationBar = document.querySelector(".nav-sublist");

/**
 * This functions removes all active classes associated to a given section.
 */
const removeActiveClassfromSections = () => {
  sectionList.forEach((elem) => {
    elem.classList.remove("your-active-class", "active");
  });
};

/**
 * This function returns a boolean based on weither an element is within the screen view or not.
 */
const isInViewport = (elem) => {
  const distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * This function dynamically toggles the action classes for sections based on weither they are within the viewport or not.
 */
const toggleActiveClasses = () => {
  for (const section of sectionList) {
    if (isInViewport(section)) {
      section.classList.add("your-active-class", "active");
    } else {
      section.classList.remove("your-active-class", "active");
    }
  }
};

/**
 * This functions removes all content from the navigation bar.
 */
const removeInnerHTMLofUnorderedListofNavBar = () => {
  navigationBar.innerHTML = "";
};

/**
 * This function enables the toggling of the side-bar menu by clickling the hamburger lines.
 */
const navigationSlide = () => {
  burgerLines.addEventListener("click", (event) => {
    event.preventDefault();
    navigationBar.classList.toggle("nav-sublist-active");
    burgerLines.classList.toggle("switch");
  });
};

/**
 * This function adds the section aanchors in the navigation bar based on the name of their respective IDs.
 * The 'toggleActiveClasses' function is add because it needs to be called at 'load'.
 */
const actionsAtLoad = () => {
  window.addEventListener("load", () => {
    sectionList.forEach((elem) => {
      const sectionID = elem.id;
      const navToken = document.createElement("li");
      navToken.innerHTML = `<a href="#${sectionID}">${sectionID}</a>`;
      navigationBar.appendChild(navToken);
    });
    toggleActiveClasses();
  });
}

/**
 * This function enables the header to be stuck in the viewport at all times.
 * The 'toggleActiveClasses' function is add because it needs to be called upon each 'scroll' instance.
 */
const actionsAtScroll = () => {
  window.addEventListener("scroll", () => {
    const headerBar = document.querySelector("header");
    headerBar.classList.toggle("sticky-header", window.scrollY > 0);
    toggleActiveClasses();
  });
}

/**
 * The herein function calls all the necessary functions for the js script. 
 */
const app = () => {
  removeActiveClassfromSections();
  removeInnerHTMLofUnorderedListofNavBar();
  actionsAtLoad();
  navigationSlide();
  actionsAtScroll();
};

window.addEventListener("load", app());