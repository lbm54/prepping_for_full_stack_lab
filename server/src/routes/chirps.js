import {Router} from 'express';
let router = Router();
import chirpStore from '../../../chirpstore';

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    res.send((id) ? chirpStore.GetChirp(id) : chirpStore.GetChirps());
});

router.post('/', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.UpdateChirp(id, req.body);
    res.sendStatus(200);
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id);
    res.sendStatus(200);
})

export default router;