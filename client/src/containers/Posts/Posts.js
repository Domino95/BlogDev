import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/spinner";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from "../../components/Pagination/Pagination";

const Posts = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [Category, setCategory] = useState("Category");
  const [Level, setLevel] = useState("Level");
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const search = document.querySelector("#search");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/post/getAllPosts");
        console.log(response.data);
        setPosts(response.data.posts);
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
        let response;
        if (Level === "Level" || Category === "Category")
          response = await axios.get(`/post/getPosts/${page}}`);
        else
          response = await axios.post("/post/getFilterPosts", {
            Level,
            Category,
            page,
          });
        setPosts(response.data);
        setCurrentPage(page);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      search.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filterPosts = async () => {
    if (Level !== "Level" && Category !== "Category") {
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

      <button className="posts__searchButton" onClick={() => filterPosts()}>
        Search
      </button>

      <PostsList posts={posts} />

      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        loadPosts={(page) => loadPosts(page)}
      />
    </div>
  );
};

export default Posts;
