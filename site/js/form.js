//form validations for contact form

//checks if individual validate functions are  true
function validateForm() {
    //if validatefirstName && all others, return true, else false
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validateMessage();
    if (validateFirstName() && validateLastName() && validateEmail() && validatePhone() && validateMessage()) {
        //alert("form is valid")
        return true;
    } else {
        //alert("form is invalid");
        window.location = "#errorSubmit";
        false;
    };
};

// get all data in form and return object
function getFormData() {
    var elements = document.getElementById("gform").elements; // all form elements
    var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
            // special case for Edge's html collection
        } else if (elements[k].length > 0) {
            return elements[k].item(0).name;
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function (k) {
        data[k] = elements[k].value;
        var str = ""; // declare empty string outside of loop to allow
        // it to be appended to for each item in the loop
        if (elements[k].type === "checkbox") { // special case for Edge's html collection
            str = str + elements[k].checked + ", "; // take the string and append 
            // the current checked value to 
            // the end of it, along with 
            // a comma and a space
            data[k] = str.slice(0, -2); // remove the last comma and space 
            // from the  string to make the output 
            // prettier in the spreadsheet
        } else if (elements[k].length) {
            for (var i = 0; i < elements[k].length; i++) {
                if (elements[k].item(i).checked) {
                    str = str + elements[k].item(i).value + ", "; // same as above
                    data[k] = str.slice(0, -2);
                }
            }
        }
    });
    console.log(data);
    return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
    event.preventDefault();           // we are submitting via xhr below
    var data = getFormData();         // get the values submitted in the form
    if (validateForm()) {   // if form is valid show error
        var url = event.target.action;  //
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            console.log(xhr.status, xhr.statusText)
            console.log(xhr.responseText);
            document.getElementById('gform').style.display = 'none'; // hide form, HIDE SPINNER IN FUNCTION BELOW LATERRRRRRRRR
            spinnerEnd();
            document.getElementById('thankyou_message').style.display = 'block';
            return;
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&')
        xhr.send(encoded);
        
    };
}

function loaded() {
    console.log('contact form submission handler loaded successfully');
    // bind to the submit event of our form
    var form = document.getElementById('gform');
    form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);

//individual validations
function validateFirstName() {
    var firstName = document.getElementById("firstName").value;
    var isValid = true;
    if (isEmpty(firstName)) {
        document.getElementById("emptyFirstName").style.display = 'block';
        document.getElementById("isNumberFirstName").style.display = 'none';
        isValid = false;
    } else if (!isNaN(firstName)) {
        document.getElementById("isNumberFirstName").style.display = 'block';
        document.getElementById("emptyFirstName").style.display = 'none';
        isValid = false;
    }
    if (isValid) {
        document.getElementById("isNumberFirstName").style.display = 'none';
        document.getElementById("emptyFirstName").style.display = 'none';
        return true;
    } else {
        return false;
    };
};

function validateLastName() {
    var lastName = document.getElementById("lastName").value;
    var isValid = true;
    if (isEmpty(lastName)) {
        document.getElementById("emptyLastName").style.display = 'block';
        document.getElementById("isNumberLastName").style.display = 'none';
        isValid = false;
    } else if (!isNaN(lastName)) {
        document.getElementById("isNumberLastName").style.display = 'block';
        document.getElementById("emptyLastName").style.display = 'none';
        isValid = false;
    }
    if (isValid) {
        document.getElementById("isNumberLastName").style.display = 'none';
        document.getElementById("emptyLastName").style.display = 'none';
        return true;
    } else {
        return false;
    };
};

function validateEmail() {
    var email = document.getElementById("email").value;
    var isValid = true;
    if (!isEmpty(email)) {
        if (!isEmail(email)) {
            document.getElementById("emptyEmail").style.display = 'none';
            document.getElementById("isEmail").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("isEmail").style.display = 'none';
        }
    } else {
        document.getElementById("emptyEmail").style.display = 'block';
        document.getElementById("isEmail").style.display = 'none';
        isValid = false;
    };
    if (isValid) {
        document.getElementById("emptyEmail").style.display = 'none';
        document.getElementById("isEmail").style.display = 'none';
        return true;
    } else {
        return false;
    };
};

function validatePhone() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    var isValid = true;
    if (isEmpty(phoneNumber)) {
        document.getElementById("emptyPhone").style.display = 'block';
        document.getElementById("isPhone").style.display = 'none';
        isValid = false;
    } else if (!isPhone(phoneNumber)) {
        document.getElementById("isPhone").style.display = 'block';
        document.getElementById("emptyPhone").style.display = 'none';
        isValid = false;
    } 
    if (isValid) {
        document.getElementById("isPhone").style.display = 'none';
        document.getElementById("emptyPhone").style.display = 'none';
        return true;
    } else {
        return false;
    };
};

function validateMessage() {
    var message = document.getElementById("contactMessageInput").value;
    var isValid = true;
    if (isEmpty(message)) {
        document.getElementById("emptyMessage").style.display = 'block';
        isValid = false;
    } else {
        document.getElementById("emptyMessage").style.display = 'none';
    };
    if (isValid) {
        return true;
    } else {
        return false;
    };
}

function spinnerStart() {
    if (validateForm()) {
        document.getElementById("gform").style.display = 'none';
        window.location = "#screenOverlay";
        document.getElementById("spinnerContainer").style.display = 'block';
        document.getElementById("spinner").style.display = 'block';
        document.getElementById("screenOverlay").style.opacity = .3;
        //alert("spinner starts");
    };
}
function spinnerEnd() {
    document.getElementById("spinner").style.display = 'none';
    document.getElementById("spinnerContainer").style.display = 'none';
    document.getElementById("screenOverlay").style.opacity = 1;
    //alert("spinner ends");
}

//regex functions
function isEmpty(str) {
    if (str.replace(/\s/g, "") == "") {
        return true;
    };
};

function isEmail(value) {
    var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (regexEmail.test(value) == true) {
        return true;
    };
};
function isPhone(value) {
    var regexPhone = /^\d{10}$/;
    if (regexPhone.test(value) == true) {
        return true;
    }
};