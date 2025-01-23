import Layout from '@/app/layout';
import type { AppProps } from 'next/app'; // Import AppProps type

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;


// import Layout from '@/app/layout';
// import { AppProps } from 'next/app';  // Import the AppProps type

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// export default MyApp;

// // import Layout from '@/app/layout';

// // function MyApp({ Component, pageProps }: any) {
// //   return (
// //     <Layout>
// //       <Component {...pageProps} />
// //     </Layout>
// //   );
// // }

// // export default MyApp;
