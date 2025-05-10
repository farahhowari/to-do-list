
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

const connectDB=require('./config/db')

const userRouter=require('./routers/UserRouter')

dotenv.config()
connectDB()

const app =express();
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  //في حال استخدامها بهذا الشكل يمكن لاي شخص استخدام الbackend الخاص بي ولكن يجب تحديد المجال هكذا {origin:'http//....}
app.use(express.json())
app.use('/api',userRouter)
const PORT=process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('السيرفر يعمل! 🚀');
  });
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))
