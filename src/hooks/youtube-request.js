// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const strip_html_tags = str => {
  if (str === null || str === "") {
    return false;
  } else {
    str = str.toString();
    return str.replace(/<[^>]*>/g, "");
  }
};

module.exports = (options = {}) => {
  return async context => {
    let browser = undefined;
    const data = [];
    try {
      const { params } = context;

      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        "https://www.youtube.com/results?maxRequest=50&search_query=" +
          params.query.query
      );
      await page.evaluate(() => {
        return window.scrollTo(0, 10000000);
      });
      await page.evaluate(() => {
        return window.scrollTo(0, 20000000);
      });
      await page.evaluate(() => {
        return window.scrollTo(0, 30000000);
      });
      await page.evaluate(() => {
        return window.scrollTo(0, 40000000);
      });
      //await page.waitForSelector("ytd-video-renderer", { timeout: 1000 });
      const body = await page.evaluate(() => {
        return document.querySelector("body").innerHTML;
      });
      let $ = cheerio.load(body);

      const a = $("ytd-video-renderer");
      a.map((i, el) => {
        const video = {};
        const videoNode = $(el).find("a#video-title");
        const urlImgNode = $(el).find("yt-img-shadow img#img");
        const titleNode = $(el).find("yt-formatted-string#text");
        const channelNode = $(el).find(
          "a.yt-simple-endpoint.style-scope.yt-formatted-string"
        );
        const descriptionNode = $(el).find("#description-text");

        if (videoNode) {
          video.title = videoNode.attr("title");
          video.id = {
            kind: "youtube#video",
            videoId: videoNode.attr("href")
              ? videoNode.attr("href").split("?v=")[1]
              : ""
          };
        }
        video.kind = "youtube#searchResult";
        video.snippet = {
          channelTitle: titleNode.attr("title"),
          channelId: channelNode.attr("href").split("channel/")[1],
          description: strip_html_tags(descriptionNode.text()),
          liveBroadcastContent: "none",
          publishedAt: "2017-09-29T08:25:39.000Z",
          thumbnails: {
            default: {
              url:
                "https://i.ytimg.com/vi/" + video.id.videoId + "/default.jpg",
              width: 120,
              height: 90
            },
            high: {
              url:
                "https://i.ytimg.com/vi/" + video.id.videoId + "/hqdefault.jpg",
              width: 480,
              height: 360
            },
            medium: {
              url:
                "https://i.ytimg.com/vi/" + video.id.videoId + "/mqdefault.jpg",
              width: 320,
              height: 180
            }
          }
        };
        data.push(video);
      });
      context.result = {
        total: data.length,
        limit: data.length,
        skip: 0,
        data: data
      };

      await browser.close();
    } catch (e) {
      if (browser) {
        await browser.close();
      }
    }
    return context;
  };
};
