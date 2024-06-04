/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector'; // TODO: COMMENT IN FOR AUTH
import { CharacterId } from '../components/CharacterId';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> {/* gives children components access to user and auth methods */}
      <CharacterId>{/* children can get character ID passed to them */}
        <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
          component={Component}
          pageProps={pageProps}
        />
      </CharacterId>
    </AuthProvider>
  );
}

export default MyApp;
