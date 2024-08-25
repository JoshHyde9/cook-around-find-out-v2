import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  server: {
    port: 3000,
  },
  site: "https://cook-around-find-out-v2.vercel.app"
});
