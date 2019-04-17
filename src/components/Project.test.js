import React from 'react';
import { mount, shallow } from 'enzyme';
import Project from './Project';

describe('Project', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Project />);
  });
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render anything', () => {
    expect(wrapper.html()).toBeNull();
  });

  it('should render Project', () => {
    const project = {
      name: 'some project',
      html_url: 'some url',
      language: 'some language',
      stargazers_count: 10000,
      forks: 100000
    }
    const component = shallow(<Project key='1'  project={project}/>);
    expect(component.html()).toBe(
      '<tr>'+
        '<td><a href="'+project.html_url+'/branches/all">'+project.name+'</a></td>'+
        '<td>'+project.language+'</td>'+
        '<td>'+project.stargazers_count.toLocaleString()+'</td>'+
        '<td>'+project.forks.toLocaleString()+'</td>' +
      '</tr>'
    );
  });
});
