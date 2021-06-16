import { shallow } from 'enzyme';
import { findByTestAttr } from './test/testUtils';
import App from './App';

const setup = () => {
  return shallow(<App />);
}

test('renders learn react link', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent).toHaveLength(1);
});
