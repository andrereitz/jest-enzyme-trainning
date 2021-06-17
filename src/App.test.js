import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from './test/testUtils';
import App from './App';

// activate global mock
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

const setup = () => {
  return mount(<App />);
}

describe.each([
  [null, true, false],
  ['clown', false, true]
])(
  'renders with %s', (secretWord, loadingShows, appShows) => {
    let wrapper;
    let originalUseReducer;

    beforeEach(() => {
        originalUseReducer = React.useReducer;

        const mockUseReducer = jest.fn()
          .mockReturnValue([
            { secretWord, language: 'en' },
            jest.fn(),
          ])
        React.useReducer = mockUseReducer;
        wrapper = setup();
      });
      afterEach(() => {
        React.useReducer = originalUseReducer;
      });
      test(`renders loading spinner: ${loadingShows}`, () => {
        const spinnerComponent = findByTestAttr(wrapper, 'spinner')
        expect(spinnerComponent.exists()).toBe(loadingShows);
      });
      test(`renders app: ${appShows}`, () => {
        const appComponent = findByTestAttr(wrapper, 'component-app')
        expect(appComponent.exists()).toBe(appShows);
      });
  }
)

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  })
  test('getSecretWord on app mount', () => {
    const wrapper = setup();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
})
