
import { Dictionary } from '@types';

export const EnglishDictionary: Dictionary = {
  global: {
    language: {
      en: 'English',
      es: 'Spanish',
    },
    languagePrefix: {
      en: 'EN',
      es: 'ES',
    },
    error: {
      required: 'Required',
      tooShort: 'More characters needed',
      tooLong: 'Less characters needed',
      invalidString: 'A text value is required',
      invalidNumber: 'A numeric value is required',
      invalidEmail: 'Email provided is not valid',
      invalidPassword: 'Password provided is not valid',
      invalidConfirmPassword: 'The passwords are not the same',
      specialCharacterRequired:
        'Special character required, like: (!, #, $, %, &, *)',
      numericDigitRequired:
        'Digit character required, like: (0, 1, 2, 3, 4, 5, 7, 8, 9)',
      lowerCaseRequired: 'Lower case needed',
      upperCaseRequired: 'Upper case needed',
      notSpacesAndSpecialCharacters:
        'Not white spaces and special character supported',
      defaultError: {
        title: 'Error',
        message: 'An error has occurred',
        button: 'Try again',
      },
      emailExistsException: {
        title: 'That email is already taken',
        message: 'Email already taken',
        button: 'Try again',
      },
      usernameExistsException: {
        title: 'That username is already taken',
        message: 'Username already taken',
        button: 'Try again',
      },
      notAuthorizedException: {
        title: 'Invalid Credentials',
        message: 'The email or password you provided is incorrect',
        button: 'Try again',
      },
    },
  },
  register: {
    title: 'Create account',
    form: {
      submit: 'Get started',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      walletAddress: 'Wallet address',
      repeatPassword: 'Repeat password',
      optional: 'optional',
    },
    alreadyAnAccount: 'Already an account? Sign in!',
  },
  forgotPassword: {
    title: 'Reset password',
    sent: "If an account exists for that email, we've sent a reset link.",
    form: {
      email: 'Email',
      submit: 'Send reset link',
      verificationCode: 'Verification code',
      newPassword: 'New password',
      repeatNewPassword: 'Repeat new password',
    },
  },
  resetPassword: {
    title: 'Set a new password',
    submit: 'Update password',
    success: 'Password updated. Redirecting to login…',
    invalidToken: 'This reset link is invalid or has expired.',
  },
  contact: {
    title: 'Contact us',
    description: 'Send a message to the app creator.',
    sent: 'Message sent. Thank you!',
    error: 'Failed to send message, please try again.',
    form: {
      name: 'Your name',
      email: 'Your email',
      message: 'Message',
      submit: 'Send message',
    },
  },
  login: {
    title: 'Log in',
    form: {
      submit: 'Log in',
      email: 'Email',
      password: 'Password',
    },
    forgotPassword: 'Forgot password?',
    verifyAccount: {
      title: 'Verify Account',
      description: 'Please check your email and validate your account',
      form: {
        verificationCode: 'Verification code',
        submit: 'Verify Account',
        sendNewCode: 'Send me a new code!',
      },
    },
    noAccount: 'Sign Up',
  },
  watchRegistry: {
    title: 'Register a Watch',
    serialNumber: 'Serial Number',
    username: 'Username',
    walletRequired: 'You need to add a wallet address to your profile before registering a watch.',
    form: {
      register: 'Register Watch',
      cancel: 'Cancel',
    },
  },
  transferWatch: {
    selectAWatch: 'Select a Watch',
    serialNumber: 'Serial Number',
    newOwnerAccount: 'New Owner Account',
    form: {
      transfer: 'Transfer Watch',
      cancel: 'Cancel',
    },
    confirmTransferAction: {
      title: 'Confirm Transfer',
      description:
        'Are you sure you want to transfer this watch to the new owner?',
      accept: 'Yes, transfer',
      cancel: 'Cancel',
    },
    errors: {
      selectWatch: 'Please select a watch',
      enterNewOwner: 'Please enter the new owner email',
      userNotFound: 'User not found with that email',
      transferFailed: 'Transfer failed, please try again',
    },
  },
  ownershipHistory: {
    title: 'Ownership History',
    walletAddress: 'Wallet Address',
  },
  seeAWatch: {
    serialNumber: 'Serial Number',
    currentOwner: 'Current Owner',
    checkInfoOnBlockchain: 'Check Info on Blockchain',
    ownershipOfAWatch: 'Ownership of a Watch',
    ipfsCertificate: 'IPFS Certificate',
    viewOnIpfs: 'View on IPFS',
    cid: 'CID',
  },
  frontPage: {
    title: 'Welcome to the Watch Registry',
    description:
      'Register, transfer, and verify the ownership of watches on the blockchain.',
  },
  checkAWatchOwnership: {
    title: 'Check Watch Ownership',
    description: 'Search by serial number, username, or wallet address',
    serialNumber: 'Serial Number',
    check: 'Check',
    searchBy: {
      serialNum: 'Serial Number',
      username: 'Username',
      walletAddress: 'Wallet',
      usernamePlaceholder: 'Enter username',
      walletPlaceholder: 'Enter wallet address',
    },
    result: {
      walletOwner: 'Wallet Owner',
      username: 'Username',
      email: 'Email',
      ownerSince: 'Owner Since',
      watchFound: 'watch found',
      watchesFound: 'watches found',
    },
  },
  email: {
    //TODO define multiple email subjects and bodies to send to the user
  },
  dashboard: {
    noWatches: "You don't have any watches registered yet.",
    backToDashboard: 'Back to Dashboard',
    owned: 'Owned',
    watchNotFound: 'Watch not found',
    metadataURI: 'Metadata URI',
    ownershipHistoryPlaceholder: 'Ownership history will be available once blockchain integration is complete.',
    lookupError: 'Watch not found or an error occurred.',
  },
  profile: {
    addWallet: 'Add Wallet',
    saveWallet: 'Save',
    cancel: 'Cancel',
    walletPlaceholder: '0x...',
    noWallet: 'No wallet address',
    email: 'Email',
    wallet: 'Wallet',
    walletTaken: 'This wallet address is already in use by another account',
    walletError: 'Failed to save wallet address, please try again',
    walletWarning: 'The wallet address cannot be changed after saving',
  },
  registerAWatchButton: 'Register a Watch',
  transferAWatchButton: 'Transfer a Watch',
  AppCreatorProfile: {
    link: "Link to creator's profile",
    referAs: 'Creator of the app',
  },
  logoutMessage: 'Log out',
  connectWallet: 'Connect Wallet',
};

export default EnglishDictionary