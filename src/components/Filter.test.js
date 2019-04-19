import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from './Filter';

describe('Filter', () => {
  const applyFiltersFn = jest.fn();
  const clearFiltersFn = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Filter applyFilters={applyFiltersFn} clearFilters={clearFiltersFn} />)
  });
  afterEach(() => {
    applyFiltersFn.mockReset();
    clearFiltersFn.mockReset();
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when applyFilters button is clicked', () => {
    it('should call mock applyFiltersFn', () => {
      wrapper.find('#applyFilters').prop('onClick')({preventDefault() {}});
      expect(applyFiltersFn.mock.calls.length).toBe(1);
    });
  });

  describe('when clearFilters button is clicked', () => {
    it('should call mock clearFiltersFn', () => {
      jest.mock('./Filter');
      Filter.prototype.getFilter = {value: ''};

      wrapper.find('#clearFilters').prop('onClick')({preventDefault() {}});
      expect(clearFiltersFn.mock.calls.length).toBe(1);
    });
  });

  describe('when enter is pressed', () => {
    it('should call mock applyFiltersFn', () => {
      wrapper.find('input').prop('onKeyUp')({keyCode: 13})
      expect(applyFiltersFn.mock.calls.length).toBe(1);
    });

  });

  describe('when a is pressed', () => {
    it('should not call applyFiltersFn', () => {
      wrapper.find('input').prop('onKeyUp')({keyCode: 65})
      expect(applyFiltersFn.mock.calls.length).toBe(0);
    });
  });
});