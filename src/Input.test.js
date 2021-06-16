import { shallow } from 'enzyme';

import { checkProps, findByTestAttr } from './test/testUtils';
import Input from './Input';
import React from 'react';

const mockSetCurrentGuess = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialState) => [initialState, mockSetCurrentGuess]
}))

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

describe('state controlled input field', () => {
    test('state updates with value of input box upon change', () => {
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    })
})