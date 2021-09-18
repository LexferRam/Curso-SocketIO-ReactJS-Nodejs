const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la BDs");
  }
};

module.exports = {
  dbConnection,
};
