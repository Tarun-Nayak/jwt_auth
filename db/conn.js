const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/auth", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Connection Was SuccesFull..."))
    .catch((err) => console.log(err));