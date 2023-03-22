import React, { useState } from "react";
import styles from "./CommentsSection.module.css";
import CreateComment from "./CreateComment/CreateComment";
import Comment from "./Comment/Comment";
import { v4 } from "uuid";
import { getPostComments } from "../../../services/postService";
import { useQuery } from "@tanstack/react-query";

const CommentsSection = ({ postID, setCommentsLen, user }) => {
  const [commentsArr, setComments] = useState([]);
  const commentsQuery = useQuery({
    queryKey: ["comments", postID],
    queryFn: async () => {
      const response = await getPostComments(postID);
      return response.json();
    },
    onSuccess: (data) => {
      setComments(data.comments);
      setCommentsLen(data.comments.length);
    },
  });

  if (commentsQuery.isError) {
    return <pre>{JSON.stringify(commentsQuery.error.errors)}</pre>;
  }
  if (commentsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["comments-section"]}>
      <CreateComment postID={postID} user={user} />
      {commentsArr.length >= 0 ? (
        commentsArr.map((comment) => <Comment key={v4()} comment={comment} />)
      ) : (
        <div className={styles["no-comments"]}>Be the first to comment!</div>
      )}
    </div>
  );
};

export default CommentsSection;
