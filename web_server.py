from flask import render_template, send_from_directory, request

class web_server:
    @staticmethod
    def start(self):
        @self.app.route('/')
        def index():
            return render_template("index.html")
        
        @self.app.route('/<path:filename>') 
        def send_file(filename): 
            return send_from_directory("static", filename)
        @self.app.route('/ajax', methods=['POST'])
        def ajax():
            if hasattr(self.ajax, request.form["act"]):
                res = getattr(self.ajax, request.form["act"])(self, request.form)
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
        self.app.run()