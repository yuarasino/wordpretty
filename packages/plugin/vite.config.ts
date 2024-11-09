import { nodeExternals } from "rollup-plugin-node-externals"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: "src/plugin.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
      plugins: [nodeExternals({ deps: false })],
    },
  },
})
