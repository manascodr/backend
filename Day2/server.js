let express = require("express"); //importing express package
let app = express(); // server created
app.use(express.json()); // middleware to parse JSON body

let notes = []; // array to store notes

app.get("/notes", (req, res) => { // route created
  res.json({
    notes: notes,
  }); // sending response as JSON
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.json({
    message: "Note added successfully",
    notes: notes,
  });
});

app.delete("/notes/:index", (req, res) => {
    const index = req.params.index;

    delete notes[index];

    res.json({
        message: "Note deleted successfully",
        notes: notes,
    });
});

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const newTitle = req.body.title;

    notes[index] = { ...notes[index], title: newTitle };

    res.json({
        message: "Note updated successfully",
        notes: notes,
    });
});

app.listen(3000, () => {
  // server started
  console.log("Server is running on port 3000");
});
