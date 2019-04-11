const initialState = {
  data: {},
  isFetching: false,
  isError: false
};

const projectsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PROJECTS':
        return Object.assign({}, state, {
          isFetching: true,
          data: {},
          isError: false
        });
      case 'GET_PROJECTS_SUCCESS':
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
    default:
      return state;
  }
}
export default projectsReducer;