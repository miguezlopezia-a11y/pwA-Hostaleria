const path = require("path");

module.exports = {
  paths: {
    appIndexJs: path.resolve(__dirname, "src/main.jsx"),
  },
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/build/**",
          "**/dist/**",
          "**/coverage/**",
          "**/public/**",
        ],
      };
      return webpackConfig;
    },
  },
  jest: {
    configure: {
      // react-router-dom@7 tiene el campo "main" apuntando a dist/main.js,
      // que no existe en el paquete publicado — jest 27 (CRA 5) falla al
      // resolverlo. Se mapea al build CJS real. Innecesario tras migrar a Vitest.
      moduleNameMapper: {
        "^react-router-dom$":
          "<rootDir>/node_modules/react-router-dom/dist/index.js",
        // subpath export "react-router/dom" que jest 27 tampoco resuelve
        "^react-router/dom$":
          "<rootDir>/node_modules/react-router/dist/development/dom-export.js",
      },
    },
  },
};
