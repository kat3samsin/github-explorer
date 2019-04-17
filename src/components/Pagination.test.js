import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const turnPageFn = jest.fn();
  let wrapper;
  let page = 1;
  let totalPage = 5;

  beforeEach(() => {
    wrapper = shallow(<Pagination turnPage={turnPageFn} page={page} totalPage={totalPage} />)
  });
  afterEach(() => {
    turnPageFn.mockRestore();
  })

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('if result is only 1 page', () => {
    it('should not show navigation links', () => {
      let component = shallow(<Pagination turnPage={turnPageFn} page={1} totalPage={1} />)
      expect(component.html()).toBe('<div class=\"pagination\">Page 1 of 1</div>');
    });
  });

  describe('if result is 5 pages', () => {
    it('should show navigation links', () => {
      expect(wrapper.find('div').text()).toMatch('Page 1 of 5');
      expect(wrapper.find('span')).toHaveLength(4);
    });
  });

  describe('click first page', () => {
    it('should pass first', () => {
      wrapper.find('span').at(0).simulate('click');
      expect(turnPageFn).toHaveBeenCalledWith('first');
    });
  });

  describe('click next page', () => {
    it('should pass next', () => {
      wrapper.find('span').at(1).simulate('click');
      expect(turnPageFn).toHaveBeenCalledWith('prev');
    });
  });

  describe('click prev page', () => {
    it('should pass prev', () => {
      wrapper.find('span').at(2).simulate('click');
      expect(turnPageFn).toHaveBeenCalledWith('next');
    });
  });

  describe('click last page', () => {
    it('should last prev', () => {
      wrapper.find('span').at(3).simulate('click');
      expect(turnPageFn).toHaveBeenCalledWith('last');
    });
  });
});