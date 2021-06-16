import { shallow } from 'enzyme';

import { findByTestAttr } from './test/testUtils';
import Input from './Input';

const setup = (props) => {
    return shallow(<Input />)
}

test('input renders without errors', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'component-input')
    
    expect(inputComponent.length).toBe(1);
});