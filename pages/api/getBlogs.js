import Blog from '../../models/Blog';
import connectDb from '../../middleware/mongoose';


const handler = async (req, res) => {
    if (req.method === 'GET') {
        try{
            const blogs = await Blog.find({});
            res.status(200).json(blogs);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default connectDb(handler);