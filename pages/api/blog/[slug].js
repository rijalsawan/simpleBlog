import Blog from "@/models/Blog";
import connectDb from "@/middleware/mongoose";

async function handler(req, res) {
    if(req.method == "GET"){
        const { slug } = req.query;
        try{
            const blog = await Blog.findOne({ slug});
            if(!blog){
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ blog });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default connectDb(handler);