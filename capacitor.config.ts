import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "de.mindakademie.app",
  appName: "Mind Akademie",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
