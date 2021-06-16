import { shallow } from 'enzyme';

import { checkProps, findByTestAttr } from './test/testUtils';
import Input from './Input';

const setup = (secretWord = 'test') => {
    return shallow(<Input secretWord={secretWord} />)
}

test('input renders without errors', () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, 'component-input')
    
    expect(inputComponent.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'test' });
})