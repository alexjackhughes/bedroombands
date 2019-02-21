module.exports = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in!" });

  let myTracks = req.user.myTracks;

  if (myTracks.length < 1 || myTracks == undefined)
    return res.status(401).send({ error: "You don't have any tracks!" });

  let authorised = false;

  req.body.artists.map(track => {
    if (track == req.user._id) {
      console.log("waaaaaaay");
      authorised = true;
    }
  });

  if (!authorised) {
    return res.status(401).send({ error: "You don't own this track!" });
  } else {
    next();
  }
};
