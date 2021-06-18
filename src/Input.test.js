import { shallow, mount } from 'enzyme';

import { checkProps, findByTestAttr, storeFactory } from './test/testUtils';
import Input from './Input';
import React from 'react';
import { Provider } from 'react-redux';

const mockSetCurrentGuess = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialState) => [initialState, mockSetCurrentGuess]
}))

const setup = (initialState={}, secretWord = 'test') => {
    const store = storeFactory(initialState);

    return mount(
        <Provider store={store}>
            <Input secretWord={secretWord} />
        </Provider>
    )
}

describe('render', () => {
    describe('success is true', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({success: true});
        })
        test('input renders without errors', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            
            expect(inputComponent.length).toBe(1);
        });
        test('input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(false);
        })
        test('submit button does not show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.exists()).toBe(false);
        })
    });
    describe('success is false', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({success: false});
        })
        test('input renders without errors', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            
            expect(inputComponent.length).toBe(1);
        });
        test('input box does show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(true);
        })
        test('submit button does show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.exists()).toBe(true);
        })
    });
})

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'test' });
})

describe('state controlled input field', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup({success: false});
    })
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });
    test('field is cleared upon submit button click', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');

        submitButton.simulate('click', { preventDefault() {} });
        expect(mockSetCurrentGuess).toHaveBeenLastCalledWith("");
    })
})