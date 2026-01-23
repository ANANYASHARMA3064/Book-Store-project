import express from 'express'
import { Book } from '../models/bookMode.js';
const router =express.Router();
router.post('/books',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear||
            !request.body.genre
            


        ){
            return response.status(400).send({
                message: "send all required field(s)"
            })
        }
        const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear,
        genre:request.body.genre
    }
    const book =await Book.create(newBook)
    return response.status(201).send(book)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
    


})
// 
router.get('/books/search', async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query is required" });
    }

    const books = await Book.find({
      title: { $regex: title, $options: "i" }
    });

    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for get all books from database 
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


//Route to get one book from database by ID 
router.get('/books/:id',async (req,res)=>{
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
router.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


router.delete('/books/:id', async (req,res)=>{
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
router.get("/books/search", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query is required" });
    }

    const books = await Book.find({
      title: { $regex: title, $options: "i" } // case-insensitive
    });

    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router