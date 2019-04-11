const projectsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SHOW_PROJECTS':
        return state.concat([action.data]);
    default:
      return state;
  }
}
export default projectsReducer;