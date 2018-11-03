import { version } from '../../package.json';
import { Router } from 'express';

/** @desv Views */
import UserView from './User';

export default ({ config }) => {
  const API = Router();

  // mount the test resource
  API.use('/users', UserView({ config }));

  // perhaps expose some API metadata at the root
  API.get('/', (req, res) => {
    res.json({ version });
  });

  return API;
};
