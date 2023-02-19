import { postOptions, getOptions, putOptions, deleteOptions } from "./utility";

export async function searchUsers(name) {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/friend/${name}`,
    options
  );
  return response;
}

export async function sendFriendRequest(id) {
  const options = postOptions();
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/friend/${id}/request`,
    options
  );
  return response;
}
export async function acceptFriendRequest(id) {
  const options = postOptions();
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/friend/${id}/accept`,
    options
  );
  return response;
}

export async function deleteFriend(id) {
  const options = deleteOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/delete/${id}`,
    options
  );
  return response;
}
export async function deleteFriendRequest(id) {
  const options = deleteOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/delete/${id}/request`,
    options
  );
  return response;
}
export async function checkUsername(name) {
  const options = postOptions();
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/${name}`,
    options
  );
  return response;
}

export async function updateUsername(name) {
  const options = putOptions();
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/update/username/${name}`,
    options
  );
  return response;
}

export async function updateBio(bio) {
  const options = putOptions(JSON.stringify({ bio: bio }));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/update/bio`,
    options
  );
  return response;
}

export async function updateProfilePic(url) {
  const options = putOptions(JSON.stringify({ picUrl: url }));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/update/profilePic`,
    options
  );
  return response;
}

export async function getUser() {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/user`,
    options
  );
  return response;
}
