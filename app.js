const { setupSequelize } = require("./config/db.config");
const { createServer } = require("./utils/server");

const app = createServer();

require("dotenv").config();

// Connect to the database
setupSequelize();

const PORT = process.env.PORT || 4000;

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
