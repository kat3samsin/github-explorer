import React from 'react';
import { shallow } from 'enzyme';
import { Explorer } from './Explorer';

describe('Explorer', () => {
  it('renders without crashing', () => {
    shallow(<Explorer />);
  });
});