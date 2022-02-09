import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await axios.get(`${GITHUB_URL}/search/users?${params}`);
  return response.data.items;
};

// GET USER AND REPOS
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    await axios.get(`${GITHUB_URL}/users/${login}`),
    await axios.get(
      `${GITHUB_URL}/users/${login}/repos?sort=created&per_page=10`
    ),
  ]);
  return { user: user.data, repos: repos.data };
};
