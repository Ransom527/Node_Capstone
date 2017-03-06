Kitten.find({id: req.params.id}, function(err, kittens) {
  if (err) {
    console.log(err);
    return undefined;
  }
  return kittens;
});
