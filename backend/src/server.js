const app = require('./app');

const PORT = process.env.PORT || 3070;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});