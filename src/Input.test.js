import { mount, shallow } from 'enzyme';

import { checkProps, findByTestAttr } from './test/testUtils';
import Input from './Input';
import React from 'react';
import languageContext from './contexts/languageContext';
import { series } from 'async';

const mockSetCurrentGuess = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialState) => [initialState, mockSetCurrentGuess]
}))

const setup = ({ language, secretWord, success }) => {
    language = language || 'en';
    secretWord = secretWord || 'clown';
    success = success || false;
    
    return mount(
        <languageContext.Provider value={language}>
            <Input success={success} secretWord={secretWord} />
        </languageContext.Provider>
    )
}

describe('reder', () => {
    describe('success is true', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({ success: true });
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
            wrapper = setup({ success: false });
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
        wrapper = setup({});
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

describe('languagePicker', () => {
    test('correctly renders submit string in english', () => {
        const wrapper = setup({ language: 'en' });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit');
    });
    test('correctly renders submit string in emoji', () => {
        const wrapper = setup({ language: 'emoji' });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    });
})