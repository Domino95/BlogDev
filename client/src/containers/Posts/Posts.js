import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Spinner from '../../components/Spinner/spinner'
import PostsList from '../../components/PostsList/PostsList'
import BackgroundImg from '../../components/BackgroundImg/BackgroundImg'

const Posts = () => {
    const [posts, setPosts] = useState()
    const [FilteredPosts, setFilteredPosts] = useState()
    const [text, setText] = useState('All posts')
    const [isLoading, setIsLoading] = useState(true)
    const [Category, setCategory] = useState("Category")
    const [Level, setLevel] = useState("Level")

    console.log(posts)

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get('/post/getAllPosts')
                setPosts(response.data)
                setFilteredPosts(response.data)
            }
            catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        getPosts()
    }, [])

    function handleSearchActive(e) {
        const { id } = e.target
        const div = document.querySelector(`#${id}Container`)
        if (div.classList.value === "--open")
            div.classList.remove('--open')
        else
            div.classList.add('--open')
    }

    function handleCategory(e) {
        if (e.target.id === '') {
            setCategory(e.target.innerText)
            document.querySelector(`#CategoryContainer`).classList.remove('--open')
        }
    }

    function handleLevel(e) {
        if (e.target.id === '') {
            setLevel(e.target.innerText)
            document.querySelector(`#LevelContainer`).classList.remove('--open')
        }
    }

    function filterPosts() {
        if (Category !== "Category" && Level !== "Level") {
            let array = []
            if (Category === "All" && Level === "All") {
                array = posts
                setText("All posts")
            }
            else if (Category === "All") {
                array = posts.filter(post => post.level === Level)
                setText("Filtered posts")
            }
            else if (Level === "All") {
                array = posts.filter(post => post.category === Category)
                setText("Filtered posts")
            }
            else {
                array = posts.filter(post => post.category === Category && post.level === Level)
                setText("Filtered posts")
            }
            setFilteredPosts(array)

        }
    }

    return (
        <div className="posts">
            {isLoading && <Spinner />}
            <BackgroundImg />
            <h1>Search posts</h1>

            <button className="posts__searchButton" onClick={() => filterPosts()}> Search</button>
            <div className="posts__search">
                <div id="CategoryContainer" onClick={(e) => handleCategory(e)}>
                    <span onClick={(e) => handleSearchActive(e)} id="Category" />
                    {Category}
                    <p >React</p>
                    <p>Sass</p>
                    <p>Git</p>
                    <p>HTML</p>
                    <p>Node.js</p>
                    <p>Mysql</p>
                    <p>npm</p>
                    <p>MongoDB</p>
                    <p>CSS</p>
                    <p>VSC</p>
                    <p>All</p>
                </div>

                <div id="LevelContainer" onClick={(e) => handleLevel(e)}>
                    <span onClick={(e) => handleSearchActive(e)} id="Level" />
                    {Level}
                    <p>Beginner</p>
                    <p>Medium</p>
                    <p>Advanced</p>
                    <p>All</p>
                </div>
            </div>

            <PostsList
                posts={FilteredPosts}
                text={text} />

        </div>
    );
}

export default Posts;