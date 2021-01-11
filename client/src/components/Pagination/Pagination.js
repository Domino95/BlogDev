import React, { Fragment } from "react";

const Pagination = (props) => {
  const numberOfPages = [];
  for (let i = 1; i <= props.numberOfPages; i++) {
    numberOfPages.push(i);
  }

  let paginationToReturn = [];

  if (props.currentPage >= 1 && props.currentPage <= 4) {
    paginationToReturn = numberOfPages.map((item, index) => {
      if (
        item === props.currentPage ||
        item === props.currentPage + 1 ||
        item === props.currentPage - 1 ||
        item === props.currentPage - 2 ||
        item === props.currentPage - 3 ||
        item === props.currentPage + 2 && item === props.numberOfPages ||
        item === props.currentPage + 2 && item === props.numberOfPages - 1 ||
        item === props.currentPage + 3 && item === props.numberOfPages

      )
        return (
          <h4
            className={item === props.currentPage ? "--active" : null}
            key={index}
            onClick={() => props.loadPosts(item)}
          >
            {item}
          </h4>
        );
      else if (item === props.numberOfPages)
        return (
          <Fragment key={index}>
            <h4 style={{ cursor: "default" }}>...</h4>
            <h4 onClick={() => props.loadPosts(item)}>{item}</h4>
          </Fragment>
        );
    });
  } else if (
    props.currentPage >= 5 &&
    props.currentPage <= props.numberOfPages - 4
  ) {
    paginationToReturn = numberOfPages.map((item, index) => {
      if (
        item === props.currentPage + 1 ||
        item === props.currentPage - 1 ||
        item === props.currentPage
      )
        return (
          <h4
            className={item === props.currentPage ? "--active" : null}
            key={index}
            onClick={() => props.loadPosts(item)}
          >
            {item}
          </h4>
        );
      else if (item === props.numberOfPages)
        return (
          <Fragment key={index}>
            <h4 style={{ cursor: "default" }}>...</h4>
            <h4 onClick={() => props.loadPosts(item)}>{item}</h4>
          </Fragment>
        );
      else if (item === 1)
        return (
          <Fragment key={index}>
            <h4 onClick={() => props.loadPosts(item)}>{item}</h4>
            <h4 style={{ cursor: "default" }}>...</h4>
          </Fragment>
        );
    });
  } else {
    {
      paginationToReturn = numberOfPages.map((item, index) => {
        if (
          item === props.currentPage ||
          item === props.currentPage + 1 ||
          item === props.currentPage - 1 ||
          item === props.currentPage + 2 ||
          item === props.currentPage + 3
        )
          return (
            <h4
              className={item === props.currentPage ? "--active" : null}
              key={index}
              onClick={() => props.loadPosts(item)}
            >
              {item}
            </h4>
          );
        else if (item === 1)
          return (
            <Fragment key={index}>
              <h4 onClick={() => props.loadPosts(item)}>{item}</h4>
              <h4 style={{ cursor: "default" }}>...</h4>
            </Fragment>
          );
      });
    }
  }
  return (
    <>
      <div className="posts__pagination">
        <button
          className="posts__paginationButton"
          onClick={() => props.loadPosts(props.currentPage - 1)}
        />
        {paginationToReturn && paginationToReturn}
        <button
          className="posts__paginationButton"
          onClick={() => props.loadPosts(props.currentPage + 1)}
        />
      </div>

      <p className="posts__paginationInfo">
        Page {props.currentPage} of {props.numberOfPages}
      </p>
    </>
  );
};

export default Pagination;
