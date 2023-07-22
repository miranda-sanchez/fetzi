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
const firstImg = carousel.querySelector("img");
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

// CREATE PRODUCTS DYNAMICALLY
// Create a JavaScript function to generate the product elements
function createProductElement(imageSrc, altText, year, name, price) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  const figure = document.createElement("figure");
  const link = document.createElement("a");
  //link.href = "#products";

  const image = document.createElement("img");
  image.src = imageSrc;
  image.alt = altText;

  link.appendChild(image);
  figure.appendChild(link);
  productContainer.appendChild(figure);

  const description = document.createElement("div");
  description.classList.add("product-description");

  const spanYear = document.createElement("span");
  spanYear.textContent = year;
  description.appendChild(spanYear);

  const heading = document.createElement("h3");
  heading.textContent = name;
  description.appendChild(heading);

  const spanPrice = document.createElement("span");
  spanPrice.classList.add("product-price");
  spanPrice.textContent = price;
  description.appendChild(spanPrice);

  productContainer.appendChild(description);

  const cartButton = document.createElement("button");
  cartButton.classList.add("product-cart");
  cartButton.textContent = "Add to cart";
  const cartIcon = document.createElement("i");
  cartIcon.classList.add("fa-solid", "fa-cart-shopping");
  cartButton.appendChild(cartIcon);
  productContainer.appendChild(cartButton);

  // Add event listener to the "Add to cart" button
  function addToCart(product) {
    const cartItems = getCartItems();
    cartItems.push(product);
    saveCartItems(cartItems);
    alert(`${product.name} added to cart!`);
  }
  return productContainer;
}

//Create an array of products containing the information for each product
const lamps = [
  {
    image: "img/ceiling-lamp1.PNG",
    alt: "70's black ceiling lamp",
    year: "1972",
    name: "Acrylic Ceiling Lamp",
    price: "70",
  },
  {
    image: "img/ceiling-lamp2.PNG",
    alt: "Grey ceiling lamp",
    year: "1978",
    name: "Greish Ceiling Lamp",
    price: "40",
  },
  {
    image: "img/ceiling-lamp3.PNG",
    alt: "Orange ceiling lamp",
    year: "1983",
    name: "Orange Ceiling Lamp",
    price: "50",
  },
  {
    image: "img/ceiling-lamp4.PNG",
    alt: "Green ceiling lamp",
    year: "1985",
    name: "Green Ceiling Lamp",
    price: "65",
  },
  {
    image: "img/ceiling-lamp5.PNG",
    alt: "Orange acrylic ceiling lamp",
    year: "1985",
    name: "Orange Classic Ceiling Lamp",
    price: "65",
  },
  {
    image: "img/ceiling-lamp6.PNG",
    alt: "Brown crystal ceiling lamp",
    year: "1962",
    name: "Brown Crystal Ceiling Lamp",
    price: "80",
  },
  // Add more lamp products here
];

const sofas = [
  {
    image: "img/sofa1.PNG",
    alt: "Pink velvet sofa",
    year: "1960",
    name: "Pink Velvet Sofa",
    price: "350",
  },
  {
    image: "img/sofa2.PNG",
    alt: "Green leather sofa",
    year: "1987",
    name: "Green Leather Sofa",
    price: "300",
  },
  {
    image: "img/sofa3.PNG",
    alt: "Lime-green velvet sofa",
    year: "1990",
    name: "Lime-green Velvet Sofa",
    price: "280",
  },
  {
    image: "img/sofa4.PNG",
    alt: "Shell-shaped velvet sofa",
    year: "1990",
    name: "Shell-shaped Velvet Sofa",
    price: "200",
  },

  // Add more sofa products here
];

const armchairs = [
  {
    image: "img/chair1.PNG",
    alt: "Green corduroy armchair",
    year: "1988",
    name: "Green Corduroy Armchair",
    price: "100",
  },
  {
    image: "img/chair2.PNG",
    alt: "Orange wooden armchair",
    year: "1986",
    name: "Orange Wooden Armchair",
    price: "150",
  },
  {
    image: "img/chair3.PNG",
    alt: "Burgundy wooden armchair",
    year: "1980",
    name: "Burgundy Wooden Armchair",
    price: "250",
  },
  {
    image: "img/chair4.PNG",
    alt: "Plaid armchair",
    year: "1979",
    name: "Plaid Armchair",
    price: "135",
  },
  {
    image: "img/chair5.PNG",
    alt: "80's neutral armchair",
    year: "1986",
    name: "80's Neutral Armchair",
    price: "150",
  },
  {
    image: "img/chair6.PNG",
    alt: "80's orange armchair",
    year: "1986",
    name: "80's Orange Armchair",
    price: "150",
  },
  {
    image: "img/chair7.PNG",
    alt: "80's red armchair",
    year: "1986",
    name: "80's Red Armchair",
    price: "150",
  },
  {
    image: "img/chair8.PNG",
    alt: "80's yellow armchair",
    year: "1986",
    name: "80's Yellow Armchair",
    price: "150",
  },
  // Add more armchair products here
];

const coffeeTables = [
  {
    image: "img/coffee-table1.PNG",
    alt: "Large oak coffee table",
    year: "1990",
    name: "Large Oak Coffee Table",
    price: "160",
  },
  {
    image: "img/coffee-table2.PNG",
    alt: "Wicker coffee table",
    year: "1995",
    name: "Wicker Coffee Table",
    price: "70",
  },
  {
    image: "img/coffee-table4.PNG",
    alt: "Pine coffee table",
    year: "1972",
    name: "Pine coffee table",
    price: "100",
  },
  {
    image: "img/coffee-table6.PNG",
    alt: "Asymmetric maple coffee table",
    year: "1981",
    name: "Asymmetric Maple Coffee Table",
    price: "60",
  },
  {
    image: "img/coffee-table7.PNG",
    alt: "Maple coffee table",
    year: "1992",
    name: "Maple Coffee Table",
    price: "50",
  },

  // Add more coffee table products here
];

const allProducts = [
  { containerId: "lamps-container", products: lamps },
  { containerId: "sofas-container", products: sofas },
  { containerId: "armchairs-container", products: armchairs },
  { containerId: "tables-container", products: coffeeTables },
];

// Iterate over the allProducts array, find the corresponding container by ID, and populate it with the product elements
allProducts.forEach(({ containerId, products }) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const productSectionTitle = container.querySelector(".product-section-title");

  products.forEach((product) => {
    const { image, alt, year, name, price } = product;
    const productElement = createProductElement(image, alt, year, name, price);
    container.insertBefore(productElement, productSectionTitle.nextSibling);
  });
});
