import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PreAssessmentScreen from '../screens/PreAssessmentScreen';
import PreResultScreen from '../screens/PreResultScreen';
import PostAssessmentScreen from '../screens/PostAssessmentScreen';
import PostResultScreen from '../screens/PostResultScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          // --- Configurações Premium do Cabeçalho Global ---
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.primary, // Seta de voltar em Azul
          headerTitleStyle: {
            fontFamily: typography.fontFamily.uiBold,
            fontSize: typography.fontSize.lg,
            color: colors.primary, // Título em Azul
          },
          headerTitleAlign: 'center', // Centraliza em ambos iOS e Android
          headerShadowVisible: false, // Design Flat (Remove a linha preta abaixo do cabeçalho)
          contentStyle: {
            backgroundColor: colors.surface, // Fundo branco padrão para evitar flashes
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PreAssessment"
          component={PreAssessmentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PreResult"
          component={PreResultScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PostAssessment"
          component={PostAssessmentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PostResult"
          component={PostResultScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};