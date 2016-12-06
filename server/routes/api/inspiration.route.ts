import * as express from 'express';
import { Inspiration } from '../../model/inspiration';

const router = express.Router();

const inspirations = [
  new Inspiration('The best preparation for tomorrow is doing your best today. Read more at: https://www.brainyquote.com/quotes/topics/topic_inspirational.html', 'Focus'),
  new Inspiration('Ala ma kota', 'Alik')
];

router.get('/inspiration', (req: express.Request, res: express.Response) => {
  const inspirationIndex = Math.floor(Math.random() * inspirations.length);
  res.json(inspirations[inspirationIndex]);
});

export default router;
