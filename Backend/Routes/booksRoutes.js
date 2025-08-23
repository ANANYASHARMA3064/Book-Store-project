import express from 'express'
const router =express.Router();
app.post('/books',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "send all required fields"
            })
        }
        const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear
    }
    const book =await Book.create(newBook)
    return response.status(201).send(book)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
    
n

})
// Route for get all books from database 
app.get('/books',async (req,res)=>{
    try{
        const books =await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    return res.status(200).json(books);} 
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});


//Route to get one book from database by ID 
app.get('/books/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const books =await Book.findById(id);
        return res.status(200).json(books);}
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});
//route for update a book
app.put('/books/:id', async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "send all required fields"
            })
        }
        const {id} =req.params
        const result = await Book.findByIdAndUpdate(id,req.body);
        if (!result){
            return res.status(404).json({message: 'message not found'});
        };
        return res.status(200).json({message:'successfully updated'})
    }
    
    catch(error){
            console.log(error.message)
            res.status(500).send({message:error.message})
        }
})

// Route for deleting a book 
app.delete('/books/:id', async (req,res)=>{
    try{
        const {id}=req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).send('no such book found')
        }
        res.status(200).send(`deleted!`)
    }catch(error){
       console.log(error.message);
       res.status(500).send({error:error.message}); 
    }
    }); 