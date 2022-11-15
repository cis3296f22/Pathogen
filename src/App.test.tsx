import React from 'react';
import renderer from 'react-test-renderer';
import Banner from './components/Banner';
import Constants from './tools/Constants';

beforeAll(() => 
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
}));

test('renders learn react link', () => {
	let element = renderer.create(<Banner setParameters={() => {}} params={Constants.PARAMS}/>);
	expect(element.root.props.params).toEqual(Constants.PARAMS);
});
