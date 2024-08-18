import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "dasdata" },{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};
export {connectDB};