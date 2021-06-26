import mongoose from "mongoose";

type Connection = {
  isConnected?: number | undefined;
};

const connection: Connection = {};

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.mongodbUri || "", options);
  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export default dbConnect;
