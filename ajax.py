from flask import make_response, request

class ajax:
    @staticmethod
    def load(self, args):
        get_user = self.database.user_get_hash(request.cookies.get('hash'))
        if get_user:
            if get_user[0][0] in self.search_room:
                id_room = self.room_system.random_room(self)
                if id_room:
                    self.search_room.remove(get_user[0][0])
                    return self.room_system.join_room(self, id_room, get_user[0][0])
                else:
                    return "1"
            else:
                id_room = self.function.user_in_room(self, get_user[0][0])
                if id_room:
                    room_get = self.room_game[id_room]
                    owner = 0
                    print(room_get)
                    if room_get["owner"] == get_user[0][0]:
                        owner = 1
                    if room_get["status"] == "waiting":
                        return f'name="{get_user[0][1]}";Main(1);SeachFr("{id_room}", {len(room_get["player"])}, {owner})'
                    else:
                        welcome = ""
                        #if room_get["player"][get_user[0][0]]["welcome"] == 0:
                        #    self.room_game[id_room]["player"][get_user[0][0]]["welcome"] = 1
                        #    welcome = "Fight_start();"
                        statusroom = self.room_system.status_room(self, id_room, get_user[0][0])
                        #main_load = "Main(1);"
                        if self.room_game[id_room]["status"] == "play":
                            main_load = ""
                        return f'name="{get_user[0][1]}";{main_load}{welcome}{statusroom}'
                else:
                    return f'name="{get_user[0][1]}";Main(1)'
        else:
            return "Main(1)"
    @staticmethod
    def hod(self, args):
        get_user = self.database.user_get_hash(request.cookies.get('hash'))
        id_room = self.function.user_in_room(self, get_user[0][0])

        if self.room_game[id_room]["status_2"] == "step":
            self.room_game[id_room]["fite_card"].append({"id_user": get_user[0][0], "id_card": self.room_game[id_room]["player"][get_user[0][0]]["card"][int(args["name1"])-1]["id"]})
            return self.function.card_list(self, id_room)
        elif self.room_game[id_room]["status_2"] == "select" and self.room_game[id_room]["leading"] == get_user[0][0]:
            select_card = self.room_game[id_room]["fite_card"][int(args["name1"])]["id_user"]
            user = self.database.user_get_id(select_card)

            self.room_game[id_room]["timer"] = 10
            self.room_game[id_room]["status_2"] = "wait_2"

            self.room_game[id_room]["player"][select_card]["source"] = self.room_game[id_room]["player"][select_card]["source"] + 1

            return "Razviazka(" + args["name1"] + ", 1); setTimeout(function () { Fight_cards('[]', 2); }, 1500);"
        else:
            return False
    @staticmethod
    def vhod(self, args):
        if self.database.user_login(args["name1"], args["name2"]):
            response = make_response(f'name="{args["name1"]}";Main(1)')
            hash_new = self.function.generate_random_string()
            self.database.user_set_hash(args["name1"], hash_new)
            response.set_cookie('hash', hash_new)
            return response
        else:
            return 'alert("Не правильный логин или пароль!")'
    @staticmethod
    def exit(self, args):
        response = make_response(f'name="";Main(1)')
        response.set_cookie('hash', '', expires=0)
        return response
    @staticmethod
    def otmena(self, args):
        get_user = self.database.user_get_hash(request.cookies.get('hash'))
        if get_user[0][0] in self.search_room:
            self.search_room.remove(get_user[0][0])
        if get_user[0][0] in self.user_cache:
            self.user_cache.pop(get_user[0][0])

        return "Main(1)"
    @staticmethod
    def party_start(self, args):
        get_user = self.database.user_get_hash(request.cookies.get('hash'))
        if args["name1"] == "true":
            id_room = self.function.user_in_room(self, get_user[0][0])
            if self.room_game[id_room]["owner"] == get_user[0][0]:
                self.room_game[id_room]["status"] = "play"
                return "Fight(1, 1)"
            else:
                return "False"
    @staticmethod
    def seach(self, args):
        get_user = self.database.user_get_hash(request.cookies.get('hash'))
        try:
            if args["name1"] == "party":
                id_room = self.room_system.create_room(self, get_user[0][0])
                return f"SeachFr('{id_room}', 1, 1)"
            else:
                return "1"
        except:
            self.search_room.append(get_user[0][0])
            return "Seachgame(1);"