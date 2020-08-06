import {startServer} from './server';

jest.mock('./server');

describe('Main', () => {

    it('should start the server', () => {
        require('./main');

        expect(startServer).toHaveBeenCalled();
    });

});
