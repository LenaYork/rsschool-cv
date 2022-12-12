const menuIcon = document.querySelector("#menu-icon");
    const menuNav = document.querySelector("#menu-nav");
    menuIcon.addEventListener("click", function() {
    menuNav.classList.toggle("hidden-nav");
})