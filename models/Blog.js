const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    slug: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    user: {type: String, required: true},
}, {timestamps: true});

mongoose.models = {};

export default mongoose.model('Blog', BlogSchema)

