const book_array = [];
const get_books = (isbn, author)=> {
    for (let i = 0; i< book_array.length; i++){
        if (book_array[i].ISBN == isbn && book_array[i].Author == author){
            return book_array[i]
        }
    }
    return "Error book not found"
}

const get_books_author = (author)=> {
    // console.log(book_array)
    for (let i = 0; i< book_array.length; i++){
        // print(book_array[i])
        if (book_array[i].Author == author){
            return book_array[i]
        }
    }
    return "Error not found"
}

const add_books = (book)=> {
    if (book.Book_name && book.ISBN && book.Author && book.Year){
        for (let i = 0; book_array.length>i; i++){
            if (book_array[i].ISBN == book.ISBN){
                return "{success: "+ false+ "}"
            }
        }
        book_array.push(book)
        return "{success: "+ true+ "}"
    } else {
        return "{success: "+ false+ "}"
    }
}
export {get_books, get_books_author, add_books, book_array}