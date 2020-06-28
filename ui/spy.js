export const createSpy = (implementation) => {
    function mockWrapper (...params) {
        mockWrapper.calls++;
        implementation(...params);
    }

    mockWrapper.calls = 0;

    return mockWrapper;
};