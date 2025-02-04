import "./style.css"

const Mail = document.getElementById('mail')

const validateMail = ()=>{
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(Mail.value)){
        Mail.setCustomValidity("That email is not valid");
        Mail.reportValidity();
        return;}
    else
        Mail.setCustomValidity("");
}

Mail.addEventListener('blur', validateMail)

const Country = document.getElementById('Country')

const validateCountry = ()=>{
    if (Country.value.length < 4){
        Country.setCustomValidity("That country is not valid");
        Country.reportValidity();
        return;}
    else
        Country.setCustomValidity("");
}

Country.addEventListener('blur', validateCountry)

const Zip = document.getElementById('code')

const validateZip = () =>{
    const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (!regex.test(Zip.value)){
        Zip.setCustomValidity("That Zip Code is not valid");
        Zip.reportValidity();
        return;}
    else
        Zip.setCustomValidity("");
}

Zip.addEventListener('blur', validateZip)


const Password = document.getElementById('password')

const validatePassword = () =>{
    if(Password.value.length > 8 || Password.value.length < 4)
        Password.setCustomValidity("That password is not valid");
    else
        Password.setCustomValidity("")
    Password.reportValidity();
}

Password.addEventListener('blur', validatePassword)

const CPassword = document.getElementById('Confirm')

const confirmPassword = () =>{
    if(Password.value === "")
        CPassword.setCustomValidity("First, enter the password");
    else if (Password.value !== CPassword.value)
        CPassword.setCustomValidity("That password is not valid");
    else
        CPassword.setCustomValidity("")
    CPassword.reportValidity();
}

CPassword.addEventListener('blur', confirmPassword)