import React from "react";
import CardBox from "../../components/CardBox/CardBox";
import WithStaticContent from "../../components/CardBox/hoc/withStatisContent";
const CardBoxWithStaticContent = WithStaticContent(CardBox);

const PostsList = ({ posts }) => {
  return (
    <>
      <div className="posts__elementsList">
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={index} className="posts__element">
                <CardBoxWithStaticContent
                  key={index}
                  title={post.title}
                  content={post.content}
                  userName={post.creator.userName}
                  date={post.date}
                  category={post.category}
                  level={post.level}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PostsList;
