import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { env } from "node:process";

export default defineConfig({
  base: env.GITHUB_ACTIONS
    ? "/samiya-portfolio/"
    : "/",

  plugins: [react(), tailwindcss()],
});