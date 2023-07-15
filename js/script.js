// BURGUER MENU (MOBILE)
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");
  primaryNav.setAttribute(
    "data-visible",
    visibility === "false" ? true : false
  );
  navToggle.setAttribute(
    "aria-expanded",
    visibility === "false" ? true : false
  );
});
// SLIDER
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrows = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

//Showing and hiding the arrows based on the carousel scroll left value
const showHideIcons = () => {
  //Getting the max scrollable width
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrows[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrows[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrows.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Getting the width of the first image plus its padding (14px) so that the movement comprises the width of the currently shown images and all of them change
    let firstImgWidth = firstImg.clientWidth + 14;
    // If the clicked icon is the left one, there is a reduction of the width value (otherwise, there is an addition)
    carousel.scrollLeft +=
      icon.id == "leftArrow" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  //If there are no images left, return from here
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  // Getting the difference that needs to be added or reduced from carousel left to put the middle img in the center
  let valDifference = firstImgWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  } else {
    return (carousel.scrollLeft -=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
};

const dragStart = (e) => {
  // Update of the values of the global variables on the mouse-down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  isDragging = true;
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  // isDragging only is true if the user starts dragging; otherwise, it is false and the autoSlide function will not be called
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

// PRODUCTS MENU
// Get references to the DOM elements
const btnAll = document.getElementById("btn-all");
const btnLamps = document.getElementById("btn-lamps");
const btnSofas = document.getElementById("btn-sofas");
const btnArmchairs = document.getElementById("btn-armchairs");
const btnTables = document.getElementById("btn-tables");

const containers = {
  lamps: document.getElementById("lamps-container"),
  sofas: document.getElementById("sofas-container"),
  armchairs: document.getElementById("armchairs-container"),
  tables: document.getElementById("tables-container"),
};

// Function to hide all product containers
function hideAllContainers() {
  for (const container of Object.values(containers)) {
    container.style.display = "none";
  }
}

// Show all product containers
btnAll.addEventListener("click", () => {
  for (const container of Object.values(containers)) {
    container.style.display = "grid";
  }
});

// Handle button click events
btnLamps.addEventListener("click", () => {
  hideAllContainers();
  containers.lamps.style.display = "grid";
});

btnSofas.addEventListener("click", () => {
  hideAllContainers();
  containers.sofas.style.display = "grid";
});

btnArmchairs.addEventListener("click", () => {
  hideAllContainers();
  containers.armchairs.style.display = "grid";
});

btnTables.addEventListener("click", () => {
  hideAllContainers();
  containers.tables.style.display = "grid";
});
