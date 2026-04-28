const express = require('express');
const router = express.Router();
const { criarUsuario, listarUsuarios, editarUsuario, deletarUsuario } = require('../controllers/epController');

router.post("/ep", criarUsuario);
router.get("/ep", listarUsuarios);
router.put("/ep/:id", editarUsuario);
router.delete("/ep/:id", deletarUsuario);


module.exports = router;