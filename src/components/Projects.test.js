import React from 'react';
import { shallow } from 'enzyme';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders without crashing', () => {
    let component = shallow(<Projects isFetching={false} isError={false} data={[]} />);
    expect(component).toMatchSnapshot();
  });

  describe('isFetching is true', () => {
    it('should show Loading...', () => {
      const wrapper = shallow(<Projects isFetching={true} isError={false} data={[]} />);
      expect(wrapper.html()).toBe('<div><h3>Loading...</h3></div>');
    });
  });

  describe('isError is true', () => {
    it('should show Nada.', () => {
      const wrapper = shallow(<Projects isFetching={false} isError={true} data={[]} />);
      expect(wrapper.html()).toBe('<div><h3>Nada.</h3></div>');
    });
  });
  describe('2 projects are retrieved', () => {
    it('should show 2 Project(s)', () => {
      const wrapper = shallow(<Projects isFetching={false} isError={false} data={[{},{}]} />);
      expect(wrapper.find('Project')).toHaveLength(2)
    });
  });
  describe('no project retrieved', () => {
    it('should not show Project', () => {
      const wrapper = shallow(<Projects isFetching={false} isError={false} data={[]} />);
      expect(wrapper.find('Project')).toHaveLength(0);
    });
  });
});