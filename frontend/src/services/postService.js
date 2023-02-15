import { getOptions, postOptions, deleteOptions, putOptions } from "./utility";

export async function handleUserPosts() {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/user/`,
    options
  );
  return response;
}

export async function getOtherUsersPosts(id) {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}`,
    options
  );
  return response;
}

export async function getPostLikes(id) {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}/likes`,
    options
  );
  return response;
}

export async function getPostComments(id) {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}/comments`,
    options
  );
  return response;
}

export async function handleCreatePost(body) {
  const options = postOptions(JSON.stringify(body));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/`,
    options
  );
  return response;
}

export async function handleCreateComment(body, id) {
  const options = postOptions(JSON.stringify(body));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}/comments`,
    options
  );
  return response;
}

export async function handleCreateLike(id) {
  const options = postOptions();
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}/likes`,
    options
  );
  return response;
}

export async function handleDeletePost(id) {
  const options = deleteOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}`,
    options
  );
  return response;
}

export async function updatePost(body, id) {
  const options = putOptions(JSON.stringify(body));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}posts/${id}`,
    options
  );
  return response;
}
