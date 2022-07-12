module.exports = {
    //add other configs here too
    env: {
      apiKey: process.env.DB_API_KEY,
      authDomain: process.env.DB_AUTH_DOMAIN,
      projectId: process.env.DB_PROJECT_ID,
      storageBucket: process.env.DB_STORAGE_BUCKET_ID,
      messagingSenderId: process.env.DB_MESSAGE_SEND_ID,
      appId: process.env.DB_APP_ID,
      measurementId: process.env.DB_MEASURE_ID,
      databaseURL: process.env.DB_URL,
      databaseCAPTCHAHTML: process.env.DB_CAPTCHA_HTML,
      databaseCAPTCHA: process.env.DB_CAPTCHA_PROVIDER,
      FirebaseToken: process.env.APP_CHECK_DEBUG_TOKEN_FROM_CI
    },
  }
  