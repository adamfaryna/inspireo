import * as express from 'express';
import { InspirationService } from '../../services/inspiration.service';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  InspirationService.getInstance().getRandom()
    .then( inspiration => {
      res.json({ data: inspiration });
    }, console.log);
});

export const inspirationRouter = router;
