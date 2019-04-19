import store from "../store/store";

export const initialize = () => {
  return {
    type: "GET_PROJECTS"
  };
};

export const getProjectsSuccess = data => {
  return {
    type: "GET_PROJECTS_SUCCESS",
    data: data.data,
    headers: data.headers,
    page: data.page,
    totalPage: data.totalPage,
    sort: data.sort,
    order: data.order
  };
};

export const getProjectsError = () => {
  return {
    type: "GET_PROJECTS_ERROR"
  };
};

export let key = '';
export const getProjects = searchKey => {
  key = searchKey ? searchKey.replace(/\s/g, "") : key;
  
  var apiData = {
    url: `https://api.github.com/search/repositories?q=user:${key}&sort=stars&order=desc`,
    isFirstPage: true,
    isLastPage: false,
    sort: 'stars',
    order: 'desc'
  };
  return dispatch => {
    dispatch(initialize());
    return callApi(dispatch, apiData);
  };
};

export const sort = type => {
  let state = store.getState();
  let order = state.order || 'desc';
  if (state.sort === type) {
    order = order === 'asc' ? 'desc' : 'asc'
  }
  var apiData = {
    url: `https://api.github.com/search/repositories?q=user:${key}&sort=${type}&order=${order}`,
    isFirstPage: true,
    isLastPage: false,
    sort: type,
    order: order
  };
  return dispatch => {
    return callApi(dispatch, apiData);
  };
}

export const filter = filters => {
  var apiData = {
    url: `https://api.github.com/search/repositories?q=user:${key}+${filters.type}:${filters.value}&sort=stars&order=desc`,
    isFirstPage: true,
    isLastPage: false,
    sort: 'stars',
    order: 'desc'
  };
  return dispatch => {
    return callApi(dispatch, apiData);
  };
}

export const turnPage = (page) => {
  return (dispatch, getState) => {
    var state = getState();
    if (!state.headers[page]) {
      return;
    }
    
    var apiData = {
      url: state.headers[page],
      isFirstPage: page === 'first',
      isLastPage: page === 'last' || Number(state.page) + 1 === Number(state.totalPage)
    }
    return callApi(dispatch, apiData);
  }
}

export const callApi = (dispatch, apiData) => {
  var headers = [];
  return fetch(apiData.url)
    .then(response => {
      headers = response.headers.get('link') ? parseHeaders(response.headers.get('link')) : {};
      return response.json();
    })
    .then(data => {
      if (data.message === "Not Found") {
        throw new Error("No such user found!!");
      } else {
        let lastPage = (Object.keys(headers).length === 0) ? 1 : apiData.isLastPage ? getCurrentPage(headers) : getTotalPage(headers);
        dispatch(getProjectsSuccess({
          data: data.items,
          headers,
          page: apiData.isFirstPage ? 1 : apiData.isLastPage ? lastPage : getCurrentPage(headers),
          totalPage: lastPage,
          order: apiData.order,
          sort: apiData.sort
        }));
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
  return headers.last ? headers.last.match(/page=(\d+)/)[1] : null;
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