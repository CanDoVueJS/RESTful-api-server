import { version } from '../../package.json';
import { Router } from 'express';
import test from './Test';

export default ({ config, db }) => {
  const API = Router();

  // mount the test resource
  API.use('/test', test({ config, db }));

  // perhaps expose some API metadata at the root
  API.get('/', (req, res) => {
    res.json({ version });
  });

  return API;
};
