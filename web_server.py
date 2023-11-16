from flask import render_template, send_from_directory, request, make_response

class web_server:
    @staticmethod
    def start(self):
        @self.app.route('/')
        def index():
            return render_template("index.html", version=self.version)
        
        @self.app.route('/<path:filename>') 
        def send_file(filename): 
            return send_from_directory("static", filename)
        @self.app.route('/ajax', methods=['POST'])
        def ajax():
            if hasattr(self.ajax, request.form["act"]):
                print(self.user_cache)
                hash_del = False
                if request.cookies.get('hash'):
                    cache_user = self.cache.user_select_hash(self, request.cookies.get('hash'))
                    if cache_user:
                        get_user = cache_user
                    else:
                        get_user = self.database.user_get_hash(request.cookies.get('hash'))
                        if get_user:
                            self.cache.user_cahce_write(self, get_user[0])
                        else:
                            hash_del = True
                else:
                    get_user = False
                res = getattr(self.ajax, request.form["act"])(self, request.form, get_user)
                if hash_del:
                    res = make_response(res)
                    res.set_cookie('hash', '', expires=0)
                return res
            else:
                return "error"
        @self.app.route('/words')
        def words():
            text = "slovarv = new Array(); slovarv = ["
            for x in self.assest["words"]:
                text = text + f"'{x}', "
            text = text[:-2] + "]"
            return text
        @self.app.route('/card')
        def card():
            text = "slovar1 = new Array(); slovar1 = ["
            for x in self.assest["card"]:
                text = text + f"'{x}', "
            text = text[:-2] + "]"
            return text
        self.app.run(host=self.config["ip"], port=self.config["port"])