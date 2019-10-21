const fs = require('fs');
const ytdl = require('ytdl-core');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

module.exports = (options = {}) => {
  return async context => {
    try {
      const { data } = context;
      ytdl('http://www.youtube.com/watch?v=' + data.youtubeid, { filter: format => format.container === 'mp4', quality: 'highest' }).pipe(
        fs.createWriteStream('public/videos/' + data.year + '/' + data.youtubeid + '.mp4')
      );
      let title = data.title.trim();
      title = title.charAt(0).toUpperCase() + title.slice(1);
      let author = data.author.trim();
      author = author.charAt(0).toUpperCase() + author.slice(1);
      let tags = [];
      data.tags.forEach(element => {
        tags.push(element.trim().toUpperCase());
      });
      context.data = {
        title: title,
        author: author,
        initialTitle: title.charAt(0),
        initialAuthor: author.charAt(0),
        year: data.year,
        decade: (data.year % 100) - (data.year % 10),
        language: data.language.trim().toUpperCase(),
        file: data.youtubeid,
        tag1: tags[0],
        tag2: tags[1],
        tag3: tags[2],
        tag4: tags[3]
      };
      return context;
    } catch (error) {
      throw new Error('download-video hook: ' + error);
    }
  };
};
