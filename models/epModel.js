const mongoose = require('mongoose');

const epSchema = new mongoose.Schema({
    nome: { type: String, required:[true,'Nome do Episódio é Obrigatório'] },
    temporada: { type: String, required:[true,'Temporada é Obrigatória'] },
    historia: { type: String, required:[true,'História é Obrigatória'] },
},
{
    timestamps: true,
});

module.exports = mongoose.model('ep', epSchema);