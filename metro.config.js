const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Workaround for "Error: Data cannot be cloned, out of memory." on Node 22.
// Metro's jest-worker IPC channel overflows when transform results are large
// (common with NativeWind/Tailwind + static web output). Capping workers
// keeps each worker's serialized payload within the channel buffer limit.
config.maxWorkers = 2;

// zustand's ESM build (which Metro can resolve for web via package "exports")
// contains a raw `import.meta.env` reference in its devtools middleware.
// That's invalid syntax in Metro's non-module web bundle and crashes the
// whole bundle at parse time. Force zustand to resolve to its CJS build,
// which has no import.meta usage.
const { resolveRequest: defaultResolveRequest } = config.resolver;
config.resolver.resolveRequest = (context, moduleName, platform, ...rest) => {
  if (moduleName === "zustand" || moduleName.startsWith("zustand/")) {
    return context.resolveRequest(
      { ...context, unstable_conditionNames: ["react-native"] },
      moduleName,
      platform
    );
  }
  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform, ...rest)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
