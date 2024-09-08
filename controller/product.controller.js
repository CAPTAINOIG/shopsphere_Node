const express = require ('express');
const data = require('../Data/categories')
const Product = require('../model/product.model');


const getAllProducts = async (req, res) => {
    try {
        console.log(data);
        
        res.status(200).json(data); // Return the data directly
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

// const postProductDetails = async (req, res) => {
//     const newData = { name, price, promoPrice, description, category, discountPercentage, images } = req.body;
//     // console.log(newData);
    
//     try {
//         // Create and save the product to the database
//         const newProduct = new Product({
//             name,
//             price,
//             promoPrice,
//             description,
//             category,
//             discountPercentage,
//             images
//         });
//         console.log(newProduct);
        
//         await newProduct.save(); // Save the product to the database

//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.log(error);
        
//         res.status(500).json({ message: "Failed to save product", error });
//     }
// };

// Get product details by ID for the new page
// const getProductDetailsById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const product = await Product.findById(id); // Fetch the product by ID
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch product", error });
//     }
// };

// const getProductById = (req, res) => {
//     const productId = req.params.id;
//     const product = data.find(prod => prod._id === productId);

//     if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(product);
// };

// const getProductByCategory = (req, res) => {
//     const { category } = req.params; 

//     const products = data.filter((item) => item.category === category);

//     if (products.length === 0) {
//         return res.status(404).json({ message: 'No products found in this category' });
//     } else {
//         return res.status(200).json({ status: true, products });
//     }
// };

const getProductByCategory = (req, res) => {
    const { category } = req.params;
    console.log(category);

    const products = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    console.log('Found products:', products);

    if (products.length === 0) {
        return res.status(404).json({ message: 'No products found in this category' });
    } else {
        return res.status(200).json({ status: true, products });
    }
};

const getProductByName = (req, res)=>{
    const {name} = req.params;
    // const products = data.filter((item) => item.name.toLowerCase() === name.toLowerCase());

    const products = data.filter((item) =>item.name === name);
    if(products.length === 0){
      return  res.status(400).json({status: false, message: 'No products found in this category'})
    }
    else {
        return res.status(200).json({ status: true, products });
    }
}


const getProductByCategoryOrSection = (req, res) => {
    const { category, section } = req.params; 
    
    let products = data;

    if (category) {
        products = products.filter((item) => item.category === category);
    }

    if (section) {
        products = products.filter((item) => item.section === section);
    }

    if (products.length === 0) {
        return res.status(404).json({ message: 'No products found in this category or section' });
    } else {
        // Return only up to 4 products
        const limitedProducts = products.slice(0, 4);
        return res.status(200).json({ status: true, products: limitedProducts });
    }
};


const getProductByPrice = (req, res) => {
    const { price } = req.params;
    const priceValue = parseFloat(price);

    // Check if the parsed price is a valid number
    if (isNaN(priceValue)) {
        return res.status(400).json({ status: false, message: 'Invalid price value' });
    }

    // Filter products by price
    const products = data.filter(item => item.price === priceValue);

    // If no products are found, return a 404 status
    if (products.length === 0) {
        return res.status(404).json({ status: false, message: 'No products found with this price' });
    } else {
        return res.status(200).json({ status: true, products });
    }
};



module.exports = {getAllProducts,  getProductByCategory, getProductByName, getProductByPrice, getProductByCategoryOrSection};