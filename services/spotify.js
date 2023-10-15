import SpotifyWebApi from 'spotify-web-api-node';

var spotifyApi = new SpotifyWebApi({
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  redirectUri: 'http://localhost:8379/callback'
});

const token = "BQDobuvhOwW09uJrui8GxJtZ35BeB-MI20OZ8x1kuuy1HEjgS857T16ak34WpPj36khB5ykAeULpKCvfKnGhc2FLL-TIfSMCdIx6gryidKlKamF74G0xYqxqdkH7v1BX6BQQr9dPxqTjZvLbJ7irUKdGPGpd05ZlMzdi2-bNZxroHDFCLhn3oI0ogZ2MTKBw3K82JPvNxfP6gKTR1gKQDI4cccbWSuhaj2ruAU5Cg07V4yV8mP25n7Ybo2kw3_vUIWQxwvCUvStEvtIVrYEqwBHIbWws4yaXOr6YL0k0uT4Qf9sBo1OQw_4RvEV0HjeKAQwjSh2skRPmAspcGBGY";

export const getSpotify = (req, res, next) => {
  res.redirect(spotifyApi.createAuthorizeURL([
    "ugc-image-upload",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "app-remote-control",
    "playlist-modify-public",
    "user-modify-playback-state",
    "playlist-modify-private",
    "user-follow-modify",
    "user-read-currently-playing",
    "user-follow-read",
    "user-library-modify",
    "user-read-playback-position",
    "playlist-read-private",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "playlist-read-collaborative",
    "streaming"
  ]))
}

export const authSpotify = (req, res, next) => {
    spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
    res.send(JSON.stringify(response));
    spotifyApi.setAccessToken(token);
    spotifyApi.setRefreshToken();
  })
}

export const getMe = (req, res, next) => {
  spotifyApi.setAccessToken(token);
  spotifyApi.getMe().then(function(data) {
    // console.log('Some information about the authenticated user', data.body);
    res.send(`Halo ${data.body.display_name}. Selamat datang di Web API Spotify`)
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

export const audioAnalysis = (req, res, next) => {
  spotifyApi.setAccessToken(token);
  spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')
  .then(function(data) {
    res.send(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

export const recomendationsBased = (req, res, next) => {
  spotifyApi.setAccessToken(token);
  spotifyApi.getRecommendations({
    min_energy: 0.4,
    seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
    min_popularity: 50
    })
  .then(function(data) {
    let recommendations = data.body;
    res.send(recommendations)
  }, function(err) {
    console.log("Something went wrong!", err);
  });
}

export const playbackState = (req, res, next) => {
  spotifyApi.setAccessToken(token);
  spotifyApi.getMyCurrentPlaybackState()
  .then(function(data) {
    // Output items
    if (data.body && data.body.is_playing) {
      console.log("User is currently playing something!");
    } else {
      console.log("User is not playing anything, or doing so in private.");
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}