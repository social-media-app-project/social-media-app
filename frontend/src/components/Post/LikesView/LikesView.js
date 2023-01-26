import React, { useEffect, useState } from "react";
import styles from "./LikesView.module.css";
import Like from "./Like/Like";
import { getPostLikes } from "../../../services/postService";
import { v4 } from "uuid";
const LikesView = ({ postID }) => {
  const [postLikes, setLikes] = useState([]);
  useEffect(() => {
    async function fetchPostLikes() {
      try {
        const response = await getPostLikes(postID);
        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPostLikes();
  }, []);

  return (
    <div className={styles["likes-view"]}>
      {postLikes.length > 0 ? (
        postLikes.map((like) => {
          return <Like key={v4} username={like.username} />;
        })
      ) : (
        <div>There are no likes</div>
      )}
    </div>
  );
};

export default LikesView;
