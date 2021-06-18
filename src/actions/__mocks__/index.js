module.exports = {
    ...jest.requireActual('..'),
    __esModule: true,
    getSecretWorld: jest.fn().mockReturnValue({ type: 'mock' })
}