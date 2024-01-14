# Stack Overflow Web Scraper

Python program to scrape data from Stack Overflow to grab top 50 new questions (question title and URL). Scraped data then stored in MongoDB database and displayed via React App. 

Utilizing: 

- Python
- React
- Node.js
- Express.js
- MongoDB
- CORS

## Steps to run

1) 
a. Replace path to stack directory (index.js line 17) with your own path storing "stack"

b. Navigate to this directory and run `scrapy crawl stack`

---
2)
a. Download MongoDB Compass if not already downloaded

b. Copy connection string from MongoDB and replace (index.js line 13) if necessary

---
3)
a. `nodemon index.js` in server directory

b. `npm start` in client directory 

c. Reload to obtain and display new data from stackoverflow.com