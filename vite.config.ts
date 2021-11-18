import { applyPlugins, config, resolve, vendorChunks, outputAMD, workerAsModule } from "./src";

export default applyPlugins(
  config((c) => {
    c.root = "./example";
    c.base = "/vite-presets/";
    c.build!.assetsDir = "static";
  }),
  resolve({
    alias: {
      "lodash": "lodash-es",
    },
  }),
  vendorChunks({
    polyfill: /babel|core-js/,
    d3: /d3-shape|d3-path/,
    core: /react|reactorx|scheduler|history|axios|object-assign/,
    styling: /polished|emotion|react-spring|react-use-gesture/,
    utils: /buffer|date-fns|lodash|rxjs/,
  }),
  outputAMD(),
  workerAsModule(),
);