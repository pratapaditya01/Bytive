const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(cors());
const swaggerUi = require('swagger-ui-express');

const connection = require('./config/db');
const AllRoutes = require('./routes/Allroutes');

const swaggerDocument = require('./swagger/apiroute.json');

// Swagger Documentation

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }));
// 

app.get('/', (req, res) => {
  res.send('working');
});

app.use('/api', AllRoutes);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log('listening on port ' + process.env.PORT);
});
