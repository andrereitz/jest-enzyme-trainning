import moxios from 'moxios';
import { getSecretWord, correctGuess, actionTypes } from './';

describe('corretGuess', () => {
    test('return an action with type `CORRECT_GUESS`', () => {
        const action = correctGuess();
        expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS })
    });
})

describe('getSecretWord', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('secretWorld is returned', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'clown'
            });
        });

        return getSecretWord()
            .then((secretWord) => {
                expect(secretWord).toBe('clown');
            })
    });
})