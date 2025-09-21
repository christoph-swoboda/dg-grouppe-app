import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.appvision.dggruppeapp',
  appName: 'DG Gruppe',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Keyboard: {
      resize: "ionic",
      resizeOnFullScreen: true
    }
  },
  server: {
    // androidScheme: "http",
    allowNavigation: [
      "http://168.119.157.18/api"
    ]
  },
  webDir: 'build',
// @ts-ignore
  bundledWebRuntime: false
};

export default config;
