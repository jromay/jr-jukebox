const SongValidator = require('../services/songs/songs.validator');
const fs = require('fs');
const ytdl = require('ytdl-core');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

module.exports = (options = {}) => {
  return async context => {
    try {
      const { data } = context;
      let validation = await SongValidator.songValidator(data);
      if (validation !== true) {
        throw new Error(validation.message);
      }
      ytdl('http://www.youtube.com/watch?v=' + data.youtubeid, { filter: format => format.container === 'mp4', quality: 'highest' }).pipe(
        fs.createWriteStream('public/videos/' + data.year + '/' + data.youtubeid + '.mp4')
      );
      let name = data.name.trim();
      name = name.charAt(0).toUpperCase() + name.slice(1);
      let author = data.author.trim();
      author = author.charAt(0).toUpperCase() + author.slice(1);
      let tags = [];
      data.tags.forEach(element => {
        tags.push(element.trim().toUpperCase());
      });
      context.data = {
        name: name,
        author: author,
        initialName: name.charAt(0),
        initialAuthor: author.charAt(0),
        year: data.year,
        decade: (data.year % 100) - (data.year % 10),
        file: data.youtubeid,
        tags: tags
      };
      return context;
    } catch (error) {
      throw new Error('download-video hook: ' + error);
    }
  };
};
