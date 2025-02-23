import { defineNuxtPlugin } from '#app';

// Themes
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-material.css';
// provideGlobalGridOptions({ theme: "legacy" });
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// Mark all grids as using legacy themes

import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

export default defineNuxtPlugin(() => {
  // No need to register globally, AG Grid works as a component
});
