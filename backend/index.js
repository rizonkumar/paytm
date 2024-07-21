const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json())

const mainRouter = require("./routes/index")

const PORT = process.env.PORT || 5000;
console.log(PORT, "PORT")

app.use("/api/v1", mainRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
