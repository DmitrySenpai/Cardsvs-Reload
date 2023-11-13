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
    def user_login(self, username, password):
        #"SELECT * FROM `user` WHERE `login`='".$login."' AND `password`='".$password."' LIMIT 1")
        rows = self.cursor.execute(f"SELECT * FROM user WHERE username='{username}' AND password='{password}'").fetchall()
        if len(rows) == 0:
            return False
        else:
            return True
    def user_set_hash(self, username, hash):
        #UPDATE `user` SET `room`='".$room."' WHERE `hash`='".$hash."'
        self.cursor.execute(f"UPDATE `user` SET `hash`='{hash}' WHERE `username`='{username}'")
        self.connection.commit()
        return True
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