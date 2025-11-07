/* tslint:disable */
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {GoogleGenAI, Modality} from '@google/genai';

// Fix: Define and use AIStudio interface for window.aistudio to resolve type conflict.
// Define the aistudio property on the window object for TypeScript
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
    webkitAudioContext: typeof AudioContext;
    google: any;
  }
}

async function openApiKeyDialog() {
  if (window.aistudio?.openSelectKey) {
    await window.aistudio.openSelectKey();
    showToast(
      'toast-api-key-success',
      'success',
    );
  } else {
    // This provides a fallback for environments where the dialog isn't available
    showToast(
      'toast-api-key-fail',
      'error',
    );
  }
}

// --- DOM Element Selection ---
const toastContainer = document.querySelector('#toast-container') as HTMLDivElement;
const appContainer = document.querySelector('#app-container') as HTMLDivElement;
const htmlEl = document.documentElement;

// Main Views
const dashboardView = document.querySelector('#dashboard-view') as HTMLDivElement;
const toolHeader = document.querySelector('#tool-header') as HTMLDivElement;

// Header Controls
const loggedOutControls = document.querySelector('#logged-out-controls') as HTMLDivElement;
const loggedInControls = document.querySelector('#logged-in-controls') as HTMLDivElement;
const signInButton = document.querySelector('#sign-in-button') as HTMLButtonElement;
const signUpButton = document.querySelector('#sign-up-button') as HTMLButtonElement;
const profileButton = document.querySelector('#profile-button') as HTMLButtonElement;
const profileImage = document.querySelector('#profile-image') as HTMLImageElement;
const profileName = document.querySelector('#profile-name') as HTMLParagraphElement;
const profileEmail = document.querySelector('#profile-email') as HTMLParagraphElement;
const profileDropdown = document.querySelector('#profile-dropdown') as HTMLDivElement;
const signOutButton = document.querySelector('#sign-out-button') as HTMLAnchorElement;
const settingsButton = document.querySelector('#settings-button') as HTMLButtonElement;


// Dashboard Cards
const imageToolCard = document.querySelector('#image-tool-card') as HTMLDivElement;
const videoToolCard = document.querySelector('#video-tool-card') as HTMLDivElement;
const audioToolCard = document.querySelector('#audio-tool-card') as HTMLDivElement;
const poemToolCard = document.querySelector('#poem-tool-card') as HTMLDivElement;
const videoTrialBadge = document.querySelector('#video-trial-badge') as HTMLDivElement;

// Back Buttons
const backToDashboardButton = document.querySelector('#back-to-dashboard-button') as HTMLButtonElement;

// Tool containers
const imageGeneratorTool = document.querySelector('#image-generator-tool') as HTMLDivElement;
const videoGeneratorTool = document.querySelector('#video-generator-tool') as HTMLDivElement;
const audioGeneratorTool = document.querySelector('#audio-generator-tool') as HTMLDivElement;
const poemGeneratorTool = document.querySelector('#poem-generator-tool') as HTMLDivElement;
const allToolViews = [imageGeneratorTool, videoGeneratorTool, audioGeneratorTool, poemGeneratorTool];

// --- Image Generation Elements ---
const promptEl = document.querySelector('#prompt-input') as HTMLTextAreaElement;
const negativePromptEl = document.querySelector(
  '#negative-prompt-input',
) as HTMLTextAreaElement;
const generateImageButton = document.querySelector(
  '#generate-image-button',
) as HTMLButtonElement;
const rerollImageButton = document.querySelector(
  '#reroll-image-button',
) as HTMLButtonElement;
const outputImageGrid = document.querySelector('#output-image-grid') as HTMLDivElement;
const imageOutputPlaceholder = document.querySelector(
  '#output-placeholder-image',
) as HTMLDivElement;
const imageSkeletonLoader = document.querySelector(
  '#skeleton-loader-image',
) as HTMLDivElement;

// Editor Elements
const generatorControls = document.querySelector('#generator-controls') as HTMLDivElement;
const editorControls = document.querySelector('#editor-controls') as HTMLDivElement;
const backToGenerateButton = document.querySelector('#back-to-generate-button') as HTMLButtonElement;
const editPreviewImage = document.querySelector('#edit-preview-image') as HTMLImageElement;
const editPromptInput = document.querySelector('#edit-prompt-input') as HTMLTextAreaElement;
const applyEditButton = document.querySelector('#apply-edit-button') as HTMLButtonElement;
const uploadImageInput = document.querySelector('#upload-image-input') as HTMLInputElement;
const uploadAndEditButton = document.querySelector('#upload-and-edit-button') as HTMLButtonElement;


// --- Video Generation Elements ---
const videoPromptInput = document.querySelector('#video-prompt-input') as HTMLTextAreaElement;
const videoImageUploadInput = document.querySelector('#video-image-upload-input') as HTMLInputElement;
const uploadVideoImageButton = document.querySelector('#upload-video-image-button') as HTMLButtonElement;
const videoImagePreviewContainer = document.querySelector('#video-image-preview-container') as HTMLDivElement;
const videoImagePreview = document.querySelector('#video-image-preview') as HTMLImageElement;
const removeVideoImageButton = document.querySelector('#remove-video-image-button') as HTMLButtonElement;
const generateVideoButton = document.querySelector('#generate-video-button') as HTMLButtonElement;
const outputVideoContainer = document.querySelector('#output-container-video') as HTMLDivElement;
const videoPlaceholder = document.querySelector('#output-placeholder-video') as HTMLDivElement;
const videoProgressIndicator = document.querySelector('#video-progress-indicator') as HTMLDivElement;
const videoProgressText = document.querySelector('#video-progress-text') as HTMLParagraphElement;
const videoProgressBar = document.querySelector('#video-progress-bar') as HTMLDivElement;
const videoProgressEta = document.querySelector('#video-progress-eta') as HTMLParagraphElement;
const outputVideo = document.querySelector('#output-video') as HTMLVideoElement;
const videoActions = document.querySelector('#video-actions') as HTMLDivElement;
const downloadVideoButton = document.querySelector('#download-video-button') as HTMLButtonElement;
const deleteVideoButton = document.querySelector('#delete-video-button') as HTMLButtonElement;
const videoHistorySection = document.querySelector('#video-history-section') as HTMLDivElement;
const videoHistoryContainer = document.querySelector('#video-history-container') as HTMLDivElement;


// --- Audio Generation Elements ---
const audioPromptInput = document.querySelector('#audio-prompt-input') as HTMLTextAreaElement;
const audioVoiceSelect = document.querySelector('#audio-voice-select') as HTMLSelectElement;
const generateAudioButton = document.querySelector('#generate-audio-button') as HTMLButtonElement;
const audioPlaceholder = document.querySelector('#output-placeholder-audio') as HTMLDivElement;
const audioSkeletonLoader = document.querySelector('#skeleton-loader-audio') as HTMLDivElement;
const outputAudio = document.querySelector('#output-audio') as HTMLAudioElement;
const audioActions = document.querySelector('#audio-actions') as HTMLDivElement;
const downloadAudioButton = document.querySelector('#download-audio-button') as HTMLButtonElement;
const deleteAudioButton = document.querySelector('#delete-audio-button') as HTMLButtonElement;
const upgradeForAudioVoiceButton = document.querySelector('#upgrade-for-audio-voice-button') as HTMLButtonElement;

// --- Poem Generation Elements ---
const poemPromptInput = document.querySelector('#poem-prompt-input') as HTMLTextAreaElement;
const poemLanguageSelect = document.querySelector('#poem-language-select') as HTMLSelectElement;
const generatePoemButton = document.querySelector('#generate-poem-button') as HTMLButtonElement;
const poemPlaceholder = document.querySelector('#output-placeholder-poem') as HTMLDivElement;
const poemSkeletonLoader = document.querySelector('#skeleton-loader-poem') as HTMLDivElement;
const poemOutputWrapper = document.querySelector('#output-poem-wrapper') as HTMLDivElement;
const outputPoem = document.querySelector('#output-poem') as HTMLPreElement;
const poemActions = document.querySelector('#poem-actions') as HTMLDivElement;
const copyPoemButton = document.querySelector('#copy-poem-button') as HTMLButtonElement;


// --- Modals ---
// Auth Modal
const authModal = document.querySelector('#auth-modal') as HTMLDivElement;
const authModalCloseButton = document.querySelector('#auth-modal-close-button') as HTMLButtonElement;
const authModalBackdrop = document.querySelector('#auth-modal-backdrop') as HTMLDivElement;
const authTitle = document.querySelector('#auth-title') as HTMLHeadingElement;
const authSubtitle = document.querySelector('#auth-subtitle') as HTMLParagraphElement;
const googleSignInContainer = document.querySelector('#google-signin-container') as HTMLDivElement;

// Prompt Suggestions Modal
const promptSuggestionsModal = document.querySelector('#prompt-suggestions-modal') as HTMLDivElement;
const suggestPromptsButton = document.querySelector('#suggest-prompts-button') as HTMLButtonElement;
const promptSuggestionsCloseButton = document.querySelector('#prompt-suggestions-close-button') as HTMLButtonElement;
const promptSuggestionsBackdrop = document.querySelector('#prompt-suggestions-backdrop') as HTMLDivElement;
const promptSuggestionsContainer = document.querySelector('#prompt-suggestions-container') as HTMLDivElement;


// Subscription Modal
const subscriptionModal = document.querySelector('#subscription-modal') as HTMLDivElement;
const subscriptionModalCloseButton = document.querySelector('#modal-close-button') as HTMLButtonElement;
const subscriptionModalBackdrop = document.querySelector('#modal-backdrop') as HTMLDivElement;
const subscribeButtons = document.querySelectorAll('.subscribe-button') as NodeListOf<HTMLButtonElement>;
const upgradeFor1080pButton = document.querySelector('#upgrade-for-1080p-button') as HTMLButtonElement;
const upgradeForVideoImageButton = document.querySelector('#upgrade-for-video-image-button') as HTMLButtonElement;


// Video Trial Modal
const trialModal = document.querySelector('#trial-modal') as HTMLDivElement;
const trialModalBackdrop = document.querySelector('#trial-modal-backdrop') as HTMLDivElement;
const trialModalCloseButton = document.querySelector('#trial-modal-close-button') as HTMLButtonElement;
const startTrialButton = document.querySelector('#start-trial-button') as HTMLButtonElement;
const viewPlansButton = document.querySelector('#view-plans-button') as HTMLButtonElement;

// Settings Modal
const settingsModal = document.querySelector('#settings-modal') as HTMLDivElement;
const settingsModalBackdrop = document.querySelector('#settings-modal-backdrop') as HTMLDivElement;
const settingsModalCloseButton = document.querySelector('#settings-modal-close-button') as HTMLButtonElement;
const settingsNavList = document.querySelector('#settings-nav-list') as HTMLDivElement;
const settingsContent = document.querySelector('#settings-content') as HTMLDivElement;
const saveSettingsButton = document.querySelector('#save-settings-button') as HTMLButtonElement;
const cancelSettingsButton = document.querySelector('#cancel-settings-button') as HTMLButtonElement;
const resetSettingsButton = document.querySelector('#reset-settings-button') as HTMLButtonElement;

// Confirmation Modal
const confirmationModal = document.querySelector('#confirmation-modal') as HTMLDivElement;
const confirmationModalBackdrop = document.querySelector('#confirmation-modal-backdrop') as HTMLDivElement;
const confirmationModalTitle = document.querySelector('#confirmation-modal-title') as HTMLHeadingElement;
const confirmationModalDescription = document.querySelector('#confirmation-modal-description') as HTMLParagraphElement;
const confirmationModalCancelButton = document.querySelector('#confirmation-modal-cancel-button') as HTMLButtonElement;
const confirmationModalConfirmButton = document.querySelector('#confirmation-modal-confirm-button') as HTMLButtonElement;

