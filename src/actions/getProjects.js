import store from "../store/store";

export const getProjects = searchKey => {
  const key = searchKey.replace(/\s/g, "");
  store.dispatch(initialize());
  return function(dispatch, getState) {
    callApi(dispatch, getState, `https://api.github.com/orgs/${key}/repos`, true);
  }
};

export const initialize = () => {
  return {
    type: "GET_PROJECTS"
  };
};

export const getProjectsSuccess = data => {
  return {
    type: "GET_PROJECTS_SUCCESS",
    data: data.data,
    backupData: data.data,
    headers: data.headers,
    page: data.page,
    totalPage: data.totalPage
  };
};

export const getProjectsError = () => {
  return {
    type: "GET_PROJECTS_ERROR"
  };
};

export const sort = type => {
  return function(dispatch, getState) {
    let state = getState();
    let direction = state.direction;
    if (state.sortType === type) {
      direction = direction === 'asc' ? 'desc' : 'asc'
    }
    dispatch(sortProjects(type, direction, state.data));
  };
}

export const sortProjects = (type, direction, data) => {
  return {
      type: "SORT",
      sortType: type,
      direction: direction,
      data: data,
      backupData: data
    }
};

export const clearFilter = () => {
  return function(dispatch, getState) {
    dispatch(clearProjectFilter(getState().backupData));
  };
}

export const clearProjectFilter = (backupData) => {
  return {
      type: "CLEAR_FILTER",
      data: backupData
    }
};

export const filter = filters => {
  return function(dispatch, getState) {
    dispatch(filterProject(filters, getState().data, getState().backupData));
  };
}

export const filterProject = (filters, data, backupData) => {
  return {
      type: "FILTER",
      filterType: filters.type,
      filterValue: filters.value,
      data: data,
      backupData: backupData
    }
};

export const turnPage = (page) => {
  return function(dispatch, getState) {
    var isFirstPage = page === 'first';
    var isLastPage = page === 'last';
    callApi(dispatch, getState, getState().headers[page], isFirstPage, isLastPage);
  }
}

export const callApi = (dispatch, state, api, isFirstPage, isLastPage) => {
  var headers = [];
  return fetch(api)
    .then(response => {
      headers = parseHeaders(response.headers.get('link'));
      return response.json();
    })
    .then(data => {
      if (data.message === "Not Found") {
        throw new Error("No such user found!!");
      } else {
        // console.log('data', data);
        // console.log('headers', headers);
        let lastPage = state().totalPage ? state().totalPage : getTotalPage(headers)
        dispatch(getProjectsSuccess({
          data,
          headers,
          page: isFirstPage ? 1 : isLastPage ? lastPage : getCurrentPage(headers),
          totalPage: lastPage
        }))
      };
    })
    .catch(err => {
      console.log('callApi', err.toString());
      dispatch(getProjectsError())
    });
}

export const getCurrentPage = headers => {
  let page = 1;
  if (headers.next) {
    page = Number(headers.next.match(/page=(\d+)/)[1]) - 1;
  } else {
    page = Number(headers.prev.match(/page=(\d+)/)[1]) + 1;
  }
  return page;
}

export const getTotalPage = headers => {
  return headers.last.match(/page=(\d+)/)[1];
}

export const parseHeaders = headers => {
  var parsedHeaders = {};
  headers.split(',').forEach(header => {
    let h = header.split(';');
    parsedHeaders[h[1].match(/"(.*)"/)[1]] = h[0].match('<(.*)>')[1];
  })
  parsedHeaders['first'] = parsedHeaders['next'] ? 
    parsedHeaders['next'].replace(/page=\d+/, 'page=1') : 
    parsedHeaders['prev'].replace(/page=\d+/, 'page=1');
  return parsedHeaders
}