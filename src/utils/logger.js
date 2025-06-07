import log from "loglevel";

// Set default log level
log.setLevel("debug");

// Utility to generate a namespaced logger like `debug("App")`
export const createLogger = (namespace = "App") => {
  const colorMap = {
    debug: "color: green;",
    info: "color: lightblue;",
    warn: "color: orange;",
    error: "color: red;",
  };

  const format = (level, ...args) => {
    const tag = `%c[${namespace.toUpperCase()} :: ${level.toUpperCase()}]`;
    const color = colorMap[level] || "color: black;";
    return [tag, color, ...args];
  };

  return {
    debug: (...args) => log.debug(...format("🐛 debug", ...args)),
    info: (...args) => log.info(...format("ℹ️ info", ...args)),
    warn: (...args) => log.warn(...format("⚠️ warn", ...args)),
    error: (...args) => log.error(...format("❌ error", ...args)),
  };
};
