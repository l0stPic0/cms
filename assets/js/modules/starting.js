"use strict";


import { data, popup} from "../script.js";
import { createItemRow } from "./addEl.js";
import { setStorage, clearStorage } from "./localStorage.js";
const itemList = document.querySelector(".tbody");

const popupControl = (addProductBtn, closeBtn, popup) => {
	const name = document.querySelector(".textarea-name");
	const category = document.querySelector(".textarea-category");
	const units = document.querySelector(".textarea-units");
	const discount = document.querySelector(".textarea-discount");
	const description = document.querySelector(".textarea-description");
	const amount = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	const addImg = document.querySelector(".add-img");
    const imagePreview = document.querySelector(".image-preview__img");
	addProductBtn.addEventListener('click', e => {
		popup.classList.add("active");
		e.stopPropagation();
	});
	closeBtn.addEventListener('click', ()=> {
		name.value = "";
		category.value = "";
		units.value = "";
		discount.value = "";
		description.value = "";
		amount.value = "";
		price.value = "";
		footerSum.value = "";
		checkbox.checked = false;
		popupClose();		
	});
	document.onclick = function(e){
		if(!e.target.closest(".pop-up")) {
			name.value = "";
			category.value = "";
			units.value = "";
			discount.value = "";
			description.value = "";
			amount.value = "";
			price.value = "";
			footerSum.value = "";
			checkbox.checked = false;
			popupClose();
		};
	};
};

const popupClose = () => {
	const popup = document.querySelector(".pop-up")
	popup.classList.remove("active");
};

const increment = () => {
	return data.length + 1;
};

const formControl = (form, data) => {
    const discount = document.querySelector(".textarea-discount");
    const amount = document.querySelector(".textarea-amount");
    const price = document.querySelector(".textarea-price");
    const footerSum = document.querySelector(".footer-sum");
    const checkbox = document.querySelector(".checkbox");
	const addImg  = document.querySelector(".custom-file-upload");
    const imagePreview = document.querySelector(".image-preview__img");

    const calculateFooterSum = () => {
        const amountValue = parseFloat(amount.value) || 0;
        const priceValue = parseFloat(price.value) || 0;
        const discountValue = parseFloat(discount.value) || 0;

        if (checkbox.checked) {
            footerSum.innerHTML = ((priceValue - (discountValue * (1 / 100) * priceValue)) * amountValue).toFixed(2);
        } else {
            footerSum.innerHTML = (amountValue * priceValue).toFixed(2);
        }
    };

    discount.addEventListener("input", calculateFooterSum);
    amount.addEventListener("input", calculateFooterSum);
    price.addEventListener("input", calculateFooterSum);

    form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = Object.fromEntries(formData);
        const addImg = document.querySelector(".add-img");
        let file = addImg.files[0];

        newItem.id = increment();
        newItem.amount = parseFloat(newItem.amount) || 0;
        newItem.price = parseFloat(newItem.price) || 0;
        newItem.discount = parseFloat(newItem.discount) || 0;
        newItem.total = parseFloat(footerSum.innerHTML) || 0;

        if (file) {
            newItem.haveImg = true;
            const reader = new FileReader();
            reader.onload = function(event) {
                newItem.imageData = event.target.result;
                data.push(newItem);
                addItem(newItem, itemList);
                setStorage();
                e.target.reset();
                popupClose();
                location.reload();
                calculateTotal();
            };
            reader.readAsDataURL(file);
        } else {
            newItem.haveImg = false;
            data.push(newItem);
            addItem(newItem, itemList);
            setStorage();
            e.target.reset();
            popupClose();
            location.reload();
            calculateTotal();
        }
    });
};
const calculateTotal = () => {
	let sum = document.querySelector(".sum");
	let value = 0;
	data.forEach(item => {
		value += item.total;
	});
	sum.innerHTML = value;

	return value;
}

const addItem = (item, itemList) => {
	itemList.append(createItemRow(item));
	
};

const deleteFunction = () => {
	const deleteIcons = document.querySelectorAll(".deleteIcon");
	deleteIcons.forEach(icon => {
		icon.addEventListener("click", (e)=> {
			e.preventDefault();
			e.stopPropagation();
			const target = e.target;
			target.parentNode.parentNode.remove();
			
			clearStorage(target);
			calculateTotal();
			location.reload()
		});
	});
};

const editItemsFunction = () => {
	const editIcons = document.querySelectorAll(".editIcon");
	const submitBtn = document.querySelector(".footer__btn");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	editIcons.forEach(icon => {
		icon.addEventListener("click", e => {
			const target = e.target;
			e.preventDefault();
			e.stopPropagation();
			popup.classList.add("active");
			const name = document.querySelector(".textarea-name");
			const category = document.querySelector(".textarea-category");
			const units = document.querySelector(".textarea-units");
			const discount = document.querySelector(".textarea-discount");
			const description = document.querySelector(".textarea-description");
			const amount = document.querySelector(".textarea-amount");
			const price = document.querySelector(".textarea-price");
		
			
			data.forEach(item => {
				if (+(item.id) == +(target.parentNode.parentNode.childNodes[0].textContent)) {
					if (item.hasDiscount == true) {
						checkbox.checked = true;
						discount.removeAttribute("disabled")
					}
					let file = 
					name.value = item.name;
					category.value = item.category;
					units.value = item.units;
					discount.value = item.discount;
					description.value = item.description;
					amount.value = item.amount;
					price.value = item.price;
					footerSum.innerHTML = item.total;
				};
				if (popup.classList.contains("active")) {
					submitBtn.addEventListener("click", ()=> {
						item.id = item.id;
						item.name = name.value;
						item.category = category.value;
						item.discount = discount.value;
						item.description = description.value;
						item.units = units.value;
						item.amount = amount.value;
						item.price = price.value;
						data.splice(this, 1);
						footerSum.innerHTML = item.total;
					

					});
				};
				setStorage();
			});
			calculateTotal();
		});
	});
} ;

const changeToNumber = e => {
	const value = e.value;
	e.value = value.replace(/\D/g, '');
};
const removeSpace = e => {
	if (e.value.charAt(0) == ' ') {
		e.value = "";
	}
}

export {popupControl, popupClose, calculateTotal, increment, formControl, addItem, deleteFunction, editItemsFunction, removeSpace, changeToNumber}