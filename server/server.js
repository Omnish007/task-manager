const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("./services/database")

const app = express();
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());

const taskRoutes = require('./routes/tasks');

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
