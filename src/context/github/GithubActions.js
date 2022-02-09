import axios from "axios";

// Get search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await axios.get(
    `https://api.github.com/search/users?${params}`
  );
  return response.data.items;
};

// GET USER AND REPOS
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    await axios.get(`https://api.github.com/users/${login}`),
    await axios.get(
      `https://api.github.com/users/${login}/repos?sort=created&per_page=10`
    ),
  ]);
  return { user: user.data, repos: repos.data };
};
