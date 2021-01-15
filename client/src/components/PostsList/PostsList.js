import React from "react";
import { Link } from 'react-router-dom'
import CardBox from "../../components/CardBox/CardBox";
import WithStaticContent from "../../components/CardBox/hoc/withStatisContent";
import Wave3 from '../../img/wave3.svg'
import Wave2 from '../../img/wave2.svg'
const CardBoxWithStaticContent = WithStaticContent(CardBox);

const PostsList = ({ posts }) => {
  return (
    <>
      <div className="posts__elementsList">
        <img className="posts__wave" src={Wave3} alt="footerSvg" />
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={index} className="posts__element">
                <Link
                  to={{
                    pathname: `/post/?_id=${post._id}`,
                    state: post
                  }}>
                  <CardBoxWithStaticContent
                    key={index}
                    title={post.title}
                    content={post.content}
                    userName={post.creator.userName}
                    date={post.date}
                    category={post.category}
                    level={post.level}
                    commentsLength={post.comments.length}
                  />
                </Link>
              </div>
            );
          })}
        <img className="posts__wave-last" src={Wave2} alt="footerSvg" />
      </div>
    </>
  );
};

export default PostsList;
