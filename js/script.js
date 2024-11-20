'use strict';

const page = document.documentElement;
const header = document.querySelector("header");
let currentTheme = "light";

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

    if(currentTheme == "light"){
        page.style.setProperty("--background-gradient1-color", getComputedStyle(page).getPropertyValue("--background-darktheme-gradient1-color")); 
        page.style.setProperty("--background-gradient2-color", getComputedStyle(page).getPropertyValue("--background-darktheme-gradient2-color")); 
        if(page.scrollTop > 50){
            header.style.backgroundColor = getComputedStyle(page).getPropertyValue("--background-darktheme-gradient2-color");
            header.style.borderBottom = `solid 1px ${getComputedStyle(page).getPropertyValue("--border-darktheme-color")}`;
        }
        currentTheme = "dark"; 
    } else if(currentTheme == "dark"){ 
        page.style.setProperty("--background-gradient1-color", getComputedStyle(page).getPropertyValue("--background-lighttheme-gradient1-color")); 
        page.style.setProperty("--background-gradient2-color", getComputedStyle(page).getPropertyValue("--background-lighttheme-gradient2-color"));
        if(page.scrollTop > 50){
            header.style.backgroundColor = getComputedStyle(page).getPropertyValue("--background-lighttheme-gradient2-color");
            header.style.borderBottom = `solid 1px ${getComputedStyle(page).getPropertyValue("--border-lighttheme-color")}`;
        }
        currentTheme = "light";
    }
}

window.onscroll = function(){
    headerShadow();
}