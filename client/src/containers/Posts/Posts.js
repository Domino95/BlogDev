import React, { useContext } from "react";
import Spinner from "../../components/Spinner/spinner";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from "../../components/Pagination/Pagination";
import { GlobalState } from '../../api/globalState'

const Posts = () => {
  const state = useContext(GlobalState)
  const [posts] = state.postsAPI.posts
  const [isLoading] = state.postsAPI.isLoading
  const [Category, setCategory] = state.postsAPI.Category
  const [Level, setLevel] = state.postsAPI.Level
  const [numberOfPages] = state.postsAPI.numberOfPages
  const [currentPage, setCurrentPage] = state.postsAPI.currentPage
  const [Error] = state.postsAPI.Error
  const { filterPosts } = state.postsAPI

  const handleCurrentPage = (page) => {
    if (page > 0 && page !== numberOfPages + 1) {
      setCurrentPage(page)
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

      <div className="posts__description">
        <h2>Category</h2><h2>Level</h2>
      </div>

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

      <h3>{Error}</h3>

      <button className="posts__searchButton" onClick={() => filterPosts()}>
        Search
      </button>
      <PostsList posts={posts} />

      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        handleCurrentPage={(page) => handleCurrentPage(page)}
      />
    </div>
  );
};

export default Posts;
