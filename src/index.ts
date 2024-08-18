import express, { Request, Response } from 'express';
import cors from 'cors'; // Import cors package
import fs from 'fs';
import path from 'path';
import { Product, Person, Book, Testimony } from './types';

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

const readJsonFile = <T>(filePath: string): T => {
  const fileData = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
  return JSON.parse(fileData);
};

// Routes for products
app.get('/api/products', (req: Request, res: Response) => {
  const products: Product[] = readJsonFile<Product[]>('../data/products.json');
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

app.get('/api/products/:id', (req: Request, res: Response) => {
  const products: Product[] = readJsonFile<Product[]>('../data/products.json');
  const product = products.find(product => product.product_id === parseInt(req.params.id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Routes for people
app.get('/api/people', (req: Request, res: Response) => {
  const people: Person[] = readJsonFile<Person[]>('../data/people.json');
  const { role } = req.query;

  if (role) {
    const filteredPeople = people.filter(person => person.role === role);
    return res.json(filteredPeople);
  }

  res.json(people);
});

app.get('/api/people/:id', (req: Request, res: Response) => {
  const people: Person[] = readJsonFile<Person[]>('../data/people.json');
  const person = people.find(person => person.id === parseInt(req.params.id));

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

// Routes for books
app.get('/api/books', (req: Request, res: Response) => {
  const books: Book[] = readJsonFile<Book[]>('../data/books.json');
  const { genre } = req.query;

  if (genre) {
    const filteredBooks = books.filter(book => book.genre === genre);
    return res.json(filteredBooks);
  }

  res.json(books);
});

app.get('/api/books/:id', (req: Request, res: Response) => {
  const books: Book[] = readJsonFile<Book[]>('../data/books.json');
  const book = books.find(book => book.id === parseInt(req.params.id));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});


app.get('/api/testimony', (req: Request, res: Response) => {
  const testimonies: Testimony[] = readJsonFile<Testimony[]>('../data/testimonies.json');

  res.json(testimonies);

});

app.listen(port, () => {
  console.log(`Libcoffee server is running on http://localhost:${port}`);
});
