import App from './App';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowEapper - App Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app')

    expect(appComponent.length).toBe(1)
});

test('renders button', () => {
    const wrapper = shallow(<App />);
    const button = findByTestAttr(wrapper, 'increment-button')

    expect(button.length).toBe(1)
});

test('renders counter display', () => {
    const wrapper = shallow(<App />);
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')

    expect(counterDisplay.length).toBe(1)
});

test('counter starts at 0', () => {
    const wrapper = setup();
    const count = findByTestAttr(wrapper, "count").text();

    expect(count).toBe("0")

});

test('clicking on button increments counter display', () => {

});
