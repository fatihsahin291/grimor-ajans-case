/////////////// Accordion Menu ///////////////
const accordionMenuButton = document.querySelector(".accordion-menu-button");
const accordionMenuWrapper = document.querySelector(".accordion-menu-wrapper");
const closeButton = document.querySelector(".close-button");

accordionMenuButton.addEventListener("click", (e) => {
	e.stopPropagation();
	accordionMenuWrapper.classList.remove("d-none");
	document.body.classList.add("stop-scrolling");
});

closeButton.addEventListener("click", (e) => {
	e.stopPropagation();
	accordionMenuWrapper.classList.add("d-none");
	document.body.classList.remove("stop-scrolling");
});

accordionMenuWrapper.addEventListener("click", (e) => {
	e.stopPropagation();
	if (e.target === accordionMenuWrapper) {
		accordionMenuWrapper.classList.add("d-none");
		document.body.classList.remove("stop-scrolling");
	}
});

const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.display === "block") {
			panel.style.display = "none";
		} else {
			panel.style.display = "block";
		}
	});
}

////////////// NAVBAR ///////////////
const languages = document.querySelectorAll(".language-btn");

languages.forEach((language) => {
	language.addEventListener("click", () => {
		languages.forEach((language) => {
			if (language.classList.contains("fw-700")) {
				language.classList.remove("fw-700");
				return;
			}
			language.classList.add("fw-700");
		});
	});
});

const navButtons = document.querySelectorAll(".navbar-button-menu-wrapper");
const navButtonMenus = document.querySelectorAll(".navbar-button-menu");

navButtons.forEach((navButton) => {
	const navButtonOpens = navButton.children[0].getAttribute("data-opens");
	navButton.addEventListener("mouseenter", () => {
		navButtonMenus.forEach((navButtonMenu) => {
			const navButtonMenuKey = navButtonMenu.getAttribute("data-key");

			if (navButtonMenuKey === navButtonOpens) {
				navButtonMenu.classList.remove("d-none");
				return;
			}
		});
	});

	navButton.addEventListener("mouseleave", () => {
		navButtonMenus.forEach((navButtonMenu) => {
			const navButtonMenuKey = navButtonMenu.getAttribute("data-key");

			if (navButtonMenuKey === navButtonOpens) {
				navButtonMenu.classList.add("d-none");
				return;
			}
		});
	});
});

const navbarSearchButton = document.querySelector(".navbar-search label");
navbarSearchButton.addEventListener("click", () => {
	const navbarSearchInput = document.querySelector(".navbar-search input");
	if (navbarSearchInput.style.display === "block") {
		navbarSearchInput.style.display = "none";
		return;
	}
	navbarSearchInput.style.display = "block";
	navbarSearchInput.focus();
});

///////////// Carousel //////////////
const carousel = document.getElementById("carousel");
const indicators = carousel.querySelectorAll(".indicator");
let slides = 3;
let speedCarousel = 7000; // 5 seconds

function carouselHide(num) {
	indicators[num].setAttribute("data-state", "");
	slides[num].setAttribute("data-state", "");

	slides[num].style.opacity = 0;
}

function carouselShow(num) {
	indicators[num].checked = true;
	indicators[num].setAttribute("data-state", "active");
	slides[num].setAttribute("data-state", "active");

	slides[num].style.opacity = 1;
}

function setSlide(slide) {
	return function () {
		const switcher = setInterval(function () {
			switchSlide();
		}, speedCarousel);
		// Reset all slides
		for (let i = 0; i < indicators.length; i++) {
			indicators[i].setAttribute("data-state", "");
			slides[i].setAttribute("data-state", "");

			carouselHide(i);
		}

		indicators[slide].setAttribute("data-state", "active");
		slides[slide].setAttribute("data-state", "active");
		carouselShow(slide);

		clearInterval(switcher);
	};
}

function switchSlide() {
	let nextSlide = 0;

	// Reset all slides
	for (let i = 0; i < indicators.length; i++) {
		if (
			indicators[i].getAttribute("data-state") == "active" &&
			i !== indicators.length - 1
		) {
			nextSlide = i + 1;
		}

		carouselHide(i);
	}

	carouselShow(nextSlide);
}

if (carousel) {
	slides = carousel.querySelectorAll(".slide");
	const indicators = carousel.querySelectorAll(".indicator");

	switchSlide(0);

	const switcher = setInterval(function () {
		switchSlide();
	}, speedCarousel);

	for (let i = 0; i < indicators.length; i++) {
		indicators[i].addEventListener("click", setSlide(i));
	}
}

///////////// Stats //////////////
const statNumbers = document.querySelectorAll(".stat-number");
const speedStats = 500;

function counterEffect() {
	statNumbers.forEach((statNum) => {
		let counter = 0;
		const target = +statNum.innerText;
		const increment = target / speedStats;

		const timer = setInterval(() => {
			counter += increment;
			statNum.innerText = Math.floor(counter);

			if (counter >= target) {
				clearInterval(timer);
				statNum.innerText = target;
			}
		}, 1);
	});
}

const statsElement = document.querySelector(".stats");

const options = {
	root: null,
	rootMargin: "-100px",
	threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			counterEffect();
			observer.unobserve(entry.target);
		}
	});
}, options);

observer.observe(statsElement);

// if the window width is less than 530px then counterEffect will be called immediately and not when the statsElement is intersecting
if (window.innerWidth < 530) {
	observer.unobserve(statsElement);
	counterEffect();
}

///////////// Scroll to top //////////////
const scrollToTopButton = document.querySelector(".scroll-to-top");

scrollToTopButton.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
});

//////////// Footer Accordion Menu //////////////
const footerAccordionHeader = document.getElementsByClassName(
	"footer-accordion-header"
);

for (let i = 0; i < footerAccordionHeader.length; i++) {
	footerAccordionHeader[i].addEventListener("click", function () {
		this.classList.toggle("active");
		const footerAccordionPanel = this.nextElementSibling;
		if (footerAccordionPanel.style.display === "block") {
			footerAccordionPanel.style.display = "none";
		} else {
			footerAccordionPanel.style.display = "block";
		}
	});
}
