//jshint esversion:6
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;
let db = require("./db/db.json")
const mainDir = path.join(__dirname, "/public");

let savedNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
        if (err) throw err;
    })
);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readyFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

const dbUpdate = savedNotes => {
    fs.writeFileSync(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(savedNotes),
        err => {
            if (err) throw err;
        }
    );
};

// app.post("/api/notes", function (req, res) {
//     let savedNotes = JSON.parse(fs.readyFileSync("./db/db.json", "utf8"));
//     let newNote = req.body;
//     let uniqueID = (savedNotes.length).toString();
//     newNote.id = uniqueID;
//     savedNotes.push(newNote);

//     fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
//     console.log("Note saved to db.json. Content: ", newNote);
//     res.json(savedNotes);
// });


// app.delete("/api/notes/:id", function (req, res) {
//     let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     let noteID = req.params.id;
//     let newID = 0;
//     console.log(`Deleting note with ID ${noteID}`);
//     savedNotes = savedNotes.filter(currNote => {
//         return currNote.id != noteID;
//     });

//     for (var currNote of savedNotes) {
//         currNote.id = newID.toString();
//         newID++;
//     }

//     fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
//     res.json(savedNotes);
// });

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let uniqueID = savedNotes.length;
    newNote.id = uniqueID + 1;
    savedNotes.push(newNote);
    dbUpdate(savedNotes);
    return res.json(savedNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id;
    let x = 1;
    delete savedNotes[id - 1];
    dbUpdate(savedNotes);
    res.send(savedNotes);
});



app.listen(port, function () {
    console.log(`Now listening to port ${port}. Enjoy!`);
});







