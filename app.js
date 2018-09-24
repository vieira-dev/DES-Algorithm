/**
 * @version 1.0.0
 * @author IanZyon
 * @name DES_WebApp
 * 
 */
const des = new DES;

const selectors = {
    textInput: document.getElementById('textInput'),
    keyInput: document.getElementById('keyInput'),
    cipherBtn: document.getElementById('cipherBtn'),
    decipherBtn: document.getElementById('decipherBtn'),
    resultOutput: document.getElementById('resultOutput')
}


// event listeners
selectors.cipherBtn.addEventListener('click', cipherText);
selectors.decipherBtn.addEventListener('click', decipherHex);
const clearUI = function() {
    textInput.value = '';
    keyInput.value = '';
}
function cipherText () {
    cipherObj = des.DESEncrypt(textInput.value, keyInput.value);
    resultOutput.innerHTML = `
    <br>
    <h5>Plaintext: <strong>${cipherObj.plaintext}</strong></h5> 
    <h5>Cipher hex: <strong>${cipherObj.output}</strong></h5> 
    <h5>56bit Key: <strong>${cipherObj.key}</strong></h5> 
    `;
    clearUI();
}
function decipherHex() {
    decipherObj = des.DESDecrypt(textInput.value, keyInput.value);
    resultOutput.innerHTML = `
    <br>
    <h5>Hex Cipher: <strong>${decipherObj.cipherhex}</strong></h5> 
    <h5>Decription: <strong>${decipherObj.output}</strong></h5> 
    <h5>56bit Key: <strong>${decipherObj.key}</strong></h5> 
    `;
    clearUI();
}