// Cross-Origin Modal
const coModal = document.querySelector('#co-modal') as HTMLDivElement;
const coModalBackdrop = document.querySelector('#co-modal-backdrop') as HTMLDivElement;
const coModalButton = document.querySelector('#co-modal-button') as HTMLButtonElement;

// Templates
const settingsNavItemTemplate = document.querySelector('#settings-nav-item-template') as HTMLTemplateElement;
const settingsContentPanelTemplate = document.querySelector('#settings-content-panel-template') as HTMLTemplateElement;

// --- App State ---
let ai: GoogleGenAI;
let currentTool: string | null = null;
let imageToEdit: { data: string; mimeType: string } | null = null;
let videoToEdit: { data: string; mimeType: string } | null = null; // For video editing in the future
let lastImageGenerationParams: any = null;
let currentVideoOperation: any = null;
let videoHistory: any[] = [];
let confirmationResolve: (value: boolean | PromiseLike<boolean>) => void;
let isSubscribed = false;
let hasUsedVideoTrial = false;
let progressInterval: number | null = null;

type Settings = {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'fr' | 'ar';
  // General
  startupBehavior: 'dashboard' | 'last_tool';
  // Notifications
  soundAlerts: boolean;
  emailUpdates: boolean;
  activityNotifications: boolean;
  // Privacy
  allowCookies: boolean;
  aiDataUsage: 'allowed' | 'disallowed';
  // AI Preferences
  creativityLevel: 'default' | 'high' | 'low';
  outputStyle: 'default' | 'cinematic' | 'vivid';
};

let currentSettings: Settings;

const defaultSettings: Settings = {
  theme: 'system',
  language: 'en',
  startupBehavior: 'dashboard',
  soundAlerts: true,
  emailUpdates: false,
  activityNotifications: true,
  allowCookies: true,
  aiDataUsage: 'allowed',
  creativityLevel: 'default',
  outputStyle: 'default',
};


