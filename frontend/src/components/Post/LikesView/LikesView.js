import React from "react";
import styles from "./LikesView.module.css";
import Like from "./Like/Like";
import { getPostLikes } from "../../../services/postService";
import { v4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
const LikesView = ({ postID, setLikesLen }) => {
  const likesQuery = useQuery({
    queryKey: ["likes", postID],
    queryFn: async () => {
      const response = await getPostLikes(postID);
      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
      setLikesLen(data.likes.length);
    },
  });
  if (likesQuery.isError) {
    return <pre>{JSON.stringify(likesQuery.error.errors)}</pre>;
  }

  if (likesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["likes-view"]}>
      {likesQuery.data.likes.length > 0 ? (
        likesQuery.data.likes.map((like) => {
          return (
            <Like
              key={v4()}
              userId={like._id}
              username={like.username}
              picUrl={like.profilePicUrl}
            />
          );
        })
      ) : (
        <div>There are no likes</div>
      )}
    </div>
  );
};

export default LikesView;
