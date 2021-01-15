import postModel from '../../models/post'

class PostService {

    public countPosts = async (level?: string, category?: string) => {

        let numberOfPosts: number
        if (!level && !category) numberOfPosts = await postModel.countDocuments()
        else if (level === "All" && category === "All") numberOfPosts = await postModel.countDocuments()
        else if (level === "All") numberOfPosts = await postModel.find({ category: category }).countDocuments()
        else if (category === "All") numberOfPosts = await postModel.find({ level }).countDocuments()
        else numberOfPosts = await postModel.find({ level: level, category: category }).countDocuments()

        console.log(numberOfPosts)
        let numberOfPages = numberOfPosts / 6
        const numberOfPagesString: string = numberOfPages.toString()
        if (numberOfPagesString.includes('.')) numberOfPages = parseInt(numberOfPagesString, 10) + 1

        return numberOfPages;
    }

    public receivePosts = async (page: string, level?: string, category?: string) => {

        let posts
        if (!level && !category) posts = await postModel.find()
            .skip((parseInt(page, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        else if (level === "All" && category === "All") posts = await postModel.find()
            .skip((parseInt(page, 10) - 1) * 6)
            .limit(6).
            populate('creator', 'userName')

        else if (level === "All") posts = await postModel.find({ category: category })
            .skip((parseInt(page, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        else if (category === "All") posts = await postModel.find({ level: level })
            .skip((parseInt(page, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        else posts = await postModel.find({ level: level, category: category })
            .skip((parseInt(page, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        return posts;
    }

}
export default PostService;