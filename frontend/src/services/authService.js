import { postOptions } from "./utility";

/**
 * @param {Object} body
 * @returns {Object}
 */
export async function handleLogin(body) {
  const options = postOptions(JSON.stringify(body));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}auth/login`,
    options
  );
  return response;
}

/**
 * @param {Object} body
 * @returns
 */
export async function handleSignup(body) {
  const options = postOptions(JSON.stringify(body));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}auth/signup`,
    options
  );
  return response;
}

export async function debounceUsername(body) {
  const options = postOptions(JSON.stringify(body));
  const response = await fetch(
    `${process.env.REACT_APP_TEST_URL}auth/username`,
    options
  );
  return response;
}