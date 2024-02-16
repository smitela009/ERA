const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("\x1b[34m", `mongo has connected - ${connection.connection.host}`);
    } catch (e) {
        console.log(`Oops!! something went wrong,  - ${e.message}`);
        process.exit();
    }
};

module.exports = connectDatabase;