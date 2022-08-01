---
title: CORONASTATS.CO
eventType: project
date: 2020-04-01
website: https://www.producthunt.com/products/coronavirus-statistics
image: isearthstillwarming
thumbnail: fire
excerpt: A Coronavirus Cases & News tracker built in React.js with a PHP & Postgres Backend. It was my excuse to learn React but ended up becoming product of the day on Product Hunt and reached hundereds of thousands of unique visitors.
tags: [react, php, postgres]
# , cypress
---

During 2020, when COVID-19 was yet to reach it's peak, I had a lot of free time and wanted to dabble in React.js. I'd always been a Vue and Angular user but wanted to give React a fair chance. I watched a crash course by [Traversy Media](https://youtube.com/traversymedia) and decided to work on a project. I wanted to build something related to the coronavirus that could be helpful / informative. CORONASTATS.CO was my excuse to learn React.

I parsed the data initially from [Worldometers](https://www.worldometers.info/) and later from many other websites to give extremely detailed and updated statistics for the coronavirus. I had cases per country, as-well as per city & province for some prominent countries (The US, India, The UK). I also had a news section that parsed links to news articles from various different websites. I used a cron-job to fetch new data every 15 minutes and generated a static site that was requested by the React App and all the data was presented in a good looking interface.

I had no hopes of it doing well but just to show it off, I posted the link on ProductHunt and Reddit and it blew up. I received hundereds of thousands of unique visitors and it became Product of the Day on Product Hunt. I also received more than $10,000 in donations and a large amount of users praised it as the best coronavirus tracker that exists at the time.