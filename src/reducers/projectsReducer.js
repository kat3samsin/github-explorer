const initialState = {
  data: {},
  backupData: {},
  isFetching: false,
  isError: false,
  sortType: 'stargazers_count',
  direction: 'asc',
  name: '',
  gravatar: '',
  page: 1,
  totalPage: 0,
  filterValue: '',
  filterType: 'language'
};

const sortByType = (sortType, direction) => {
  return (a, b) => {
    if (direction === 'asc'){
      return a[sortType] === b[sortType] ? 0 : a[sortType] < b[sortType] ? -1 : 1;
    } else {
      return a[sortType] === b[sortType] ? 0 : a[sortType] < b[sortType] ? 1 : -1;
    }
  };
}

const projectsReducer = (state = initialState, action) => {
  console.log('action', action)
  switch(action.type) {
    case 'GET_PROJECTS':
        return Object.assign({}, state, {
          isFetching: true,
          data: {},
          isError: false,
          headers: {}
        });
      case 'GET_PROJECTS_SUCCESS':
        action.data.sort(sortByType('stargazers_count', action.direction));
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data,
          backupData: action.data,
          isError: false,
          headers: action.headers,
          page: action.page, 
          totalPage: action.totalPage,
          direction: action.direction
        });
      case 'GET_PROJECTS_ERROR':
        return Object.assign({}, state, {
          isFetching: false,
          isError: true
        });
      case 'SORT':
        action.data.sort(sortByType(action.sortType, action.direction));
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data,
          backupData: action.backupData,
          isError: false,
          sortType: action.sortType, 
          direction: action.direction
        });
      case 'FILTER':
        let filteredResults = action.backupData.filter(d => d[action.filterType] ? d[action.filterType].toLowerCase() === action.filterValue : null);
        return Object.assign({}, state, {
          isFetching: false,
          data: filteredResults,
          isError: false,
          backupData: action.backupData
        });
      case 'CLEAR_FILTER':
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data,
          isError: false,
          backupData: action.data
        });
    default:
      return state;
  }
}
export default projectsReducer;