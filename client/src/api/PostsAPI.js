import { useState, useEffect } from 'react'
import axios from 'axios'

function postsAPI() {
    const [posts, setPosts] = useState();
    const [Category, setCategory] = useState("All");
    const [Level, setLevel] = useState("All");
    const [numberOfPages, setNumberOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post("/post/getPosts", {
                    Level,
                    Category,
                    currentPage,
                });
                setPosts(response.data.posts);
                setNumberOfPages(response.data.numberOfPages);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        getPosts();
    }, [currentPage]);

    const filterPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/post/filterPosts", {
                Level,
                Category,
            });
            setPosts(response.data.posts);
            setNumberOfPages(response.data.numberOfPages);
            setCurrentPage(1);
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
        filterPosts: filterPosts
    }
}

export default postsAPI