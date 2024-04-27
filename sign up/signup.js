const nameInput = document.getElementById("nameInput");
const nameMsg = document.getElementById("nameMsg");

const emailInput = document.getElementById("emailInput");
const emailMsg = document.getElementById("emailMsg");

const passInput = document.getElementById("passInput");
const passMsg = document.getElementById("passMsg");

const confirmInput = document.getElementById("confirmInput");
const confirmMsg = document.getElementById("confirmMsg");

const phoneInput = document.getElementById("phoneInput");
const phoneMsg = document.getElementById("phoneMsg");

const dobInput = document.getElementById("dobInput");
const dobMsg = document.getElementById("dobMsg");


nameInput.addEventListener('input',validateName);
emailInput.addEventListener('input',validateEmail);
passInput.addEventListener('input',validatePass);
confirmInput.addEventListener('input' ,confirmPass);
phoneInput.addEventListener('input',validatePhone);
dobInput.addEventListener('input',validateDob);


function validateName() {
    const nameRegex = /^[a-zA-Z]+$/;
    const minLength = 3;

    let nameValue = nameInput.value;

    if (nameValue.length < minLength) {
        nameMsg.textContent = "Name should be at least 3 characters long";
        nameMsg.style.color = "red";
        nameInput.style.border = "solid 3px red";
        return false;
    }

    if (!nameRegex.test(nameValue)) {
        nameMsg.textContent = "Only alphabetic characters are allowed";
        nameMsg.style.color = "red";
        nameInput.style.border = "solid 3px red";
        return false;
    }

    // If no error is found, display success message
    nameMsg.textContent = "Name is valid ✅";
    nameMsg.style.color = "green";
    nameInput.style.border = "solid 3px green";
    return true;
}


function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;

    let emailValue = emailInput.value.trim();

    if (emailValue === "") {
        emailMsg.textContent = "Email cannot be empty";
        emailMsg.style.color = "red";
        emailInput.style.border = "solid 3px red";
        return false;
    }

    if (!emailRegex.test(emailValue)) {
        emailMsg.textContent = "Please enter a valid email address";
        emailMsg.style.color = "red";
        emailInput.style.border = "solid 3px red";
        return false;
    }

    // If no error is found, display success message
    emailMsg.textContent = "Email is valid ✅";
    emailMsg.style.color = "green";
    emailInput.style.border = "solid 3px green";
    return true;
}


function validatePass() {
    let passValue = passInput.value.trim();

    let hasUpperCase = /[A-Z]/.test(passValue);
    let hasLowerCase = /[a-z]/.test(passValue);
    let hasNumber = /[0-9]/.test(passValue);
    let hasSpecialChar = /[!@#$%^&*]/.test(passValue);

    if (passValue.length < 8) {
        passMsg.textContent = "Password should be at least 8 characters long";
        passMsg.style.color = "red";
        passInput.style.border = "solid 3px red";
        return false;
    }

    if (!hasUpperCase) {
        passMsg.textContent = "Password must contain at least one uppercase letter";
        passMsg.style.color = "red";
        passInput.style.border = "solid 3px red";
        return false;
    }

    if (!hasLowerCase) {
        passMsg.textContent = "Password must contain at least one lowercase letter";
        passMsg.style.color = "red";
        passInput.style.border = "solid 3px red";
        return false;
    }

    if (!hasNumber) {
        passMsg.textContent = "Password must contain at least one number";
        passMsg.style.color = "red";
        passInput.style.border = "solid 3px red";
        return false;
    }

    if (!hasSpecialChar) {
        passMsg.textContent = "Password must contain at least one special character";
        passMsg.style.color = "red";
        passInput.style.border = "solid 3px red";
        return false;
    }

    // If no error is found, display success message
    passMsg.textContent = "Password is valid ✅";
    passMsg.style.color = "green";
    passInput.style.border = "solid 3px green";
    return true;
}


function confirmPass(){
    let confirmValue = confirmInput.value;
    let passValue = passInput.value;

    if(passValue == confirmValue ){
        confirmMsg.textContent = "CONFIRMED✅";
        confirmMsg.style.color = "green";
        confirmInput.style.border = "solid 3px green";    
        return true;
    }else{
        confirmMsg.textContent = "Password should be same as before";
        confirmMsg.style.color = "red";
        confirmInput.style.border = "solid 3px red";
        return false;
    }
}

    function validatePhone() {
        const phoneRegex = /^[6-9]\d{9}$/;
        let phoneValue = phoneInput.value.trim();
    
        if (phoneRegex.test(phoneValue)) {
            phoneMsg.textContent = "Phone number is valid ✅";
            phoneMsg.style.color = "green";
            phoneInput.style.border = "solid 3px green";
            return true;
        } else {
            if (phoneValue === "") {
                phoneMsg.textContent = "Phone number cannot be empty";
            } else if (!/^\d+$/.test(phoneValue)) {
                phoneMsg.textContent = "Phone number can only contain numeric characters";
            } else if (phoneValue.length !== 10) {
                phoneMsg.textContent = "Phone number should be 10 digits long";
            } else {
                phoneMsg.textContent = "Invalid phone number format";
            }
    
            phoneMsg.style.color = "red";
            phoneInput.style.border = "solid 3px red";
            return false;
        }
    }
    
function validateDob(){
    let CurrentDate = new Date;
    let dobValue = dobInput.value;
    let dobValueDate = new Date(dobValue);

    if(dobValueDate<=CurrentDate){
        dobMsg.textContent = "VALID✅";                                                                                                                                          
        dobMsg.style.color = "green";
        dobInput.style.border = "solid 3px green";    
        return true;
    }else{
       dobMsg.textContent = "Must be a valid date in the past";
       dobMsg.style.color = "red";
       dobInput.style.border = "solid 3px red";
       return false;
     }
}

// password eye
const showPass = document.getElementById("show-pass");
const showPassConfirm = document.getElementById("show-pass-confirm")
showPass.addEventListener('click', function(){
   showPass.classList.toggle("fa-eye-slash");
   showPass.classList.toggle("fa-eye");
   const type = passInput.getAttribute("type")=== "password"? "text":"password";
   passInput.setAttribute('type',type);
})
showPassConfirm.addEventListener('click', function(){
   showPassConfirm.classList.toggle("fa-eye-slash");
   showPassConfirm.classList.toggle("fa-eye");
   const type = confirmInput.getAttribute("type")=== "password"? "text":"password";
   confirmInput.setAttribute('type',type);
})

// countdown timer
const startingMinute=5;
let time= startingMinute*60;

let countdownDisplay= document.getElementById("countdown");

window.onload = loadCountdown;
function loadCountdown(){
setInterval(updateCountdown,1000);
}

function updateCountdown(){
    let minute=Math.floor(time/60);
    let seconds=time%60;
    seconds= seconds<10? '0'+seconds : seconds;

    countdownDisplay.innerHTML = `${minute}:${seconds}`;
    time--;
    if(time===0){
        location.reload();
    }
}


function validateAll(){
    if(validateName()&&validateEmail()&&validatePass()&&confirmPass()&&validatePhone()){
        localStorage.setItem("name",nameInput.value);
        localStorage.setItem("email",emailInput.value);
        localStorage.setItem("password",passInput.value);
        localStorage.setItem("phone",phoneInput.value);
        alert("Sign Up Successful");
        return true;
    }else{
        return false;
    }
}