// --- Translations ---
const translations = {
    en: {
        'auth-button-login': 'Sign In',
        'auth-button-signup': 'Sign Up',
        'auth-title-login': 'Welcome Back',
        'auth-title-signup': 'Create Account',
        'auth-subtitle-google': 'Sign in with Google to continue',
        'profile-manage': 'Manage Account',
        'profile-api': 'API Settings',
        'profile-signout': 'Sign Out',
        // Image Tool
        'tool-title-image': 'Image Generation',
        'tool-desc-image': 'Create and edit images with text prompts.',
        'image-prompt-label': 'Your Creative Prompt',
        'image-prompt-desc': 'Describe the image you want to create. Be as specific as you can!',
        'image-prompt-placeholder': 'e.g., A cinematic shot of a futuristic city at night, with neon signs reflecting on the wet streets, detailed, 8k',
        'image-negative-prompt-label': 'Exclude from Image',
        'image-negative-prompt-optional': '(Optional)',
        'image-negative-prompt-desc': 'Tell the AI what you don\'t want to see in the final image.',
        'image-negative-prompt-placeholder': 'e.g., text, watermarks, blurry, low quality',
        'image-aspect-ratio-label': 'Aspect Ratio',
        'aspect-ratio-square': 'Square',
        'aspect-ratio-landscape': '16:9',
        'aspect-ratio-portrait': '9:16',
        'image-number-of-images-label': 'Number of Images',
        'generate-image-button': 'Generate Image',
        'reroll-image-button': 'Re-roll',
        'image-placeholder': 'Your generated images will appear here',
        'back-to-generate': 'Back to Generation',
        'edit-your-image': 'Edit Your Image',
        'edit-prompt-placeholder': 'e.g., Add a retro filter, make it black and white...',
        'apply-edit-button': 'Apply Edit',
        'auth-or': 'OR',
        'upload-desc': 'Or upload a new image to edit:',
        'upload-and-edit': 'Upload an Image to Edit',
        'suggestions-title': 'Prompt Suggestions',
        // Video Tool
        'tool-title-video': 'Video Generation',
        'tool-desc-video': 'Bring your ideas to life with high-quality video.',
        'video-prompt-label': 'Your Video Prompt',
        'video-prompt-desc': 'Describe the scene, characters, and actions you want to see.',
        'video-prompt-placeholder': 'e.g., A neon hologram of a cat driving at top speed...',
        'resolution-label': 'Resolution',
        'resolution-standard': '720p',
        'resolution-premium': '1080p 👑',
        'video-initial-image-label': 'Initial Image',
        'upload-image-button': 'Upload Image',
        'generate-video-button': 'Generate Video',
        'video-placeholder': 'Your generated video will appear here',
        'video-placeholder-desc': 'Video generation can take a few minutes. Please be patient!',
        'video-trial-badge': '1 Free Video',
        'video-progress-initializing': 'Initializing',
        'video-progress-processing': 'Processing',
        'video-progress-rendering': 'Rendering',
        'video-progress-finalizing': 'Finalizing',
        'video-eta': 'Est. time remaining: {time}',
        'video-eta-calculating': 'Est. time remaining: Calculating...',
        'video-eta-complete': 'Generation complete!',
        // Audio Tool
        'tool-title-audio': 'Audio Generation',
        'tool-desc-audio': 'Create natural-sounding speech from text.',
        'audio-prompt-label': 'Your Text Prompt',
        'audio-prompt-desc': 'Enter the text you want to convert to speech.',
        'audio-prompt-placeholder': 'e.g., Say cheerfully: Have a wonderful day!',
        'voice-style-label': 'Voice Style',
        'voice-zephyr': 'Zephyr (Friendly & Engaging)',
        'voice-kore': 'Kore (Calm & Professional)',
        'voice-puck': 'Puck (Energetic & Youthful)',
        'voice-charon': 'Charon (Deep & Authoritative)',
        'voice-fenrir': 'Fenrir (Warm & Mature)',
        'voice-faris': 'Faris (Clear & Modern - Egyptian) 👑',
        'voice-layla': 'Layla (Warm & Melodious - Gulf) 👑',
        'voice-zayn': 'Zayn (Friendly & Expressive - Levantine) 👑',
        'voice-noura': 'Noura (Eloquent & Clear - MSA) 👑',
        'voice-omar': 'Omar (Deep & Resonant - MSA) 👑',
        'voice-adam': 'Adam (Deep & Authoritative - MSA) 👑',
        'voice-amira': 'Amira (Eloquent & Warm - MSA) 👑',
        'upgrade-button-audio': 'Upgrade to use this voice',
        'audio-effects-label': 'Audio Effects',
        'effect-none': 'None (Coming Soon)',
        'generate-audio-button': 'Generate Audio',
        'audio-placeholder': 'Your generated audio will appear here',
        // Poem Tool
        'tool-title-poem': 'Poem Generation',
        'tool-desc-poem': 'Craft beautiful poems on any topic.',
        'poem-prompt-label': 'What should the poem be about?',
        'poem-prompt-desc': 'Provide a topic or theme, and the AI will craft a poem for you.',
        'poem-prompt-placeholder': 'e.g., A lonely star in the night sky...',
        'poem-length-label': 'Poem Length',
        'length-short': 'Short',
        'length-medium': 'Medium',
        'length-long': 'Long',
        'poem-language-label': 'Language',
        'lang-english': 'English',
        'lang-french': 'French',
        'lang-arabic': 'Arabic',
        'generate-poem-button': 'Generate Poem',
        'poem-placeholder': 'Your generated poem will appear here',
        // Subscription Modal
        'sub-modal-title': 'Unlock Premium Features',
        'sub-modal-desc': 'Choose a plan to generate unlimited, high-quality videos and more.',
        'plan-monthly': 'Monthly',
        'price-monthly': '$10',
        'per-month': '/ month',
        'feature-unlimited': 'Unlimited Generations',
        'feature-720p': 'Standard 720p Resolution',
        'choose-monthly': 'Choose Monthly',
        'best-value': 'Best Value',
        'plan-yearly': 'Yearly',
        'save-2-months': 'Save 2 months!',
        'price-yearly': '$100',
        'per-year': '/ year',
        'feature-1080p': 'Premium 1080p Resolution',
        'feature-priority': 'Priority Queue Access',
        'choose-yearly': 'Choose Yearly',
        // Trial Modal
        'trial-modal-title': 'Your First Video is on Us!',
        'trial-modal-desc': 'Experience the power of Veo and generate your first video for free. After your first generation, subscribe to unlock unlimited videos and premium features.',
        'trial-start-button': 'Start Free Generation',
        'trial-view-plans-button': 'See Subscription Plans',
        // Confirmation Modal
        'confirm-cancel': 'Cancel',
        'confirm-delete': 'Delete',
        'confirm-delete-video-title': 'Delete Video',
        'confirm-delete-video-desc': 'Are you sure you want to permanently delete this video from your history? This action cannot be undone.',
        // Cross-Origin Modal
        'co-modal-title': 'Feature Requires New Window',
        'co-modal-desc': 'For security, social login can\'t be completed in an embedded view. Please open the app in a new window to continue.',
        'co-modal-button': 'Open in New Window',
        // Settings Modal
        'settings-title': 'Settings',
        'settings-reset': 'Reset to Defaults',
        'settings-cancel': 'Cancel',
        'save-settings-text': 'Save Changes',
        'settings-nav-general': 'General',
        'settings-nav-account': 'Account',
        'settings-nav-language': 'Language',
        'settings-nav-theme': 'Theme',
        'settings-nav-privacy': 'Privacy & Security',
        'settings-nav-notifications': 'Notifications',
        'settings-nav-subscription': 'Subscription & Billing',
        'settings-nav-ai': 'AI Preferences',
        'settings-nav-support': 'Support & Feedback',
        'settings-general-title': 'General Settings',
        'settings-general-startup-label': 'Startup Behavior',
        'settings-general-startup-desc': 'Choose what to see when you open the app.',
        'settings-general-startup-dashboard': 'Open Dashboard',
        'settings-general-startup-last-tool': 'Open Last Used Tool',
        'settings-account-title': 'Account Settings',
        'settings-account-desc': 'This is a placeholder for account management features.',
        'settings-language-title': 'Language Settings',
        'settings-language-desc': 'Choose your preferred language for the UI.',
        'settings-theme-title': 'Theme Settings',
        'settings-theme-select-label': 'Interface Theme',
        'settings-theme-select-desc': 'Select or sync a theme to your system preference.',
        'settings-theme-light': 'Light',
        'settings-theme-dark': 'Dark',
        'settings-theme-system': 'System',
        'settings-privacy-title': 'Privacy & Security',
        'settings-privacy-cookies-label': 'Allow Cookies',
        'settings-privacy-cookies-desc': 'Essential for authentication and site functionality.',
        'settings-privacy-ai-data-label': 'Improve AI Models',
        'settings-privacy-ai-data-desc': 'Allow us to use your anonymized data to improve our AI.',
        'settings-notifications-title': 'Notification Settings',
        'settings-notifications-sound-label': 'Sound Alerts',
        'settings-notifications-sound-desc': 'Play a sound when generations are complete.',
        'settings-notifications-email-label': 'Email Updates',
        'settings-notifications-email-desc': 'Receive emails about new features and offers.',
        'settings-notifications-activity-label': 'Activity Notifications',
        'settings-notifications-activity-desc': 'Get notified about important account activity.',
        'settings-subscription-title': 'Subscription & Billing',
        'settings-subscription-status-label': 'Current Plan',
        'settings-subscription-status-free': 'Free Tier',
        'settings-subscription-status-premium': 'Premium (Yearly)',
        'settings-subscription-manage-button': 'Manage Subscription',
        'settings-ai-title': 'AI Preferences',
        'settings-ai-creativity-label': 'Creativity Level',
        'settings-ai-creativity-desc': 'Lower levels are more literal, higher are more imaginative.',
        'settings-ai-style-label': 'Default Output Style',
        'settings-ai-style-desc': 'Set the default visual style for generated images.',
        'settings-support-title': 'Support & Feedback',
        'settings-support-desc': 'Need help? Check out our documentation or send us your feedback.',
        'settings-support-help-button': 'Help Center',
        'settings-support-feedback-button': 'Submit Feedback',
        // Toasts
        'toast-prompt-required': 'Please enter a prompt first.',
        'toast-generation-fail': 'Generation failed. Please try again.',
        'toast-edit-fail': 'Failed to apply edit. Please try again.',
        'toast-upload-fail': 'File upload failed. Please try a different file.',
        'toast-edit-prompt-required': 'Please describe the edit you want to make.',
        'toast-subscribed-success': 'Subscription successful! All premium features unlocked.',
        'toast-already-subscribed': 'You are already subscribed.',
        'toast-settings-saved': 'Settings saved successfully.',
        'toast-api-key-success': 'API key selected successfully.',
        'toast-api-key-fail': 'Could not open API key selection dialog.',
        'toast-api-key-invalid': 'Your API key is invalid. Please select a new one.',
        'toast-video-prompt-or-image-required': 'Please enter a prompt or upload an image.',
        'toast-copied-success': 'Copied to clipboard!',
        'toast-signed-out': 'You have been signed out.',
        'toast-signin-success': 'Successfully signed in!',
    },
    fr: {
        'auth-button-login': 'Se connecter',
        'auth-button-signup': 'S\'inscrire',
        'auth-title-login': 'Content de vous revoir',
        'auth-subtitle-google': 'Connectez-vous avec Google pour continuer',
        'profile-manage': 'Gérer le compte',
        'profile-api': 'Paramètres API',
        'profile-signout': 'Se déconnecter',
        'tool-title-image': 'Génération d\'images',
        'tool-desc-image': 'Créez et modifiez des images avec des invites de texte.',
        'image-prompt-label': 'Votre invite créative',
        'image-prompt-desc': 'Décrivez l\'image que vous souhaitez créer. Soyez aussi précis que possible !',
        'image-prompt-placeholder': 'ex: Un plan cinématique d\'une ville futuriste la nuit, avec des enseignes au néon se reflétant sur les rues mouillées, détaillé, 8k',
        'image-negative-prompt-label': 'Exclure de l\'image',
        'image-negative-prompt-optional': '(Optionnel)',
        'image-negative-prompt-desc': 'Dites à l\'IA ce que vous ne voulez pas voir dans l\'image finale.',
        'image-negative-prompt-placeholder': 'ex: texte, filigranes, flou, basse qualité',
        'image-aspect-ratio-label': 'Format d\'image',
        'aspect-ratio-square': 'Carré',
        'aspect-ratio-landscape': '16:9',
        'aspect-ratio-portrait': '9:16',
        'image-number-of-images-label': 'Nombre d\'images',
        'generate-image-button': 'Générer une image',
        'reroll-image-button': 'Relancer',
        'image-placeholder': 'Vos images générées apparaîtront ici',
        'back-to-generate': 'Retour à la génération',
        'edit-your-image': 'Modifier votre image',
        'edit-prompt-placeholder': 'ex: Ajouter un filtre rétro, la mettre en noir et blanc...',
        'apply-edit-button': 'Appliquer la modification',
        'auth-or': 'OU',
        'upload-desc': 'Ou téléchargez une nouvelle image à modifier :',
        'upload-and-edit': 'Télécharger une image à modifier',
        'suggestions-title': 'Suggestions d\'invites',
        'tool-title-video': 'Génération de vidéos',
        'tool-desc-video': 'Donnez vie à vos idées avec des vidéos de haute qualité.',
        'video-prompt-label': 'Votre invite vidéo',
        'video-prompt-desc': 'Décrivez la scène, les personnages et les actions que vous voulez voir.',
        'video-prompt-placeholder': 'ex: Un hologramme néon d\'un chat conduisant à toute vitesse...',
        'resolution-label': 'Résolution',
        'resolution-standard': '720p',
        'resolution-premium': '1080p 👑',
        'video-initial-image-label': 'Image initiale',
        'upload-image-button': 'Télécharger une image',
        'generate-video-button': 'Générer la vidéo',
        'video-placeholder': 'Votre vidéo générée apparaîtra ici',
        'video-placeholder-desc': 'La génération de vidéo peut prendre quelques minutes. Soyez patient !',
        'video-trial-badge': '1 Vidéo Gratuite',
        'video-progress-initializing': 'Initialisation',
        'video-progress-processing': 'Traitement',
        'video-progress-rendering': 'Rendu',
        'video-progress-finalizing': 'Finalisation',
        'video-eta': 'Temps restant estimé : {time}',
        'video-eta-calculating': 'Temps restant estimé : Calcul en cours...',
        'video-eta-complete': 'Génération terminée !',
        'tool-title-audio': 'Génération audio',
        'tool-desc-audio': 'Créez une parole naturelle à partir de texte.',
        'audio-prompt-label': 'Votre invite de texte',
        'audio-prompt-desc': 'Entrez le texte que vous souhaitez convertir en parole.',
        'audio-prompt-placeholder': 'ex: Dites joyeusement : Passez une merveilleuse journée !',
        'voice-style-label': 'Style de voix',
        'voice-zephyr': 'Zephyr (Amical et engageant)',
        'voice-kore': 'Kore (Calme et professionnel)',
        'voice-puck': 'Puck (Énergique et jeune)',
        'voice-charon': 'Charon (Profond et autoritaire)',
        'voice-fenrir': 'Fenrir (Chaleureux et mature)',
        'voice-faris': 'Faris (Clair et moderne - Égyptien) 👑',
        'voice-layla': 'Layla (Chaleureux et mélodieux - Golfe) 👑',
        'voice-zayn': 'Zayn (Amical et expressif - Levantin) 👑',
        'voice-noura': 'Noura (Éloquent et clair - MSA) 👑',
        'voice-omar': 'Omar (Profond et résonnant - MSA) 👑',
        'voice-adam': 'Adam (Profond et autoritaire - MSA) 👑',
        'voice-amira': 'Amira (Éloquent et chaleureux - MSA) 👑',
        'upgrade-button-audio': 'Mettre à niveau pour utiliser cette voix',
        'audio-effects-label': 'Effets audio',
        'effect-none': 'Aucun (Bientôt disponible)',
        'generate-audio-button': 'Générer l\'audio',
        'audio-placeholder': 'Votre audio généré apparaîtra ici',
        'tool-title-poem': 'Génération de poèmes',
        'tool-desc-poem': 'Créez de magnifiques poèmes sur n\'importe quel sujet.',
        'poem-prompt-label': 'Sur quoi doit porter le poème ?',
        'poem-prompt-desc': 'Fournissez un sujet ou un thème, et l\'IA créera un poème pour vous.',
        'poem-prompt-placeholder': 'ex: Une étoile solitaire dans le ciel nocturne...',
        'poem-length-label': 'Longueur du poème',
        'length-short': 'Court',
        'length-medium': 'Moyen',
        'length-long': 'Long',
        'poem-language-label': 'Langue',
        'lang-english': 'Anglais',
        'lang-french': 'Français',
        'lang-arabic': 'Arabe',
        'generate-poem-button': 'Générer le poème',
        'poem-placeholder': 'Votre poème généré apparaîtra ici',
        'sub-modal-title': 'Débloquez les fonctionnalités Premium',
        'sub-modal-desc': 'Choisissez un forfait pour générer des vidéos illimitées de haute qualité et plus encore.',
        'plan-monthly': 'Mensuel',
        'price-monthly': '10€',
        'per-month': '/ mois',
        'feature-unlimited': 'Générations illimitées',
        'feature-720p': 'Résolution standard 720p',
        'choose-monthly': 'Choisir le forfait mensuel',
        'best-value': 'Meilleur rapport qualité-prix',
        'plan-yearly': 'Annuel',
        'save-2-months': 'Économisez 2 mois !',
        'price-yearly': '100€',
        'per-year': '/ an',
        'feature-1080p': 'Résolution premium 1080p',
        'feature-priority': 'Accès à la file d\'attente prioritaire',
        'choose-yearly': 'Choisir le forfait annuel',
        'trial-modal-title': 'Votre première vidéo est offerte !',
        'trial-modal-desc': 'Découvrez la puissance de Veo et générez votre première vidéo gratuitement. Après votre première génération, abonnez-vous pour débloquer des vidéos illimitées et des fonctionnalités premium.',
        'trial-start-button': 'Commencer la génération gratuite',
        'trial-view-plans-button': 'Voir les forfaits d\'abonnement',
        'confirm-cancel': 'Annuler',
        'confirm-delete': 'Supprimer',
        'co-modal-title': 'Fonctionnalité nécessite une nouvelle fenêtre',
        'co-modal-desc': 'Pour des raisons de sécurité, la connexion sociale ne peut pas être effectuée dans une vue intégrée. Veuillez ouvrir l\'application dans une nouvelle fenêtre pour continuer.',
        'co-modal-button': 'Ouvrir dans une nouvelle fenêtre',
        'settings-title': 'Paramètres',
        'settings-reset': 'Réinitialiser',
        'settings-cancel': 'Annuler',
        'save-settings-text': 'Enregistrer',
        'settings-nav-general': 'Général',
        'settings-nav-account': 'Compte',
        'settings-nav-language': 'Langue',
        'settings-nav-theme': 'Thème',
        'settings-nav-privacy': 'Confidentialité',
        'settings-nav-notifications': 'Notifications',
        'settings-nav-subscription': 'Abonnement',
        'settings-nav-ai': 'Préférences IA',
        'settings-nav-support': 'Support',
        'settings-general-title': 'Paramètres généraux',
        'settings-general-startup-label': 'Comportement au démarrage',
        'settings-general-startup-desc': 'Choisissez quoi voir à l\'ouverture.',
        'settings-language-title': 'Paramètres de langue',
        'settings-language-desc': 'Choisissez votre langue préférée.',
        'settings-theme-title': 'Paramètres du thème',
        'settings-theme-select-label': 'Thème de l\'interface',
        'settings-theme-select-desc': 'Sélectionnez un thème ou synchronisez-le.',
        'settings-theme-light': 'Clair',
        'settings-theme-dark': 'Sombre',
        'settings-theme-system': 'Système',
        'settings-privacy-title': 'Confidentialité et sécurité',
        'settings-privacy-cookies-label': 'Autoriser les cookies',
        'settings-privacy-cookies-desc': 'Essentiels pour l\'authentification.',
        'settings-privacy-ai-data-label': 'Améliorer les modèles IA',
        'settings-privacy-ai-data-desc': 'Autorisez-nous à utiliser vos données anonymisées.',
        'settings-notifications-title': 'Paramètres de notification',
        'settings-notifications-sound-label': 'Alertes sonores',
        'settings-notifications-sound-desc': 'Jouer un son à la fin des générations.',
        'settings-notifications-email-label': 'Mises à jour par e-mail',
        'settings-notifications-email-desc': 'Recevez des e-mails sur les nouveautés.',
        'settings-notifications-activity-label': 'Notifications d\'activité',
        'settings-notifications-activity-desc': 'Soyez notifié de l\'activité importante.',
        'settings-subscription-title': 'Abonnement et facturation',
        'settings-subscription-status-label': 'Forfait actuel',
        'settings-subscription-status-free': 'Gratuit',
        'settings-subscription-status-premium': 'Premium (Annuel)',
        'settings-subscription-manage-button': 'Gérer l\'abonnement',
        'settings-ai-title': 'Préférences IA',
        'settings-ai-creativity-label': 'Niveau de créativité',
        'settings-ai-creativity-desc': 'Les niveaux bas sont plus littéraux.',
        'settings-ai-style-label': 'Style de sortie par défaut',
        'settings-ai-style-desc': 'Définissez le style visuel par défaut.',
        'settings-support-title': 'Support et commentaires',
        'settings-support-desc': 'Besoin d\'aide ? Consultez notre documentation.',
        'settings-support-help-button': 'Centre d\'aide',
        'settings-support-feedback-button': 'Envoyer des commentaires',
        'toast-prompt-required': 'Veuillez d\'abord saisir une invite.',
        'toast-generation-fail': 'La génération a échoué. Veuillez réessayer.',
        'toast-edit-fail': 'Échec de l\'application de la modification. Veuillez réessayer.',
        'toast-upload-fail': 'Échec du téléchargement du fichier. Veuillez essayer un autre fichier.',
        'toast-edit-prompt-required': 'Veuillez décrire la modification que vous souhaitez apporter.',
        'toast-subscribed-success': 'Abonnement réussi ! Toutes les fonctionnalités premium sont débloquées.',
        'toast-already-subscribed': 'Vous êtes déjà abonné.',
        'toast-settings-saved': 'Paramètres enregistrés avec succès.',
        'toast-api-key-success': 'Clé API sélectionnée avec succès.',
        'toast-api-key-fail': 'Impossible d\'ouvrir la boîte de dialogue de sélection de la clé API.',
        'toast-api-key-invalid': 'Votre clé API n\'est pas valide. Veuillez en sélectionner une nouvelle.',
        'toast-video-prompt-or-image-required': 'Veuillez saisir une invite ou télécharger une image.',
        'toast-copied-success': 'Copié dans le presse-papiers !',
        'toast-signed-out': 'Vous avez été déconnecté.',
        'toast-signin-success': 'Connexion réussie !',
        'confirm-delete-video-title': 'Supprimer la vidéo',
        'confirm-delete-video-desc': 'Êtes-vous sûr de vouloir supprimer définitivement cette vidéo de votre historique ? Cette action est irréversible.',
    },
    ar: {
        'auth-button-login': 'تسجيل الدخول',
        'auth-button-signup': 'إنشاء حساب',
        'auth-title-login': 'مرحبًا بعودتك',
        'auth-subtitle-google': 'سجل الدخول باستخدام جوجل للمتابعة',
        'profile-manage': 'إدارة الحساب',
        'profile-api': 'إعدادات API',
        'profile-signout': 'تسجيل الخروج',
        'tool-title-image': 'إنشاء الصور',
        'tool-desc-image': 'أنشئ وعدّل الصور باستخدام الأوامر النصية.',
        'image-prompt-label': 'طلبك الإبداعي',
        'image-prompt-desc': 'صف الصورة التي تريد إنشاءها. كن محددًا قدر الإمكان!',
        'image-prompt-placeholder': 'مثال: لقطة سينمائية لمدينة مستقبلية في الليل، مع انعكاس لافتات النيون على الشوارع المبتلة، مفصلة، 8k',
        'image-negative-prompt-label': 'استبعاد من الصورة',
        'image-negative-prompt-optional': '(اختياري)',
        'image-negative-prompt-desc': 'أخبر الذكاء الاصطناعي بما لا تريد رؤيته في الصورة النهائية.',
        'image-negative-prompt-placeholder': 'مثال: نص، علامات مائية، ضبابية، جودة منخفضة',
        'image-aspect-ratio-label': 'نسبة العرض إلى الارتفاع',
        'aspect-ratio-square': 'مربع',
        'aspect-ratio-landscape': '16:9',
        'aspect-ratio-portrait': '9:16',
        'image-number-of-images-label': 'عدد الصور',
        'generate-image-button': 'إنشاء صورة',
        'reroll-image-button': 'إعادة المحاولة',
        'image-placeholder': 'ستظهر صورك التي تم إنشاؤها هنا',
        'back-to-generate': 'العودة إلى الإنشاء',
        'edit-your-image': 'تعديل صورتك',
        'edit-prompt-placeholder': 'مثال: أضف فلترًا قديمًا، اجعلها بالأبيض والأسود...',
        'apply-edit-button': 'تطبيق التعديل',
        'auth-or': 'أو',
        'upload-desc': 'أو قم بتحميل صورة جديدة لتعديلها:',
        'upload-and-edit': 'تحميل صورة للتعديل',
        'suggestions-title': 'اقتراحات الأوامر',
        'tool-title-video': 'إنشاء الفيديو',
        'tool-desc-video': 'حوّل أفكارك إلى حياة مع فيديو عالي الجودة.',
        'video-prompt-label': 'طلب الفيديو الخاص بك',
        'video-prompt-desc': 'صف المشهد والشخصيات والإجراءات التي تريد رؤيتها.',
        'video-prompt-placeholder': 'مثال: صورة ثلاثية الأبعاد من النيون لقط يقود بأقصى سرعة...',
        'resolution-label': 'الدقة',
        'resolution-standard': '720p',
        'resolution-premium': '1080p 👑',
        'video-initial-image-label': 'الصورة الأولية',
        'upload-image-button': 'تحميل صورة',
        'generate-video-button': 'إنشاء الفيديو',
        'video-placeholder': 'سيظهر الفيديو الذي تم إنشاؤه هنا',
        'video-placeholder-desc': 'قد يستغرق إنشاء الفيديو بضع دقائق. يرجى التحلي بالصبر!',
        'video-trial-badge': 'فيديو واحد مجاني',
        'video-progress-initializing': 'جارٍ التهيئة',
        'video-progress-processing': 'جارٍ المعالجة',
        'video-progress-rendering': 'جارٍ التصيير',
        'video-progress-finalizing': 'جارٍ الانتهاء',
        'video-eta': 'الوقت المتبقي المقدر: {time}',
        'video-eta-calculating': 'الوقت المتبقي المقدر: جارٍ الحساب...',
        'video-eta-complete': 'اكتمل الإنشاء!',
        'tool-title-audio': 'إنشاء الصوت',
        'tool-desc-audio': 'أنشئ كلامًا طبيعيًا من النص.',
        'audio-prompt-label': 'طلب النص الخاص بك',
        'audio-prompt-desc': 'أدخل النص الذي تريد تحويله إلى كلام.',
        'audio-prompt-placeholder': 'مثال: قل بمرح: أتمنى لك يومًا رائعًا!',
        'voice-style-label': 'نمط الصوت',
        'voice-zephyr': 'زفير (ودود وجذاب)',
        'voice-kore': 'كوري (هادئ ومحترف)',
        'voice-puck': 'باك (حيوي وشبابي)',
        'voice-charon': 'شارون (عميق وموثوق)',
        'voice-fenrir': 'فنرير (دافئ وناضج)',
        'voice-faris': 'فارس (واضح وعصري - مصري) 👑',
        'voice-layla': 'ليلى (دافئ وعذب - خليجي) 👑',
        'voice-zayn': 'زين (ودود ومعبر - شامي) 👑',
        'voice-noura': 'نورة (فصيحة وواضحة - فصحى) 👑',
        'voice-omar': 'عمر (عميق ورنان - فصحى) 👑',
        'voice-adam': 'آدم (عميق وموثوق - فصحى) 👑',
        'voice-amira': 'أميرة (فصيحة ودافئة - فصحى) 👑',
        'upgrade-button-audio': 'الترقية لاستخدام هذا الصوت',
        'audio-effects-label': 'المؤثرات الصوتية',
        'effect-none': 'لا شيء (قريبًا)',
        'generate-audio-button': 'إنشاء الصوت',
        'audio-placeholder': 'سيظهر الصوت الذي تم إنشاؤه هنا',
        'tool-title-poem': 'إنشاء القصائد',
        'tool-desc-poem': 'اصنع قصائد جميلة في أي موضوع.',
        'poem-prompt-label': 'عن ماذا يجب أن تكون القصيدة؟',
        'poem-prompt-desc': 'قدم موضوعًا أو فكرة، وسيقوم الذكاء الاصطناعي بصياغة قصيدة لك.',
        'poem-prompt-placeholder': 'مثال: نجمة وحيدة في سماء الليل...',
        'poem-length-label': 'طول القصيدة',
        'length-short': 'قصيرة',
        'length-medium': 'متوسطة',
        'length-long': 'طويلة',
        'poem-language-label': 'اللغة',
        'lang-english': 'الإنجليزية',
        'lang-french': 'الفرنسية',
        'lang-arabic': 'العربية',
        'generate-poem-button': 'إنشاء قصيدة',
        'poem-placeholder': 'ستظهر قصيدتك التي تم إنشاؤها هنا',
        'sub-modal-title': 'افتح الميزات المميزة',
        'sub-modal-desc': 'اختر خطة لإنشاء مقاطع فيديو غير محدودة وعالية الجودة والمزيد.',
        'plan-monthly': 'شهريًا',
        'price-monthly': '10$',
        'per-month': '/ شهر',
        'feature-unlimited': 'إنشاءات غير محدودة',
        'feature-720p': 'دقة قياسية 720p',
        'choose-monthly': 'اختر شهريًا',
        'best-value': 'أفضل قيمة',
        'plan-yearly': 'سنويًا',
        'save-2-months': 'وفر شهرين!',
        'price-yearly': '100$',
        'per-year': '/ سنة',
        'feature-1080p': 'دقة ممتازة 1080p',
        'feature-priority': 'وصول ذو أولوية',
        'choose-yearly': 'اختر سنويًا',
        'trial-modal-title': 'أول فيديو لك علينا!',
        'trial-modal-desc': 'جرب قوة Veo وأنشئ أول فيديو لك مجانًا. بعد أول إنشاء لك، اشترك لفتح مقاطع فيديو غير محدودة وميزات مميزة.',
        'trial-start-button': 'ابدأ الإنشاء المجاني',
        'trial-view-plans-button': 'انظر خطط الاشتراك',
        'confirm-cancel': 'إلغاء',
        'confirm-delete': 'حذف',
        'co-modal-title': 'الميزة تتطلب نافذة جديدة',
        'co-modal-desc': 'للأمان، لا يمكن إكمال تسجيل الدخول الاجتماعي في عرض مضمن. يرجى فتح التطبيق في نافذة جديدة للمتابعة.',
        'co-modal-button': 'فتح في نافذة جديدة',
        'settings-title': 'الإعدادات',
        'settings-reset': 'إعادة تعيين',
        'settings-cancel': 'إلغاء',
        'save-settings-text': 'حفظ',
        'settings-nav-general': 'عام',
        'settings-nav-account': 'الحساب',
        'settings-nav-language': 'اللغة',
        'settings-nav-theme': 'المظهر',
        'settings-nav-privacy': 'الخصوصية',
        'settings-nav-notifications': 'الإشعارات',
        'settings-nav-subscription': 'الاشتراك',
        'settings-nav-ai': 'تفضيلات الذكاء الاصطناعي',
        'settings-nav-support': 'الدعم',
        'settings-general-title': 'الإعدادات العامة',
        'settings-general-startup-label': 'سلوك بدء التشغيل',
        'settings-general-startup-desc': 'اختر ما تراه عند فتح التطبيق.',
        'settings-language-title': 'إعدادات اللغة',
        'settings-language-desc': 'اختر لغتك المفضلة لواجهة المستخدم.',
        'settings-theme-title': 'إعدادات المظهر',
        'settings-theme-select-label': 'مظهر الواجهة',
        'settings-theme-select-desc': 'حدد مظهرًا أو زامنه مع تفضيلات نظامك.',
        'settings-theme-light': 'فاتح',
        'settings-theme-dark': 'داكن',
        'settings-theme-system': 'النظام',
        'settings-privacy-title': 'الخصوصية والأمان',
        'settings-privacy-cookies-label': 'السماح بملفات تعريف الارتباط',
        'settings-privacy-cookies-desc': 'ضرورية للمصادقة ووظائف الموقع.',
        'settings-privacy-ai-data-label': 'تحسين نماذج الذكاء الاصطناعي',
        'settings-privacy-ai-data-desc': 'اسمح لنا باستخدام بياناتك المجهولة لتحسين الذكاء الاصطناعي لدينا.',
        'settings-notifications-title': 'إعدادات الإشعارات',
        'settings-notifications-sound-label': 'تنبيهات صوتية',
        'settings-notifications-sound-desc': 'تشغيل صوت عند اكتمال الإنشاءات.',
        'settings-notifications-email-label': 'تحديثات البريد الإلكتروني',
        'settings-notifications-email-desc': 'تلقي رسائل بريد إلكتروني حول الميزات والعروض الجديدة.',
        'settings-notifications-activity-label': 'إشعارات النشاط',
        'settings-notifications-activity-desc': 'الحصول على إشعارات حول نشاط الحساب المهم.',
        'settings-subscription-title': 'الاشتراك والفوترة',
        'settings-subscription-status-label': 'الخطة الحالية',
        'settings-subscription-status-free': 'المستوى المجاني',
        'settings-subscription-status-premium': 'الممتاز (سنوي)',
        'settings-subscription-manage-button': 'إدارة الاشتراك',
        'settings-ai-title': 'تفضيلات الذكاء الاصطناعي',
        'settings-ai-creativity-label': 'مستوى الإبداع',
        'settings-ai-creativity-desc': 'المستويات المنخفضة أكثر حرفية، والأعلى أكثر خيالًا.',
        'settings-ai-style-label': 'نمط الإخراج الافتراضي',
        'settings-ai-style-desc': 'اضبط النمط المرئي الافتراضي للصور التي تم إنشاؤها.',
        'settings-support-title': 'الدعم والملاحظات',
        'settings-support-desc': 'هل تحتاج إلى مساعدة؟ تحقق من وثائقنا أو أرسل لنا ملاحظاتك.',
        'settings-support-help-button': 'مركز المساعدة',
        'settings-support-feedback-button': 'إرسال ملاحظات',
        'toast-prompt-required': 'الرجاء إدخال موجه أولاً.',
        'toast-generation-fail': 'فشل الإنشاء. حاول مرة اخرى.',
        'toast-edit-fail': 'فشل تطبيق التعديل. حاول مرة اخرى.',
        'toast-upload-fail': 'فشل تحميل الملف. الرجاء تجربة ملف مختلف.',
        'toast-edit-prompt-required': 'يرجى وصف التعديل الذي تريد إجراءه.',
        'toast-subscribed-success': 'تم الاشتراك بنجاح! تم فتح جميع الميزات المتميزة.',
        'toast-already-subscribed': 'أنت مشترك بالفعل.',
        'toast-settings-saved': 'تم حفظ الإعدادات بنجاح.',
        'toast-api-key-success': 'تم تحديد مفتاح API بنجاح.',
        'toast-api-key-fail': 'تعذر فتح مربع حوار تحديد مفتاح API.',
        'toast-api-key-invalid': 'مفتاح API الخاص بك غير صالح. الرجاء تحديد مفتاح جديد.',
        'toast-video-prompt-or-image-required': 'الرجاء إدخال مطالبة أو تحميل صورة.',
        'toast-copied-success': 'تم نسخه إلى الحافظة!',
        'toast-signed-out': 'لقد تم تسجيل خروجك.',
        'toast-signin-success': 'تم تسجيل الدخول بنجاح!',
        'confirm-delete-video-title': 'حذف الفيديو',
        'confirm-delete-video-desc': 'هل أنت متأكد أنك تريد حذف هذا الفيديو نهائيًا من سجلك؟ لا يمكن التراجع عن هذا الإجراء.',
    }
};

