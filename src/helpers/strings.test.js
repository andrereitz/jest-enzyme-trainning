import stringModule from './strings';
const { getStringByLanguage } = stringModule;

const strings = {
    en: { submit: 'submit' },
    emoji: { submit: '🚀' },
    nothing: {}
}

describe('language string testing', () => {
    const mockWarn = jest.fn();
    let originalWarn;

    beforeEach(() => {
        originalWarn = console.warn;
        console.warn = mockWarn;
    })
    afterEach(() => {
        console.warn = originalWarn;
    })
    test('returns correct submit string for english', () => {
        const string = getStringByLanguage('en', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    test('returns the correct submit string for emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', strings);
        expect(string).toBe('🚀');
        expect(mockWarn).not.toHaveBeenCalled();

    });
    test('returns english submit string when submit key does not exist', () => {
        const string = getStringByLanguage('notALaguage', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith('show some warning');
    });
    test('returns english submit string when submit key does not exist for language', () => {
        const string = getStringByLanguage('nothing', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith('show some warning');
    });
})