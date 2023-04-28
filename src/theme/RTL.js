import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {Helmet} from "react-helmet";

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function RTL(props) {
    return (
        <>
            <Helmet htmlAttributes={{lang: 'fa', dir: 'rtl'}}/>
            <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
        </>
    );
}