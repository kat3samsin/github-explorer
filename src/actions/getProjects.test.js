import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './getProjects'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getProjects', () => {
  afterEach(() => {
    fetchMock.restore()
  });

  describe('fetch Projects success', ()=> {
    it('fetch Projects success', () => {

    })
  });

})