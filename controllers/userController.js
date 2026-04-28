const User = require('../models/userModel');

const criarUsuario = async (req, res) => {
    const { nome, time, posição, foto } = req.body;

    if(!nome || !time || !posição || !foto){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }
    try{
        const existeUsuario = await User.findOne({ nome });
        if(existeUsuario){
            return res.status(400).json({ msg: "Nome já existe no sistema"});
        }
        const novoUsuario = await User.create({ nome, time, posição, foto })
        const { _id, nome:nomeUsuario, time:timeUsuario, posição:posiçãoUsuario, foto:fotoUsuario } = novoUsuario;
        res.status(201).json({ msg: "Personagem cadastrado", usuario:{id:_id, nome:nomeUsuario, time:timeUsuario, posição:posiçãoUsuario, foto:fotoUsuario} });
    } catch (error){
        res.status(500).json({ msg: "Erro ao cadastrar personagem", error: error.message });
    }
}

const listarUsuarios = async(req, res) =>{
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg:"Erro ao listar Personagens: ", error: error.message })
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, time, posição, foto } = req.body;

    try {
        const usuario = await User.findById(id);

        if(!usuario){
            return res.status(404).json({msg: "Usuário não existe no banco"});
        }
        if(nome) usuario.nome = nome;
        if(time) usuario.time = time;
        if(posição) usuario.posição = posição;
        if(foto) usuario.foto = foto;

        await usuario.save()

        res.json({
            msg: "Usuário atualizado com sucesso",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                time: usuario.time,
                posição: usuario.posição,
                foto: usuario.foto
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
            return res.status(404).json({msg: "Usuário não encontrado"});
        }

        res.json({ msg: "Usuário deletado com sucesso"})
    } catch (error) {
        res.status(500).json({
            msg:"Erro ao deletar usuário",
            error: error.message
        });
    }
};

module.exports = { criarUsuario, listarUsuarios, editarUsuario, deletarUsuario };