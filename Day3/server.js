const express = require("express"); 
const connectToDB = require('./src/db/db')
const noteModel = require('./src/models/note.model')

const app = express()
app.use(express.json())


app.get('/', async (req,res)=>{
    const notes = await noteModel.find()

    res.json({
        message:"Notes fetched",
        notes
    })
})

app.post('/notes',async (req,res)=>{
    const {title,content} = req.body

    console.log(title,content);

   await noteModel.create({
        title,content
    })
    res.json({
        message:"Note created successfully"
    })
})

app.delete('/notes/:id',async (req,res)=>{

    const noteId = req.params.id

    await noteModel.findOneAndDelete({
        _id : noteId
    })

    res.json({
        message: "note deleted"
    })
})

app.patch("/notes/:id", async (req,res)=>{
    const noteId = req.params.id
    const {title} = req.body

    await noteModel.findOneAndUpdate({
        _id:noteId
    },{
        title:title
    })

    res.json({
        message: "note updated"
    })
})

connectToDB()
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
