const express = require('express');
const { PORT } = require('./const');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fakeData = require('./generateFakeData');


dotenv.config({ path: '.env' });

require('./db/mongoose')();
const userRouter = require('./routers/user')
const postRouter = require('./routers/book')


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(userRouter)
app.use(postRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


// use to generate fake data
fakeData()



