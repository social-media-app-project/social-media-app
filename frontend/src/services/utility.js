// /**
//  *
//  * @param {Object} response
//  * @returns {Object}
//  */
// export async function handelErrors(response) {
//   const data = await response.json();
//   if (!response.ok) {
//     throw Error(data);
//   } else {
//     return data;
//   }
// }
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function postOptions(body) {
  return {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: cookies.get("token"),
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: body,
  };
}

export const getOptions = {
  method: "GET",
  mode: "cors",
  headers: {
    Authorization: cookies.get("token"),
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};

export const deleteOptions = {
  method: "DELETE",
  mode: "cors",
  headers: {
    Authorization: cookies.get("token"),
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};

export const putOptions = (body) => {
  return {
    method: "PUT",
    mode: "cors",
    headers: {
      Authorization: cookies.get("token"),
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: body,
  };
};
