const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(res => {
    console.log("Connected to MongoDB");
}).catch(error => console.log("Error connecting to MongoDB", error.message));

mongoose.set('strictQuery', false);

const noteSchema = new mongoose.Schema({
    content: {
       type: String,
       minLength: 5,
        required: true
    },
    important: Boolean
});
noteSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
module.exports = mongoose.model("Note", noteSchema);