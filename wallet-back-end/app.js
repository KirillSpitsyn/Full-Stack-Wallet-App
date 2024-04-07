const express = require('express');
const cors = require('cors');
const accountsRouter = require('./routers/accountsRouter');
const transactionRouter = require('./routers/transactionRouter');
const app = express();

app.use(cors());

app.use('/account', accountsRouter);
app.use('/transaction', transactionRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

