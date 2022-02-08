import React, { useEffect, useContext } from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/layouts/Spinner";

const User = () => {
  const { user, getUser, loading } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.login);
  }, []);

  if (!loading) {
    return (
      <div>
        <p>{user.login}</p>
        <img src={user.avatar_url} alt="" />
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default User;
