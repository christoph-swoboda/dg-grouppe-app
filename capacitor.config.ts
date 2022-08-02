import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'DG.gruppe.app',
  appName: 'DG.gruppe.app',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  webDir: 'build',
  bundledWebRuntime: false
};

export default config;
