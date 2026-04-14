import { Leaves } from './paths.type';

import { Language } from '@generated';

interface AppCreatorProfile {
  link: string;
  referAs: string;
}

interface Form {
  submit: string
}
interface ProfileForm extends Form {
  email: string;
  username: string;
  password: string;
  walletAddress: string;
}

interface RegisterForm extends ProfileForm {
  repeatPassword: string;
}

export type Translator = (path: DictionaryLeaves) => string;

export interface LanguageOption {
  label: DictionaryLeaves;
  value: Language;
}

export interface Dictionary {
  global: {
    language: {
      en: string;
      es: string;
    },
    languagePrefix: {
      en: string;
      es: string;
    };
    error: {
      required: string;
      tooShort: string;
      tooLong: string;
      invalidString: string;
      invalidNumber: string;
      invalidEmail: string;
      invalidPassword: string;
      invalidConfirmPassword: string;
      specialCharacterRequired: string;
      numericDigitRequired: string;
      lowerCaseRequired: string;
      upperCaseRequired: string;
      notSpacesAndSpecialCharacters: string;
      defaultError: {
        title: string;
        message: string;
        button: string;
      };
      emailExistsException: {
        title: string;
        message: string;
        button: string;
      };
      usernameExistsException: {
        title: string;
        message: string;
        button: string;
      };
      notAuthorizedException: {
        title: string;
        message: string;
        button: string;
      };
    }
  };
  register: {
    title: string;
    form: RegisterForm & { optional: string };
    alreadyAnAccount: string;
  };
  forgotPassword: {
    title: string;
    sent: string;
    form: {
      email: string;
      submit: string;
      verificationCode: string;
      newPassword: string;
      repeatNewPassword: string;
    };
  };
  resetPassword: {
    title: string;
    submit: string;
    success: string;
    invalidToken: string;
  };
  contact: {
    title: string;
    description: string;
    sent: string;
    sentTitle: string;
    error: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    creator: {
      name: string;
      role: string;
      bio: string;
      scanToConnect: string;
      openLinkedIn: string;
    };
  };
  login: {
    title: string;
    form: {
      submit: string;
      email: string;
      password: string;
    };
    forgotPassword: string;
    verifyAccount: {
      title: string;
      description: string;
      form: {
        verificationCode: string;
        submit: string;
        sendNewCode: string;
      };
    };
    noAccount: string;
  };
  watchRegistry:{
    title: string;
    serialNumber: string;
    username: string;
    walletRequired: string;
    form:{
      register: string;
      cancel: string;
    }
  };
  transferWatch:{
    selectAWatch: string;
    serialNumber: string;
    newOwnerAccount: string;
    form:{
      transfer: string;
      cancel: string;
    }
    confirmTransferAction:{
      title: string;
      description: string;
      accept: string;
      cancel: string;
    }
    approvalRequired: string;
    errors: {
      selectWatch: string;
      enterNewOwner: string;
      userNotFound: string;
      transferFailed: string;
    }
  };
  ownershipHistory: {
    title: string;
    walletAddress: string;
    empty: string;
  };
  seeAWatch:{
    serialNumber: string;
    currentOwner: string;
    checkInfoOnBlockchain: string;
    ownershipOfAWatch: string;
    ipfsCertificate: string;
    viewOnIpfs: string;
    cid: string;
    you: string;
    nftStatus: string;
    tokenId: string;
    transaction: string;
    viewOnBasescan: string;
  };
  mintStatus:{
    pending: string;
    minted: string;
    failed: string;
  };
  approval:{
    title: string;
    description: string;
    connectToApprove: string;
    wrongAccount: string;
    checking: string;
    enabled: string;
    approve: string;
    approving: string;
    viewTx: string;
  };
  frontPage:{
    title: string;
    description: string;
  };
  checkAWatchOwnership:{
    title: string;
    description: string;
    serialNumber: string;
    check: string;
    searchBy: {
      serialNum: string;
      username: string;
      walletAddress: string;
      usernamePlaceholder: string;
      walletPlaceholder: string;
    };
    result:{
      walletOwner: string;
      username: string;
      email: string;
      ownerSince: string;
      watchFound: string;
      watchesFound: string;
    }
  };
  email:{
    //TODO define multiple email subjects and bodies to send to the user
  };
  dashboard: {
    noWatches: string;
    backToDashboard: string;
    owned: string;
    watchNotFound: string;
    metadataURI: string;
    ownershipHistoryPlaceholder: string;
    lookupError: string;
  };
  profile: {
    addWallet: string;
    saveWallet: string;
    cancel: string;
    walletPlaceholder: string;
    noWallet: string;
    email: string;
    wallet: string;
    walletTaken: string;
    walletError: string;
    walletWarning: string;
  };
  registerAWatchButton: string;
  transferAWatchButton: string;
  AppCreatorProfile: AppCreatorProfile;
  logoutMessage: string;
  connectWallet: string;
};


export type LanguageDictionary = {
  en: string,
  es: string;
}

export type DictionaryLeaves = Leaves<Dictionary, 4>;