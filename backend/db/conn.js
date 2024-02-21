const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(``);

        console.log("Successful Connection")
    } catch (error) {
        console.log(error)
    }
}

module.exports = main;