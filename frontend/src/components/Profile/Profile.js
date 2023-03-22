import React from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Post from "../Post/Post";
import { AiOutlinePlus } from "react-icons/ai";
// import ImageModal from "../ImageModal/ImageModal";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import CreatePost from "../CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import {
  handleUserPosts,
  getOtherUsersPosts,
} from "../../services/postService";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [modalImages, setModalImages] = useState([]);
  // const [modalIndex, setModalIndex] = useState(0);
  // const handleImageClick = (images, index) => {
  //   setModalImages(images);
  //   setModalIndex(index);
  //   setModalOpen(true);
  // };

  const userProfileQuery = useQuery({
    queryKey: ["posts", userId],
    enabled: !userId,
    queryFn: async () => {
      const res = await handleUserPosts();
      if (!res.ok) {
        let data = res.json();
        if (res.status === 401 || res.status === 404) {
          throw new Error(data.errors);
        }
      } else {
        return res.json();
      }
    },
    onError: () => {
      navigate("/login");
    },
  });
  const otherProfileQuery = useQuery({
    queryKey: ["posts", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await getOtherUsersPosts(userId);
      console.log(res);
      return res.json();
    },
  });
  if (otherProfileQuery.isLoading) {
    return <h1>Loading....</h1>;
  }
  if (otherProfileQuery.isError) {
    return <pre>{JSON.stringify(otherProfileQuery.error.errors)}</pre>;
  }
  // Profile Pages for Other Users
  if (
    !!userId &&
    otherProfileQuery.isSuccess &&
    otherProfileQuery.data.Posts !== null
  ) {
    return (
      <div className={styles["profile-container"]}>
        {otherProfileQuery.data.User && (
          <ProfileHeader
            author={otherProfileQuery.data.Author}
            status={otherProfileQuery.data.status}
          />
        )}
        {/*if you are on somoene elses page you can't create a post on it*/}

        {!userId && <CreatePost />}
        {otherProfileQuery.data.Posts?.length > 0 ? (
          otherProfileQuery.data.Posts.map((post) => (
            <Post
              key={v4()}
              post={post}
              user={otherProfileQuery.data.User}
              // handlePostImageClick={handleImageClick}
            />
          ))
        ) : (
          <div className={styles["first-post"]}> There are no posts</div>
        )}
        {/**TODO: create pop up modal */}
        <button className={styles["create-post"]}>
          <AiOutlinePlus />
        </button>
        {/* {isModalOpen && (
          <ImageModal
            onOverlayClick={() => setModalOpen(false)}
            onClose={() => setModalOpen(false)}
            images={modalImages}
            index={modalIndex}
          />
        )} */}
      </div>
    );
    // If you are not friends with the User whos profile you are looking at
  } else if (!!userId && otherProfileQuery.data.Posts === null) {
    return (
      <div className={styles["profile-container"]}>
        {otherProfileQuery.data.User && (
          <ProfileHeader
            author={otherProfileQuery.data.Author}
            status={otherProfileQuery.data.status}
          />
        )}
        <div className={styles["not-friends"]}>
          <svg
            className={styles["not-friends-svg"]}
            fill="#000000"
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 485 485"
          >
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M242.5,253.931c-19.299,0-35,15.701-35,35c0,13.934,8.186,25.989,20,31.616v53.568h30v-53.569 c11.814-5.628,20-17.682,20-31.616C277.5,269.632,261.799,253.931,242.5,253.931z"></path>{" "}
                <path d="M345,173.844V102.5C345,45.981,299.019,0,242.5,0S140,45.981,140,102.5v71.344C97.562,205.299,70,255.739,70,312.5 C70,407.617,147.383,485,242.5,485c95.117,0,172.5-77.383,172.5-172.5C415,255.739,387.438,205.299,345,173.844z M170,102.5 c0-39.977,32.523-72.5,72.5-72.5S315,62.523,315,102.5v53.498C292.946,145.741,268.382,140,242.5,140 c-25.882,0-50.446,5.741-72.5,15.999V102.5z M242.5,455C163.925,455,100,391.075,100,312.5S163.925,170,242.5,170 c78.575,0,142.5,63.925,142.5,142.5S321.075,455,242.5,455z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <div>Not Friends</div>
        </div>
      </div>
    );
  }
  if (userProfileQuery.isLoading) {
    return <h1>Loading....</h1>;
  }
  if (userProfileQuery.isError) {
    return <pre>{JSON.stringify(userProfileQuery.error.errors)}</pre>;
  }
  if (!userId && userProfileQuery.isSuccess) {
    return (
      // When looking at your own Porfile Page
      <div className={styles["profile-container"]}>
        {userProfileQuery.data.User && (
          <ProfileHeader author={userProfileQuery.data.User} />
        )}
        {!userId && (
          <CreatePost imgUrl={userProfileQuery.data.User.profilePicUrl} />
        )}
        {userProfileQuery.data.Posts.length > 0 ? (
          userProfileQuery.data.Posts.map((post) => (
            <Post
              key={v4()}
              post={post}
              user={userProfileQuery.data.User}
              // handlePostImageClick={handleImageClick}
            />
          ))
        ) : (
          <div className={styles["first-post"]}> There are no posts</div>
        )}
        {/**TODO: create pop up modal */}
        <button className={styles["create-post"]}>
          <AiOutlinePlus />
        </button>
        {/* {isModalOpen && (
          <ImageModal
            onOverlayClick={() => setModalOpen(false)}
            onClose={() => setModalOpen(false)}
            images={modalImages}
            index={modalIndex}
          />
        )} */}
      </div>
    );
  }
};

export default Profile;
