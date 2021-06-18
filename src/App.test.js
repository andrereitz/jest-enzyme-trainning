import { mount } from 'enzyme';
import { findByTestAttr, storeFactory } from './test/testUtils';
import App from './App';
import { Provider } from 'react-redux';

// activate global mock
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState)

  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

test('renders learn react link', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent).toHaveLength(1);
});

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  })
  test('getSecretWord on app mout', () => {
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
