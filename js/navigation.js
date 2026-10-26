const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#site-navigation");
const nav = document.querySelector("nav");

if (!(menuButton instanceof HTMLButtonElement) ||
    !(navigation instanceof HTMLElement) ||
    !(nav instanceof HTMLElement)) {
    throw new Error("The mobile navigation requires a menu button, navigation container, and nav element.");
}

const mobileMenu = window.matchMedia("(max-width: 960px)");

function setMenuOpen(isOpen, returnFocus = false) {
    navigation.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

    if (!isOpen && returnFocus) {
        menuButton.focus();
    }
}

document.documentElement.classList.add("js-enabled");

menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("click", (event) => {
    if (mobileMenu.matches && event.target instanceof Node && !nav.contains(event.target)) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.matches && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false, true);
    }
});

mobileMenu.addEventListener("change", (event) => {
    if (!event.matches) {
        setMenuOpen(false);
    }
});
