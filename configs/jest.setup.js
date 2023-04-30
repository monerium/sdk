// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchMock = require('jest-fetch-mock');
global.fetch = fetchMock;
fetchMock.dontMock();
