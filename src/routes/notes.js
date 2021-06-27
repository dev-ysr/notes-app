const router = require("express").Router();
const { isAuthenticated } = require("../helpers/auth");
const Note = require("../models/Note");
// coonst { isAuthenticated } = require('../helpers/auth')

router.get("/notes/add", isAuthenticated, (req, res) => {
    res.render("notes/new-note");
});

router.post("/notes/new-note", isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("notes/new-note", {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({ title, description });
        console.log(newNote);
        // res.send('OK' );
        // newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/notes");
    }
});

router.get("/notes", isAuthenticated, async(req, res) => {
    await Note.find().then((documentos) => {
        const contexto = {
            notes: documentos.map((documento) => {
                return {
                    _id: documento._id,
                    title: documento.title,
                    description: documento.description,
                };
            }),
        };

        res.render("notes/all-notes", {
            notes: contexto.notes,
        });
    });
});

router.get("/notes/edit/:id", isAuthenticated, async(req, res) => {
    await Note.findById(req.params.id).then((documento) => {
        const contexto = {
            _id: documento._id,
            title: documento.title,
            description: documento.description,
        };

        res.render("notes/edit-note", {
            note: contexto
        });
    });
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect('/notes');
});

module.exports = router;