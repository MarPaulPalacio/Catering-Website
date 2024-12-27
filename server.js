import express from 'express';
import { get_books, get_books_author, add_books, book_array } from './arrays.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static_files'))


app.get('/find-by-isbn-author', (req, res)=>{
    console.log(req.query.author);
    console.log(req.query.isbn);
    if (req.query.isbn && req.query.author){
        console.log(get_books(req.query.isbn,req.query.author))
        res.send("DONE")
    } else {
        console.log("Invalid Parameters")
    }
    // res.send('Hellossss');
})

app.get('/find-by-author', (req, res)=>{
    if (req.query.author){
        console.log(get_books_author(req.query.author))
        res.send("DONE")
    } else {
        console.log("Invalid Parameters")
    }
    // res.send('Hellossss');
})


app.get('/', (req, res)=>{
    res.send("book_array")

    // for (let i= 0; i<book_array.length; i++){
    //     res.send(book_array[i])
    // }
})
app.post('/add-book', (req, res) => {
    
    console.log(add_books(req.body))
    // console.log(req.body.Book_name)
    res.send('Received a POST request.');
});




// Listen at port 3000
app.listen(3001, ()=> {console.log('Server started at port 3001')});