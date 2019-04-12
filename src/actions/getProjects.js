import store from "../store";

export const getProjects = () => {
  return {
    type: "GET_PROJECTS"
  };
};

export const getProjectsSuccess = data => {
  return {
    type: "GET_PROJECTS_SUCCESS",
    data: data
  };
};

export const getProjectsError = () => {
  return {
    type: "GET_PROJECTS_ERROR"
  };
};

export const sortProjects = (type, data) => {
  return {
      type: "SORT",
      sortType: type,
      data: data
    }
};

export const sort = type => {
  return function(dispatch, getState) {
    var state = getState();
    dispatch(sortProjects(type, state.data));
  };
}

export const thunk_action_creator = searchKey => {
  const key = searchKey.replace(/\s/g, "");
  store.dispatch(getProjects());

  return function(dispatch, getState) {
    return fetch(`https://api.github.com/orgs/${key}/repos`)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else {
          console.log('result: ', data)
          dispatch(getProjectsSuccess(data))
        };
      })
      .catch(err => dispatch(getProjectsError()));
  };
};