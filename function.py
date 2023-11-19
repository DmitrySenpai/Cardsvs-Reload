import random
import string
import json
import requests

class function:
    @staticmethod
    def generate_random_string(length=16):
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choice(characters) for _ in range(length))
        return random_string
    @staticmethod
    def user_in_room(self, id):
        try:
            return self.user_cache[id][1]["room"]
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
    @staticmethod
    def check_update(self):
        try:
            if json.loads(requests.get("https://api.github.com/repos/dmitrysenpai/Cardsvs-Reload/releases").content)[0]["tag_name"] != self.version:
                return True
            return False
        except:
            return False
    @staticmethod
    def chat_load(self):
        code = '$("#chat").html(""); '
        for x in self.cache_chat_global:
            code = code + f'Writemsg("{x["username"]}", "{self.function.html_special_chars(x["text"])}"); '
        
        return code + ' $(".chatblok").scrollTop(100000);'
    def html_special_chars(self, text):
        return text \
        .replace(u"&", u"&amp;") \
        .replace(u'"', u"&quot;") \
        .replace(u"'", u"&#039;") \
        .replace(u"<", u"&lt;") \
        .replace(u">", u"&gt;")