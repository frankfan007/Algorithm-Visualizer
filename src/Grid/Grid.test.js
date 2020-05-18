import React from 'react';

import Grid from './Grid';
import Node from './Node/Node';

const mobile = { width: 18, height: 28 };
const desktop = { width: 50, height: 30 };

describe('<Grid view={desktop} />', () => {
  function toggleFences(wrapper) {
    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
  }

  it('renders', () => {
    const wrapper = render(<Grid view={desktop} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all 1500 Node components', () => {
    const wrapper = shallow(<Grid view={desktop} />);

    expect(wrapper.find(Node).length).toEqual(1500);
  });

  it('render a node that will change the start state when clicked', () => {
    const wrapper = mount(<Grid view={desktop} />);
    const node = wrapper.find(Node).first();

    expect(node.state('start')).toEqual(false);
    node.simulate('mousedown', 'mouseup');
    expect(node.state('start')).toEqual(true);
  });

  it('render a node that will change the finish state when clicked', () => {
    const wrapper = mount(<Grid view={desktop} />);
    const node = wrapper.find(Node).first();

    node.simulate('mousedown', 'mouseup');
    expect(wrapper.state().start.present).toEqual(true);
  });

  it('renders 1400 nodes on mobile', () => {
    const wrapperTwo = shallow(<Grid view={mobile} />);
    expect(wrapperTwo.find(Node).length).toEqual(504);
  });
  it('registers if a mouse if held', () => {
    const wrapper = mount(<Grid view={desktop} />);
    const node = wrapper.find(Node).first();
    toggleFences(wrapper);

    node.simulate('mousedown', 'mouseenter');
    expect(wrapper.state('mouseToggle')).toBe(true);
  });
  it('can add walls', () => {
    const wrapper = mount(<Grid view={desktop} />);

    toggleFences(wrapper);

    expect(wrapper.state().fenceToggle).toEqual(true);
  });

  it('can remove walls', () => {
    const wrapper = mount(<Grid view={desktop} />);

    toggleFences(wrapper);
    const findnode = wrapper.find('#node-0-0');
    const node = findnode.first();
    [1, 2].forEach(() => {
      node.simulate('click');
    });
    const nodeobj = wrapper.state().grid[0][0];
    expect(nodeobj.fence).toEqual(false);
  });
});
