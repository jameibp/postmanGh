module.exports = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/dbtwoTwo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To DB");
  } catch (error) {
    console.log(error.message);
    console.log("MongoDB Error");
  }
};
