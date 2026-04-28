const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required:[true,'Nome é Obrigatório'] },
    time: { type: String, required:[true,'Time é Obrigatório'] },
    posição: { type: String, required:[true,'Posição é Obrigatória'] },
    foto: { type: String, required:[true,'Foto é Obrigatória'] }
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);