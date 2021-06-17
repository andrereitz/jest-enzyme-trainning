import { shallow } from 'enzyme';
import { findByTestAttr } from "./test/testUtils";
import GuessedWords from './GuessedWords';
import React from 'react';

import guessedWordsContext from './contexts/guessedWordsContext';

const setup = (guessedWords=[]) => {
    const mockuseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()])
    guessedWordsContext.useGuessedWords = mockuseGuessedWords;

    return shallow(<GuessedWords />)
};

describe('if there are no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup([]);
    })
    test('tenders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words')

        expect(component.length).toBe(1);
    });
    test('renders instructions to guess a word', () => {
        const intructions = findByTestAttr(wrapper, 'guess-instructions')

        expect(intructions.text().length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'boring', letterMatchCount: 3 },
        { guessedWord: 'voice', letterMatchCount: 1 },
        { guessedWord: 'everytime', letterMatchCount: 5 }
    ];
    beforeEach(() => {
        wrapper = setup(guessedWords);
    })
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words')

        expect(component.length).toBe(1);
    });
    test('renders "guessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });
    test('correct number of guessed words', () => {
        const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNodes.length).toBe(guessedWords.length);
    });
});

describe('languagePicker', () => {
    test('correctly renders guess instructions in english', () => {
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('Try to guess the secret word!');
    });
    test('correctly renders guess instructions in english', () => {
        const mockUseContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUseContext;
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('🤔🤫🔤');
    });
})