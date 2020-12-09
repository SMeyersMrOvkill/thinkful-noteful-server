const NotesService = {
    getAllNotes(db) {
        return db.select('*').from('notes');
    },
    insertNote(db, note) {
        return db.insert(note).into('notes').returning('*');
    },
    getNoteById(db, id) {
        return db.select('*').from('notes').where('id', id);
    },
    deleteNote(db, id) {
        return db.delete().from('notes').where('id', id);
    }
};

module.exports = NotesService;