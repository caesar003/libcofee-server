"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Utility function to read JSON files
const readJsonFile = (filePath) => {
    const fileData = fs_1.default.readFileSync(path_1.default.join(__dirname, filePath), 'utf-8');
    return JSON.parse(fileData);
};
// Routes for products
app.get('/api/products', (req, res) => {
    const products = readJsonFile('../data/products.json');
    const { category, group, type } = req.query;
    let filteredProducts = products;
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.product_category === category);
    }
    if (group) {
        filteredProducts = filteredProducts.filter(product => product.product_group === group);
    }
    if (type) {
        filteredProducts = filteredProducts.filter(product => product.product_type === type);
    }
    res.json(filteredProducts);
});
app.get('/api/products/:id', (req, res) => {
    const products = readJsonFile('../data/products.json');
    const product = products.find(product => product.product_id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ error: 'Product not found' });
    }
});
// Routes for people
app.get('/api/people', (req, res) => {
    const people = readJsonFile('../data/people.json');
    const { role } = req.query;
    if (role) {
        const filteredPeople = people.filter(person => person.role === role);
        return res.json(filteredPeople);
    }
    res.json(people);
});
app.get('/api/people/:id', (req, res) => {
    const people = readJsonFile('../data/people.json');
    const person = people.find(person => person.id === parseInt(req.params.id));
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).json({ error: 'Person not found' });
    }
});
// Routes for books
app.get('/api/books', (req, res) => {
    const books = readJsonFile('../data/books.json');
    const { genre } = req.query;
    if (genre) {
        const filteredBooks = books.filter(book => book.genre === genre);
        return res.json(filteredBooks);
    }
    res.json(books);
});
app.get('/api/books/:id', (req, res) => {
    const books = readJsonFile('../data/books.json');
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).json({ error: 'Book not found' });
    }
});
app.listen(port, () => {
    console.log(`Libcoffee server is running on http://localhost:${port}`);
});