// --- Helper Functions ---
function setButtonLoading(button: HTMLButtonElement, isLoading: boolean) {
  const spinner = button.querySelector('.spinner');
  const buttonText = button.querySelector('.button-text');
  if (isLoading) {
    button.disabled = true;
    button.classList.add('loading');
    spinner?.classList.remove('hidden');
    if (buttonText) (buttonText as HTMLElement).style.opacity = '0';
  } else {
    button.disabled = false;
    button.classList.remove('loading');
    spinner?.classList.add('hidden');
    if (buttonText) (buttonText as HTMLElement).style.opacity = '1';
  }
}

function showToast(messageKey: string, type: 'success' | 'error' | 'info' = 'info') {
  const toast = document.createElement('div');
  const message = translate(messageKey) || 'An unexpected error occurred.';
  
  const colors = {
    success: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', border: 'border-green-500' },
    error: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', border: 'border-red-500' },
    info: { bg: 'bg-sky-100 dark:bg-sky-900', text: 'text-sky-800 dark:text-sky-200', border: 'border-sky-500' },
  };

  toast.className = `w-full p-4 rounded-lg shadow-lg border-l-4 ${colors[type].bg} ${colors[type].text} ${colors[type].border} toast-in`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<p class="font-bold">${message}</p>`;
  
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast-in');
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 5000);
}

function translate(key: string): string {
    const lang = currentSettings?.language || 'en';
    return translations[lang][key] || translations['en'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (key) {
            const translation = translate(key);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                (element as HTMLInputElement | HTMLTextAreaElement).placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
    // Set document direction
    htmlEl.dir = currentSettings.language === 'ar' ? 'rtl' : 'ltr';
}

function fileToBase64(file: File): Promise<{ data: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve({ data: base64Data, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

async function showConfirmationModal(titleKey: string, descriptionKey: string, confirmTextKey = 'confirm-delete'): Promise<boolean> {
  confirmationModalTitle.setAttribute('data-translate-key', titleKey);
  confirmationModalDescription.setAttribute('data-translate-key', descriptionKey);
  confirmationModalConfirmButton.setAttribute('data-translate-key', confirmTextKey);
  applyTranslations(); // Apply translation to the modal content

  confirmationModal.classList.remove('hidden');
  
  return new Promise((resolve) => {
    confirmationResolve = resolve;
  });
}

function closeConfirmationModal() {
  confirmationModal.classList.add('hidden');
}


// --- API / AI Functions ---
async function initializeAI() {
    // For Veo model, we must use a user-selected API key.
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
        await openApiKeyDialog();
    }
    ai = new GoogleGenAI({apiKey: process.env.API_KEY});
}

// --- View Management ---
function showView(viewId: 'dashboard' | 'image' | 'video' | 'audio' | 'poem') {
    dashboardView.classList.add('hidden');
    allToolViews.forEach(v => v.classList.add('hidden'));
    toolHeader.classList.add('hidden');
    appContainer.classList.remove('bg-grid');

    const toolInfo = {
        image: { titleKey: 'tool-title-image', descKey: 'tool-desc-image', el: imageGeneratorTool },
        video: { titleKey: 'tool-title-video', descKey: 'tool-desc-video', el: videoGeneratorTool },
        audio: { titleKey: 'tool-title-audio', descKey: 'tool-desc-audio', el: audioGeneratorTool },
        poem: { titleKey: 'tool-title-poem', descKey: 'tool-desc-poem', el: poemGeneratorTool },
    }

    if (viewId === 'dashboard') {
        dashboardView.classList.remove('hidden');
        currentTool = null;
    } else {
        const info = toolInfo[viewId];
        info.el.classList.remove('hidden');
        toolHeader.classList.remove('hidden');
        document.getElementById('tool-title')?.setAttribute('data-translate-key', info.titleKey);
        document.getElementById('tool-description')?.setAttribute('data-translate-key', info.descKey);
        currentTool = viewId;
    }
    applyTranslations();
}

// --- Image Generation Logic ---
async function handleImageGeneration() {
  if (!promptEl.value.trim()) {
    showToast('toast-prompt-required', 'error');
    return;
  }

  setButtonLoading(generateImageButton, true);
  outputImageGrid.classList.add('hidden');
  imageOutputPlaceholder.classList.add('hidden');
  imageSkeletonLoader.classList.remove('hidden');
  outputImageGrid.parentElement?.classList.add('generating-glow');
  rerollImageButton.disabled = true;

  try {
    await initializeAI();
    
    const aspectRatio = (document.querySelector('input[name="image-aspect-ratio"]:checked') as HTMLInputElement).value;
    const numberOfImages = parseInt((document.querySelector('input[name="number-of-images"]:checked') as HTMLInputElement).value, 10);
    
    lastImageGenerationParams = {
        prompt: promptEl.value,
        negativePrompt: negativePromptEl.value,
        aspectRatio,
        numberOfImages,
    };
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `${promptEl.value}${negativePromptEl.value ? ` | --no ${negativePromptEl.value}` : ''}`,
        config: {
            numberOfImages: numberOfImages,
            outputMimeType: 'image/jpeg',
            aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16",
        },
    });

    displayGeneratedImages(response.generatedImages.map(img => img.image.imageBytes));

  } catch (error) {
    console.error('Image generation error:', error);
    showToast('toast-generation-fail', 'error');
    imageOutputPlaceholder.classList.remove('hidden');
  } finally {
    setButtonLoading(generateImageButton, false);
    imageSkeletonLoader.classList.add('hidden');
    outputImageGrid.parentElement?.classList.remove('generating-glow');
    rerollImageButton.disabled = false;
  }
}

function displayGeneratedImages(base64Images: string[]) {
    outputImageGrid.innerHTML = '';
    outputImageGrid.className = 'w-full h-full p-2 gap-2 grid';

    // Adjust grid layout based on number of images
    if (base64Images.length === 1) {
        outputImageGrid.classList.add('grid-cols-1');
    } else if (base64Images.length === 2) {
        outputImageGrid.classList.add('grid-cols-2');
    } else {
        outputImageGrid.classList.add('grid-cols-2');
    }

    base64Images.forEach((base64ImageBytes, index) => {
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        const item = document.createElement('div');
        item.className = 'image-grid-item';
        item.innerHTML = `
            <img src="${imageUrl}" alt="Generated image ${index + 1}">
            <div class="image-actions-overlay">
                <button class="action-button edit-button" data-index="${index}" aria-label="Edit this image">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg>
                </button>
                <a href="${imageUrl}" download="generated-image-${index + 1}.jpg" class="action-button" aria-label="Download this image">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg>
                </a>
                <button class="action-button-danger delete-button" data-index="${index}" aria-label="Delete this image">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                </button>
            </div>
        `;
        outputImageGrid.appendChild(item);
    });

    outputImageGrid.classList.remove('hidden');
    
    // Add event listeners after creating the buttons
    outputImageGrid.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt((e.currentTarget as HTMLElement).dataset.index!, 10);
            const imageToEditData = base64Images[index];
            if (imageToEditData) {
                imageToEdit = { data: imageToEditData, mimeType: 'image/jpeg' };
                showEditor();
            }
        });
    });

    outputImageGrid.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const item = (e.currentTarget as HTMLElement).closest('.image-grid-item');
        item?.remove();
        if (outputImageGrid.childElementCount === 0) {
            imageOutputPlaceholder.classList.remove('hidden');
        }
      });
    });
}

function showEditor() {
    if (!imageToEdit) return;
    generatorControls.classList.add('hidden');
    editorControls.classList.remove('hidden');
    editPreviewImage.src = `data:${imageToEdit.mimeType};base64,${imageToEdit.data}`;
}

function hideEditor() {
    generatorControls.classList.remove('hidden');
    editorControls.classList.add('hidden');
    imageToEdit = null;
    editPromptInput.value = '';
    editPreviewImage.src = '';
}

async function handleApplyEdit() {
    if (!imageToEdit || !editPromptInput.value.trim()) {
        showToast('toast-edit-prompt-required', 'error');
        return;
    }

    setButtonLoading(applyEditButton, true);
    outputImageGrid.classList.add('hidden');
    imageOutputPlaceholder.classList.add('hidden');
    imageSkeletonLoader.classList.remove('hidden');
    outputImageGrid.parentElement?.classList.add('generating-glow');
    
    try {
        await initializeAI();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: imageToEdit.data, mimeType: imageToEdit.mimeType } },
                    { text: editPromptInput.value }
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const newImagePart = response.candidates?.[0]?.content.parts.find(p => p.inlineData);
        if (newImagePart?.inlineData) {
            displayGeneratedImages([newImagePart.inlineData.data]);
            hideEditor();
        } else {
            throw new Error('No image data in response');
        }

    } catch (error) {
        console.error('Image edit error:', error);
        showToast('toast-edit-fail', 'error');
        outputImageGrid.classList.remove('hidden'); // Show previous images
    } finally {
        setButtonLoading(applyEditButton, false);
        imageSkeletonLoader.classList.add('hidden');
        outputImageGrid.parentElement?.classList.remove('generating-glow');
    }
}

// --- Video Generation Logic ---
function formatTime(seconds: number): string {
    if (seconds < 60) {
        return `${Math.round(seconds)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
}

function updateVideoProgress(stageIndex: number, progressInStage: number, totalElapsed: number, totalDuration: number) {
    const steps = document.querySelectorAll('.progress-step');
    const stageWeights = [0, 0.05, 0.55, 0.95, 1.0]; // Cumulative weights

    // Ensure stageIndex is within bounds
    const clampedStageIndex = Math.max(1, Math.min(stageIndex, stageWeights.length - 1));

    const progressBeforeCurrentStage = stageWeights[clampedStageIndex - 1] * 100;
    const progressOfCurrentStage = (stageWeights[clampedStageIndex] - stageWeights[clampedStageIndex-1]) * progressInStage;
    const totalProgress = progressBeforeCurrentStage + progressOfCurrentStage;

    videoProgressBar.style.width = `${Math.min(totalProgress, 100)}%`;

    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        const circle = step.querySelector('.step-circle');
        
        if (stepNumber < clampedStageIndex) {
            step.classList.add('completed');
            if (circle) circle.innerHTML = `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clip-rule="evenodd" /></svg>`; 
        } else if (stepNumber === clampedStageIndex) {
            step.classList.add('active');
            if (circle) circle.textContent = String(stepNumber);
        } else {
            if (circle) circle.textContent = String(stepNumber);
        }
    });

    const activeStep = steps[clampedStageIndex - 1];
    if (activeStep) {
        const labelKey = activeStep.querySelector('.step-label')?.getAttribute('data-translate-key');
        if (labelKey) {
            videoProgressText.textContent = translate(labelKey);
        }
    }
    
    const remainingTime = totalDuration - totalElapsed;
    if (remainingTime > 0) {
        videoProgressEta.textContent = translate('video-eta').replace('{time}', formatTime(remainingTime));
    } else {
        videoProgressEta.textContent = translate('video-eta-calculating');
    }
}

