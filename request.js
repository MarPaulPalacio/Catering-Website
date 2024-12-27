import needle from 'needle';


// needle.get('http://localhost:3001/', (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(res.body);  // prints the body of the response message. In this case, “Hello”
// });

needle.post(    
    'http://localhost:3001/add-book',
    {
            Book_name: 'Monina',
            ISBN: 1234320421,
            Author: 'Lala',
            Year: 1998
    },
    (err, res) => {
      console.log(res.body)   // prints the server’s response “Received a POST request.”
    }
);

needle.post(    
    'http://localhost:3001/add-book',
    {
            Book_name: 'Joanna',
            ISBN: 1111,
            Author: 'Misda',
            Year: 1998
    },
    (err, res) => {
      console.log(res.body)   // prints the server’s response “Received a POST request.”
    }
);