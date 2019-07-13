const noteService = require('../services/noteServices')

/**
 * @description:To create new note of user by providing title and description.
 */
exports.createNote = (req, res) => {
    try {
        console.log('in label controller', req.body)
        console.log('user id =>>>>', req.decoded.payload.userId)
        var response = {}
        if (typeof req.decoded.payload.userId === 'undefined') {
            throw new Error('user id is mandatory')
        } else {
            const noteData = {
                userID: req.decoded.payload.userId,
                title: req.body.title,
                description: req.body.description,
                labelsID: req.body.labelsID

            }
            noteService.createNote(noteData, (err, data) => {
                if (err) {
                    response.status = false
                    response.error = err
                    return res.status(500).send({ response })
                } else {
                    response.status = true
                    response.data = data
                    return res.status(200).send({ response })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}
/**
 * @description:To find all notes related to a particular user.
 */
exports.findAllNote = (req, res) => {
    try {
        var titleArray = [];
        var descriptionArray = [];
        var response = {}
        noteService.findAllNote(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.data = data;
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}
/**
 * @description: add label to note by providing labels id and note id.
 */
exports.addlabeltoNote = (req, res) => {
    try {
        var response = {}
        noteService.addlabeltoNote(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.data = data
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}
/**
 * @description:remove labels from note by providing note id and labels id.
 */
exports.removelabelfromNote = (req, res) => {
    try {
        var response = {}
        noteService.removelabelfromNote(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.data = data
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To modify the note ,by changing its note title and description.
 */
exports.updateNote = (req, res) => {
    try {
        var response = {}
        noteService.updateNote(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                console.log("data in updateNote controller",data);
                
                response.status = true
                response.data = data
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}
/**
 * @description:To remove note from the database of user.
 */
exports.deleteNote = (req, res) => {
    try {
        var response = {}
        noteService.deleteNote(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.data = data
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}
/**
 * @description:set reminder on note by providing date and time.
 */
exports.reminder = (req, res) => {
    try {
        console.log('inside reminder')
        req.checkBody('_id', '_id is not valid')
        req.checkBody('Date', 'Date is not valid')
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            noteService.reminder(req, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    return res.status(200).send({
                        'success': true,
                        'message': 'reminder set sucessfully',
                        // "data": data
                    })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}
/**
 * @description:delete reminder on note.
 */
exports.deletereminder = (req, res) => {
    try {
        var response = {}
        noteService.deletereminder(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.message = 'reminder deleted successfully'
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To make a note archive.
 */
exports.isArchive = (req, res) => {
    try {
        console.log('inside isArchive')

        noteService.isArchive(req, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To make a note trash.
 */
exports.isTrash = (req, res) => {
    try {
        console.log('inside isTrash')

        noteService.isTrash(req, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

exports.changeColor = (req,res) => {
    try{
        console.log("in change color controller");
        req.checkBody("noteId","note ID is required").not().isEmpty();
        req.checkBody("color","color is required").not().isEmpty();

        var errors= req.validationErrors();
        var response={};
        if(errors){
            response.success = false;
            response.error = errors;
            return res.status(422).send(response)
        }
        else{
            var noteId = req.body.noteId;
            var color = req.body.color;

            noteService.changeColor(noteId,color, (err,data) => {
                if(err){
                    response.error = err;
                    response.success = false;
                    res.status(500).send(response)
                }
                else{
                    response.success= true;
                    response.data=data;
                    res.status(200).send(response)
                }
            });
        }
        
    }catch(error){
        console.log("error in change color controller",error);
        res.send(error);
        
    }

}