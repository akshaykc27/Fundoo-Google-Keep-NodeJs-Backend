const express = require('express');
const userController = require('../controller/controller');
const noteController = require('../controller/noteController');
const middle = require('../middleware/verifyToken')
const router = express.Router();

// user routes
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/forgotPassword',userController.forgotPassword);


//note routes
router.post('/createNote',middle.verifyToken, noteController.createNote)
router.get('/findAllNote',middle.verifyToken, noteController.findAllNote);
router.put('/addlabeltoNote', noteController.addlabeltoNote);
router.put('/removelabelfromNote', noteController.removelabelfromNote);
router.put('/updateNote', noteController.updateNote);
router.post('/deleteNote', noteController.deleteNote);
router.post('/archive', noteController.isArchive)
router.post('/trash', noteController.isTrash);
router.put('/changeColor',noteController.changeColor);

module.exports = router;