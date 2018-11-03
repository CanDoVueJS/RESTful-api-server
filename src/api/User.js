import resource from 'resource-router-middleware';
import { User } from '../models';

export default ({ config }) => resource({
  id: 'User',
  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load (req, id, callback) {

  },
  /** GET / - List all entities */
  async index ({ params }, res) {
    User.findAll().then(users => {
      res.json(users);
    });
  },

  /** POST / - Create a new entity */
  create ({ body }, res) {
    // body.id = test.length.toString(36);
    // test.push(body);
    // res.json(body);
  },

  /** GET /:id - Return a given entity */
  read ({ facet }, res) {
    res.json(facet);
  },

  /** PUT /:id - Update a given entity */
  update ({ facet, body }, res) {
    // for (let key in body) {
    //   if (key !== 'id') {
    //     facet[key] = body[key];
    //   }
    // }
    // res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete ({ facet }, res) {
    // test.splice(test.indexOf(facet), 1);
    // res.sendStatus(204);
  },
});
