import React, { useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";
import CreateComment from "./CreateComment/CreateComment";
import Comment from "./Comment/Comment";
import { v4 } from "uuid";
import { getPostComments } from "../../../services/postService";

const CommentsSection = ({ postID }) => {
  const [commentsArr, setComments] = useState([]);

  useEffect(() => {
    const getFetchComments = async () => {
      try {
        const response = await getPostComments(postID);
        const data = await response.json();
        if (response.ok) {
          setComments(data.comments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFetchComments();
  }, []);

  return (
    <div className={styles["comments-section"]}>
      <CreateComment postID={postID} />
      {commentsArr.length >= 0 ? (
        commentsArr.map((comment) => <Comment key={v4()} comment={comment} />)
      ) : (
        <div className={styles["no-comments"]}>Be the first to comment!</div>
      )}
    </div>
  );
};

export default CommentsSection;
