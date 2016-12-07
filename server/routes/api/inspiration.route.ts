import * as fs from 'fs';
import * as express from 'express';
// import { Inspiration } from '../../model/inspiration';

const router = express.Router();

let inspirations = fs.readFileSync(`${__dirname}/inspirations.json`);
inspirations = JSON.parse(<any>inspirations);

router.get('/inspiration', (req: express.Request, res: express.Response) => {
  const inspirationIndex = Math.floor(Math.random() * inspirations.length);
  res.json({ data: inspirations[inspirationIndex] });
});

export default router;
