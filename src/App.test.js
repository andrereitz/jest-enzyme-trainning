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
    const wrapper = setup();
    
    // Find button
    const button = findByTestAttr(wrapper, 'increment-button');

    // Click button
    button.simulate('click');

    // Find display and test if has benn incremented
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("1")
});

test('clicking on button decrements counter display', () => {
    const wrapper = setup();

    const buttonIncrement = findByTestAttr(wrapper, 'increment-button');
    buttonIncrement.simulate('click');

    const buttonDecrement = findByTestAttr(wrapper, 'decrement-button');
    buttonDecrement.simulate('click');

    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0")
})
