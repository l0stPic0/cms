"use strict";


import {getStorage} from "./modules/localStorage.js";
import {renderItems} from "../js/modules/render.js";
import {popupControl, formControl, deleteFunction, editItemsFunction} from "./modules/starting.js";

let data = [];

let addProductBtn = document.querySelector(".add-product-btn");
let popup = document.querySelector(".pop-up");
let closeBtn = document.querySelector(".pop-up__close");
const form = document.querySelector(".pop-up__main");



const init = () => {
	getStorage();
	popupControl(addProductBtn, closeBtn, popup);
	renderItems();
	formControl(form, data);
	deleteFunction();
	editItemsFunction();


}

init();

export {data, popup}










