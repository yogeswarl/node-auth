const app = require('./app.js');
const { PORT } = process.env
const startApp = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startApp();