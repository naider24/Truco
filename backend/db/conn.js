const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://Nicollas:1234@cluster0.qdqeikc.mongodb.net/`);

        console.log("Successful Connection")
    } catch (error) {
        console.log(error)
    }
}

module.exports = main;