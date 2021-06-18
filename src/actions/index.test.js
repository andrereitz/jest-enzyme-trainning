import moxios from 'moxios';
import { getSecretWord } from './';

import {storeFactory} from '../test/testUtils';
import {getSecretWord} from './';

describe('getSecretWord', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('secretWorld is returned', () => {
        const store = storeFactory();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'clown'
            });
        });

        return store.dispatch(getSecretWord())
            .then(() => {
                const secretWord = store.getState().secretWord;
                expect(secretWord).toBe('clown');
            })
    });
})