import type { GetManualChunkApi, Plugin } from "rollup";

export type ChunksGroups = { [name: string]: RegExp };

/**
 * split vendor to multiple vendor files vendor~[name].[hash].js
 */
export const vendorChunks = (vendorGroups: ChunksGroups = {}): Plugin => {
  const cache = new Map();

  const splitVendorChunk = (id: string): string => {
    if (cache.has(id)) {
      return cache.get(id);
    }

    const parts = id.split("/node_modules/");
    const dirPaths = parts[parts.length - 1].split("/");

    let pkgName = `${dirPaths[0]}`;

    if (dirPaths[0][0] == "@") {
      pkgName = `${dirPaths[0]}/${dirPaths[1]}`;
    }

    for (const groupKey in vendorGroups) {
      if (vendorGroups[groupKey].test(pkgName)) {
        pkgName = groupKey;
        break;
      }
    }

    const name = `vendor~${pkgName.replace("/", "--")}`;

    cache.set(id, name);

    return name;
  };

  return {
    name: "vite-presets/vendor-chunks",

    outputOptions(o) {
      o.manualChunks = (id: string, api: GetManualChunkApi) => {
        if (id.includes("node_modules")) {
          return splitVendorChunk(id);
        }
      };
      return o;
    },
  };
};
