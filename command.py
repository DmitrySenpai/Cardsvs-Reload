import hashlib
import re


class command:
    @staticmethod
    def help(self, args):
        print("stop - выключает сервер\nsetpsswd <user_login> <password> - смена пароля\nnewuser <login> <email> <password> - создает нового пользователя\nregsystem - включает\\выключает регистарцию")
    #@staticmethod
    #def stop(self, args):
    #    self.server_shutdown = "True"
    #    for x in self.room_game.values():
    #        x["socket"].close()

    @staticmethod
    def setpsswd(self, args):
        if len(args) != 2:
            print("Не хватает аргументов!\nsetpsswd <user_login> <password>")
            return
        db_args = {"username": args[0], "password": f"'{hashlib.md5(args[1].encode()).hexdigest()}'"}
        if self.database.user_update(db_args):
            print("Выполнено")
        else:
            print("Произошла ошибка. Указанный пользовател не найден.")
    @staticmethod
    def newuser(self, args):
        if len(args) != 1:
            print("Не хватает аргументов!\nnewuser <user_login> <email> <password*>\n* - это параметр не объязательный.")
            return
        if not re.match(r"^[a-zA-Z]+$", args[0]):
            print("Ошибка регистрации, в нике должны быть только английские символы!")
            return
        if self.database.user_select(args[0]):
            print('Этот ник уже используется!')
            return
        if not re.match(r"^[a-zA-Z0-9+._-]+@[a-zA-Z0-9+._-]+\.[a-zA-Z]+$", args[1]):
            print('Email-адрес невалиден!')
            return
        if self.database.user_select_email(args[1]):
            print('Этот email-адрес уже зарегистирован!')
            return
        if len(args) == 3:
            password = args[3]
        else:
            password = self.function.generate_random_string(8)

        if self.database.user_reg(args[0], args[1], hashlib.md5(password.encode()).hexdigest()):
            if len(args) == 3:
                print("Пользователь успешно зарегистрирован")
            else:
                print(f"Пользователь успешно зарегистрирован.\nПароль: {password}")
        else:
            print("Произошла ошибка во время создание нового пользователя!")
    @staticmethod
    def regsystem(self, args):
        if not self.config["register"]:
            self.config["register"] = True
            print("Система регистрации включена")
        else:
            self.config["register"] = False
            print("Система регистрации выключена")