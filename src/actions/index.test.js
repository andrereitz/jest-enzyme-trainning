import moxios from 'moxios';
import { getSecretWord } from './';

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