import express from "express";
import * as puppeteer from "puppeteer";

const scrapperRouter = express.Router();

scrapperRouter.get("/", async (req, res) => {
  const { location } = req.query;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    `https://allevents.in/${location}/halloween?ref=cityhome-category-box-new`
  );

  const events = await page.evaluate(() => {
    const events: any = [];

    const eventNodes = document.querySelectorAll(".event-card");

    eventNodes.forEach((eventNode) => {
      // get the src attribute of the image
      const image = eventNode
        .querySelector("ul.resgrid-ul > li.box-link > .thumb > .card-img-top")
        ?.getAttribute("src");
      // get the title of the event
      const title = eventNode
        .querySelector(
          "ul.resgrid-ul > li.box-link > .meta > .meta-right > .title > .pull-left > a"
        )
        ?.getAttribute("title");
      //get link of the event
      const link = eventNode
        .querySelector(
          "ul.resgrid-ul > li.box-link > .meta > .meta-right > .title > .pull-left > a"
        )
        ?.getAttribute("href");
      //get date of the event
      const month = eventNode.querySelector(
        "ul.resgrid-ul > li.box-link > .meta > .meta-left > .up-month"
      )?.textContent;
      const day = eventNode.querySelector(
        "ul.resgrid-ul > li.box-link > .meta > .meta-left > .up-day"
      )?.textContent;

      events.push({
        image,
        title,
        link,
        month,
        day,
      });
    });

    return events;
  });

  await browser.close();

  res.send(events);
});

export default scrapperRouter;
