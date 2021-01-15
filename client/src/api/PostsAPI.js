import { useState, useEffect } from 'react'
import axios from 'axios'

function postsAPI() {
    const [posts, setPosts] = useState();
    const [Category, setCategory] = useState("All");
    const [Level, setLevel] = useState("All");
    const [numberOfPages, setNumberOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState(null)

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/post/getPosts?level=${Level}&category=${Category}&page=${currentPage}`)
                setPosts(response.data.posts);
                setNumberOfPages(response.data.numberOfPages);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        setError(null)
        getPosts();
    }, [currentPage]);

    const filterPosts = async () => {
        setError(null)
        setIsLoading(true);
        try {
            const response = await axios.get(`/post/filterPosts?level=${Level}&category=${Category}`)
            if (response.data.posts.length < 1) setError('No search results found')
            else {
                setPosts(response.data.posts);
                setNumberOfPages(response.data.numberOfPages);
                setCurrentPage(1);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return {
        posts: [posts, setPosts],
        Category: [Category, setCategory],
        Level: [Level, setLevel],
        numberOfPages: [numberOfPages, setNumberOfPages],
        currentPage: [currentPage, setCurrentPage],
        isLoading: [isLoading, setIsLoading],
        Error: [Error, setError],
        filterPosts: filterPosts
    }
}

export default postsAPI