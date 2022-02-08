import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`
    );
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `https://api.github.com/users/${login}/repos?sort=created&per_page=10`
      // `${GITHUB_URL}/users/${login}/repos?_${params}`
    );

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  // Get individual user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`https://api.github.com/users/${login}`);
    const data = await response.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Clear users
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
