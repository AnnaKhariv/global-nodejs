module.exports = {
    clearMocks: true,
    collectCoverageFrom: [
      "./src/app/**/**.service.**",
      "./src/app/**/**.controller.**"
    ],
    coverageDirectory: "./build/coverage",
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],
    coverageReporters: [
        "text",
        "lcov"
    ],
    moduleFileExtensions: [
        "js",
        "ts"
    ],
    preset: 'ts-jest',
    restoreMocks: true,
    testEnvironment: "node",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    testPathIgnorePatterns: [
        "/node_modules/"
    ],
    verbose: true
};
