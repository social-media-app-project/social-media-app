import { postOptions, getOptions, putOptions, deleteOptions } from "./utility";

export async function searchUsers(name) {
  const options = getOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/friend/${name}`,
    options
  );
  return response;
}

export async function addFriend(id) {
  const options = postOptions();
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/friend/${id}`,
    options
  );
  return response;
}

export async function updateUsername(name) {
  const options = putOptions(JSON.stringify({ username: name }));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/update/username`,
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

export async function deleteFriend(id) {
  const options = deleteOptions;
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}users/delete${id}`,
    options
  );
  return response;
}
