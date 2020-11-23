const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

// choose the correct targetPath based on the environment chosen
const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  export const environment = {
    production: ${isProduction},
    firebaseConfig: {
        apiKey: "${process.env.FIREBASE_API_KEY.toString()}",
        authDomain: "${process.env.FIREBASE_AUTH_DOMAIN.toString()}",
        databaseURL: "${process.env.FIREABSE_DATABASE_URL.toString()}",
        projectId: "${process.env.FIREBASE_PROJECT_ID.toString()}",
        storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET.toString()}",
        messagingSenderId: "${process.env.FIREABASE_MESSAGING_SENDER_ID.toString()}",
        appId: "${process.env.FIREBASE_APP_ID.toString()}",
        measurementId: "${process.env.FIREBASE_MEASUREMENT_ID.toString()}",
    },
    themoviedbCongi: {
        apiKey: "${process.env.THEMOVIEDB_API_KEY.toString()}",
        apiURL: "${process.env.THEMOVIEDB_API_URL.toString()}",
        token: "${process.env.THEMOVIEDB_TOKEN.toString()}",
    },
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */
