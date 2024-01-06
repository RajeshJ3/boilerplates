// Save User Credentials
export const saveUserCredentials = (data) => {
  // helper function to save user credentials to the local storage
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));
};

// Delete User Credentials
export const deleteUserCredentials = (data) => {
  // helper function to delete user credentials from local storage
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};

// Get User Credentials
export const getUserCredentials = () => {
  // helper function to fetch user credentials from local storage
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = {};
  }
  return {
    accessToken: localStorage.getItem("access"),
    refreshToken: localStorage.getItem("refresh"),
    user,
  };
};

export const getAuthorization = () => {
  const data = getUserCredentials();
  return `Bearer ${data["accessToken"]}`;
};

export const getAuthorizationHeader = () => {
  return {
    Authorization: getAuthorization(),
  };
};
