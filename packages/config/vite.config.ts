import react from "@vitejs/plugin-react"
import * as consts from "@wordpretty/shared/lib/consts"
import { defineConfig } from "vite"

export default defineConfig({
  base: `${consts.PLUGIN_WEB_EP}`,
  build: {
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [react()],
})
