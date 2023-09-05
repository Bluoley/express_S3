const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes/api");
require("./config/db")();

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.raw({ limit: "10mb" }));
app.use(morgan("dev"));
app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
