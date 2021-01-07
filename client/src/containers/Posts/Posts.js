import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/spinner";
import PostsList from "../../components/PostsList/PostsList";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg";
import Pagination from "../../components/Pagination/Pagination";

const Posts = () => {
  const [posts, setPosts] = useState();
  const [FilteredPosts, setFilteredPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [Category, setCategory] = useState("Category");
  const [Level, setLevel] = useState("Level");
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const search = document.querySelector("#search");

  console.log(posts);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/post/getAllPosts");
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
        setNumberOfPages(response.data.numberOfPages);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getPosts();
  }, []);

  const loadPosts = async (page) => {
    if (page > 0 && page !== numberOfPages + 1) {
      setIsLoading(true);
      try {
        const response = await axios.get(`/post/getPosts/${page}}`);
        setPosts(response.data.posts);
        setFilteredPosts(response.data);
        setCurrentPage(page);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      search.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  function handleSearchActive(e) {
    const { id } = e.target;
    const div = document.querySelector(`#${id}Container`);
    if (div.classList.value === "--open") div.classList.remove("--open");
    else div.classList.add("--open");
  }

  function handleCategory(e) {
    if (e.target.id === "") {
      setCategory(e.target.innerText);
      document.querySelector(`#CategoryContainer`).classList.remove("--open");
    }
  }

  function handleLevel(e) {
    if (e.target.id === "") {
      setLevel(e.target.innerText);
      document.querySelector(`#LevelContainer`).classList.remove("--open");
    }
  }
  return (
    <div className="posts">
      {isLoading && <Spinner />}
      <BackgroundImg />
      <h1 id="search">Search posts</h1>

      <button className="posts__searchButton"> Search</button>
      <div className="posts__search">
        <div id="CategoryContainer" onClick={(e) => handleCategory(e)}>
          <span onClick={(e) => handleSearchActive(e)} id="Category" />
          {Category}
          <p>React</p>
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

      <PostsList posts={FilteredPosts} />

      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        loadPosts={(page) => loadPosts(page)}
      />
    </div>
  );
};

export default Posts;
