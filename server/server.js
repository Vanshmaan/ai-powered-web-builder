import dotenv from 'dotenv';
dotenv.config();
console.log("KEY:", process.env.GEMINI_API_KEY); // 👈 ADD HERE
import express from 'express';
import cors from 'cors';
import connectDB from './src/configs/db.js';
import routes from './src/routes/index.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Server Running');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});