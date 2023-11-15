import sqlite3

class database:
    def __init__(self):
        self.connection = sqlite3.connect("database.db", check_same_thread=False)
        self.cursor = self.connection.cursor()
    def user_select(self, username):
        rows = self.cursor.execute(f"SELECT * FROM user WHERE username='{username}'").fetchall()
        if len(rows) == 0:
            return False
        return rows
    def user_select_email(self, email):
        rows = self.cursor.execute(f"SELECT * FROM user WHERE email='{email}'").fetchall()
        if len(rows) == 0:
            return False
        return rows
    def user_login(self, email, password):
        rows = self.cursor.execute(f"SELECT * FROM user WHERE email='{email}' AND password='{password}'").fetchall()
        if len(rows) == 0:
            return False
        else:
            return True
    def user_set_hash(self, username, hash):
        self.cursor.execute(f"UPDATE `user` SET `hash`='{hash}' WHERE `username`='{username}'")
        self.connection.commit()
        return True
    def user_update(self, args):
        try:
            data = ""
            for x in list(args):
                if x == "username": continue
                data = data + f"`{x}`={args[x]} "
            self.cursor.execute(f"UPDATE `user` SET {data}WHERE `username`='{args['username']}'")
            self.connection.commit()
            return True
        except:
            return False
    def user_get_id(self, id):
        rows = self.cursor.execute(f"SELECT * FROM user WHERE id='{id}'").fetchall()
        if len(rows) == 0:
            return False
        else:
            return rows[0]
    def user_get_hash(self, hash):
        rows = self.cursor.execute(f"SELECT * FROM user WHERE hash='{hash}'").fetchall()
        if len(rows) == 0:
            return False
        return rows
    def user_reg(self, username, email, password):
        rows = self.cursor.execute(f"INSERT INTO user (username, email, password) VALUES('{username}','{email}','{password}')")
        self.connection.commit()
        return True