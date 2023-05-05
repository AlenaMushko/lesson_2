const mongoose = require("mongoose");

// const Cat = mongoose.model('Cat', { name: String }); //модель

// const kitty = new Cat({ name: 'Zildjian' }); //інстанс-екземпляр
// kitty.save().then(() => console.log('meow'));
//для підключення до bd
const connectDb = async () => {
    try{
          const db = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDb is connected. Name: ${db.connection.name}. Port: ${db.connection.port}. Host: ${db.connection.host}`.green.bold.italic);
    } catch (error){
        console.log(error.message.red.bold);
        process.exit(1);
    }

};

module.exports = connectDb;
