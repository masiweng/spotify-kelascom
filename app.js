import express from 'express';
import * as spotifyService from './services/spotify.js';

const app = express();
const router = express.Router();

router.get('/', spotifyService.getSpotify);
router.get('/callback', spotifyService.authSpotify);
router.get('/getme', spotifyService.getMe);
router.get('/audio-analysis', spotifyService.audioAnalysis);
router.get('/recomendations', spotifyService.recomendationsBased);
router.get('/playback-state', spotifyService.playbackState);

app.use('/', router);
app.listen(8379, () => {
  console.log('server running on http://localhost:8379');
})