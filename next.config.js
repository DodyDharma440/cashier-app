module.exports = {
  env: {
    mongodbUri: process.env.NEXT_PUBLIC_MONGODB_URI,
    jwtKey: process.env.NEXT_PUBLIC_JWT_KEY,
  },
};
