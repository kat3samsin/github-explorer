const initialState = {
  data: {},
  isFetching: false,
  isError: false,
  sortType: 'stargazers_count',
  direction: 'asc'
};

const sortByType = (sortType) => 
  (a, b) => a[sortType] === b[sortType] ? 0 : a[sortType] < b[sortType] ? -1 : 1;

const projectsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PROJECTS':
        return Object.assign({}, state, {
          isFetching: true,
          data: {},
          isError: false
        });
      case 'GET_PROJECTS_SUCCESS':
      action.data.sort(sortByType(action.sortType));
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data,
          isError: false
        });
      case 'GET_PROJECTS_ERROR':
        return Object.assign({}, state, {
          isFetching: false,
          isError: true
        });
      case 'SORT':
        action.data.sort(sortByType(action.sortType));
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data,
          isError: false,
          sortType: action.sortType, 
          direction: action.direction,
          filters: action.filters
        });
    default:
      return state;
  }
}
export default projectsReducer;