import React from 'react';
import { shallow } from 'enzyme';
import { Explorer } from './Explorer';

describe('Explorer', () => {
  const searchFn = jest.fn();
  let wrapper;
 
   beforeEach(() => {
     wrapper = shallow(<Explorer search={searchFn} />)
   });

  it('renders without crashing', () => {
    let component = shallow(<Explorer />);
    expect(component).toMatchSnapshot();
  });

  describe('When the form is submitted', () => {
    it('should call mock search', () => {
      wrapper.find('form').prop('onSubmit')({preventDefault() {}});
      expect(searchFn.mock.calls.length).toBe(1)
    });
  });
});