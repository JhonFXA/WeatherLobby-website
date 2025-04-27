import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import weather from '../../weather/index.js';

const app = express();

const port = 3000;

app.use(express.json());

const whiteList = ['http://127.0.0.1', 'http://127.0.0.1:5500', 'https://weatherlobby.netlify.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 1000,
  max: 1
});

app.use(limiter);

// test route
app.get('/', (req, res) => res.json({ success: 'Hello World!' }));

app.use('/weather', weather);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
