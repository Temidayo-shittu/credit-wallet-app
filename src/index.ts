import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import walletRoutes from './routes/walletRoutes';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
 app.use('/api/wallet', walletRoutes);
        

const main = async () => {
    try {

        app.get("/", (req, res) => res.send("API is running"));

        app.listen(3000,() =>{
            console.log(`Listening on port ${PORT}`)
        })
    } catch (error) {
        console.error(error)
        throw new Error("Unable to connect to db")
    }

}

main()
