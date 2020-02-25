const note = require('../model/noteModel')
const labelModel = require('../model/labelModel');
const elasticsearch = require('../elasticSearch/elasticSearch');
/**
 *@description:To create a note along with title and description   
 */
exports.createNote = (noteData, callback) => {
    try {
        console.log(noteData.title);
        note.find({ 'title': noteData.title }, (err, data) => {

            if (err) {
                console.log("Error in noteschema ");
                return callback(err);
            } else if (data.length > 0) {
                var response = { "error": true, "message": "Title already exists ", "errorCode": 404 };
                return callback(response);
            } else {
                console.log("label data in notemodel", noteData);
                const Data = new note(noteData);
                Data.save((err, result) => {
                    if (err) {
                        console.log("error in labelmodel", err);
                        return callback(err);
                    } else {
                        console.log("data in labelmodel", result);
                        return callback(null, result);
                    }
                })
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 *@description:To retrieve all note from database of particular user 
 */
exports.findAllNote = (req, callback) => {
    try {
        let userId = req.decoded.payload.userId
        console.log("note data in notemodel", req.decoded.payload.userId);
        note.find({ userID: req.decoded.payload.userId }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                elasticsearch.addDocument(data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 *@description:add label to note using labels id and note id 
 */
z
exports.addlabeltoNote = (req, callback) => {
    try {
        console.log("label data in labelmodel", req.body);
        var labelsID = req.body.labelsID;
        var noteID = req.body.noteID;
        note.find({ labelsID: labelsID }, (err, data) => {
            if (err) {
                console.log("error in note model");
            } else if (data.length > 0) {
                console.log("label is allready exist");
            } else {
                note.findOneAndUpdate({ _id: noteID }, { $push: { "labelsID": labelsID } }, (err, data) => {
                    if (err) {
                        console.log("error in notemodel", err);
                        return callback(err);
                    } else {
                        console.log("data in notemodel", data);
                        var res = data.labelsID;
                        res.push(labelsID);
                        data.labelsID = res;

                        return callback(null, data);
                    }

                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To remove label from note using labels id and note id
 */
exports.removelabelfromNote = (req, callback) => {
    try {
        console.log("label data in notemodel", req.body);
        var labelsID = req.body.labelsID;
        var noteID = req.body.noteID;
        note.find({ labelsID: labelsID }, (err, data) => {

            if (err) {
                console.log("error in note model");
            } else if (!data) {
                console.log("pls provide noteid and lables id");
            } else {
                note.findOneAndUpdate({ _id: noteID }, { $pull: { "labelsID": labelsID } }, (err, data) => {
                    if (err) {
                        console.log("error in notemodel", err);
                        return callback(err);
                    } else {
                        console.log("data in notemodel", data);
                        var res = data.labelsID;
                        res.pull(labelsID)
                        data.labelsID = res;
                        return callback(null, data);
                    }

                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To modify note like changing the title or description
 */
exports.updateNote = (req, callback) => {
    try {
        console.log("update note data in", req.body);
        var title = req.body.title;
        var description = req.body.description;
        console.log(description);
        note.updateOne({ _id: req.body.noteId }, { title: title, description: description }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To remove note from database using note id
 */
exports.deleteNote = (req, callback) => {
    try {
        console.log("label data in notemodel", req.body);
        note.findByIdAndDelete({ _id: req.body.noteId }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To set reminder on note take a input as date
 */
exports.reminder = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        var date = new Date(req.body.date);
        note.findOneAndUpdate({ _id: req.body.noteId }, { $set: { reminder: date } }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To remove reminder on note ,in database reminder field will be deleted
 */
exports.deletereminder = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        note.findOneAndUpdate({ _id: req.body.noteID }, { $unset: { reminder: 1 } }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To check note is an archive or not if it is true then this note is archive
 */
exports.isArchive = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        note.findOneAndUpdate({ _id: req.body.noteId }, { $set: { isArchive: true } }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
/**
 * @description:To check note is an trash or not if it is true then this note is trash
 */
exports.isTrash = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        note.findOneAndUpdate({ _id: req.body.noteId }, { $set: { isTrash: true } }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}

exports.changeColor = (noteId, color, callback) => {
    note.findByIdAndUpdate({ _id: noteId }, { $set: { "color": color } }, (err, data) => {
        if (err) {
            console.log("error in noteservices", err);
            callback(err)
        }
        else {
            console.log("data in noteservices", data);
            return callback(null, data)
        }
    })
}

exports.addLabel = body => new Promise((resolve, reject) => {
    console.log("in add label note services");
    var labelData = new labelModel({
        "userId": body.userId,
        "labelName": body.labelName
    })
    labelData.save().then(data => {
        resolve(data);
        console.log(data);
    }).catch(err => {
        reject(err);
        console.log(err);

    })

})

exports.getAllLabels = (userData) => new Promise((resolve, reject) => {
    labelModel.find({ userId: userData }).then(data => {
        resolve(data);
    }).catch(err => {
        reject(err);
    })
})