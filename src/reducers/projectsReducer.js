const initialState = {
  isError: false,
  isFetching: false,
  data: {},
  headers: {},
  sort: 'stars',
  order: 'desc',
  name: '',
  gravatar: '',
  page: 1,
  totalPage: 0
};

const projectsReducer = (state = initialState, action) => {
  console.log('action', action)
  switch(action.type) {
    case 'GET_PROJECTS':
        return Object.assign({}, state, {
          isError: false,
          isFetching: true
        });
      case 'GET_PROJECTS_SUCCESS':
        return Object.assign({}, state, {
          isError: false,
          isFetching: false,
          data: action.data,
          headers: action.headers,
          page: action.page,
          totalPage: action.totalPage,
          sort: action.sort,
          order: action.order
        });
      case 'GET_PROJECTS_ERROR':
        return Object.assign({}, state, {
          isFetching: false,
          isError: true
        });
    default:
      return state;
  }
}
export default projectsReducer;