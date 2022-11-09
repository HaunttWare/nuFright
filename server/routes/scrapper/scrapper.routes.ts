import express from "express";
import * as puppeteer from "puppeteer";

const scrapperRouter = express.Router();

scrapperRouter.get("/", async (req, res) => {
  const { location } = req.query;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `https://allevents.in/${location}/halloween?ref=cityhome-category-box-new`
  );

  const events = await page.evaluate(() => {
    const events: any = [];

    const eventNodes = document.querySelectorAll(
      "#event_list > div.resgrid-row > ul > div > li.item.event-item.box-link.f"
    );

    eventNodes.forEach((eventNode) => {
      const image = eventNode
        .querySelector("div.thumb > img.card-img-top")
        ?.getAttribute("src");

      const title = eventNode
        .querySelector("div.meta > div > div.meta-right > div.title > div.pull-left > a")
        ?.getAttribute("title");

      const link = eventNode?.getAttribute("data-link");

      const month = eventNode.querySelector(
        "div.meta > div > div.meta-left > span.up-month"
      )?.textContent;

      const day = eventNode.querySelector(
        "div.meta > div > div.meta-left > span.up-day"
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