function resetProgressBar() {
    const steps = document.querySelectorAll('.progress-step');
    videoProgressBar.style.width = '0%';
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        const circle = step.querySelector('.step-circle');
        if (circle) circle.textContent = String(index + 1);
    });
    videoProgressEta.textContent = '';
    videoProgressText.textContent = '';
}

function resetVideoUI() {
    setButtonLoading(generateVideoButton, false);
    videoPlaceholder.classList.remove('hidden');
    videoProgressIndicator.classList.add('hidden');
    document.getElementById('video-placeholder-default-text')?.classList.remove('hidden');
    outputVideo.classList.add('hidden');
    videoActions.classList.add('hidden');
    outputVideoContainer.classList.remove('generating-glow');
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    resetProgressBar();
}

async function handleVideoGeneration() {
    if (!videoPromptInput.value.trim() && !videoToEdit) {
        showToast('toast-video-prompt-or-image-required', 'error');
        return;
    }

    if (!isSubscribed && hasUsedVideoTrial) {
        showSubscriptionModal();
        return;
    }
    
    setButtonLoading(generateVideoButton, true);
    videoPlaceholder.classList.add('hidden');
    outputVideo.classList.add('hidden');
    outputVideo.src = '';
    videoActions.classList.add('hidden');
    document.getElementById('video-placeholder-default-text')?.classList.add('hidden');
    videoProgressIndicator.classList.remove('hidden');
    outputVideoContainer.classList.add('generating-glow');
    
    const totalDuration = 180; // Estimated 3 minutes
    let elapsed = 0;
    
    // Simulate progress while polling
    const stages = [
        { name: 'video-progress-initializing', duration: 10 }, // 10s
        { name: 'video-progress-processing', duration: 90 },  // 90s
        { name: 'video-progress-rendering', duration: 70 },   // 70s
        { name: 'video-progress-finalizing', duration: 10 },    // 10s
    ];
    let currentStageIndex = 0;
    let timeInStage = 0;

    updateVideoProgress(1, 0, 0, totalDuration);

    progressInterval = window.setInterval(() => {
        elapsed++;
        timeInStage++;
        
        if (timeInStage >= stages[currentStageIndex].duration && currentStageIndex < stages.length - 1) {
            timeInStage = 0;
            currentStageIndex++;
        }
        
        const progressInStage = timeInStage / stages[currentStageIndex].duration;
        updateVideoProgress(currentStageIndex + 1, progressInStage, elapsed, totalDuration);

        if (elapsed >= totalDuration) {
            if(progressInterval) clearInterval(progressInterval);
        }
    }, 1000);


    try {
        await initializeAI();
        
        const aspectRatio = (document.querySelector('input[name="video-aspect-ratio"]:checked') as HTMLInputElement).value as "16:9" | "9:16";
        const resolution = (document.querySelector('input[name="video-resolution"]:checked') as HTMLInputElement).value as "720p" | "1080p";

        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: videoPromptInput.value,
            ...(videoToEdit && { image: { imageBytes: videoToEdit.data, mimeType: videoToEdit.mimeType } }),
            config: {
                numberOfVideos: 1,
                resolution: resolution,
                aspectRatio: aspectRatio,
            }
        });

        currentVideoOperation = operation;

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
            currentVideoOperation = operation;
        }

        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        updateVideoProgress(4, 1, totalDuration, totalDuration); // Mark as complete
        videoProgressEta.textContent = translate('video-eta-complete');

        if (operation.response?.generatedVideos?.[0]?.video?.uri) {
            const downloadLink = operation.response.generatedVideos[0].video.uri;
            const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            const videoBlob = await videoResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);
            
            outputVideo.src = videoUrl;
            videoProgressIndicator.classList.add('hidden');
            outputVideo.classList.remove('hidden');
            videoActions.classList.remove('hidden');
            
            // Add to history
            const historyItem = {
                id: Date.now(),
                prompt: videoPromptInput.value,
                url: videoUrl,
                operation: currentVideoOperation,
            };
            videoHistory.unshift(historyItem); // Add to the beginning
            updateVideoHistoryUI();
            
            hasUsedVideoTrial = true;
            updateSubscriptionStatus(isSubscribed);

        } else {
            throw new Error('Video generation succeeded but no video URI was returned.');
        }

    } catch (error: any) {
        console.error('Video generation error:', error);
        if (error.message.includes('Requested entity was not found.')) {
            showToast('toast-api-key-invalid', 'error');
            await openApiKeyDialog();
        } else {
            showToast('toast-generation-fail', 'error');
        }
        resetVideoUI();
    } finally {
        // Final cleanup is handled in resetVideoUI or on success
        outputVideoContainer.classList.remove('generating-glow');
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }
}

