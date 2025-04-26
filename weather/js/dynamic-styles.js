'use strict';

const page = document.documentElement;
const header = document.querySelector("header");
let currentTheme = "light";

headerShadow();

const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: false
})

ScrollReveal().reveal(".main-txt");
ScrollReveal().reveal(".form", {delay: 100});
ScrollReveal().reveal(".form-buttons", {delay: 200});
ScrollReveal().reveal(".weather-data", {delay: 0, reset: true});
ScrollReveal().reveal(".city-image", {delay: 200, reset: true, origin: 'right'});



function headerShadow(){
    if(document.documentElement.scrollTop > 50){
        if(currentTheme == "light"){
            header.style.backgroundColor = getComputedStyle(page).getPropertyValue("--background-lighttheme-gradient2-color");
            header.style.borderBottom = `1px solid ${getComputedStyle(page).getPropertyValue("--border-lighttheme-color")}`;
        }
        else if(currentTheme == "dark"){
            header.style.backgroundColor = getComputedStyle(page).getPropertyValue("--background-darktheme-gradient2-color");
            header.style.borderBottom = `1px solid ${getComputedStyle(page).getPropertyValue("--border-darktheme-color")}`;
        }
    } else {
        header.style.backgroundColor = "";
        header.style.borderBottom = "";
    }
}

function switchTheme(){

    const firstIllustration = document.getElementById("first-illustration");
    const secondIllustration = document.getElementById("second-illustration");
    const themeIcon = document.getElementById("theme-icon");

    if(currentTheme == "light"){
        changeColorAttribute("--background-gradient1-color", "--background-darktheme-gradient1-color");
        changeColorAttribute("--background-gradient2-color", "--background-darktheme-gradient2-color");

        if(page.scrollTop > 50){
            header.style.backgroundColor = getComputedStyle(page).getPropertyValue("--background-darktheme-gradient2-color");
            header.style.borderBottom = `solid 1px ${getComputedStyle(page).getPropertyValue("--border-darktheme-color")}`;
        }

        changeColorAttribute("--primary-text-color", "--white-text-color");
        changeColorAttribute("--secondary-text-color", "--real-black-text-color");
        changeColorAttribute("--result-box-background", "--result-box-darktheme-background");
        changeColorAttribute("--footer-background", "--footer-darktheme-background");
        changeColorAttribute("--border-color", "--border-darktheme-color");
        changeColorAttribute("--switch-theme-background", "--switch-theme-darktheme-background");
        changeColorAttribute("--switch-theme-color", "--switch-theme-darktheme-color");

        firstIllustration.setAttribute("src", "../img/moonrocket-illustration.png");
        secondIllustration.setAttribute("src", "../img/telescope-illustration.png");
        themeIcon.setAttribute("class", "fa-solid fa-sun");
        
        currentTheme = "dark"; 
    } else if(currentTheme == "dark"){ 
        changeColorAttribute("--background-gradient1-color", "--background-lighttheme-gradient1-color");
        changeColorAttribute("--background-gradient2-color", "--background-lighttheme-gradient2-color");
        
        if(page.scrollTop > 50){
            header.style.backgroundColor = getComputedStyle(page).getPropertyValue("--background-lighttheme-gradient2-color");
            header.style.borderBottom = `solid 1px ${getComputedStyle(page).getPropertyValue("--border-lighttheme-color")}`;
        }
        changeColorAttribute("--primary-text-color", "--black-text-color");
        changeColorAttribute("--result-box-background", "--result-box-lighttheme-background");
        changeColorAttribute("--footer-background", "--footer-lighttheme-background");
        changeColorAttribute("--border-color", "--border-lightheme-color");
        changeColorAttribute("--switch-theme-background", "--switch-theme-lighttheme-background");
        changeColorAttribute("--switch-theme-color", "--switch-theme-lighttheme-color");
        
        firstIllustration.setAttribute("src", "../img/ballon-illustration.png");
        secondIllustration.setAttribute("src", "../img/beach-illustration.png");
        themeIcon.setAttribute("class", "fa-solid fa-moon");

        currentTheme = "light";
    }
}

function changeColorAttribute(property, value){
    page.style.setProperty(property, getComputedStyle(page).getPropertyValue(value));
}

window.onscroll = function(){
    headerShadow();
}