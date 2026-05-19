const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const connectDB = require('./config/db');
const { products } = require('../src/data/products');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();
        await Subcategory.deleteMany();

        // Add Products
        const sampleProducts = products.map((p, index) => ({
            ...p,
            category: p.category || 'Shirts',
            subcategory: p.subcategory || 'Linen Shirts'
        }));
        await Product.insertMany(sampleProducts);

        // Add Categories
        const sampleCategories = [
            { name: 'Shirts', status: 'Active', productCount: 32, image: 'https://images-home.beyoung.in/Shirts_category_section_03751efdd8.jpg' },
            { name: 'Trousers', status: 'Active', productCount: 28, image: 'https://images-home.beyoung.in/Trouser_category_section_c5e98dc1f9.jpg' },
            { name: 'Polo', status: 'Active', productCount: 20, image: 'https://images-home.beyoung.in/polo_category_section_0d1eb8c7c3.jpg' },
            { name: 'Cargos', status: 'Active', productCount: 15, image: 'https://images-home.beyoung.in/Cargo_category_section_8835d5bebc.jpg' },
            { name: 'Jeans', status: 'Active', productCount: 18, image: 'https://images-home.beyoung.in/Jeans_category_section_e350d6f26c.jpg' },
            { name: 'Oversize', status: 'Active', productCount: 25, image: 'https://images-home.beyoung.in/Oversized_category_section_670db805d8.jpg' },
        ];
        await Category.insertMany(sampleCategories);

        // Add Subcategories
        const sampleSubcategories = [
            { name: 'Linen Shirts', category: 'Shirts', status: 'Active' },
            { name: 'Oxford Shirts', category: 'Shirts', status: 'Active' },
            { name: 'Polo Tees', category: 'Polo', status: 'Active' },
            { name: 'Regular Fit Jeans', category: 'Jeans', status: 'Active' },
            { name: 'Cotton Cargos', category: 'Cargos', status: 'Active' },
        ];
        await Subcategory.insertMany(sampleSubcategories);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
