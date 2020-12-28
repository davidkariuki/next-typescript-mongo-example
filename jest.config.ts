import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["<rootDir>/globalConfig.json"],
  errorOnDeprecated: true,
}

export default config
