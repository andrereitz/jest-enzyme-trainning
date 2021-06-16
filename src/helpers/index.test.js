import { getLetterMatchCount } from './';

describe('getLetterMatchCount', () => {
    const secretWord = 'gezz';

    test('returns correct count when there are no matching letters', () => {
        const letterMatchCount = getLetterMatchCount('haya', secretWord);
        expect(letterMatchCount).toBe(0);
    });
    test('returns correct count when there are three matching letters', () => {
        const letterMatchCount = getLetterMatchCount('fazzer', secretWord);
        expect(letterMatchCount).toBe(3);
    });
    test('returns correct count when there are duplicate letters in the guess', () => {
        const letterMatchCount = getLetterMatchCount('feazzer', secretWord);
        expect(letterMatchCount).toBe(3);
    });
})