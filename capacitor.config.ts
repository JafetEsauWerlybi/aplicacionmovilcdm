import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'casamariscomovil',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '704735693768-lt0fj5pkcdsg7cl4j002eeudaico4pcq.apps.googleusercontent.com', // Web Client ID
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
