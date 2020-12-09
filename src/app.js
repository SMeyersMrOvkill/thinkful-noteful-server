require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const { NODE_ENV } = require('./config');

const FoldersService = require('./foldersservice');
const NotesService = require('./notesservice');

const app = express();

const morganOption = (NODE_ENV === 'production')
	? 'tiny'
	: 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/folders', (req, res) => {
	const db = req.app.get('db');
	FoldersService.getAllFolders(db).then(folders => {
		return res.json(folders);
	});
})

app.post('/folders', (req, res) => {
	const db = req.app.get('db');
	const { name } = req.body;
	FoldersService.insertFolder(db, {name: name}).then(result => {
		return res.json(result[0]);
	});
});

app.get('/folders/:folderId', (req, res) => {
	const db = req.app.get('db');
	FoldersService.getFolderById(db, req.params.folderId).then(folder => {
		return res.json(folder[0]);
	});
})

app.get('/notes', (req, res) => {
	const db = req.app.get('db');
	NotesService.getAllNotes(db).then(notes => {
		return res.json(notes);
	})
});

app.post('/notes', (req, res) => {
	const db = req.app.get('db');
	const { name, content, folderid } = req.body;
	NotesService.insertNote(db, {name, content, folderid}).then(result => {
		return res.json(result[0]);
	});
})

app.get('/notes/:noteId', (req, res) => {
	const db = req.app.get('db');
	NotesService.getNoteById(db, req.params.noteId).then(note => {
		return res.json(note[0]);
	});
})

app.delete('/notes/:noteId', (req, res) => {
	const db = req.app.get('db');
	NotesService.deleteNote(db, req.params.noteId).then(note => {
		return res.status(201).end();
	})
})

app.use(function errorHandler(error, req, res, next) {
	let response;
	if(NODE_ENV === 'production') {
		response = { error: { message: 'server error' } };
	} else {
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response); 
})

module.exports = app;
