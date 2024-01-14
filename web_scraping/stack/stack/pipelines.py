import pymongo
from scrapy.exceptions import DropItem
from scrapy.utils import log

class MongoDBPipeline(object):

    def __init__(self, crawler):
        self.crawler = crawler
        connection = pymongo.MongoClient(
            crawler.settings.get('MONGODB_SERVER'),
            crawler.settings.getint('MONGODB_PORT')
        )
        db = connection[crawler.settings.get('MONGODB_DB')]
        self.collection = db[crawler.settings.get('MONGODB_COLLECTION')]

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler)

    def process_item(self, item, spider):
        valid = True
        for data in item:
            if not data:
                valid = False
                raise DropItem("Missing {0}!".format(data))
        if valid:
            self.collection.insert_one(dict(item))
            log.msg("Question added to MongoDB database!",
                    level=log.DEBUG, spider=spider)
        return item
