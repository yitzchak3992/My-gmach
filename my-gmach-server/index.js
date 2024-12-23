const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const gmachListRoutes = require("./routes/routes");

const port = process.env.PORT || 3005;

// app.use((req, res, next) => {
//   console.log("Received a request:");
//   console.log(`Method: ${req.method}`);
//   console.log(`Path: ${req.path}`);
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);

//   next();
// });
//Routes
app.use("/", gmachListRoutes);

app.listen(port, () => {
  console.log(`The server is running on port ${port} !!!`);
});

// Handle closing the connection when the server shuts down
process.on("SIGINT", () => {
  connection.end((err) => {
    console.log("החיבור למסד הנתונים נסגר");
    process.exit(err ? 1 : 0);
  });
});
