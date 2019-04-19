import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './getProjects';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getProjects', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('getProjects returns success', () => {
    it('should call GET_PROJECTS, GET_PROJECTS_SUCCESS', () => {
      let responseBody = {items:[]};
      fetchMock.getOnce('*', {
        body: responseBody,
        headers: {
          link:'<https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2>; rel="next", <https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=4>; rel="last"'
        }
      });

      const expectedActions = [{ 
        type: 'GET_PROJECTS'
      }, { 
        type: 'GET_PROJECTS_SUCCESS',
        data: responseBody.items,
        headers: {
          first: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=1',
          next: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2',
          last: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=4'
        },
        page: 1,
        totalPage: '4',
        sort: 'stars',
        order: 'desc' 
      }];

      const store = mockStore({ data: {} });
      return store.dispatch(actions.getProjects('airbnb')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });

  describe('getProjects returns error', () => {
    it('should call GET_PROJECTS, GET_PROJECTS_ERROR', () => {
      fetchMock.getOnce('*', 404);

      const expectedActions = [{ 
        type: 'GET_PROJECTS' 
      }, { 
        type: 'GET_PROJECTS_ERROR' 
      }];

      const store = mockStore({ data: {} });
      return store.dispatch(actions.getProjects('airbnb')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });

  describe('parseHeaders', () => {
    it('page 1 > should have > first, next, last', () => {
      let expected = {
        first: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=1',
        next: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2',
        last: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=4'
      };
      let actual = actions.parseHeaders('<https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2>; rel="next", <https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=4>; rel="last"');

      expect(expected).toEqual(actual)
    });

    it('page 4 > should have > first, prev', () => {
      let expected = {
        first: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=1',
        prev: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=3'
      };
      let actual = actions.parseHeaders('<https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=1>; rel="first", <https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=3>; rel="prev"');

      expect(expected).toEqual(actual)
    });
  });

  describe('sort', () => {
    let callApi;
    beforeEach(() => {
      callApi = jest.spyOn(actions, 'callApi');
    });
    afterEach(() => {
      callApi.mockReset();
    });

    it('by stars asc > should callApi with > sort stars, order asc', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user:airbnb&sort=stars&order=desc`,
        isFirstPage: true,
        isLastPage: false,
        sort: 'stars',
        order: 'asc'
      };

      const store = mockStore({ data: {} });
      store.dispatch(actions.sort({type:'stars'})).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });

    it('by forks desc > should callApi with > sort forks, order desc', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user:airbnb&sort=forks&order=asc`,
        isFirstPage: true,
        isLastPage: false,
        sort: 'forks',
        order: 'desc'
      };

      const store = mockStore({ data: {} });
      store.dispatch(actions.sort({type:'forks'})).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });
  });

  describe('turnPage', () => {
    let callApi;
    beforeEach(() => {
      callApi = jest.spyOn(actions, 'callApi');
    });
    afterEach(() => {
      callApi.mockReset();
    });

    it('next > should callApi with > url next, isFirstPage false, isLastPage false', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2`,
        isFirstPage: false,
        isLastPage: false
      };

      const store = mockStore({ 
        headers: {
            next: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2'
        }
      });
      store.dispatch(actions.turnPage('next')).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });

    it('prev > should callApi with > url prev, isFirstPage false, isLastPage false', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2`,
        isFirstPage: false,
        isLastPage: false
      };

      const store = mockStore({ 
        headers: {
            prev: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=2'
        }
      });
      store.dispatch(actions.turnPage('prev')).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });

    it('first > should callApi with > url first, isFirstPage true, isLastPage false', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=1`,
        isFirstPage: true,
        isLastPage: false
      };

      const store = mockStore({ 
        headers: {
            first: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=1'
        }
      });
      store.dispatch(actions.turnPage('first')).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });

    it('last > should callApi with > url last, isFirstPage false, isLastPage true', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=4`,
        isFirstPage: false,
        isLastPage: true
      };

      const store = mockStore({ 
        headers: {
            last: 'https://api.github.com/search/repositories?q=user%3Aairbnb&sort=stars&order=desc&page=4'
        }
      });
      store.dispatch(actions.turnPage('last')).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });
  });

  describe('filter', () => {
    let callApi;
    beforeEach(() => {
      callApi = jest.spyOn(actions, 'callApi');
    });
    afterEach(() => {
      callApi.mockReset();
    });

    it('by language = javascript > should callApi with > url language javascript', () => {
      let expected = {
        url: `https://api.github.com/search/repositories?q=user:airbnb+language:javascript&sort=stars&order=desc`,
        isFirstPage: true,
        isLastPage: false
      };

      const store = mockStore({});
      store.dispatch(actions.filter({
        type:'language', 
        value:'javascript'
      })).then(() => {
        expect(callApi).toBeCalledWith(expected);
      });
    });
  });
});