import { defineConfig, UserConfig, Plugin } from "vite";
import { join } from "path";

export const applyPlugins = (...plugins: Plugin[]) => {
  return defineConfig({
    plugins: plugins,
  });
};

export const resolve = (r: UserConfig["resolve"]): Plugin => {
  return {
    name: "vite-presets/resolve",
    enforce: "pre",
    config(c) {
      c.resolve = r;
    },
  };
};

export const config = (fn: (c: UserConfig) => void): Plugin => {
  return {
    name: "vite-presets/workspace",
    enforce: "pre",
    config(c) {
      const dist = "./public";
      const assetsDir = "__built__";

      c.build = {
        assetsDir: assetsDir,
        outDir: dist[0] == "/" ? dist : join(process.cwd(), dist),
        emptyOutDir: true,
      };

      fn(c);
    },
  };
};
