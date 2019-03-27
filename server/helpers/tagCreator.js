const Tag = require('../models/tag');
module.exports = (tags) => {
  let separateTags = tags.split(',');
  let uniqueObjectTags = {};
  separateTags.forEach(tag => {
    uniqueObjectTags[tag] = 0;
  });
  let uniqueArrayTags = Object.keys(uniqueObjectTags);
  let promiseTags = []
  uniqueArrayTags.forEach(tag => {
    promiseTags.push(new Promise ((resolve, reject) => {
      Tag
        .findOne({
          name: tag
        })
        .then((tagFound) => {
          if(tagFound) {
            resolve(tagFound._id)
          } else {
            Tag
              .create({
                name: tag
              })
              .then(tagCreate => {
                resolve(tagCreate._id)
              })
              .catch(error => {
                reject(error)
              })
              
          }
        })
        .catch(error => {
          reject(error)
        })
    }))
  })
  return Promise.all(promiseTags)
}