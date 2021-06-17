import { mount } from 'enzyme';

import App from './App';
import { findByTestAttr } from './test/testUtils';

import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import Congrats from './Congrats';
import Input from './Input';
import GuessedWords from './GuessedWords';

const setup = ({ secretWord, guessedWords }) => {
    const wrapper = mount(
        <guessedWordsContext.GuessedWordsProvider>
            <successContext.SuccessProvider>
                <Congrats  />
                <Input secretWord={secretWord} />
                <GuessedWords />
            </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordsProvider>
    );

    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', { target: { value: 'woof' } });

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault(){} })

    guessedWords.map( guess => {
        const mockEvent = { target: { value: guess.guessedWord } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click', { preventDefault(){} });
    })

    return wrapper;
}

describe('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'golf',
            success: false,
            guessedWords: []
        });
    });
    test('creates guesswords table with one row', () => {
        const GuessedWordRows = findByTestAttr(wrapper, 'guessed-word');
        expect(GuessedWordRows).toHaveLength(1);
    })
});

describe('some words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'golf',
            success: false,
            guessedWords: [{ guessedWord: 'golf', letterMatchCount: 2 }]
        });
    });
    test('creates guesswords table with one row', () => {
        const GuessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(GuessedWordNodes).toHaveLength(2);
    })
});

describe('guess secret word', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'golf',
            success: false,
            guessedWords: [{ guessedWord: 'girl', letterMatchCount: 2 }]
        });

        const inputBox = findByTestAttr(wrapper, 'input-box');
        const mockEvent = { target: { value: 'golf' } }
        inputBox.simulate('change', mockEvent);

        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click', { preventDefault(){} })
    });
    test('adds row to guessedwords table', () => {
        const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(3);
    });
    test('display congrats component', () => {
        const congrats = findByTestAttr(wrapper, 'component-congrats');
        expect(congrats.text().length).toBeGreaterThan(0);
    });
    test('does not display input component contents', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        expect(inputBox.exists()).toBe(false);

        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(false);
    })
});