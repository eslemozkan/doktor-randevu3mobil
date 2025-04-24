import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elife.doktorrandevu',
  appName: 'Doktor Randevu',
  webDir: 'build',
  plugins: {
    Browser: {
      preferredBrowser: 'system'
    }
  }
};

export default config;
