const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index")

require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 5000;
console.log(PORT, "PORT")

app.use("/api/v1", mainRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
