const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactsRouter = require('./routes/contacts'); // Импорт маршрутов контактов


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/contacts', contactsRouter); // Добавьте эту строку

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