function updateVideoHistoryUI() {
    if (videoHistory.length > 0) {
        videoHistorySection.classList.remove('hidden');
        videoHistoryContainer.innerHTML = '';
        videoHistory.forEach(item => {
            const historyItemEl = document.createElement('div');
            historyItemEl.className = 'relative flex-shrink-0 w-48 h-28 bg-slate-800 rounded-lg overflow-hidden group';
            historyItemEl.innerHTML = `
                <video src="${item.url}" class="w-full h-full object-cover" muted></video>
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <p class="text-xs text-white/90 line-clamp-2">${item.prompt || 'Video generation'}</p>
                    <div class="flex items-center justify-end gap-1">
                         <button class="history-action-btn" data-action="replay" data-id="${item.id}" aria-label="Replay video">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                        </button>
                        <button class="history-action-btn-danger" data-action="delete" data-id="${item.id}" aria-label="Delete video">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                        </button>
                    </div>
                </div>
            `;
            videoHistoryContainer.appendChild(historyItemEl);
        });
    } else {
        videoHistorySection.classList.add('hidden');
    }
}


// --- Audio Generation Logic ---
async function handleAudioGeneration() {
    if (!audioPromptInput.value.trim()) {
        showToast('toast-prompt-required', 'error');
        return;
    }

    setButtonLoading(generateAudioButton, true);
    audioPlaceholder.classList.add('hidden');
    audioSkeletonLoader.classList.remove('hidden');
    outputAudio.classList.add('hidden');
    audioActions.classList.add('hidden');
    outputAudio.parentElement?.classList.add('generating-glow');

    try {
        await initializeAI();
        const voice = audioVoiceSelect.value;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: audioPromptInput.value }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voice },
                    },
                },
            },
        });
        
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
            outputAudio.src = audioUrl;
            outputAudio.classList.remove('hidden');
            audioActions.classList.remove('hidden');
        } else {
            throw new Error("No audio data in response.");
        }
    } catch (error) {
        console.error("Audio generation error:", error);
        showToast('toast-generation-fail', 'error');
        audioPlaceholder.classList.remove('hidden');
    } finally {
        setButtonLoading(generateAudioButton, false);
        audioSkeletonLoader.classList.add('hidden');
        outputAudio.parentElement?.classList.remove('generating-glow');
    }
}

