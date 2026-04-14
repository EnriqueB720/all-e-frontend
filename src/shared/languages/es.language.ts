import { Dictionary } from '@types';


export const SpanishDictionary: Dictionary = {
  global: {
    language: {
      en: 'Inglés',
      es: 'Español',
    },
    languagePrefix: {
      en: 'EN',
      es: 'ES',
    },
    error: {
      required: 'Requerido',
      tooShort: 'Se necesitan más caracteres',
      tooLong: 'Se necesitan menos caracteres',
      invalidString: 'Se requiere un valor de texto',
      invalidNumber: 'Se requiere un valor numérico',
      invalidEmail: 'El correo electrónico no es válido',
      invalidPassword: 'La contraseña no es válida',
      invalidConfirmPassword: 'Las contraseñas no coinciden',
      specialCharacterRequired:
        'Se requiere un carácter especial, por ejemplo: (!, #, $, %, &, *)',
      numericDigitRequired:
        'Se requiere un número, por ejemplo: (0, 1, 2, 3, 4, 5, 7, 8, 9)',
      lowerCaseRequired: 'Se requiere una letra minúscula',
      upperCaseRequired: 'Se requiere una letra mayúscula',
      notSpacesAndSpecialCharacters:
        'No se permiten espacios en blanco ni caracteres especiales',
      defaultError: {
        title: 'Error',
        message: 'Ha ocurrido un error',
        button: 'Intentar de nuevo',
      },
      emailExistsException: {
        title: 'Ese correo electrónico ya está en uso',
        message: 'Correo electrónico ya registrado',
        button: 'Intentar de nuevo',
      },
      usernameExistsException: {
        title: 'Ese nombre de usuario ya está en uso',
        message: 'Nombre de usuario ya registrado',
        button: 'Intentar de nuevo',
      },
      notAuthorizedException: {
        title: 'Credenciales inválidas',
        message: 'El correo electrónico o la contraseña no son correctos',
        button: 'Intentar de nuevo',
      },
    },
  },
  register: {
    title: 'Crear cuenta',
    form: {
      submit: 'Comenzar',
      email: 'Correo electrónico',
      username: 'Nombre de usuario',
      password: 'Contraseña',
      walletAddress: 'Dirección de la billetera',
      repeatPassword: 'Repetir contraseña',
      optional: 'opcional',
    },
    alreadyAnAccount: '¿Ya tienes una cuenta? ¡Inicia sesión!',
  },
  forgotPassword: {
    title: 'Restablecer contraseña',
    sent: 'Si existe una cuenta con ese correo, te enviamos un enlace para restablecer.',
    form: {
      email: 'Correo electrónico',
      submit: 'Enviar enlace',
      verificationCode: 'Código de verificación',
      newPassword: 'Nueva contraseña',
      repeatNewPassword: 'Repetir nueva contraseña',
    },
  },
  resetPassword: {
    title: 'Establecer nueva contraseña',
    submit: 'Actualizar contraseña',
    success: 'Contraseña actualizada. Redirigiendo al inicio de sesión…',
    invalidToken: 'Este enlace no es válido o ha expirado.',
  },
  contact: {
    title: 'Contáctanos',
    description: 'Envía un mensaje al creador de la aplicación.',
    sent: 'Gracias por escribir — te responderé pronto.',
    sentTitle: '¡Mensaje enviado!',
    error: 'No se pudo enviar el mensaje, intenta de nuevo.',
    form: {
      name: 'Tu nombre',
      email: 'Tu correo electrónico',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
    },
    creator: {
      name: 'Enrique Barroso',
      role: 'Creador y desarrollador de All-E',
      bio: 'Ingeniero full-stack detrás de All-E. Los mensajes me llegan directamente — suelo responder en un par de días.',
      scanToConnect: 'Escanea para conectar en LinkedIn',
      openLinkedIn: 'Abrir perfil de LinkedIn',
    },
  },
  login: {
    title: 'Iniciar sesión',
    form: {
      submit: 'Entrar',
      email: 'Correo electrónico',
      password: 'Contraseña',
    },
    forgotPassword: '¿Olvidaste tu contraseña?',
    verifyAccount: {
      title: 'Verificar cuenta',
      description: 'Revisa tu correo electrónico y valida tu cuenta',
      form: {
        verificationCode: 'Código de verificación',
        submit: 'Verificar cuenta',
        sendNewCode: '¡Envíame un nuevo código!',
      },
    },
    noAccount: 'Regístrate',
  },
  watchRegistry: {
    title: 'Registrar un reloj',
    serialNumber: 'Número de serie',
    username: 'Nombre de usuario',
    walletRequired: 'Debes agregar una dirección de billetera a tu perfil antes de registrar un reloj.',
    form: {
      register: 'Registrar reloj',
      cancel: 'Cancelar',
    },
  },
  transferWatch: {
    selectAWatch: 'Selecciona un reloj',
    serialNumber: 'Número de serie',
    newOwnerAccount: 'Cuenta del nuevo propietario',
    form: {
      transfer: 'Transferir reloj',
      cancel: 'Cancelar',
    },
    confirmTransferAction: {
      title: 'Confirmar transferencia',
      description:
        '¿Estás seguro de que deseas transferir este reloj al nuevo propietario?',
      accept: 'Sí, transferir',
      cancel: 'Cancelar',
    },
    approvalRequired: 'Las transferencias en cadena requieren una aprobación única. Actívala abajo para continuar.',
    errors: {
      selectWatch: 'Por favor selecciona un reloj',
      enterNewOwner: 'Por favor ingresa el correo del nuevo propietario',
      userNotFound: 'No se encontró un usuario con ese correo',
      transferFailed: 'La transferencia falló, por favor intenta de nuevo',
    },
  },
  ownershipHistory: {
    title: 'Historial de propiedad',
    walletAddress: 'Dirección de la billetera',
    empty: 'Aún no se registraron cambios de propiedad.',
  },
  seeAWatch: {
    serialNumber: 'Número de serie',
    currentOwner: 'Propietario actual',
    checkInfoOnBlockchain: 'Ver información en blockchain',
    ownershipOfAWatch: 'Propiedad de un reloj',
    ipfsCertificate: 'Certificado IPFS',
    viewOnIpfs: 'Ver en IPFS',
    cid: 'CID',
    you: 'Tú',
    nftStatus: 'Estado del NFT',
    tokenId: 'Token ID',
    transaction: 'Transacción',
    viewOnBasescan: 'Ver en Basescan',
  },
  mintStatus: {
    pending: 'Minteo pendiente',
    minted: 'Minteado en cadena',
    failed: 'Falló el minteo',
    retry: 'Reintentar minteo',
    retrying: 'Reintentando...',
  },
  approval: {
    title: 'Transferencias en cadena',
    description: 'Autoriza a la app a mover tus NFTs en tu nombre. Firma única.',
    connectToApprove: 'Conecta tu billetera para habilitar transferencias.',
    wrongAccount: 'La billetera conectada no coincide con la de tu perfil.',
    checking: 'Verificando estado de aprobación...',
    enabled: 'Aprobaciones habilitadas',
    approve: 'Aprobar transferencias',
    approving: 'Aprobando...',
    viewTx: 'Ver tx de aprobación',
  },
  frontPage: {
    title: 'Bienvenido al Registro de Relojes',
    description:
      'Registra, transfiere y verifica la propiedad de relojes en la blockchain.',
  },
  checkAWatchOwnership: {
    title: 'Verificar propiedad de un reloj',
    description:
      'Busca por número de serie, nombre de usuario o dirección de billetera',
    serialNumber: 'Número de serie',
    check: 'Verificar',
    searchBy: {
      serialNum: 'Número de serie',
      username: 'Usuario',
      walletAddress: 'Billetera',
      usernamePlaceholder: 'Ingresa nombre de usuario',
      walletPlaceholder: 'Ingresa dirección de billetera',
    },
    result: {
      walletOwner: 'Propietario de la billetera',
      username: 'Nombre de usuario',
      email: 'Correo electrónico',
      ownerSince: 'Propietario desde',
      watchFound: 'reloj encontrado',
      watchesFound: 'relojes encontrados',
    },
  },
  email: {
    //TODO definir múltiples asuntos y cuerpos de correos para enviar al usuario
  },
  dashboard: {
    noWatches: 'Aún no tienes relojes registrados.',
    backToDashboard: 'Volver al panel',
    owned: 'Propiedad',
    watchNotFound: 'Reloj no encontrado',
    metadataURI: 'URI de metadatos',
    ownershipHistoryPlaceholder: 'El historial de propiedad estará disponible una vez que la integración con blockchain esté completa.',
    lookupError: 'Reloj no encontrado o ha ocurrido un error.',
  },
  profile: {
    addWallet: 'Agregar billetera',
    saveWallet: 'Guardar',
    cancel: 'Cancelar',
    walletPlaceholder: '0x...',
    noWallet: 'Sin dirección de billetera',
    email: 'Correo electrónico',
    wallet: 'Billetera',
    walletTaken: 'Esta dirección de billetera ya está en uso por otra cuenta',
    walletError: 'No se pudo guardar la dirección de billetera, intenta de nuevo',
    walletWarning: 'La dirección de billetera no se puede cambiar después de guardarla',
  },
  registerAWatchButton: 'Registrar un reloj',
  transferAWatchButton: 'Transferir un reloj',
  AppCreatorProfile: {
    link: 'Enlace al perfil del creador',
    referAs: 'Creador de la aplicación',
  },
  logoutMessage: 'Cerrar sesión',
  connectWallet: 'Conectar billetera',
};

export default SpanishDictionary