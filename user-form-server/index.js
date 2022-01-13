const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");


const app = express();

app.use(express.json());
app.use(cors())

app.get("/", function (request, response) {

    response.send("This home page")

})

app.get("/about-us", function (request, response) {

    response.send("This about us page")

})

app.post("/submit-form", async function (request, response) {
    const fullname = request.body.fullname;
    const email = request.body.email;
    const bio = request.body.bio;

    const user_object = {
        fullname: fullname,
        email: email,
        bio: bio
    }

    const MongoClient = mongodb.MongoClient;

    const _connection = new MongoClient("mongodb+srv://Oluwafemi:SamueL1326MongoDB@cluster0.lh7jp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

    await _connection.connect()

    const result = await _connection.db("forms-server").collection("forms").insertOne(user_object);

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




const port = process.env.PORT || 4000
app.listen(port, function () {
    console.log(`server is listening on port: ${port}`);
});