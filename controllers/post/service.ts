import postModel from '../../models/post'

class PostService {

    public countPosts = async (Level?: string, Category?: string) => {

        let numberOfPosts: number
        if (!Level && !Category) numberOfPosts = await postModel.countDocuments()
        else if (Level === "All" && Category === "All") numberOfPosts = await postModel.countDocuments()
        else if (Level === "All") numberOfPosts = await postModel.find({ category: Category }).countDocuments()
        else if (Category === "All") numberOfPosts = await postModel.find({ level: Level }).countDocuments()
        else numberOfPosts = await postModel.find({ level: Level, category: Category }).countDocuments()

        console.log(numberOfPosts)
        let numberOfPages = numberOfPosts / 6
        const numberOfPagesString: string = numberOfPages.toString()
        if (numberOfPagesString.includes('.')) numberOfPages = parseInt(numberOfPagesString, 10) + 1

        return numberOfPages;
    }

    public receivePosts = async (currentPage: string, Level?: string, Category?: string) => {

        let posts
        if (!Level && !Category) posts = await postModel.find()
            .skip((parseInt(currentPage, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        else if (Level === "All" && Category === "All") posts = await postModel.find()
            .skip((parseInt(currentPage, 10) - 1) * 6)
            .limit(6).
            populate('creator', 'userName')

        else if (Level === "All") posts = await postModel.find({ category: Category })
            .skip((parseInt(currentPage, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        else if (Category === "All") posts = await postModel.find({ level: Level })
            .skip((parseInt(currentPage, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        else posts = await postModel.find({ level: Level, category: Category })
            .skip((parseInt(currentPage, 10) - 1) * 6)
            .limit(6)
            .populate('creator', 'userName')

        return posts;
    }

}
export default PostService;