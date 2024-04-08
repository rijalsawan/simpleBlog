import connectDb from "@/middleware/mongoose";
import Blog from "@/models/Blog";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try{
            const { title, content, slug, user } = req.body;
            if (!title || !content) {
                return res.status(400).json({ message: 'Please fill all the fields' });
            }
            const blog = new Blog({ slug, title, content, user  });
            await blog.save();
            res.status(201).json({ message: 'Blog added successfully', blog });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default connectDb(handler);