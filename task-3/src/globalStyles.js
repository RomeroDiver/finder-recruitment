import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html, body {
        height: 100%;
    }

    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    #root {
        height: 100%;
    }
`;