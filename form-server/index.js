const express = require("express");
const cors = require("cors");
//const mongodb = require("mongodb");


const app = express();

app.use(express.json());
app.use(cors())


app.get("/about-us", function (request, response) {

    response.send("This about us page")

})

app.post("/submit-form", function (request, response) {
    const fullname = request.body.fullname;
    const email = request.body.email;
    const password = request.body.password;

    const user_object = {
        fullname: fullname,
        email: email,
        password: password
    }

    const myJSON = JSON.stringify(user_object);
    localStorage.setItem("testJSON", myJSON);

    /*
        const MongoClient = mongodb.MongoClient;
    
        const _connection = new MongoClient("mongodb+srv://Oluwafemi:SamueL1326MongoDB@cluster0.lh7jp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    
        await _connection.connect()
    
        const result = await _connection.db("forms-server").collection("forms").insertOne(user_object);
    */
    if (result) {

        response.send({
            message: "Data saved successfully",
            data: user_object,
            code: "success",
            status: 201
        });

    } else {
        response.send({
            message: "Data was not saved",
            data: null,
            code: "error",
            status: 401
        });


    }


})


app.get("/home", function (request, response) {


    // Retrieving data:
    let user_object = localStorage.getItem("user_object");
    let user_object = JSON.parse(user_object);
    document.getElementById("login_form").innerHTML = user_object.name;


    if (email.value == email && password.value == password) {
        location.href = "welcome.html";
    } else {
        alert('Error on login');
    }

    response.send("This home page")


})

/*
app.getUser( "fullname", {
    showCredentials: <Boolean>,
    showPrivileges: <Boolean>,
    showAuthenticationRestrictions: <Boolean>,
    filter: <document>
 } )
 */


const port = process.env.PORT || 4400
app.listen(port, function () {
    console.log(`server is listening on port: ${port}`);
});