import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// jsdom de CRA 5 no incluye TextEncoder/TextDecoder; react-router 7 los usa.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
