import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.appvision.dggruppeapp',
  appName: 'DG Gruppe',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  server: {
    // androidScheme: "http",
    allowNavigation: [
      "https://dg-gruppe-app.christoph-swoboda.com/api"
    ]
  },
  webDir: 'build',
  bundledWebRuntime: false
};

export default config;
