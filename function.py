import random
import string
import time
import json

class function:
    @staticmethod
    def generate_random_string(length=16):
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choice(characters) for _ in range(length))
        return random_string
    @staticmethod
    def user_is_online(self, id):
        if id in self.user_cache:
            return True
        else: 
            return False
    @staticmethod
    def user_cahce_write(self, id, room):
        self.user_cache[id] = {"last":int(time.time()), "room":room}
        return True
    @staticmethod
    def user_in_room(self, id):
        try:
            return self.user_cache[id]["room"]
        except:
            return False
    @staticmethod
    def card_list(self, room_id):
        card = []
        i=0
        for x in self.room_game[room_id]["fite_card"]:
            card.append({"id":x["id_card"], "nh":i})
            i=i+1
        return f"Fight_cards('{json.dumps(card)}', 2)"