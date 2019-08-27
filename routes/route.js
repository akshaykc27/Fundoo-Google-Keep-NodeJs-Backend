const express = require('express');
const userController = require('../controller/controller');
const noteController = require('../controller/noteController');
const middle = require('../middleware/verifyToken');
const upload = require('../middleware/imageUpload');
const router = express.Router();

// user routes
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/resetPassword/:token',middle.verifyToken,userController.resetPassword);
router.put('/setProfilePic',upload.single('fundoo'),middle.verifyToken,userController.setProfilePic)



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
router.post('/setReminder',noteController.reminder);

//label routes
router.post('/addLabel',middle.verifyToken,noteController.addLabel);
router.get('/getAllLabels',middle.verifyToken,noteController.getAllLabels);

module.exports = router;