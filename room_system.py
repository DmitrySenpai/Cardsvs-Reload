import threading
import time
import random
import json
import random

class room_system:
    def room_system_event(self, id_room):
        while True:
            if self.server_shutdown == "True":
                break
            
            owner_random = False
            for x in list(self.room_game[id_room]["player"]):
                if not self.function.user_is_online(self, x) or self.function.user_in_room(self, x) != id_room:
                    self.room_game[id_room]["player"].pop(x)
                    if x == self.room_game[id_room]["owner"]:
                        owner_random = True
            if len(self.room_game[id_room]["player"]) == 0:
                break

            if owner_random:
                self.room_game[id_room]["owner"] = random.choice(list(self.room_game[id_room]["player"]))

            if self.room_game[id_room]["status"] == "play":
                for x in list(self.room_game[id_room]["player"]):
                    if len(self.room_game[id_room]["player"][x]["card"]) != 10:
                        while True:
                            if len(self.room_game[id_room]["player"][x]["card"]) == 10: break
                            self.room_game[id_room]["player"][x]["card"].append({"id": random.randint(0 , len(self.assest["card"])-1)})


            if self.room_game[id_room]["status"] == "play":
                if self.room_game[id_room]["word"] == -1:
                    self.room_game[id_room]["word"] = random.randint(0, len(self.assest["words"])-1)

                if len(self.room_game[id_room]["fite_card"]) == len(self.room_game[id_room]["player"])-1 and self.room_game[id_room]["status_2"] == "step":
                    self.room_game[id_room]["timer"] = 0

                if self.room_game[id_room]["timer"] == -1:
                    self.room_game[id_room]["timer"] = 25

                #Выходим из режима лобби
                if self.room_game[id_room]["status_2"] == "wait":
                    self.room_game[id_room]["status_2"] = "step"

                if self.room_game[id_room]["leading"] == 0:
                    self.room_game[id_room]["leading"] = random.choice(list(self.room_game[id_room]["player"]))

                if self.room_game[id_room]["timer"] == 0:
                    if self.room_game[id_room]["status_2"] == "step":
                        self.room_game[id_room]["status_2"] = "select"
                        self.room_game[id_room]["timer"] = 25
                    elif self.room_game[id_room]["status_2"] == "wait_2":
                        self.room_game[id_room]["word"] = -1
                        self.room_game[id_room]["timer"] = -1
                        self.room_game[id_room]["status_2"] = "step"
                        self.room_game[id_room]["round"] = self.room_game[id_room]["round"] + 1
                        self.room_game[id_room]["fite_card"] = []
                else:
                    self.room_game[id_room]["timer"] = self.room_game[id_room]["timer"] - 1
            
            time.sleep(1)
        self.room_game.pop(id_room)
    @staticmethod
    def create_room(self, id_owner):
        self.room_game[self.id_room] = {"owner": id_owner, "socket": "", "round": 1, "status": "waiting", "player": {}, "word": -1, "timer": -1, "status_2": "wait", "leading": 0, "fite_card": []}
        self.room_game[self.id_room]["player"][id_owner] = {"source": 0, "welcome": 0, "card": []}
        self.function.user_cahce_write(self, id_owner, self.id_room)
        self.id_room += 1

        self.room_thread = threading.Thread(target=room_system.room_system_event, args=(self, self.id_room-1))
        self.room_game[self.id_room-1]["socket"] = self.room_thread
        self.room_thread.start()

        return self.id_room-1
    @staticmethod
    def random_room(self):
        if len(self.room_game) == 0:
            return False
        return random.choice(list(self.room_game))
    @staticmethod
    def join_room(self, id_room, id_user):
        self.room_game[id_room]["player"][id_user] = {"source": 0, "welcome": 0, "card": []}
        if self.room_game[id_room]["owner"] == id_user:
            owner = 1
        else:
            owner = 0
        self.function.user_cahce_write(self, id_user, id_room)
        return f'Main(1);SeachFr("{id_room}", {len(self.room_game[id_room]["player"])}, {owner})'
    @staticmethod
    def status_room(self, room_id, user_id):
        lider_list = []
        for x in self.room_game[room_id]["player"]:
            lider_list.append({"t": 0, "name": self.database.user_get_id(x)[1], "ball":self.room_game[room_id]["player"][x]["source"]})
        
        
        #NewVed() - ведущий
        #timeh - время
        #TimerHod() - запускает таймер
        #Slovarnew() - загружает слова
        #vopros - Присваивает слово (int to array) AND NewHod()
        #Fight_cards('[{"id":1}, {"id":1}, {"id":1}, {"id":1}, {"id":1}, {"id":1}, {"id":1}, {"id":1}, {"id":1}, {"id":1}]', 1) - вывод карты
        #Fight('[{"t":1, "name":"user", "ball":2}]', 1) - Начинает матч. (ТАБЛИЦА ЛИДЕРОВ, ТИП(?))
        #gst
        #
        # Razviazka(0, 1) - показывает выбранную карту (КАРТА[0,...], игрок[0,1])
        # убираем все карты Fight_cards('[]', 2)
        #
        #   Razviazka(0, 1); setTimeout(function () { Fight_cards('[]', 2); }, 1500);
        #
        my_card = json.dumps(self.room_game[room_id]["player"][user_id]["card"])
        lider_list_d = f"'{json.dumps(lider_list)}'"
        card_list = self.function.card_list(self, room_id)
        card_count = len(self.room_game[room_id]["fite_card"])

        ved = "0"
        if self.room_game[room_id]["leading"] == user_id:
            ved = "1"

        code = f'vopros={self.room_game[room_id]["word"]};timeh={self.room_game[room_id]["timer"]};'
        code = code + "if (typeof round_get == 'undefined') { round_get=0 };"
        code = code + "if (typeof round_status == 'undefined') { round_status=0 };"
        code = code + "if (typeof card_count == 'undefined') { card_count=0 };"
        code = code + f"round_status='{self.room_game[room_id]['status_2']}';"
        code = code + "if(round_status == 'select') { gst=2; NewHod(); } else if (round_status == 'step') { gst=1 };"
        code = code + 'if(round_get!==' + str(self.room_game[room_id]["round"]) + ') { round_get=' + str(self.room_game[room_id]["round"]) + '; Main(1);'
        code = code + f'ved={ved};'
        code = code + f'Fight({lider_list_d}, 1); NewHod(); Razviazka_go2();'
        code = code + f"Fight_cards('{my_card}', 1);"
        code = code + 'NewVed("' + self.database.user_get_id(self.room_game[room_id]["leading"])[1] + '");'
        code = code + '};'
        code = code + "if (card_count !== " + str(card_count) + " ) { " + card_list + "; card_count=" + str(card_count) + " }"

        return code