// const Product = require('../models/Product');
// const getProduct = async (req, res) => {
//     try {
//         const users = await Product.find({});
//         return res.status(200).json({ users,role:users.role});
//     } catch (error) {
//         return res.status(500).json({ message: "Error finding users", error });
//     }
// };
// module.exports = {
//     getProduct
// };
const Product = require('../models/Product');

 const getProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;   // Default to page 1
        const limit = parseInt(req.query.limit) || 8; // Default to 10 products per page
        const skip = (page - 1) * limit;              // Calculate how many products to skip

        const products = await Product.find({}).skip(skip).limit(limit);
        
        // Get total number of products in the database
        const totalProducts = await Product.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            products, // Send the paginated products
            currentPage: page,
            totalPages: totalPages,
            // totalProducts: totalProducts,  // Optional: Include total product count
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error });
    }
};

module.exports = {
    getProduct
};
