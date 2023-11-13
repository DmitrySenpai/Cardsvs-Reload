import threading
from flask import Flask, render_template

from database import database
from web_server import web_server
from ajax import ajax
from function import function
from room_system import room_system

class server:
    def __init__(self):
        self.app = Flask(__name__)
        self.ajax = ajax()
        self.function = function()
        self.user_cache = {}
        self.database = database()
        self.assest = {}
        self.assest["card"] = []
        self.assest["words"] = []

        with open('assest/card.txt', 'r', encoding='utf-8') as file:
            for line in file:
                self.assest["card"].append(line.strip())

        with open('assest/words.txt', 'r', encoding='utf-8') as file:
            for line in file:
                self.assest["words"].append(line.strip())

        self.room_game = {}
        self.search_room = []
        self.id_room = 1
        self.room_system = room_system()
        self.web_server = web_server()
        self.server_shutdown = "False"

    def run(self):
        self.webserver = threading.Thread(target=self.web_server.start, args=[self])
        self.webserver.start()

if __name__ == "__main__":
    server = server()
    server.run()