class cache:
    @staticmethod
    def user_cahce_write(self, args):
        if id not in self.user_cache:
            self.user_cache[x] = []
        for x in args:
            self.user_cache[args[0]].append(args)
        return True
    @staticmethod
    def user_select(self, id):
        if id in self.user_cache:
            return self.user_cache[id]
        return False
    @staticmethod
    def user_select_hash(self, hash):
        for x in list(self.user_cache):
            if self.user_cache[x][3] == hash:
                return self.user_cache[x]
        return False