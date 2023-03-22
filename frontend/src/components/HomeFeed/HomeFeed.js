import React from "react";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
// import styles from "./HomeFeed.module.css";
// import ImageModal from "../ImageModal/ImageModal";
// import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getHomefeed } from "../../services/userService";
import { v4 } from "uuid";
import { InView } from "react-intersection-observer";

const HomeFeed = () => {
  // const navigate = useNavigate();
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [modalImages, setModalImages] = useState([]);
  // const [modalIndex, setModalIndex] = useState(0);

  // const handleImageClick = (images, index) => {
  //   setModalImages(images);
  //   setModalIndex(index);
  //   setModalOpen(true);
  // };

  const fetchHomefeed = async ({ pageParam = 0 }) => {
    const res = await getHomefeed(pageParam);
    return res.json();
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["homefeed"],
    queryFn: fetchHomefeed,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });
  if (status === "loading") {
    return <div>Loading....</div>;
  }

  return (
    <>
      <CreatePost imgUrl={data.pages[0].user.profilePicUrl} />
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <pre>{JSON.stringify(error.errors)}</pre>
      ) : (
        <>
          {data.pages.map((group) => {
            return (
              <React.Fragment key={v4()}>
                {group.posts.map((post) => {
                  return <Post key={v4()} post={post} user={group.user} />;
                })}
              </React.Fragment>
            );
          })}
        </>
      )}
      <div>
        {data.pages[0].posts.length > 19 ? (
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                fetchNextPage();
              }
            }}
          >
            <h2>
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </h2>
          </InView>
        ) : (
          <div>no new posts</div>
        )}
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default HomeFeed;
