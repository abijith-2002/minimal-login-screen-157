# Minimal Login Screen (React Native / Expo)

This repository contains a single-screen React Native app built with Expo. It implements a modern "Ocean Professional" themed Login screen with email and password fields and a Login button using functional components and hooks.

## Run Instructions

- Install dependencies:
  - In the frontend container directory:
    - `cd minimal-login-screen-157/frontend_login_screen`
    - `npm install`
- Start the Expo dev server:
  - `npm run start` (use `npm run web` to open in a browser)
- Open the app on:
  - Android/iOS: with Expo Go
  - Web: defaults to the Expo web preview

## Theme

Ocean Professional theme tokens are defined in `src/theme.ts` and used across components:
- Colors:
  - primary: `#2563EB` (ocean blue)
  - secondary/success: `#F59E0B` (amber)
  - error: `#EF4444`
  - background: `#f9fafb`
  - surface: `#ffffff`
  - text: `#111827`
- Spacing scale, radii, and shadows/elevation are provided and are usable across native/web.

## Components

- `TextField`: Labeled TextInput with focus/blur styling, error text, secure entry option, rounded corners, and subtle shadow.
- `PrimaryButton`: Full-width button using the primary color with rounded corners, shadow, pressed and disabled states.

## Screen

- `LoginScreen`: Centered card layout with title, email, password and Login button.
- Local (frontend-only) validation:
  - Email format (basic regex)
  - Password non-empty
- Accessibility: proper labels and input props set.
- Env-aware (optional):
  - `EXPO_PUBLIC_LOG_LEVEL` (debug/info/silent)
  - `EXPO_PUBLIC_EXPERIMENTS_ENABLED` to enable a subtle background accent layer
  - `EXPO_PUBLIC_FEATURE_FLAGS` to show a small helper text

No backend calls are made; this is a purely UI-focused example.