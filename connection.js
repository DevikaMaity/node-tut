const mongoose = require("mongoose")

const url = 'mongodb+srv://devikamaity6:y7oJCyKNRXdCJAid@cluster0.luxgslg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connection = async () =>{
    return mongoose.connect(url)
}

module.exports = connection;