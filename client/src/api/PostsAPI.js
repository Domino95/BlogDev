import { useState, useEffect } from 'react'
import axios from 'axios'

function postsAPI() {
    const [posts, setPosts] = useState();
    const [Category, setCategory] = useState(null);
    const [Level, setLevel] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState(null)


    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/post/getPosts?level=${Level}&category=${Category}&page=${currentPage}`)
                if (response.data.posts.length < 1) {
                    setError('No search results found')
                    setNumberOfPages(1)
                }
                else {
                    setError(null)
                    setPosts(response.data.posts);
                    setNumberOfPages(response.data.numberOfPages);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        getPosts();
    }, [currentPage, Category, Level]);

    const updatePostGlobally = (postId, comment) => {
        if (posts) {
            const newPosts = posts.map(element => {
                if (postId === element._id) {
                    return { ...element, comments: [...element.comments, comment] }
                }
                else return element
            });
            setPosts(newPosts)
        }
    }

    return {
        posts: [posts, setPosts],
        Category: [Category, setCategory],
        Level: [Level, setLevel],
        numberOfPages: [numberOfPages, setNumberOfPages],
        currentPage: [currentPage, setCurrentPage],
        isLoading: [isLoading, setIsLoading],
        Error: [Error, setError],
        updatePostGlobally: updatePostGlobally,
    }
}

export default postsAPI