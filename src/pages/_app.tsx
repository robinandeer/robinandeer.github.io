import '@reach/dialog/styles.css';
import '@reach/accordion/styles.css';
import '@reach/listbox/styles.css';
import '../styles/global.css';
import '../styles/highlightjs.atom-one-light.css';

import dynamic from 'next/dynamic';

const AppWithNoSSR = dynamic(import('components/app'), { ssr: false });
export default AppWithNoSSR;
