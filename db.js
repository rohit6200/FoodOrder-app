const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rohit123:Moto6200@cluster0.ah078k9.mongodb.net/gofoodmern?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");

    const fetch_data = await mongoose.connection.db.collection("food_item");
    const data = await fetch_data.find({}).toArray();

    const foodCategary = await mongoose.connection.db.collection("foodCategary");
    const catData = await foodCategary.find({}).toArray();

    global.food_item = data;
    global.foodCategary = catData;
    
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = mongoDB;
