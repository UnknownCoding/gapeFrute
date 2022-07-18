import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const Router = useRouter()

  return(
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    )
}

export default MyApp