// --- Poem Generation Logic ---
async function handlePoemGeneration() {
    if (!poemPromptInput.value.trim()) {
        showToast('toast-prompt-required', 'error');
        return;
    }

    setButtonLoading(generatePoemButton, true);
    poemPlaceholder.classList.add('hidden');
    poemSkeletonLoader.classList.remove('hidden');
    poemOutputWrapper.classList.add('hidden');
    poemActions.classList.add('hidden');
    poemOutputWrapper.parentElement?.classList.add('generating-glow');

    try {
        await initializeAI();
        
        const length = (document.querySelector('input[name="poem-length"]:checked') as HTMLInputElement).value;
        const language = poemLanguageSelect.value;
        const prompt = `Write a ${length} poem in ${language} about: ${poemPromptInput.value}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        outputPoem.textContent = response.text;
        poemOutputWrapper.classList.remove('hidden');
        poemActions.classList.remove('hidden');

    } catch (error) {
        console.error("Poem generation error:", error);
        showToast('toast-generation-fail', 'error');
        poemPlaceholder.classList.remove('hidden');
    } finally {
        setButtonLoading(generatePoemButton, false);
        poemSkeletonLoader.classList.add('hidden');
        poemOutputWrapper.parentElement?.classList.remove('generating-glow');
    }
}

// --- Auth & User Logic ---
function showAuthModal(mode: 'login' | 'signup') {
    authTitle.setAttribute('data-translate-key', mode === 'login' ? 'auth-title-login' : 'auth-title-signup');
    authSubtitle.setAttribute('data-translate-key', 'auth-subtitle-google');
    applyTranslations();
    authModal.classList.remove('hidden');
}

function handleSignOut() {
    profileImage.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    profileName.textContent = 'Guest';
    profileEmail.textContent = 'Not signed in';
    loggedOutControls.classList.remove('hidden');
    loggedInControls.classList.add('hidden');
    profileDropdown.classList.add('hidden');
    updateSubscriptionStatus(false);
    hasUsedVideoTrial = false;
    showToast('toast-signed-out', 'success');
}

function handleGoogleSignIn(response: any) {
    const cred = JSON.parse(atob(response.credential.split('.')[1]));
    
    profileImage.src = cred.picture;
    profileName.textContent = cred.given_name;
    profileEmail.textContent = cred.email;
    
    loggedOutControls.classList.add('hidden');
    loggedInControls.classList.remove('hidden');
    
    authModal.classList.add('hidden');
    showToast('toast-signin-success', 'success');
}

function initializeGoogleSignIn() {
    if (window.google) {
        window.google.accounts.id.initialize({
            client_id: document.querySelector('meta[name="google-client-id"]')?.getAttribute('content'),
            callback: handleGoogleSignIn,
            auto_select: false,
        });
        window.google.accounts.id.renderButton(
            googleSignInContainer,
            { theme: "outline", size: "large", width: "300" } 
        );
    } else {
        console.error("Google GSI client not loaded.");
    }
}

// --- Prompt Suggestions Logic ---
async function showPromptSuggestionsModal() {
    promptSuggestionsContainer.innerHTML = '<div class="spinner w-8 h-8 mx-auto border-2 border-slate-300 dark:border-slate-600 border-t-sky-500 rounded-full animate-spin"></div>';
    promptSuggestionsModal.classList.remove('hidden');

    const suggestions = {
        "Styles": ["Cinematic", "Photorealistic", "Anime", "Impressionistic Painting", "Steampunk"],
        "Subjects": ["A lone astronaut on a red planet", "A magical library hidden in a forest", "A bustling cyberpunk market at night", "A majestic dragon flying over mountains", "A serene underwater city"],
        "Modifiers": ["8K resolution", "Highly detailed", "Ethereal lighting", "Vibrant colors", "Dynamic composition"]
    };

    setTimeout(() => {
        promptSuggestionsContainer.innerHTML = '';
        for (const [category, items] of Object.entries(suggestions)) {
            const categoryEl = document.createElement('div');
            categoryEl.innerHTML = `<h3 class="suggestion-category-title">${category}</h3>`;
            const itemsGrid = document.createElement('div');
            itemsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2';
            items.forEach(itemText => {
                const itemEl = document.createElement('button');
                itemEl.className = 'suggestion-item';
                itemEl.textContent = itemText;
                itemEl.onclick = () => {
                    if (currentTool === 'image' && promptEl) {
                        promptEl.value = promptEl.value ? `${promptEl.value}, ${itemText}` : itemText;
                        promptSuggestionsModal.classList.add('hidden');
                    }
                };
                itemsGrid.appendChild(itemEl);
            });
            categoryEl.appendChild(itemsGrid);
            promptSuggestionsContainer.appendChild(categoryEl);
        }
    }, 500); // Simulate network delay
}

// --- Settings Logic ---
function loadSettings() {
  const savedSettings = localStorage.getItem('stellar-ai-settings');
  if (savedSettings) {
    currentSettings = { ...defaultSettings, ...JSON.parse(savedSettings) };
  } else {
    currentSettings = { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem('stellar-ai-settings', JSON.stringify(currentSettings));
}

function applyTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlEl.classList.toggle('dark', systemPrefersDark);
        htmlEl.classList.toggle('light', !systemPrefersDark);
    } else {
        htmlEl.classList.toggle('dark', theme === 'dark');
        htmlEl.classList.toggle('light', theme === 'light');
    }
}

function initTheme() {
    loadSettings();
    applyTheme(currentSettings.theme);
}

function createSettingsRow(labelTextKey: string, descriptionTextKey: string, control: HTMLElement): HTMLElement {
  const row = document.createElement('div');
  row.className = 'settings-row';
  row.innerHTML = `
    <div class="settings-row-info">
      <label class="settings-row-label" data-translate-key="${labelTextKey}"></label>
      <p class="settings-row-description" data-translate-key="${descriptionTextKey}"></p>
    </div>
    <div class="settings-row-control"></div>
  `;
  row.querySelector('.settings-row-control')!.appendChild(control);
  return row;
}

function createToggleSwitch(id: string, checked: boolean): HTMLElement {
    const wrapper = document.createElement('label');
    wrapper.className = 'toggle-switch';
    wrapper.innerHTML = `
        <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
        <span class="toggle-slider"></span>
    `;
    return wrapper;
}

function populateSettingsModal() {
  settingsNavList.innerHTML = '';
  settingsContent.innerHTML = '';

  const settingsConfig = [
    { id: 'general', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.226.554-.22 1.19-.22 1.745 0 .55.219 1.02.684 1.11 1.226l.053.32a.75.75 0 001.263.395l.286-.286a.75.75 0 011.06.002l2.122 2.121a.75.75 0 01-.002 1.06l-.286.286a.75.75 0 00-.395 1.263l-.32.053c-.542.09-.997.56-1.226 1.11a41.036 41.036 0 010 1.745c.229.549.684 1.02 1.226 1.11l.32.053a.75.75 0 00.395 1.263l.286.286a.75.75 0 01.002 1.06l-2.121 2.122a.75.75 0 01-1.06.002l-.286-.286a.75.75 0 00-1.263.395l-.053.32c-.09.542-.56 1.007-1.11 1.226a41.036 41.036 0 01-1.745 0c-.549-.229-1.02-.684-1.11-1.226l-.053-.32a.75.75 0 00-1.263-.395l-.286.286a.75.75 0 01-1.06-.002l-2.121-2.122a.75.75 0 01.002-1.06l.286-.286a.75.75 0 00.395-1.263l.32-.053c.542-.09.997.56 1.226-1.11a41.036 41.036 0 010-1.745c-.229-.549-.684 1.02-1.226-1.11l-.32-.053a.75.75 0 00-.395-1.263l-.286-.286a.75.75 0 01-.002-1.06l2.121-2.122a.75.75 0 011.06.002l.286.286a.75.75 0 001.263.395l.053-.32zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>' },
    { id: 'theme', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' },
    { id: 'language', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>' },
    { id: 'notifications', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>' },
    { id: 'privacy', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>' },
    { id: 'subscription', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" /></svg>' },
    { id: 'ai', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.471-1.471L13 18.75l1.188-.648a2.25 2.25 0 011.471-1.471L16.25 15l.648 1.188a2.25 2.25 0 011.471 1.471L19.5 18.75l-1.188.648a2.25 2.25 0 01-1.471 1.471z" /></svg>' },
    { id: 'support', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>' },
  ];

  settingsConfig.forEach(({ id, icon }, index) => {
    // Nav Item
    const navItem = settingsNavItemTemplate.content.cloneNode(true) as DocumentFragment;
    const navButton = navItem.querySelector('.settings-nav-button') as HTMLButtonElement;
    navButton.dataset.targetPanel = `settings-${id}-panel`;
    navButton.querySelector('.nav-icon-container')!.innerHTML = icon;
    navButton.querySelector('.nav-text-container')!.setAttribute('data-translate-key', `settings-nav-${id}`);
    settingsNavList.appendChild(navItem);

    // Content Panel
    const panel = settingsContentPanelTemplate.content.cloneNode(true) as DocumentFragment;
    const panelDiv = panel.querySelector('.settings-content-panel') as HTMLDivElement;
    panelDiv.id = `settings-${id}-panel`;
    panelDiv.querySelector('h3')!.setAttribute('data-translate-key', `settings-${id}-title`);
    const panelContentContainer = panel.querySelector('.panel-content-container') as HTMLDivElement;

    // --- Populate specific panel content ---
    if (id === 'theme') {
      const row = createSettingsRow('settings-theme-select-label', 'settings-theme-select-desc', createThemeSelector());
      panelContentContainer.appendChild(row);
    } else if (id === 'language') {
      const row = createSettingsRow('settings-language-title', 'settings-language-desc', createLanguageSelector());
      panelContentContainer.appendChild(row);
    } else if (id === 'notifications') {
        panelContentContainer.appendChild(createSettingsRow('settings-notifications-sound-label', 'settings-notifications-sound-desc', createToggleSwitch('setting-sound-alerts', currentSettings.soundAlerts)));
        panelContentContainer.appendChild(createSettingsRow('settings-notifications-email-label', 'settings-notifications-email-desc', createToggleSwitch('setting-email-updates', currentSettings.emailUpdates)));
        panelContentContainer.appendChild(createSettingsRow('settings-notifications-activity-label', 'settings-notifications-activity-desc', createToggleSwitch('setting-activity-notifications', currentSettings.activityNotifications)));
    } else if (id === 'privacy') {
        panelContentContainer.appendChild(createSettingsRow('settings-privacy-cookies-label', 'settings-privacy-cookies-desc', createToggleSwitch('setting-allow-cookies', currentSettings.allowCookies)));
        panelContentContainer.appendChild(createSettingsRow('settings-privacy-ai-data-label', 'settings-privacy-ai-data-desc', createToggleSwitch('setting-ai-data-usage', currentSettings.aiDataUsage === 'allowed')));
    } else if (id === 'subscription') {
        const statusEl = document.createElement('div');
        statusEl.className = 'flex items-center gap-4';
        const statusText = document.createElement('span');
        statusText.className = 'font-semibold text-slate-700 dark:text-slate-300';
        statusText.dataset.translateKey = isSubscribed ? 'settings-subscription-status-premium' : 'settings-subscription-status-free';
        const manageButton = document.createElement('button');
        manageButton.className = 'btn-secondary h-auto py-2 px-4 w-auto';
        manageButton.dataset.translateKey = 'settings-subscription-manage-button';
        manageButton.onclick = () => showSubscriptionModal(true);
        statusEl.append(statusText, manageButton);
        panelContentContainer.appendChild(createSettingsRow('settings-subscription-status-label', '', statusEl));
    }
    // TODO: Add other panels (General, Account, AI, Support)
    
    settingsContent.appendChild(panel);

    if (index === 0) {
      navButton.classList.add('active');
      panelDiv.classList.add('active');
    }
  });

  applyTranslations();
}

function createThemeSelector(): HTMLElement {
    const select = document.createElement('select');
    select.id = 'setting-theme-select';
    select.className = 'app-input w-48';
    select.innerHTML = `
        <option value="light" data-translate-key="settings-theme-light"></option>
        <option value="dark" data-translate-key="settings-theme-dark"></option>
        <option value="system" data-translate-key="settings-theme-system"></option>
    `;
    select.value = currentSettings.theme;
    return select;
}

function createLanguageSelector(): HTMLElement {
    const select = document.createElement('select');
    select.id = 'setting-language-select';
    select.className = 'app-input w-48';
    select.innerHTML = `
        <option value="en" data-translate-key="lang-english"></option>
        <option value="fr" data-translate-key="lang-french"></option>
        <option value="ar" data-translate-key="lang-arabic"></option>
    `;
    select.value = currentSettings.language;
    return select;
}


function openSettingsModal() {
  populateSettingsModal();
  settingsModal.classList.remove('hidden');
}

function closeSettingsModal() {
  settingsModal.classList.add('hidden');
}

function handleSaveSettings() {
    // Theme
    const themeSelect = document.getElementById('setting-theme-select') as HTMLSelectElement;
    if(themeSelect) currentSettings.theme = themeSelect.value as 'light' | 'dark' | 'system';
    
    // Language
    const langSelect = document.getElementById('setting-language-select') as HTMLSelectElement;
    if(langSelect) currentSettings.language = langSelect.value as 'en' | 'fr' | 'ar';
    
    // Notifications
    const soundAlerts = document.getElementById('setting-sound-alerts') as HTMLInputElement;
    if (soundAlerts) currentSettings.soundAlerts = soundAlerts.checked;
    const emailUpdates = document.getElementById('setting-email-updates') as HTMLInputElement;
    if (emailUpdates) currentSettings.emailUpdates = emailUpdates.checked;
    const activityNotifications = document.getElementById('setting-activity-notifications') as HTMLInputElement;
    if (activityNotifications) currentSettings.activityNotifications = activityNotifications.checked;

    // Privacy
    const allowCookies = document.getElementById('setting-allow-cookies') as HTMLInputElement;
    if (allowCookies) currentSettings.allowCookies = allowCookies.checked;
    const aiDataUsage = document.getElementById('setting-ai-data-usage') as HTMLInputElement;
    if (aiDataUsage) currentSettings.aiDataUsage = aiDataUsage.checked ? 'allowed' : 'disallowed';

    saveSettings();
    applyTheme(currentSettings.theme);
    applyTranslations();
    showToast('toast-settings-saved', 'success');
    closeSettingsModal();
}

// --- Subscription Logic ---
function updateSubscriptionStatus(subscribed: boolean) {
    isSubscribed = subscribed;
    // Enable/disable 1080p video resolution
    const res1080p = document.querySelector('input[name="video-resolution"][value="1080p"]') as HTMLInputElement;
    res1080p.disabled = !subscribed;
    upgradeFor1080pButton.classList.toggle('hidden', subscribed);
    
    // Enable/disable premium voices
    upgradeForAudioVoiceButton.classList.toggle('hidden', subscribed);
    audioVoiceSelect.querySelectorAll('option').forEach(opt => {
        if (opt.textContent?.includes('👑')) {
            opt.disabled = !subscribed;
        }
    });

    // Reset selection if a premium voice was selected
    const selectedOption = audioVoiceSelect.options[audioVoiceSelect.selectedIndex];
    if (selectedOption.disabled) {
        audioVoiceSelect.value = 'Zephyr';
    }

    // Enable/disable video from image
    upgradeForVideoImageButton.classList.toggle('hidden', subscribed);
    uploadVideoImageButton.disabled = !subscribed;
    
    // Update badge (placeholder logic)
    videoTrialBadge.classList.toggle('hidden', subscribed || hasUsedVideoTrial);
}

function showSubscriptionModal(forceShow = false) {
    if (isSubscribed && !forceShow) {
        showToast('toast-already-subscribed', 'info');
        return;
    }
    subscriptionModal.classList.remove('hidden');
}


// --- Event Listeners ---
function addEventListeners() {
    // Header
    settingsButton.addEventListener('click', openSettingsModal);

    // View Navigation
    imageToolCard.addEventListener('click', () => showView('image'));
    videoToolCard.addEventListener('click', () => {
        if (!isSubscribed && !hasUsedVideoTrial) {
            trialModal.classList.remove('hidden');
        } else {
            showView('video');
        }
    });
    audioToolCard.addEventListener('click', () => showView('audio'));
    poemToolCard.addEventListener('click', () => showView('poem'));
    backToDashboardButton.addEventListener('click', () => showView('dashboard'));
    
    // Image Tool
    generateImageButton.addEventListener('click', handleImageGeneration);
    rerollImageButton.addEventListener('click', () => {
        if (lastImageGenerationParams) {
            promptEl.value = lastImageGenerationParams.prompt;
            negativePromptEl.value = lastImageGenerationParams.negativePrompt;
            (document.querySelector(`input[name="image-aspect-ratio"][value="${lastImageGenerationParams.aspectRatio}"]`) as HTMLInputElement).checked = true;
            (document.querySelector(`input[name="number-of-images"][value="${lastImageGenerationParams.numberOfImages}"]`) as HTMLInputElement).checked = true;
            handleImageGeneration();
        }
    });
    
    // Editor
    backToGenerateButton.addEventListener('click', hideEditor);
    applyEditButton.addEventListener('click', handleApplyEdit);
    uploadAndEditButton.addEventListener('click', () => uploadImageInput.click());
    uploadImageInput.addEventListener('change', async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            try {
                imageToEdit = await fileToBase64(file);
                showEditor();
            } catch (error) {
                showToast('toast-upload-fail', 'error');
            }
        }
    });
    
    // Modals
    // Subscription Modal
    subscriptionModalCloseButton.addEventListener('click', () => subscriptionModal.classList.add('hidden'));
    subscriptionModalBackdrop.addEventListener('click', () => subscriptionModal.classList.add('hidden'));
    subscribeButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateSubscriptionStatus(true);
            subscriptionModal.classList.add('hidden');
            showToast('toast-subscribed-success', 'success');
        });
    });
    upgradeFor1080pButton.addEventListener('click', () => showSubscriptionModal());
    upgradeForVideoImageButton.addEventListener('click', () => showSubscriptionModal());
    upgradeForAudioVoiceButton.addEventListener('click', () => showSubscriptionModal());

    // Video Tool
    generateVideoButton.addEventListener('click', handleVideoGeneration);
    uploadVideoImageButton.addEventListener('click', () => videoImageUploadInput.click());
    videoImageUploadInput.addEventListener('change', async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            try {
                const { data, mimeType } = await fileToBase64(file);
                videoToEdit = { data, mimeType };
                videoImagePreview.src = `data:${mimeType};base64,${data}`;
                videoImagePreviewContainer.classList.remove('hidden');
                uploadVideoImageButton.classList.add('hidden');
            } catch (error) {
                showToast('toast-upload-fail', 'error');
            }
        }
    });
    removeVideoImageButton.addEventListener('click', () => {
        videoToEdit = null;
        videoImageUploadInput.value = '';
        videoImagePreview.src = '';
        videoImagePreviewContainer.classList.add('hidden');
        uploadVideoImageButton.classList.remove('hidden');
    });
    downloadVideoButton.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = outputVideo.src;
        a.download = `stellar-ai-video-${Date.now()}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    deleteVideoButton.addEventListener('click', async () => {
         const confirmed = await showConfirmationModal(
            'confirm-delete-video-title', 
            'confirm-delete-video-desc'
        );
        if (confirmed) {
            resetVideoUI();
        }
    });

    // Audio Tool
    generateAudioButton.addEventListener('click', handleAudioGeneration);
    audioVoiceSelect.addEventListener('change', () => {
        const selectedOption = audioVoiceSelect.options[audioVoiceSelect.selectedIndex];
        if (selectedOption.disabled) {
            showSubscriptionModal();
        }
    });
    downloadAudioButton.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = outputAudio.src;
        a.download = `stellar-ai-audio-${Date.now()}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    deleteAudioButton.addEventListener('click', () => {
        outputAudio.src = '';
        outputAudio.classList.add('hidden');
        audioActions.classList.add('hidden');
        audioPlaceholder.classList.remove('hidden');
    });

    // Poem Tool
    generatePoemButton.addEventListener('click', handlePoemGeneration);
    copyPoemButton.addEventListener('click', () => {
        navigator.clipboard.writeText(outputPoem.textContent || '');
        showToast('toast-copied-success', 'success');
    });
    
    // Auth Modal
    authModalCloseButton.addEventListener('click', () => authModal.classList.add('hidden'));
    authModalBackdrop.addEventListener('click', () => authModal.classList.add('hidden'));
    signInButton.addEventListener('click', () => showAuthModal('login'));
    signUpButton.addEventListener('click', () => showAuthModal('signup'));
    
    // Prompt Suggestions Modal
    suggestPromptsButton.addEventListener('click', showPromptSuggestionsModal);
    promptSuggestionsCloseButton.addEventListener('click', () => promptSuggestionsModal.classList.add('hidden'));
    promptSuggestionsBackdrop.addEventListener('click', () => promptSuggestionsModal.classList.add('hidden'));
    
    // Trial Modal
    trialModalCloseButton.addEventListener('click', () => trialModal.classList.add('hidden'));
    trialModalBackdrop.addEventListener('click', () => trialModal.classList.add('hidden'));
    startTrialButton.addEventListener('click', () => {
        trialModal.classList.add('hidden');
        showView('video');
    });
    viewPlansButton.addEventListener('click', () => {
        trialModal.classList.add('hidden');
        showSubscriptionModal();
    });

    // Settings Modal
    settingsModalCloseButton.addEventListener('click', closeSettingsModal);
    settingsModalBackdrop.addEventListener('click', closeSettingsModal);
    saveSettingsButton.addEventListener('click', handleSaveSettings);
    cancelSettingsButton.addEventListener('click', closeSettingsModal);
    resetSettingsButton.addEventListener('click', () => {
        currentSettings = { ...defaultSettings };
        populateSettingsModal(); // Repopulate with defaults
    });
    settingsNavList.addEventListener('click', (e) => {
        const button = (e.target as HTMLElement).closest('.settings-nav-button');
        if (button) {
            settingsNavList.querySelectorAll('.settings-nav-button').forEach(btn => btn.classList.remove('active'));
            settingsContent.querySelectorAll('.settings-content-panel').forEach(panel => panel.classList.remove('active'));
            
            button.classList.add('active');
            const targetPanelId = button.getAttribute('data-target-panel');
            if(targetPanelId) {
                document.getElementById(targetPanelId)?.classList.add('active');
            }
        }
    });

    // Confirmation Modal
    confirmationModalCancelButton.addEventListener('click', () => {
        if(confirmationResolve) confirmationResolve(false);
        closeConfirmationModal();
    });
    confirmationModalConfirmButton.addEventListener('click', () => {
        if(confirmationResolve) confirmationResolve(true);
        closeConfirmationModal();
    });
    confirmationModalBackdrop.addEventListener('click', () => {
        if(confirmationResolve) confirmationResolve(false);
        closeConfirmationModal();
    });

    // Cross-Origin Modal
    coModalButton.addEventListener('click', () => {
        window.open(window.location.href, '_blank');
        coModal.classList.add('hidden');
    });

    // Profile Dropdown
    profileButton.addEventListener('click', () => profileDropdown.classList.toggle('hidden'));
    document.addEventListener('click', (e) => {
        if (!profileButton.contains(e.target as Node) && !profileDropdown.contains(e.target as Node)) {
            profileDropdown.classList.add('hidden');
        }
    });
    signOutButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleSignOut();
    });

    // Video History
    videoHistoryContainer.addEventListener('click', async (e) => {
        const button = (e.target as HTMLElement).closest('button');
        if (!button) return;

        const action = button.dataset.action;
        const id = parseInt(button.dataset.id || '', 10);
        const item = videoHistory.find(v => v.id === id);

        if (item && action === 'replay') {
            outputVideo.src = item.url;
            outputVideo.classList.remove('hidden');
            videoActions.classList.remove('hidden');
            videoPlaceholder.classList.add('hidden');
            videoProgressIndicator.classList.add('hidden');
        }
        
        if (item && action === 'delete') {
            const confirmed = await showConfirmationModal(
                'confirm-delete-video-title', 
                'confirm-delete-video-desc'
            );
            if (confirmed) {
                videoHistory = videoHistory.filter(v => v.id !== id);
                updateVideoHistoryUI();
                if (outputVideo.src === item.url) {
                    resetVideoUI();
                }
            }
        }
    });
}

// --- App Initialization ---
async function init() {
    // Check for cross-origin issues
    if (window.top !== window.self) {
        coModal.classList.remove('hidden');
    }

    loadSettings();
    applyTheme(currentSettings.theme);
    applyTranslations();

    addEventListeners();
    initializeGoogleSignIn();

    updateSubscriptionStatus(isSubscribed);

    if (currentSettings.startupBehavior === 'last_tool' && currentTool) {
        showView(currentTool as any);
    } else {
        showView('dashboard');
    }
}

init();
