import reducer from './projectsReducer'

describe('projectsReducer', () => {
  describe('state is undefined', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
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
      })
    });
  });

  describe('action.type is GET_PROJECTS', () => {
    it('return isFetching true', () => {
      expect(reducer({}, { type: 'GET_PROJECTS' })).toEqual({
        isError: false,
        isFetching: true,
        data: {},
      });
    });
  });

  describe('action.type is GET_PROJECTS_ERROR', () => {
    it('return isError true', () => {
      expect(reducer({}, { type: 'GET_PROJECTS_ERROR' })).toEqual({
        isError: true,
        isFetching: false,
        data: {},
      });
    });
  });

  describe('action.type is GET_PROJECTS_SUCCESS', () => {
    it('return isError true', () => {
      let action = {
          data: 'data',
          headers: 'headers',
          page: 'page',
          totalPage: 'totalPage',
          sort: 'sort',
          order: 'order',
          type: 'GET_PROJECTS_SUCCESS'
      }
      expect(reducer({}, action)).toEqual({
        isError: false,
        isFetching: false,
        data: action.data,
        headers: action.headers,
        page: action.page,
        totalPage: action.totalPage,
        sort: action.sort,
        order: action.order
      });
    });
  });
});