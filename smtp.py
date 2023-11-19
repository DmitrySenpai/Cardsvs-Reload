import smtplib
from email.mime.text import MIMEText

class smtp:
    def __init__(self, args):
        if args["SSL"]:
            self.server = smtplib.SMTP_SSL(args["HOST"], args["HOST_PORT"])
        else:
            self.server = smtplib.SMTP(args["HOST"])
        self.server.login(args["LOGIN"], args["PASSWORD"])
        self.server_from = args["FROM"]

    def send(self, to, args):
        if args['type'] == "welcome":
            with open("mail_templates/welcome.html", 'r', encoding='utf8') as f:
                msg_content = f.read().format(USERNAME=args['username'], EMAIL=to, PASSWORD=args['password'])
            title_msg = 'Регистрация в игре Карты Против Всех'
        elif args['type'] == "password_reset":
            with open("mail_templates/password_reset.html", 'r', encoding='utf8') as f:
                msg_content = f.read().format(CODE=args["code"])
            title_msg = 'Восстановление пароля'
        message = MIMEText(msg_content, 'html')
        message['From'] = self.server_from
        message['Subject'] = title_msg
        msg_full = message.as_string()
        self.server.sendmail(self.server_from, to, msg_full)
