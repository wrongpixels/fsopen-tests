
const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    content: {
       type: String,
       minLength: 5,
        required: true
    },
    important: Boolean
});
noteSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
module.exports = mongoose.model("Note", noteSchema);