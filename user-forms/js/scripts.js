function register() {

    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    if (firstname.value.length == 0) {
        alert('Please fill in email');

    } else if (password.value.length == 0) {
        alert('Please fill in password');

    } else {

        let users = {
            name: firstname.value,
            email: email.value,
            password: password.value
        }
        let storedUsers = getStoredUsers();
        storedUsers.push(users);
        storedUsers = JSON.stringify(storedUsers);
        localStorage.setItem('users', storedUsers);
    }
    // let storedUsers = localStorage.setItem('firstname', firstname.value);
    // storedUsers = JSON.stringify(storedUsers);
    // let storedEmail = localStorage.setItem('email', email.value);
    // storedEmail = JSON.stringify(storedEmail);
    // let storedPassword = localStorage.setItem('password', password.value);
    // storedPassword = JSON.stringify(storedPassword);
    // alert('Your account has been created');
}


//checking
function check() {
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    // let userName = document.getElementById('firstname');
    // let userPassword = document.getElementById('password');
    //let userRemember = document.getElementById("rememberMe");

    if (email.value == email && password.value == password) {
        location.href = "welcome.html";
    } else {
        alert('Error on login');
    }
}



function getStoredUsers() {
    let storedUsers = localStorage.getItem("users")

    if (storedUsers == null || storedUsers == undefined) {

        return [];
    } else {
        storedUsers = JSON.parse(storedUsers);
        return storedUsers;
    }
}