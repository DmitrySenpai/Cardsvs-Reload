from flask import make_response, request
import re
import json
import hashlib
import time

class ajax:
    @staticmethod
    def load(self, args, get_user):
        if get_user:
            if get_user[0][0] in self.search_room:
                id_room = self.room_system.random_room(self)
                if id_room:
                    self.search_room.remove(get_user[0][0])
                    return self.room_system.join_room(self, id_room, get_user[0][0])
                else:
                    return "if (typeof room_search == 'undefined') { room_search=1; Main(1); Seachgame(1); };"
            else:
                id_room = self.function.user_in_room(self, get_user[0][0])
                if id_room:
                    self.user_cache[get_user[0][0]][1]["last"] = int(time.time())
                    room_get = self.room_game[id_room]
                    owner = 0
                    if room_get["owner"] == get_user[0][0]:
                        owner = 1
                    if room_get["status"] == "waiting":
                        return f'name="{get_user[0][1]}";Main(1);SeachFr("{id_room}", {len(room_get["player"])}, {owner})'
                    else:
                        statusroom = self.room_system.status_room(self, id_room, get_user[0][0])
                        if self.room_game[id_room]["status"] == "play":
                            main_load = ""
                        return f'name="{get_user[0][1]}";{main_load}{statusroom}'
                else:
                    return f'name="{get_user[0][1]}";Main(1)'
        else:
            return "Main(1)"
    @staticmethod
    def menuswich(self, args, get_user):
        if get_user[0][0] in self.search_room:
            return f"Smenu_sel={args['name1']}; Main(1); Seachgame(1);"
        else:
            return f"Smenu_sel={args['name1']}; Main(1)"
    @staticmethod
    def hod(self, args, get_user):
        id_room = self.function.user_in_room(self, get_user[0][0])

        if self.room_game[id_room]["status_2"] == "step":
            self.room_game[id_room]["fite_card"].append({"id_user": get_user[0][0], "id_card": self.room_game[id_room]["player"][get_user[0][0]]["card"][int(args["name1"])-1]["id"]})
            self.room_game[id_room]["player"][get_user[0][0]]["card"].pop(int(args["name1"])-1)
            return self.function.card_list(self, id_room)
        elif self.room_game[id_room]["status_2"] == "select" and self.room_game[id_room]["leading"] == get_user[0][0]:
            select_card = self.room_game[id_room]["fite_card"][int(args["name1"])]["id_user"]
            user = self.database.user_get_id(select_card)

            self.room_game[id_room]["timer"] = 10
            self.room_game[id_room]["status_2"] = "wait_2"
            self.room_game[id_room]["fite_card_sel"] = int(args["name1"])

            self.room_game[id_room]["player"][select_card]["source"] = self.room_game[id_room]["player"][select_card]["source"] + 1

            return "Razviazka(" + args["name1"] + ", 1); card_sel=" + args["name1"] + "; setTimeout(function () { Fight_cards('[]', 2); }, 1500);"
        else:
            return False
    @staticmethod
    def vhod(self, args, get_user):
        if self.database.user_login(args["name1"], hashlib.md5(args["name2"].encode()).hexdigest()):
            hash_new = self.function.generate_random_string()
            user_login = self.database.user_select_email(args["name1"])[0]
            response = make_response(f'name="{user_login[1]}";Main(1)')
            self.database.user_set_hash(user_login[1], hash_new)
            response.set_cookie('hash', hash_new)
            return response
        else:
            return 'alert("Не правильный логин или пароль!")'
    @staticmethod
    def exit(self, args, get_user):
        id_room = self.function.user_in_room(self, get_user[0][0])
        if id_room:
            self.room_game[id_room]["player"].pop(get_user[0][0])
            self.user_cache[get_user[0][0]]["room"] = False
            response = "Main(1)"
        else:
            response = make_response(f'name="";Main(1)')
            response.set_cookie('hash', '', expires=0)
        return response
    @staticmethod
    def otmena(self, args, get_user):
        if get_user[0][0] in self.search_room:
            self.search_room.remove(get_user[0][0])
        if get_user[0][0] in self.user_cache:
            self.user_cache[get_user[0][0]][1]["room"] = False

        return "Main(1)"
    @staticmethod
    def party_start(self, args, get_user):
        if args["name1"] == "true":
            id_room = self.function.user_in_room(self, get_user[0][0])
            #if self.room_game[id_room]["owner"] == get_user[0][0] and len(self.room_game[id_room]["player"]) <= 2:
            if self.room_game[id_room]["owner"] == get_user[0][0] and len(self.room_game[id_room]["player"]) >= 2:
                self.room_game[id_room]["status"] = "play"
                return "Fight(1, 1)"
            else:
                return "False"
        else:
            return "False"
    @staticmethod
    def seach(self, args, get_user):
        try:
            if args["name1"] == "party":
                id_room = self.room_system.create_room(self, get_user[0][0])
                return f"SeachFr('{id_room}', 1, 1)"
            else:
                return "1"
        except:
            self.search_room.append(get_user[0][0])
            return "Seachgame(1); room_search=1;"
    @staticmethod
    def reg(self, args, get_user):
        if not self.config["register"]:
            return "alert('Регистрация на сайте выключена администратором!')"

        data = json.loads(args["name1"])

        if len(data[0]) == 0 or len(data[1]) == 0 or len(data[2]) == 0:
            return "alert('Все поля должны быть заполнены!')"
        if not re.match(r'^[a-zA-Z0-9.,_-]+$', data[0]):
            return "alert('Ошибка регистрации, в нике должны быть только английские символы!')"
        if self.database.user_select(data[0]):
            return "alert('Этот ник уже используется!')"
        if not re.match(r"^[a-zA-Z0-9+._-]+@[a-zA-Z0-9+._-]+\.[a-zA-Z]+$", data[1]):
            return "alert('Email-адрес невалиден!')"
        if self.database.user_select_email(data[1]):
            return "alert('Этот email-адрес уже зарегистирован!')"
        if len(data[2]) < 8:
            return "alert('Пароль должен содержать больше 8 символов!')"
        
        if self.database.user_reg(data[0], data[1], hashlib.md5(data[2].encode()).hexdigest()):
            response = make_response("alert('Аккаунт был успешно создан!');location.reload();")
            hash_new = self.function.generate_random_string()
            self.database.user_set_hash(data[0], hash_new)
            response.set_cookie('hash', hash_new)
            return response