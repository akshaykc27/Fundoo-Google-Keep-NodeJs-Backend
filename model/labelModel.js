var mongoose = require('mongoose');
var schema = mongoose.Schema;
var labelSchema = new schema({
    labelName: {
        type: String,
        required: true
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'userSchema'
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('labels', labelSchema);