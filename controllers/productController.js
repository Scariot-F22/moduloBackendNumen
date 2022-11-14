const { productService } = require('../services')

const createProducts = async (req, res)=>{
    try {
        const { name, price, stock, userId } = req.body;
    
        let result = await productService.createProducts(name, price, stock, userId);
        res.status(201).send(result) 
    } catch (error) {
        result.status(500).send({ mesagge: "Ocurrió un error al intentar insertar producto", error})
    }
}

module.exports = {
    createProducts
}