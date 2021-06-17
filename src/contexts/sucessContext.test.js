import React from 'react';
import { shallow, mount } from 'enzyme';

import successContext from './successContext';

const FunctionalComponent = () => {
    successContext.useSuccess();
    return <div />;
}

test('useSucess throws error when not wrapped in SuccessProvider', () => {
    expect(() => {
        shallow(<FunctionalComponent />);
    }).toThrow('useSuccess must be used withing a SuccessProvider')
})

test('useSucess does not throws error when not wrapped in SuccessProvider', () => {
    expect(() => {
        mount(
            <successContext.SuccessProvider>
                <FunctionalComponent />
            </successContext.SuccessProvider>
        );
    }).not.toThrow()
})