const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://priyanshuvsk20_db_user:AC1vvijNbUES5vya@cluster0.dqctivd.mongodb.net/');
        console.log('database connected success')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB