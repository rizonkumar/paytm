const express = require("express");
const mainRouter = require("./routes/index")

const app = express();

const PORT = process.env.PORT || 5000;
console.log(PORT, "PORT")

app.use("/api/v1", mainRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
