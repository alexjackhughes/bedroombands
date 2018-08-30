module.exports = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in!" });

  let myTracks = req.user.myTracks;

  if (myTracks.length < 1 || myTracks == undefined)
    return res.status(401).send({ error: "You don't have any tracks!" });

  let check = true;
  myTracks.map((track) => {
    if(String(req.params.trackId) == String(track)) {
      check = false;
    }
  });

  if(check) {
    return res.status(401).send({ error: "You don't own this track!" });
  } else {
    next();
  }
};
