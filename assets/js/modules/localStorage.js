"use strict";


import { data } from "../script.js";
const setStorage = () => {
    localStorage.setItem('data', JSON.stringify(data));
};

const getStorage = () => {
    if (localStorage.getItem('data')) {
        const storedData = JSON.parse(localStorage.getItem('data'));
        storedData.forEach(item => {
            data.push(item);
        });
    }
    return data;
};

const clearStorage = (target) => {
    const itemId = target.parentNode.parentNode.childNodes[0].textContent;
    const index = data.findIndex(item => item.id == itemId);
    if (index !== -1) {
        data.splice(index, 1);
        setStorage();
    }
};

export { setStorage, getStorage, clearStorage };