
document.querySelector("#register-btn").addEventListener("click", function () {

  let formMessage = document.querySelector("#form-message");

  const form = document.querySelector("#user-register-form");


  let fullname = form.fullname.value.trim();
  let email = form.email.value.trim();
  let password = form.password.value.trim();


  //process errors
  let errors = [];

  if (fullname.length == 0) {
    errors.push(`
    
      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times warning"></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon fa fa-exclamation-triangle"></i>
          <strong class="font__weight-semibold">Warning!</strong> You did not enter your fullname!
        </div>
      </div>`);
  }

  if (email.length == 0) {
    errors.push(`
    
      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times warning"></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon fa fa-exclamation-triangle"></i>
          <strong class="font__weight-semibold">Warning!</strong> You did not enter your email!
        </div>
      </div>
              `);
  }

  if (password.length == 0) {
    errors.push(`
    
      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times warning"></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon fa fa-exclamation-triangle"></i>
          <strong class="font__weight-semibold">Warning!</strong> You did not enter your password!
        </div>
      </div>`);
  }

  if (errors.length == 0) {
    //there are no errors

    //register the user
    if (registerUser(fullname, email, password)) {

      formMessage.innerHTML = `<div class="col-sm-12">
      <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
        <button type="button" class="close font__size-18" data-dismiss="alert">
                <span aria-hidden="true"><a>
                  <i class="fa fa-times greencross"></i>
                  </a></span>
                <span class="sr-only">Close</span> 
              </button>
        <i class="start-icon fa fa-check-circle"></i>
        <strong class="font__weight-semibold">Wellcome Aboard!</strong> User registered successfully!
      </div>
    </div>`;


    } else {
      //error
      formMessage.innerHTML = `
      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times danger "></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon fa fa-times-circle"></i>
          <strong class="font__weight-semibold">Oops! Sorry</strong> User exists already!
        </div>
      </div>`;
    }


  } else {
    //there are errors
    formMessage.innerHTML = "";
    errors.forEach((error) => {
      formMessage.innerHTML += `<div>${error}</div>`;

    })

  }

})


function registerUser(fullname, email, password) {

  //1. retrieve the storage
  let usersStorage = localStorage.getItem("users");

  //set the user object
  const user = {
    fullname: fullname,
    email: email,
    password: password
  }

  if (usersStorage == null || usersStorage == undefined) {

    let usersArray = [];

    usersArray.push(user);

    usersArray = JSON.stringify(usersArray);

    localStorage.setItem("users", usersArray);

    return true;

  } else {

    usersStorage = JSON.parse(usersStorage);

    let success_tracker = [];

    //loop through the array to check for the user's email..

    for (let i = 0; i < usersStorage.length; i++) {

      if (usersStorage[i].email == user.email) {
        //the user exists already
        success_tracker.push(usersStorage[i]);
        break;
      }

    }


    if (success_tracker.length > 0) {
      //the user exists already
      return false;

    } else {
      //no user exists..

      //register the user
      usersStorage.push(user);

      usersStorage = JSON.stringify(usersStorage);

      //store it back
      localStorage.setItem("users", usersStorage);

      return true;

    }



  }

}
function login() {

  let email = document.getElementById('email');
  let password = document.getElementById('password');

  if (email.value.length == 0) {
    alert('Please fill in email');

  } else if (password.value.length == 0) {
    alert('Please fill in password');

  } else {

    let users = {
      email: email.value,
      password: password.value
    }
    let storedUsers = getStoredUsers();

    if (storedUsers.length == 0) {
      //this user has not brrn registered
    } else {

      let user_found = [];
      for (let i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i]['email'] == users.email && storedUsers[i]['password'] == users.password) {
          //this is the user
          user_found.push(storedUsers[i]);
          break;
        }
      }

      if (user_found.length > 0) {
        //user is registered
        //do whatever is nec. here..

      } else {
        //user is not registered.

      }

    }

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


$(window).load(function () {
  //Set the login session 
  sessionStorage.setItem('status', 'loggedIn')
});

//Check the login session
if (sessionStorage.getItem('status') != null) {
  //redirect to page
  console.log('You are logged in');
}
else {
  //show validation message
  console.log('You are not logged in');
}


/*
$("#register-form-btn").click(async function (e) {

    //start a loader
    startLoader();
    const result = await axios.post("http://localhost:4000/submit-form", {
        fullname: document.querySelector("#register-form").fullname.value,
        email: document.querySelector("#register-form").email.value,
        bio: document.querySelector("#register-form").bio.value,
    });

    if (result) {
        //console.log(result.data);

        //stop the loader
        stopLoader();
    }

})


function startLoader() {

    const loader = `<div class="modal" tabindex="-1" id='loader-modal' data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body bg-warning">
          <div>Saving your data ...</div>
          <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
      </div>
    </div>
  </div>`;

    $("#modals-loader").html(loader);

    $("#loader-modal").modal("show");

    $("#loader-modal").on("hidden.bs.modal", function () {

        const success_modal = `<div class="modal" tabindex="-1" id='success-modal'>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body bg-success">
          <div>Data saved.</div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="restartPage()">Okay</button>
      </div>
      </div>
    </div>
  </div>`;

        $("#modals-loader").html(success_modal);

        $("#success-modal").modal("show");


    })


}


function stopLoader() {

    $("#loader-modal").modal("hide");




}

function restartPage() {
    location.href = "index.html";
}
*/