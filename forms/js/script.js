
document.querySelector("#register-btn").addEventListener("click", function () {

  // let formInfo = document.querySelector("#form-info");

  const form = document.querySelector("#user-register-form");


  let fullname = form.fullname.value.trim();
  let email = form.email.value.trim();
  let password = form.password.value.trim();


  //process errors
  let errors = [];

  if (fullname.length == 0) {
    errors.push(`
    <div class="toast toast--yellow add-margin">
        <div class="toast__icon">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        </div>
        <div class="toast__content">
            <p class="toast__type">Warning</p>
                <p class="toast__message">You did not enter fullname.</p>
            </div>
            <div class="toast__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>`);
  }

  if (email.length == 0) {
    errors.push(`
    <div class="toast toast--yellow add-margin">
        <div class="toast__icon">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        </div>
        <div class="toast__content">
            <p class="toast__type">Warning</p>
                <p class="toast__message">You did not enter email.</p>
            </div>
            <div class="toast__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>`);
  }

  if (password.length == 0) {
    errors.push(`
    <div class="toast toast--yellow add-margin">
        <div class="toast__icon">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        </div>
        <div class="toast__content">
            <p class="toast__type">Warning</p>
                <p class="toast__message">You did not enter your password.</p>
            </div>
            <div class="toast__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>`);
  }

  if (errors.length == 0) {
    //there are no errors

    //register the user
    if (registerUser(fullname, email, password)) {

      formInfo.innerHTML = `<div class="toast__container">
      <div class="toast__cell">
          <div class="toast toast--green">
              <div class="toast__icon">
                  <i class="fa fa-check" aria-hidden="true"></i>
              </div>
              <div class="toast__content">
                  <p class="toast__type">Success</p>
                  <p class="toast__message">User registered successfully.</p>
              </div>
              <div class="toast__close">
                  <i class="fa fa-times" aria-hidden="true"></i>
              </div>
          </div>`;


    } else {
      //error
      formInfo.innerHTML = `<div class="toast toast--red add-margin">
      <div class="toast__icon">
          <i class="fa fa-ban" aria-hidden="true"></i>
      </div>
      <div class="toast__content">
          <p class="toast__type">Info</p>
                  <p class="toast__message">User exists already.</p>
              </div>
              <div class="toast__close">
                  <i class="fa fa-times" aria-hidden="true"></i>
              </div>
          </div>`;
    }


  } else {
    //there are errors
    formInfo.innerHTML = "";
    errors.forEach((error) => {
      formInfo.innerHTML += `<div>${error}</div>`;

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























/*

$("#register-form-btn").click(function (e) {

  //start a loader
  startLoader();
  const result = axios.post("http://localhost:4400/submit-form", {
    fullname: document.querySelector("#register-form").fullname.value,
    email: document.querySelector("#register-form").email.value,
    password: document.querySelector("#register-form").password.value,
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