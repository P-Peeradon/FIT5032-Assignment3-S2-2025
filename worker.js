import { httpServerHandler } from 'cloudflare:node';
import expressServer from './server.js'; // Import the Express server instance

export default httpServerHandler(expressServer);
