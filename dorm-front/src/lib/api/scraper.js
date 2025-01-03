const puppeteer = require("puppeteer");

async function scrapeDormitoryData(type) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // 대상 URL로 이동
  await page.goto(`https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=${type}`, {
    waitUntil: "domcontentloaded",
  });

  // 데이터 추출
  const data = await page.evaluate(() => {
    const result = {
      morning: [],
      lunch: [],
      evening: [],
      day: [],
    };

    // 아침 메뉴
    document.querySelectorAll(".morning").forEach((element) => {
      result.morning.push(element.innerText.trim());
    });

    // 점심 메뉴
    document.querySelectorAll(".lunch").forEach((element) => {
      result.lunch.push(element.innerText.trim());
    });

    // 저녁 메뉴
    document.querySelectorAll(".evening").forEach((element) => {
      result.evening.push(element.innerText.trim());
    });

    // 날짜
    document.querySelectorAll(".calendar_title").forEach((element) => {
      result.day.push(element.innerText.trim());
    });

    return result;
  });

  await browser.close();
  return data;
}

module.exports = { scrapeDormitoryData };
