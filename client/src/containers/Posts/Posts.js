import React, { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import Spinner from "../../components/Spinner/spinner";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from "../../components/Pagination/Pagination";
import { GlobalState } from '../../api/globalState'


const Posts = () => {
  const state = useContext(GlobalState)
  const history = useHistory();

  const [posts] = state.postsAPI.posts
  const [isLoading] = state.postsAPI.isLoading
  const [Category, setCategory] = state.postsAPI.Category
  const [Level, setLevel] = state.postsAPI.Level
  const [numberOfPages] = state.postsAPI.numberOfPages
  const [currentPage, setCurrentPage] = state.postsAPI.currentPage
  const [Error] = state.postsAPI.Error
  document.title = "BlogDev - Posts"

  useEffect(() => setParametrs(history.location), [])
  history.listen((location) => {
    setParametrs(location);
  });

  const setParametrs = (location) => {
    const params = new URLSearchParams(location.search);
    if (params.get('category') && params.get('level') && parseInt(params.get('page'), 10)) {
      setCategory(params.get('category'))
      setLevel(params.get('level'))
      setCurrentPage(parseInt(params.get('page'), 10))
    }
  }

  function handleSearchActive(e) {
    const { id } = e.target;
    const div = document.querySelector(`#${id}Container`);
    if (div.classList.value === "--open") div.classList.remove("--open");
    else div.classList.add("--open");
  }

  const handleCurrentPage = (page) => {
    if (page > 0 && page !== numberOfPages + 1) {
      history.push({
        pathname: '/posts/',
        search: `level=${Level}&category=${Category}&page=${page}`
      });
    }
  };

  function handleCategory(e) {
    if (e.target.id === "") {
      history.push({
        pathname: '/posts/',
        search: `level=${Level}&category=${e.target.innerText}&page=${1}`
      });
      document.querySelector(`#CategoryContainer`).classList.remove("--open");
    }
  }

  function handleLevel(e) {
    if (e.target.id === "") {
      history.push({
        pathname: '/posts/',
        search: `level=${e.target.innerText}&category=${Category}&page=${1}`
      });
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

      <PostsList posts={posts} error={Error} />

      <Pagination
        error={Error}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        handleCurrentPage={(page) => handleCurrentPage(page)}
      />
    </div>
  );
};

export default Posts;
