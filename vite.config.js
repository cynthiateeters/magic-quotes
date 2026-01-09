import { defineConfig } from "vite";
import { execSync } from "child_process";

export default defineConfig({
  // Generate manifest before dev server starts
  plugins: [
    {
      name: "generate-manifest",
      buildStart() {
        // Run manifest generation
        try {
          execSync("npm run generate-manifest", { stdio: "inherit" });
        } catch (error) {
          // Ignore errors during initial setup when data/ doesn't exist yet
          console.warn("Manifest generation skipped (data directory may not exist yet)");
        }
      },
    },
  ],

  // Serve from root (index.html is at root)
  root: ".",

  // Public directory for static assets (copied as-is to dist)
  publicDir: "public",

  // Build output
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Copy public directory contents to root of dist
    copyPublicDir: true,
  },
});
