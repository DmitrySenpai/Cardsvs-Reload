import threading
from flask import Flask
import json

from database import database
from command import command
from web_server import web_server
from ajax import ajax
from function import function
from room_system import room_system
from cache import cache
from smtp import smtp

class server:
    def __init__(self):
        with open('config.json', encoding='utf-8') as x:
            self.config = json.load(x)
        self.app = Flask(__name__)
        self.ajax = ajax()
        self.function = function()

        if len(self.config["SMTP_HOST"]) == 0 and len(self.config["SMTP_LOGIN"]) == 0:
            self.smtp = False
        else:
            self.smtp = smtp({
                "HOST": self.config["SMTP_HOST"],
                "HOST_PORT": self.config["SMTP_HOST_PORT"],
                "LOGIN": self.config["SMTP_LOGIN"],
                "PASSWORD": self.config["SMTP_PASSWORD"],
                "SSL": self.config["SMTP_SSL"],
                "FROM": self.config["SMTP_FROM"]
            })

        self.user_cache = {}
        self.cache = cache()

        self.database = database()
        self.command = command()
        self.assest = {}
        self.assest["card"] = []
        self.assest["words"] = []
        self.version = "1.4"

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

        self.cache_chat_global = []

    def cmd_input(self):
        while True:
            if self.server_shutdown == "True":
                break
            cmd = input().split(" ")
            if hasattr(self.command, cmd[0]):
                getattr(self.command, cmd[0])(self, cmd[1:])
            else:
                print("Такой команды нет. Попробуйте ввести \"help\", чтобы получить список доступных команд.")

    def run(self):
        self.cmdinput_thread = threading.Thread(target=self.cmd_input)
        self.cmdinput_thread.start()

        self.webserver = threading.Thread(target=self.web_server.start, args=[self])
        self.webserver.start()

        if self.function.check_update(self):
            print("\n\nВышла новая версия сервера 'Cardsvs-Reload'.\nСкачать вы можете тут: https://github.com/dmitrysenpai/Cardsvs-Reload/releases")

if __name__ == "__main__":
    server = server()
    server.run()