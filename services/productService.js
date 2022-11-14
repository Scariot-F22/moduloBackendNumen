const Product = require('../models/products')
const User = require('../models/user')


const createProducts = async(name, price, stock, userId)=> {
    let result;
    try {
        const userFound = await User.findById(userId);
        if (!userFound) {
            return;
        }
        const newProduct = new Product ({ name, price, stock, userId })
        await newProduct.save();
        userFound.products.push(newProduct._id)
        await userFound.save();
    } catch (error) {
        throw error;
    }
    return result
}

module.exports = {
    createProducts
}