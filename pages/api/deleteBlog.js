import Blog from '../../models/Blog';
import connectDb from '../../middleware/mongoose';


const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        try{
            const blog = await Blog.deleteOne({ slug : req.body.slug });
            res.status(200).json(blog);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default connectDb(handler);