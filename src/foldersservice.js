const FoldersService = {
    getAllFolders(db) {
        return db.select('*').from('folders');
    },
    insertFolder(db, folder) {
        return db.insert(folder).into('folders').returning('*');
    },
    getFolderById(db, id) {
        return db.select('*').from('folders').where('id', id);
    }
};

module.exports = FoldersService;