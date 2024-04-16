const express = require('express')

const router = express.Router()

let listaProdutos = [
    {
        id: 1,
        nome: "Teclado",
        preco: 299.89
    }
]


function validarProduto(req, res, next) {
    const id = req.params.id
    const produto = listaProdutos.find(produto => produto.id == id)
    if (produto) {
        req.produto = produto
        next()
    } else {
        return res.status(404).json({ mensagem: "Produto não encontrado!" })
    }
}


function validarAtributos(req, res, next) {
    const dadosRecebidos = req.body
    if (!dadosRecebidos.nome || !dadosRecebidos.preco) {
        return res.status(400).json({ mensagem: "Nome e preço são obrigatórios" })
    } else {
        next()
    }
}



router.get('/produtos', (req, res) => {
    res.status(200).json(listaProdutos)
})


router.get('/produtos/:id', validarProduto, (req, res) => {
    res.json(req.produto)
})



router.post('/produtos', validarAtributos, (req, res) => {
    const dados = req.body

    const produto = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        preco: dados.preco
    }

    listaProdutos.push(produto)

    res.status(201).json(
        {
            mensagem: "Produto cadastrado com sucesso!",
            produto
        }
    )
})


router.put('/produtos/:id', validarAtributos, validarProduto, (req, res) => {
    const id = req.params.id
    const novosDados = req.body

    const index = listaProdutos.findIndex(produto => produto.id == id)
    
    const produto = {
        id: Number(id),
        nome: novosDados.nome,
        preco: novosDados.preco
    }

    listaProdutos[index] = produto

    res.status(200).json(
        {
            mensagem: "Produto alterado com sucesso!",
            produto
        }
    )
})


router.delete('/produtos/:id', validarProduto, (req, res) => {
    const id = req.params.id
    const index = listaProdutos.findIndex(produto => produto.id == id)
    listaProdutos.splice(index, 1)
    res.status(200).json({ mensagem: "Produto excluido sucesso!" })
})




module.exports = router