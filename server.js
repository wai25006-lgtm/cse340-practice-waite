import express from 'express';

import { fileURLToPath } from 'url';

import path from 'path';

import { facultyListPage, facultyDetailPage } from './src/controllers/faculty/faculty.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    const title = 'Welcome Home';
    res.render('home', { title });
});

app.get('/about', (req, res) => {
    const title = 'About Us';
    res.render('about', { title });
});

app.get('/products', (req, res) => {
    const title = 'Our Products';
    res.render('products', { title });
});

app.get('/faculty', facultyListPage);

app.get('/faculty/:facultyId', facultyDetailPage);

const NODE_ENV = process.env.NODE_ENV || 'production';

// Handle requests for pages that do not exist

app.use((req, res, next) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found'
    });
});

// Handle server errors
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).render('500', {
        title: '500 - Server Error',
        error: NODE_ENV === 'development' ? err : null
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});