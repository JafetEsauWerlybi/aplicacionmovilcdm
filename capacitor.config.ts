import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mariscomovil.movil',
  appName: 'casamariscomovil', 
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1089256107726-u77ggpi9557p2fg9qtnd02asbrie7gnn.apps.googleusercontent.com', // Web Client ID
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
