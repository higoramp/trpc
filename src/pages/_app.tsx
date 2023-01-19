import React from 'react';
import type { AppType, AppProps } from 'next/app';
import { trpc } from '../utils/trpc';
import '../styles/index.css';

const MyApp: AppType = ({ Component, pageProps } : AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);


