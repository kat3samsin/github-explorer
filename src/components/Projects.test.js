import React from 'react';
import { mount, shallow } from 'enzyme';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders without crashing', () => {
    let component = shallow(<Projects isFetching={false} isError={false} data={[]} />);
    expect(component).toMatchSnapshot();
  });
  
  it('isFetching should show Loading...', () => {
    const wrapper = mount(<Projects isFetching={true} isError={false} data={[]} />);
    expect(wrapper.html()).toBe('<div><h3>Loading...</h3></div>');
    wrapper.unmount();
  });

  it('isFetching should show Nada.', () => {
    const wrapper = mount(<Projects isFetching={false} isError={true} data={[]} />);
    expect(wrapper.html()).toBe('<div><h3>Nada.</h3></div>');
    wrapper.unmount();
  });

  // it('isFetching should show Projects', () => {
  //   const data = [{
  //     html_url: 'some url',
  //     name: 'some project name',
  //     stargazers_count: 10000,
  //     forks: 100000
  //   }];
    
  //   const wrapper = mount(<Projects isFetching={false} isError={false} data={data} />);
  //   expect(wrapper.html()).toBe('<div><h3>Projects</h3></div>');
  //   wrapper.unmount();
  // });
});