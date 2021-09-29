import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Quicksand', sans-serif;
    }
    body {
        background-color: var(--main-background);
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    svg {
        flex-shrink: 0;
    }

    :root {
        --main-background: #EEEEEE;
        --secondary-background: #ffffff;
        --accent-color: #BA84D2;
        --accent-color-hover: #8b56a8;
    }
`;
