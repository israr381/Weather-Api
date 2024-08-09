
import express from 'express';
import cors from 'cors';
import weatherRoutes from  "./routes/weatherRoutes.js"




const app = express();


app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use('/api', weatherRoutes);


export default app;