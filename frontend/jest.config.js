/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',          // ts-jest 사용
  testEnvironment: 'jsdom',   // 브라우저 환경 모킹
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // CSS 모듈 대응
  },
};