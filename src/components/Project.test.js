import React from 'react';
import { mount, shallow } from 'enzyme';
import Project from './Project';

describe('Project', () => {
  it('renders without crashing', () => {
    const component = shallow(<Project />);
    expect(component).toMatchSnapshot();
  });

  it('should not render anything', () => {
    const wrapper = mount(<Project />);
    expect(wrapper.html()).toBeNull();
    wrapper.unmount();
  });

  it('should render Project', () => {
    const project = {
      name: 'some project',
      html_url: 'some url',
      language: 'some language',
      stargazers_count: 10000,
      forks: 100000
    }
    const wrapper = mount(<Project key='1'  project={project}/>);
    expect(wrapper.html()).toBe(
      '<tr>'+
        '<td><a href="'+project.html_url+'/branches/all">'+project.name+'</a></td>'+
        '<td>'+project.language+'</td>'+
        '<td>'+project.stargazers_count.toLocaleString()+'</td>'+
        '<td>'+project.forks.toLocaleString()+'</td>' +
      '</tr>'
    );
    wrapper.unmount();
  });
});
