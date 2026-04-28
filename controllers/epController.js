const User = require('../models/epModel');

const criarUsuario = async (req, res) => {
    const { nome, temporada, historia } = req.body;

    if(!nome || !temporada || !historia){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }
    try{
        const existeUsuario = await User.findOne({ nome });
        if(existeUsuario){
            return res.status(400).json({ msg: "Nome já existe no sistema"});
        }
        const novoUsuario = await User.create({ nome, temporada, historia })
        const { _id, nome:nomeUsuario, temporada:temporadaUsuario, historia:historiaUsuario } = novoUsuario;
        res.status(201).json({ msg: "Episódio cadastrado", usuario:{id:_id, nome:nomeUsuario, temporada:temporadaUsuario, historia:historiaUsuario} });
    } catch (error){
        res.status(500).json({ msg: "Erro ao cadastrar episódio", error: error.message });
    }
}

const listarUsuarios = async(req, res) =>{
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg:"Erro ao listar Episódios: ", error: error.message })
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, temporada, historia } = req.body;

    try {
        const usuario = await User.findById(id);

        if(!usuario){
            return res.status(404).json({msg: "Episódio não existe no banco"});
        }
        if(nome) usuario.nome = nome;
        if(temporada) usuario.temporada = temporada;
        if(historia) usuario.historia = historia;

        await usuario.save()

        res.json({
            msg: "Episódio atualizado com sucesso",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                temporada: usuario.temporada,
                historia: usuario.historia,
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao atualizar usuário",
            error: error.message
        });
    }
};

const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await User.findByIdAndDelete(id);

        if(!usuario){
            return res.status(404).json({msg: "Episódio não encontrado"});
        }

        res.json({ msg: "Episódio deletado com sucesso"})
    } catch (error) {
        res.status(500).json({
            msg:"Erro ao deletar episódio",
            error: error.message
        });
    }
};

module.exports = { criarUsuario, listarUsuarios, editarUsuario, deletarUsuario };