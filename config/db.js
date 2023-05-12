const mongoose = require('mongoose')
const config = require('config')

const DB_URL = config.get('DB_URL')
const connectDB = async()=>{
    try {
        await mongoose.connect(DB_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        console.log("Database Connected");
    } catch (error) {
        console.log(`Database error ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB