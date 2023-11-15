var _____WB$wombat$assign$function_____ = function (name) { return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function (obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  $(document).ready(function () {
    if (document.all) { StupedIE(); }
    localStorage.windowid = windowid;
    Load(1);
    timeAjax = setInterval("Load();", 2000);
    if ($("#start_text_1").height() > 40) { have_font = 0; }
  });

  var super_slowp = 1; //в глубокой норе слоупок жил, с нагрузкой на сервер он не дружил
  var version = "1.7";
  var have_font = 1;
  var id = 0;
  var windowid = randomNumber(1, 999999);
  var stat = [0, 0, 0]; //характеристики игрока
  var sound = 1; //играть ли игровые звуки?
  var music = 1; //играть ли музыку?
  var load_in_klik = false; // можно ли выполнить действие
  var load_in_process = false; // можно ли выполнять загрузку данных
  var name = '';
  var seach = ''; //метка времени для анимации поиска игры
  var timeh = 0; //время на ход
  var timedel = '' //метка времени для времени на ход
  var gst = 1;  //статус боя - 1 ходят игроки, 2 ходит ведущий
  var hod = 0; //ход игрока(выбранная карточка)
  var ved = 0; //ведущий ли игрок?
  var vopros = 0; //вопрос игрокам в бою
  var party = 0;
  var card_pul = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //карты в руке
  var skill = [0, 0]; //способности
  var skill_mod = 0; //активная способность
  var skill_mod2 = -1; //модификатор способности
  var skill_inp = ''; //что это?
  var guest_ved = 0;
  var Smenu_sel = 1;
  var notification_audio = new Audio('/sound/info.mp3');

  function Klik(tip, s1, s2, s3, s4, s5, s6) {
    if (!load_in_klik) {
      load_in_klik = true;
      s2 = s2 || 0;
      s3 = s3 || 0;
      s4 = s4 || 0;
      s5 = s5 || 0;
      s6 = s6 || 0;
      $.post("/ajax",
        {
          act: tip,
          name1: s1,
          name2: s2,
          name3: s3,
          name4: s4,
          name5: s5,
          name6: s6
        }, function (result) { load_in_klik = false; }, "script");
    }
  }

  function Load(s) {
    if (s != 1 && name == '') { if (super_slowp < 30) { super_slowp++; return; } else { super_slowp = 0; } }
    var s2, s3, vers;
    if (s == 1) { vers = version; s2 = localStorage.fastvhod; s4 = localStorage.fastid; }
    if (location.search) { s3 = location.search; }
    if (localStorage.windowid != windowid) { LossConnect(); }
    s2 = s2 || 0;
    $.post("/ajax",
      {
        act: "load",
        vers: vers,
        name1: s,
        name2: s2,
        name3: s3,
        name4: s4
      }, function (result) { }, "script");
  }

  function LossConnect() {
    clearInterval(timeAjax);
    $('body').html('<center><div class="serwernotwork_b1"><h3>Потеря подключения</h3>Соединение с сервером разорвано (одновременно может быть открыта только одна вкладка с игрой).</div></center>');
  }

  function Exitfast() {
    delete localStorage.fastvhod;
    delete localStorage.fastid;
  }

  function KnopkaIschezai(id) {
    $("#" + id).animate({ "opacity": "0" }, 600, 'swing', function () { });
  }

  function ProfilePlusWin(b, p) {
    Profile(1, b, p);
    var bprint = "+" + b;
    if (b == 1) { bprint += " очко"; } else if (b == 2 || b == 3 || b == 4) { bprint += " очка"; } else { bprint += " очков"; }
    var pprint = "+" + p + " победа";
    if (b) { $("#profile_x3").append('<input type=submit class="profile_me_k1" id="ffuu1"  onclick=KnopkaIschezai("ffuu1") value="' + bprint + '"></input>'); }
    if (p) { $("#profile_x4").append('<input type=submit class="profile_me_k1" id="ffuu2"  onclick=KnopkaIschezai("ffuu2") value="' + pprint + '"></input>'); }
  }

  function Profile(x, b, p) {
    var t_sh = 100;
    if (x) {

      $("#content").prepend('<div class="profile_me" id="profile_me"><div class="profile_me_b1">Очков:</div><div class="profile_me_b2" id="profile_x1">' + (stat[0] - b) + '</div><div class="profile_me_b3" id="profile_x3"></div><div class="profile_me_b1">Побед:</div><div class="profile_me_b2" id="profile_x2">' + (stat[1] - p) + '</div><div class="profile_me_b3" id="profile_x4"></div><div class="profile_me_b1">Статус:</div><div class="profile_me_b4" id="profile_x3">' + stat[2] + '</div></div>');
      $("#profile_me").animate({ "margin-top": "-25px" }, 600, 'swing', function () {

        if (b || p) {
          var timepls = 100;

          for (i = 1; i <= b; i++) {
            setTimeout(function () { $("#profile_x1").html($("#profile_x1").html() - 0 + 1); }, i * t_sh);
          }

          if (p) { setTimeout(function () { $("#profile_x2").html($("#profile_x2").html() - 0 + 1); }, b * t_sh + t_sh); }

          var t_kn = b * t_sh + 2000;
          if (p) {
            setTimeout(function () {
              $("#ffuu2").animate({ "opacity": "0" }, 600, 'swing', function () {
                $("#ffuu1").animate({ "opacity": "0" }, 600, 'swing', function () { });
              });
            }, t_kn);

          } else {
            setTimeout(function () { $("#ffuu1").animate({ "opacity": "0" }, 600, 'swing', function () { }); }, t_kn);
          }

          setTimeout("Profile(0);", t_kn + 900 + 600 * p);

        }

      });

    } else {
      $("#profile_me").animate({ "margin-top": "-132px" }, 600, 'swing', function () { $(this).remove() });
    }
  }

  function ProfileUpdate(x1, x2, x3) {
    stat[0] = x1;
    stat[1] = x2;
    stat[2] = x3;
  }

  function StatUpdate(x1, x2, x3) {
    $("#stat_x1").html(x1);
    $("#stat_x2").html(x2);
    $("#stat_x3").html(x3);
  }

  function WritemsgHelp(msg) {
    msg = '<div class=chat_msg style="font-weight:bold;">' + msg + '</div>';
    $("#chat").html($("#chat").html() + msg);

    $('.chatblok').scrollTop(100000);
  }

  function Sendmsg() {
    if ($("#message").val()) {
      Klik('chat', '', '', $("#message").val(), 0);
      $("#message").val('');
    }
    $('.chatblok').scrollTop(100000);
    return false;
  }

  function Writemsg(msg) {
    f = $("#chat").scrollTop();
    ff = $("#chat").get(0).scrollHeight - chat.clientHeight;

    $("#chat").html($("#chat").html() + msg);
    if (f == ff) { $('.chatblok').scrollTop(100000); }
  }

  function SMenu(mst, x) {
    switch (mst) {
      case 1:
        text = '<div class="content1_b1">Как играть?</div><div class="content1_b2">1. Каждый раунд разыгрывается вопрос.</div><div class="content1_b2">2. Из своих карт, вам нужно выбрать самый смешной ответ.</div><div class="content1_b2">3. Ведущий выбирает из предложенных вариантов самый смешной на его взгляд. Этот игрок получает 1 очко.</div><div class="content1_b2">4. Далее ведущим становится следующий игрок.</div><div class="content1_b2">5. Игрок, набравший 10 очков, побеждает.</div>';
        break;
      case 2:
        var usrs = jQuery.parseJSON(x);
        var kol = usrs.length;
        text = '<div class="content1_b1">Онлайн:</div>';
        for (j = 0; j < 1; j++) {
          for (i = 0; i < kol; i++) {
            if (usrs[i]['t'] != 0) {
              var star2 = '<span style="background:url(img/star' + usrs[i]['t'] + '.png);height:17px;width:17px;float:left;margin:-3px 3px 0 -4px;"></span>';
            } else { star2 = ''; }
            text += '<div class="usrs_bl_0"><div class="usrs_bl_1">' + star2 + '<span style="float:left;">' + usrs[i]['n'] + '</span></div><div class="usrs_bl_2"> [' + usrs[i]['z'] + ']</div></div>';
          }
        }
        break;
      case 3:
        var usrs = jQuery.parseJSON(x);
        var kol = usrs.length;
        text = '<div class="content1_b1">Топ игроков:</div>';
        for (i = 0; i < kol; i++) {
          if (i == 0) { usrs[i]['n'] += ''; }
          if (i < 3) {
            var star2 = '<span style="background:url(img/star' + (i + 1) + '.png);height:17px;width:17px;float:right;margin:-3px 3px 0 -4px;"></span>';
          } else {
            star2 = '';
          }
          text += "<div class='usrs_bl1'><div class='usrs_bl1_b1'><span id='tname_h_" + i + "' style='float:left;'>" + (i + 1) + ". " + usrs[i]['n'] + "</span>" + star2 + "</div><div class='usrs_bl1_b2' style='width:" + ((111 * usrs[i]['r']) / usrs[0]['r']) + "px'>" + usrs[i]['r'] + "</div></div>";
        }
        break;
      case 4:
        var stl_pls = ['', '']; if (have_font < 1) { stl_pls[0] = 'font-size:14px;'; stl_pls[1] = 'font-size:12px;'; }
        text = '<div class="content1_b1">Разработчики:</div><div class="razrab_b1"' + stl_pls[0] + '"><div><b>Сергей Андреев</b><br><i>я очень занят, еду на вело-<br>сипеде под дождем</i></div><div class="razrab_p1">Идея, дизайн, реклама и продвижение</div></div><div class="razrab_b1"><div><b>Александр Румянцев</b><br><i>а может на другом хости-<br>нге все само починится?</i><div>Программирование, верстка, тестирование</div></div></div>';
        break;
    }

    $(".prootsup20").css({ "color": "#808080" });
    $("#m_super_ikonka_" + mst).css({ "border": "1px solid #333333", "color": "#333333" });
    $("#content1").html('<div class="content_mb1_1">' + text + '</div>');

    if (mst == 3) {
      for (i = 0; i < kol; i++) {
        if (i < 3) { var max = 113; } else { var max = 128; }
        for (j = 0; $("#tname_h_" + i).width() > max; j++) {
          //alert($("#tname_h_"+i).innerWidth());
          $("#tname_h_" + i).html((i + 1) + ". " + usrs[i]['n'].slice(0, -2 - j) + "..");
        }
      }
    }


  }

  function SMenuUpdate(x) {
    //SMenu();
  }

  function Budilnick() {
    //$.ionSound.play("door_bell");
    notification_audio.play();
    alert("Игра началась!");
  }

  function SuperAnimate() {
    $("#fite_blsr1").animate({ "margin-top": "15px" }, 600, 'swing', function () {
      $("#fite_blsr1").animate({ "margin-top": "20px" }, 600, 'swing', function () { });
    });
  }

  function FiteRezult(namewin, nbonus) {
    clearTimeout(timedel);
    var text = '';
    var wintext = ["", "молодец, возьми с полки пирожок", "пришел, увидел, победил", "нет ничего слаще вкуса победы", "АХАХАХ, Я ПОБЕДИЛ!1 Сасайте лалки!!1)0"]
    var feiltext = ["", "когда я проигрываю партию, я чувствую себя королем, который подает нищему", "всякая победа начинается с поражения", "главное не победа, а участие", "азазаза, лалка, затралено)011))", "я ими всеми побежден, и только в том моя победа", "когда кто-то проигрывает, кто-то проигрывает"]
    var randfr = 0;
    if (name == namewin) {
      randfr = randomNumber(1, wintext.length - 1);
      text = wintext[randfr];
    } else {
      randfr = randomNumber(1, feiltext.length - 1);
      text = feiltext[randfr];
    }

    var spell = ['', '<div id="spell_k1" style="margin:0 5px 0 6px;background:#FFFFFF;border: 1px solid #000000;float:left;position:relative;" class="spell_k1_b2"><div id="spell_k1i1s" class="spell_k1_b3"><div class="spell_k1_b4" style="margin:8px 0px 0px 3px;background:none;"><i style="color:#000000;" class="spell_k1_b5 fa fa-refresh"></i></div></div></div><div class="spell1ii">сброс<br>карт</div>', '<div style="margin:0 5px 0 6px;background:#FFFFFF;border: 1px solid #000000;text-align:center;float:left;position:relative;"  class="spell_k1_b2"><div id="spell_k2i1s" class="spell_k1_b3">!</div></div><div class="spell1ii">пустая<br>карта</div>'];

    var bonus = '<div style="margin: 20px 0 0 0px;"><button style="" id="end_bonus" class="end_bonus animated bounce2" onclick="KnopkaIschezai(\'end_bonus\')";><div style="float:left;font-size:18px;line-height:38px;">вы получили: </div>' + spell[nbonus] + '<div style="float:left;font-size:18px;line-height:38px;">1 шт.</div></button></div>';

    if (!nbonus) {
      $("#fite_card2_m").html('<div class="fite_rez_b1"><div class="fite_rez1">ПОБЕДИТЕЛЬ:</div><div class="fite_rez2">' + namewin + '</div><div class="fite_rez3">' + text + '</div><div class="fite_rez4" style="margin-top:15px;">Новая игра начнется через: <div id="next_game"></div></div></div>');
    } else {

      if (name == namewin || randfr != 1) {
        $("#fite_card2_m").html('<div class="fite_rez_b1"><div class="fite_rez1" style="margin-top:30px;">ПОБЕДИТЕЛЬ:</div><div class="fite_rez2" style="margin-top:15px;">' + namewin + '</div><div class="fite_rez3" style="margin-top:15px;">' + text + '</div>' + bonus + '</div>');
      } else {
        $("#fite_card2_m").html('<div class="fite_rez_b1"><div class="fite_rez1" style="margin-top:20px;">ПОБЕДИТЕЛЬ:</div><div class="fite_rez2" style="margin-top:12px;">' + namewin + '</div><div class="fite_rez3" style="margin-top:12px;">' + text + '</div>' + bonus + '</div>');
      }

    }

    $("#msg_what_usr_do").css({ "margin": "0px 0px 0px 20px" });
    $("#msg_what_usr_do").html('<input type=submit class="fite_rez_k2"  onclick=Klik("fite_rez_exit") value="вернуться в лобби"></input>');
    $("#fite_timer").html('');
    $("#fite_blsr1_b5").css({ 'display': 'none' });

  }

  function Razviazka(n, ni) {
    var text = $("#fite_card_" + n + "_2_text").html();
    if (text[text.length - 1] == '.') { text = text.slice(0, -1); }

    var pron = n;
    if (n >= 5) {
      //pron-=5; 
      pron = 0;
    }
    var sm = 190 + 150 * pron;
    for (i = 0; i < 10; i++) { if (i != n) { $("#fite_card_" + i + "_2").animate({ "opacity": "0" }, "slow", 'swing', function () { }); } }
    setTimeout(function () {
      if (n >= 5) {
        $("#fite_card_" + n + "_2").animate({ "margin-top": "-130px" }, 600, 'swing', function () {
          $("#fite_card_" + n + "_2").css({ "position": "absolute", "margin-top": "0px" });
          $("#fite_card_" + n + "_2").animate({ "margin-left": "-" + sm + "px" }, 600, 'swing', function () {
            PlusBall(ni);
            $("#razviazka").html(text);
            $("#fite_card_" + n + "_2").animate({ "opacity": "0" }, "slow", 'swing', function () {
            });
          });
        });
      } else {
        $("#fite_card_" + n + "_2").animate({ "margin-left": "-" + sm + "px" }, "slow", 'swing', function () {
          PlusBall(ni);
          $("#razviazka").html(text);
          $("#fite_card_" + n + "_2").animate({ "opacity": "0" }, "slow", 'swing', function () {
          });
        });
      }
    }, 600);
  }

  function Razviazka_go() {
    if (gst == 3) {
      $("#mysupershadow1").animate({ "opacity": "0" }, "slow", 'swing', function () { $("#mysupershadow1").remove(); });
      $("#fite_vopros").animate({ "margin-left": "960px", "opacity": "0" }, "slow", 'swing', function () {
      });
    }
  }

  function Razviazka_go2() {
    $("#fite_vopros").css({ "opacity": "0", "margin-left": "-200px" });
    $("#fite_vopros").animate({ "margin-left": "0px", "opacity": "1" }, "slow", 'swing', function () { });
  }

  function PlusBall(n) {
    x1 = "0.1";
    var newball = $("#fite_usr_ball_" + n).html() - 0 + 1;
    SuperShadow("0.1", newball);

    if (newball < 10) {
      setTimeout(function () { Razviazka_go(); }, 6000);
    }

    function SuperShadow(x1, z) {
      if (z) { $("#fite_usr_ball_" + n).html(z); }
      if (x1 == 0) { $("#fite_usr_" + n).css({ "text-shadow": "" }); } else {

        $("#fite_usr_" + n).append('<div id="mysupershadow1" class="fite_usr_b1" style="position:absolute;">' + $("#fite_usr_" + n).html() + '</div>');
        $("#mysupershadow1").css({ "text-shadow": "0 0 " + x1 + "em #FFFFFF, 0 0 " + x1 + "em #FFFFFF, 0 0 " + x1 + "em #FFFFFF, 0 0 " + x1 + "em #FFFFFF, 0 0 " + x1 + "em #FFFFFF, 0 0 " + x1 + "em #FFFFFF" });

      }
    }

  }


  function NewVed(text) {
    $("#fite_ved").html(text);
  }

  function NewHod() {
    $("#vopros1").html(slovarv[vopros]);
    if (gst == 1) {
      if (ved) {
        $("#msg_what_usr_do").html('Подождите пока игроки выбирают ответы');
      } else {
        $("#msg_what_usr_do").html('Выберите ответ');
      }
    } else if (gst == 2) {
      if (ved) {
        $("#msg_what_usr_do").html('Выберите самый лучший вариант!');
      } else { $("#msg_what_usr_do").html('Ходит "Ведущий"! Подождите'); }
    } else if (gst == 4) {
      $("#msg_what_usr_do").html('В студию приглашается гостевой ведущий!');
    } else {
      $("#msg_what_usr_do").html('...');
    }

    TimerHod()
  }

  function TimerHod() {
    if (timedel) { clearTimeout(timedel); }
    $("#fite_timer").html(timeh); //setTimeout(SeachgameProTimer,500);
    timeh--;
    timedel = setTimeout(TimerHod, 1000);
  }



  function SaveReg() {
    Klik("reg", JSON.stringify([$("#reg_name").val(), $("#reg_email").val(), $("#reg_password").val()]));
    //Klik("reg", $("#reg_name").val(), $("#reg_email").val(), $("#reg_password").val());
  }

  function Text(text) {
    f: alert(text);

  }

  function Vhod(name) {
    $("#content2").html('<div class="content2_vhod"><form action="#" autocomplete="off"><div class="content2_vhod_b1">почта:</div><input type=text id=reg_email maxlength=50 class="content2_vhod_b2"></input><div class="content2_vhod_b1">пароль:</div><input type=password id=reg_password maxlength=15 class="content2_vhod_b2"></input><input type=submit class="content2_k1" onclick=\'Klik("vhod",$("#reg_email").val(),$("#reg_password").val()); return false\' value=Войти></input></form><div class="content2_vhod_b3" onclick="RestorePass()" style="">Восстановить пароль</div></div><div class="content2_b2">или</div><div class="main_scr2" onclick="Reg();">ЗАРЕГИСТРИРОВАТЬСЯ</div>');
  }

  function Capcha() {
    var tt = '<img src="capcha_test2.php?id=' + randomNumber(1, 999999) + '" >';

    $("body").prepend('<div id="donat_kol1" class="seach_game" style="width:220px;height:200px;text-align:center;position:absolute;z-index:101;top: 0; left: 0; bottom: 0; right: 0;margin:200px auto 0px;"><div class="seach_fr_b1">Введите текст с картинки</div><input type=number maxlength=50 class="seach_fr_scr" style="float:left;width:200px;margin:15px 5px 10px 10px;"></input>' + tt + '<input type=submit class="seach_fr_k2" onclick=Donat_otmena() value="Ок"></input></div> <div id="donat_fon1"></div>');

  }

  function RestorePass(step) {
    if (!step) {
      $("#content2").html('<div class="content2_vhod"><span style="float:left;margin:10px 0 5px 0;">Укажите почту, на которую регистрировался аккаунт</span><form action="#" autocomplete="off"><div class="content2_vhod_b1">почта:</div><input type=text id=reg_email maxlength=50 class="content2_vhod_b2"></input><div class="captcha"></div><input type=submit class="content2_k1"  onclick=\'Klik("password_reset_1",$("#reg_email").val()); return false\' value=Отправить&nbsp;код></input></form></div><div class="content2_b2"></div><div class="main_scr2" onclick=Vhod();>Назад</div>');
    }
    if (step == 1) {
      //Klik("vhod",$("#reg_code").val(),$("#reg_password").val()); return false
      $("#content2").html('<div class="content2_vhod" style="height:200px;"><span style="float:left;margin:10px 0 5px 0;">Мы отправили вам на почту код, пожалуйста введите его и ваш новый пароль</span><form action="#" autocomplete="off"><div class="content2_vhod_b1">код:</div><input type=text id=reg_code maxlength=50 class="content2_vhod_b2"></input><div class="content2_vhod_b1">пароль:</div><input type=text id=reg_password maxlength=15 class="content2_vhod_b2"></input><input type=submit class="content2_k1"  onclick=\'Klik("password_reset_2",$("#reg_code").val(),$("#reg_password").val()); return false\' value=Сменить&nbsp;пароль></input></form></div><div class="content2_b2"></div><div class="main_scr2" onclick=Vhod();>Назад</div>');
    }
    if (step == 2) {
      $("#content2").html('<div class="content2_vhod"><span style="float:left;margin:10px 0 5px 0;"><center>Пароль успешно изменен, теперь вы можете войти в игру используя новые данные.</center></span></div><div class="content2_b2"></div><div class="main_scr2" onclick=Vhod();>Назад</div>');
    }
    if (step == 3) {
      Vhod();// сразу залогиниваемся
      alert("Ваш пароль успешно изменен!");
    }

  }

  function Exit() {
    delete localStorage.fastvhod;
    delete localStorage.fastid;
    Klik("exit");
  }

  function Fight_cards(d, tip, jnew) {
    var cards_m = jQuery.parseJSON(d);
    var kol = cards_m.length;
    var rez = ''; var supi = 0; var mklick = '';
    var style_pls = ''; var card_null = []; var card_null_k = 0; var card_kol = 0;
    var text = '';
    var dk = 0;
    if (tip == 2) { cards_m.sort(sorter); }
    for (i = 0; i < kol; i++) {
      if (cards_m[i].id) {
        card_kol++;
        id = 'fite_card_' + i + '_' + tip;
        if (tip == 2) {
          supi = cards_m[i].nh; mklick = "2";
        } else {
          supi = i; mklick = ""; if (gst == 1 && !card_pul[i]) { style_pls = "opacity:0;"; } else { style_pls = ""; }
        }
        if (cards_m[i].t != undefined) { text = cards_m[i].t; style_pls += "word-wrap:break-word;"; dk = 1; } else { text = slovar1[cards_m[i].id]; }
        rez += '<div class="fite_card' + mklick + '" id="' + id + '" style="' + style_pls + '" onclick="Cardklik' + mklick + '(\'' + supi + '\',\'' + slovar1[cards_m[i].id] + '\',\'' + tip + '\',' + dk + ')" onmouseover=Avklik("' + id + '",1,' + tip + ',' + i + ') onmouseout=Avklik("' + id + '",0,' + tip + ',' + i + ')><div class="fite_card_text" id="' + id + '_text">' + text + '</div></div>';
      } else {
        rez += '<div style="height:118px;width:138px;float:left;border:1px solid black;margin:0 10px 10px 0;cursor:default;opacity:0;"></div>';
      }
      if (tip == 1) { if (!card_pul[i]) { card_null[card_null_k] = i; card_null_k++; } card_pul[i] = cards_m[i].id; }
    }

    if (tip == 1) {
      if (jnew) {
        $("#fite_card_m").html('<div class="fite_napominalka">*Вы только что присоединились к идущей игре.<br>Пожалуйста подождите начала нового раунда</div>'); $("#msg_what_usr_do").append('*'); $("#msg_what_usr_do").css({ "opacity": "0.5" });
      } else {
        $("#fite_card_m").html(rez);
      }
    } else { $("#fite_card2_m").html(rez); }

    if (gst == 1 && tip == 1) {
      setTimeout(function () {
        var i = 0;
        var tip_aa = 'animated fadeInRightBig';
        var time = 80;
        if (card_null_k > 0) { $('#fite_card_' + card_null[i] + '_1').addClass(tip_aa); i++; }

        var card_anim_1 = setInterval(function () {
          if (i >= card_null_k) {
            clearInterval(card_anim_1);
            if (!ved) {
              setTimeout(function () { $('.fite_card').css({ 'opacity': '1' }); $('.fite_card').removeClass(tip_aa); $('.fite_card').addClass('animated bounce2'); }, 800);
            }
          } else {
            $('#fite_card_' + card_null[i] + '_1').addClass(tip_aa); i++;
          }
        }, time);

      }, 1);

    }

    if (gst == 2 && tip == 2 && ved) { $('.fite_card2').addClass('animated bounce2'); }
    function sorter(a, b) { var res = a['nh'] - b['nh']; return res; }

    if (skill_mod > 0 && skill_mod < 20 && tip == 1) { Cards_drop(); }
    if (skill_mod == 20 && tip == 1) { EmptyCards(); }
    if (skill_mod > 20 && skill_mod < 40 && tip == 1) {

      EmptyCards();
      EmptyCards_go(skill_mod - 21);
      $('#wite_cards').val(skill_inp);

    }
  }

  function Fight_start() {
    Budilnick();
    WritemsgHelp('Вы вошли в чат-комнату игры! Игроки в лобби не будут видеть ваши сообщения.');
  }

  function Fight(d, tip) {
    var fight_m = jQuery.parseJSON(d);
    var kol = fight_m.length;
    var usr_rez = '';
    var b1_rez = '';
    var card_rez = '';

    if (tip) {
      card_pul = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (skill_mod > 20 && skill_mod < 40) { skill_inp = $('#wite_cards').val(); }

    for (i = 0; i < kol; i++) {
      if (fight_m[i].t != 0) {
        var star = '<span style="background:url(img/star' + fight_m[i].t + 'f.png);height:17px;width:17px;float:left;margin:2px 3px 0 -4px;"></span>';
      } else {
        star = '';
      }
      usr_rez += '<div class="fite_usr_b1" id="fite_usr_' + i + '"><div class="fite_usr_name"><span style="float:left;height:20px;line-height:21px;">' + star + fight_m[i].name + '</span></div><div class="fite_usr_ball" id="fite_usr_ball_' + i + '" style="height:20px;line-height:21px;">' + fight_m[i].ball + '</div></div>';
    }

    var stl_pls = '';
    if (have_font < 1) { stl_pls = 'style="font-size:14px;"'; }

    //новые иконки
    var spkl1 = '<div id="spell_k_n1" class="spell_k1_b7">' + skill[0] + '</div>';
    var spkl2 = '<div id="spell_k_n2" class="spell_k1_b7">' + skill[1] + '</div>';
    var spell1 = '<div id="spell_k1" onmouseover="Card_drop_a(1,1)" onmouseout="Card_drop_a(0,1)" style="margin: 7px 0px 0px 100px;cursor:pointer;" onclick=Klik("cards_drop") class="spell_k1_b2"><div id="spell_k1i1s" class="spell_k1_b3"><div class="spell_k1_b4" style="margin:8px 0px 0px 3px;background:none;"><i class="spell_k1_b5 fa fa-refresh"></i></div></div>' + spkl1 + '</div>';
    var spell2 = '<div id="spell_k2" onmouseover="Card_drop_a(1,2)" onmouseout="Card_drop_a(0,2)" style="margin: 7px 0px 0px 150px;cursor:pointer;" onclick=Klik("empty_card") class="spell_k1_b2"><div id="spell_k2i1s" class="spell_k1_b3">!</div>' + spkl2 + '</div>';

    var stl_pls2 = '';
    var kittycat = '<div style="top:100%;left:50%;border:solid transparent;height:0;width:0;position:absolute;pointer-events:none;"></div>';
    var cat_help = '<div id="donat_text1" class="katkitty" ' + stl_pls2 + '>сброс карт</div>';
    //

    usr_rez = '<div class="fite_usr_m"><div class="fite_usr_h">Игроки:</div><div class="granicsa_g"></div>' + usr_rez + '</div>'
    card_rez = '<div class="fite_card_m" id="fite_card_m"></div>';
    b1_rez = '<div class="fite_blsr1" id="fite_blsr1"><div class="fite_blsr1_b1b2"><div class="fite_blsr1_b1" >ВЕДУЩИЙ:</div><div class="fite_blsr1_b2" id="fite_ved" >name</div></div><div class="granicsa_v"></div><div class="fite_blsr1_b3b4">' + cat_help + '<div class="fite_blsr1_b5" id="fite_blsr1_b5">' + spell1 + spell2 + '</div><div class="fite_blsr1_b3" id="msg_what_usr_do">Выберите ответ</div><div class="fite_blsr1_b4" id="fite_timer"></div></div></div>'
    vopros_rez = '<div class="fite_usr_m" id="fite_vopros"><div class="fite_usr_h" id="vopros1"></div></div>'
    card2_rez = '<div class="fite_card_m" id="fite_card2_m"></div>';

    $("#content").html('<div class="fite_m"><div class="fite_m_b1">' + vopros_rez + card2_rez + '</div>' + b1_rez + '<div class="fite_m_b2">' + usr_rez + card_rez + '</div></div>');
    $("#content").removeClass("content_notfite");
    $("#content").addClass("content_fite");

    if (gst == 4) { Guest_help2(1, guest_ved, '', 1); }
  }

  function Seachgame(kol) {
    clearTimeout(seach);
    $("#content2").html('<div class="seach_game"><div class="seach_b1">Идет поиск</div><div class="seach_b2" id="seach_b2"></div><br><input type=submit class="seach_k1"  onclick=Klik("otmena") value="отмена"></input></div>');
    SeachgameProTimer();
  }

  function SeachgameProTimer() {
    switch ($("#seach_b2").html()) {
      case "":
        $("#seach_b2").html('.'); seach = setTimeout(SeachgameProTimer, 500);
        break;
      case ".":
        $("#seach_b2").html('..'); seach = setTimeout(SeachgameProTimer, 500);
        break;
      case "..":
        $("#seach_b2").html('...'); seach = setTimeout(SeachgameProTimer, 500);
        break;
      case "...":
        $("#seach_b2").html(''); seach = setTimeout(SeachgameProTimer, 500);
        break;
    }
  }

  function SeachFr(id, kol, master) {
    clearTimeout(seach);
    if (master > 0) {
      if (kol > 2) {
        button_a = "1"
      } else {
        button_a = "0.2"
      }
      var text = '<input type=submit style="opacity: ' + button_a + '" class="seach_fr_k1" onclick=Klik("party_start",$("#party_chk").prop("checked")) value="Начать игру"></input><input type=submit class="seach_fr_k2"  onclick=Klik("otmena") value="отмена"></input>';
    } else {
      var text = '<input type=submit class="seach_fr_k2" style="float:none;margin:40px 0 0 0;" onclick=Klik("otmena") value="отмена"></input>';
      var mstl1 = 'margin-top:10px;';
      var mstl2 = 'display:none;';
    }
    var stl_pls = '';
    if (have_font < 1) { stl_pls = 'style="font-size:18px;"'; }
    $("#content2").html('<div class="seach_game"><div class="seach_fr_b1" ' + stl_pls + '>Чтобы сыграть с друзьями, отправьте им эту ссылку:</div><input type=text maxlength=50 class="seach_fr_scr" value="http://' + location.hostname + location.pathname + '?party=' + id + '" readonly></input><div id="seach_user_kol" class="seach_b3" style="' + mstl1 + '">Игроков: ' + kol + '/8</div><div class="seach_b2" id="seach_b2" style="height:20px;line-height:20px;"></div><div class="seach_fr_b2" style="' + mstl2 + '"><input id="party_chk" type="checkbox" checked>разрешить присоединяться другим игрокам</div>' + text + '</div>');
    SeachgameProTimer();
  }

  function Reg() {
    $("#content2").html('<div class="content2_vhod" style="height:179px;"><form action="#" autocomplete="off"><div class="content2_vhod_b1">имя:</div><input type=text id=reg_name maxlength=15 class="content2_vhod_b2"></input><div class="content2_vhod_b1">почта:</div><input type=text id=reg_email maxlength=50 class="content2_vhod_b2"></input><div class="content2_vhod_b1">пароль:</div><input type=password id=reg_password maxlength=15 class="content2_vhod_b2"></input><input type=submit class="content2_k1"  onclick=\'SaveReg(); return false\' value=Зарегистрироваться></input></form></div><div class="content2_b2">или</div><div class="main_scr2" onclick=Vhod("name");>ВОЙТИ</div>');
  }


  function Main(first) {
    var mm = '<i id="m_super_ikonka_1" class="fa fa-graduation-cap prootsup20" style="border:1px solid #000000;color:#333333;border-radius:5px 0 0 5px;" onclick=Klik("menuswich",1)></i><i id="m_super_ikonka_2" class="fa fa-group prootsup20" onclick=Klik("menuswich",2)></i><i  id="m_super_ikonka_3" class="fa fa-trophy prootsup20" onclick=Klik("menuswich",3)></i><i id="m_super_ikonka_4" class="fa fa-tags prootsup20" style="border-radius:0 5px 5px 0;" onclick=Klik("menuswich",4)></i>';

    var stl_pls = ['', '', '', ''];
    if (have_font < 1) {
      stl_pls[0] = 'style="font-size:14px;line-height:23px;"';
      stl_pls[1] = 'style="font-size:18px;"';
      stl_pls[2] = 'font-size:17px;';
    }

    if (first) {
      $("#custom_body").html('<center><div id="main1" class="main1"><div class="logotip1"></div><div class="logotip1_exit" id="logotip1_exit"></div><div class="logotip1_usr" id="logotip1_usr"></div></div><div id="content" class="content_notfite"><div class="content_mb1_menu" id="content1_menu">' + mm + '</div><div class="content_mb1" id="content1"></div><div class="content_mb2" id="content2"></div><div class="content_mb3" id="content3">TEST</div><div class="vkbanner" onclick=location.href="https://web.archive.org/web/20220701173013/https://vk.com/cardscad"><div class="vkbanner_b1">Мы в VK</div><div class="vkbanner_b2" ' + stl_pls[0] + '>Заходи, другом будешь!</div></div></div></center>');
      SMenu(Smenu_sel, '[]');
    }
    if (!name) {
      $('.players_st_b1').css({ "font-size": "20px", "margin": "4px 0 0 0", "height": "23px", "line-height": "23px" });
      $('.predlog_text_kk').css({ "display": "none" });
      $("#chat_obertka").css({ "opacity": "0" });
      $("#content2").html('<div class="content2_b1">Карты Против Всех Онлайн</div><div class="main_scr1" onclick=Vhod("name");>ВОЙТИ</div><div class="content2_b2">или</div><div class="main_scr2" onclick="Reg();">ЗАРЕГИСТРИРОВАТЬСЯ</div>');
    } else {
      $('.players_st_b1').css({ "font-size": "19px", "margin": "1px 0 0 0", "height": "21px", "line-height": "21px" });
      $('#players_st_b1_1').css({ "margin": "0 0 0 0" });
      $('#stat_x1').css({ "margin": "0 0 0 0" });
      $('.predlog_text_kk').css({ "display": "block" });
      $("#chat_obertka").css({ "opacity": "1" });
      $("#logotip1_usr").html('<div class="logotip1_usr_b1" id="my_whu_play">Вы играете как</div><div class="logotip1_usr_b2" id="my_name" onmouseover="Profile(1,0,0)" onmouseout="Profile(0)">' + name + '</div>');
      $("#logotip1_exit").html('<div class="logotip1_exit_b1" onclick="Exit();">Выйти</div>');

      var help_dev_new = '<div style="position: absolute;font-size: 18px;z-index: 1;border: 1px solid;width: 100px;margin: 18px 0px 0px 205px;transform:rotate(-40deg);-o-transform:rotate(-40deg);-moz-transform:rotate(-40deg);-ms-transform:rotate(-40deg);-webkit-transform:rotate(-40deg);height: 21px;line-height: 19px;">new</div>';
      var help_dev = help_dev_new + '<div style="display:none;" class="shop" id="shop_stl" onclick="ga(\'send\',\'event\',\'supportus\',\'movedtoshop\');Klik(\'donat\');" onmouseover="M_Kn_an(1,1)" onmouseout="M_Kn_an(1,0)"><div class="inner-shop" style="position:absolute;width: 268px;opacity:0;"></div>магазин бонусов</div>';

      $("#content2").html('<div class="main_seachgame"  onclick="Klik(\'seach\')" onmouseover="M_Kn_an(1,1)" onmouseout="M_Kn_an(1,0)"><div id="M_Kn_an1" style="position:absolute;background:url(\'img/gm_for_fr_1_0.png\');opacity:1;width:268px;height:55px;border-radius:5px;background-position:right 0px top 1px;"></div><div style="position:absolute;width:268px;text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.5);font-size: 20px;">НАЙТИ ИГРУ</div></div><div class="main_seachgame_fr" onclick=Klik("seach","party") onmouseover="M_Kn_an(2,1)" onmouseout="M_Kn_an(2,0)"><div id="M_Kn_an2" style="position:absolute;background:url(\'img/gm_for_fr_1.png\');opacity:1; width:268px;height:55px;"></div><div style="position:absolute;width:268px;text-shadow: 0px 1px 0px #000000;color:#FFFFFF;font-size: 20px;">играть с друзьями</div></div>' + help_dev);

    }
    if (have_font < 1) { $(".players_st_b1").css({ "font-size": "18px" }); }

    //if (first && !name) { Banner_test(); }
  }

  function Avklik(id, tip, tip2, i) {
    if (i == skill_mod2 && gst == 1) { return; }
    if (skill_mod > 0 && skill_mod < 21 && tip2 == 1) {

      if (tip == 1) {
        $("#" + id).css({ 'border': '4px solid black', 'height': '112', 'width': '132' });
        $("#" + id + "_text").css({ 'margin': '7px 10px 10px 10px' });
        $("#" + id + " .cards_drop_1").css({ 'margin': '72px 0px 0px 7px', 'background': '#CDCDCD' });
      } else {
        $("#" + id).css({ 'border': '1px solid black', 'height': '118', 'width': '138' });
        $("#" + id + "_text").css({ 'margin': '10px 10px 10px 10px' });
        $("#" + id + " .cards_drop_1").css({ 'margin': '75px 0px 0px 10px', 'background': '#FFFFFF' });
      }

    } else {
      if (gst == 3) { return; }
      if (!ved && (tip2 == 2 || gst == 2 || hod)) { return; }
      if (ved && (tip2 == 1 || gst == 1 || hod)) { return; }
      if (tip == 1) {
        $("#" + id).css({ 'border': '4px solid black', 'height': '112', 'width': '132', 'background': '#CDCDCD' });
        $("#" + id + "_text").css({ 'margin': '7px 10px 10px 10px' });
      } else {
        $("#" + id).css({ 'border': '1px solid black', 'height': '118', 'width': '138', 'background': '#FFFFFF' });
        $("#" + id + "_text").css({ 'margin': '10px 10px 10px 10px' });
      }
    }
  }

  function Cardklik(i, text, tip, smod) {
    var stlpls = '';
    if (smod) { stlpls = 'style="word-wrap:break-word;"'; }
    if (skill_mod == 1 || skill_mod == 2) {
      if (!load_in_klik) { Cards_drop_go(i); Klik('cards_drop_go', i); card_pul[i] = 0; }
    } else if (skill_mod == 20) {
      Klik('emptycard_go', i);
    } else if (i == (skill_mod - 21)) {

    } else {
      var mklick = '';
      if (gst == 3) { return; }
      if (!ved && (tip == 2 || gst == 2 || hod)) { Cardklik_help(1); return; }
      if (ved && (tip == 1 || gst == 1 || hod)) { Cardklik_help(1); return; }
      id = 'fite_card_' + i + '_' + tip;
      //$("#"+id).remove();
      $("#" + id).css({ "opacity": "0", "float": "left", "margin": "0px 10px 10px 0px", "cursor": "default" });
      $("#" + id).removeClass();
      $("#" + id).attr('onclick', '').unbind('click');
      tip = 2;
      id = 'fite_card_' + i + '_' + tip;
      hod = i; hod++;
      var tt = $("#fite_card_" + i + "_1").html();
      var rez = '<div class="fite_card2" ' + stlpls + ' id="' + id + '" ' + mklick + ' onmouseover=Avklik("' + id + '",1,' + tip + ',' + i + ') onmouseout=Avklik("' + id + '",0,' + tip + ',' + i + ')><div class="fite_card_text" id="' + id + '_text">' + tt + '</div></div>';

      $("#fite_card2_m").append(rez);
      Klik("hod", hod, 0);
    }
  }

  function Cardklik2(i, text, tip) {
    if (gst == 3) { return; }
    if (!ved && (tip == 2 || gst == 2 || hod)) { Cardklik_help(2); return; }
    if (ved && (tip == 1 || gst == 1 || hod)) { Cardklik_help(2); return; }
    hod = i;
    Klik("hod", hod, 1);
  }

  function Cardklik_help(tip) {
    if (hod) { return; }

    $("#msg_what_usr_do").addClass('animated flash').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).removeClass("animated flash"); });

    if (tip == 1 && ved && gst == 2) {
      $('.fite_card2').removeClass("animated bounce2");
      $('.fite_card2').addClass("animated flash");
      $(".fite_card2").addClass('animated flash').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).removeClass("animated flash"); });
    } else if (tip == 2 && !ved && gst == 1) {
      $('.fite_card').removeClass("animated bounce2");
      $('.fite_card').addClass("animated flash");
      $(".fite_card").addClass('animated flash').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () { $(this).removeClass("animated flash"); });
    }

  }

  function ServerNotWork(s) {
    $('body').html('<center><div class="serwernotwork_b1"><h3>Сервер отключен</h3>В настоящее время мы работаем над установкой обновления.</div></center>');
  }

  function StupedIE() {
    $('body').html('<center><div class="ienotwork_b1"><h3>Ошибка!</h3>Вы используете сильно устаревшую версию браузера Internet Explorer, которая не поддерживается игрой.<br>Пожалуйста, обновите версию вашего браузера до Internet Explorer 11, на <a href="https://web.archive.org/web/20220701173013/http://windows.microsoft.com/ru-ru/internet-explorer/ie-10-worldwide-languages" target="_blank">официальном сайте Microsoft</a>.<br><h3>Или попробуйте один из этих браузеров</h3><div style="margin:auto;width:300px;"><a href="https://web.archive.org/web/20220701173013/https://www.google.com/intl/ru/chrome/browser/" target="_blank" style="background:url(img/badbrowsers/chrome.gif)  no-repeat 50% 7px;" class="lolieloh">Google Chrome</a><a href="https://web.archive.org/web/20220701173013/http://www.mozilla-europe.org/" target="_blank" style="background: url(img/badbrowsers/firefox.gif) no-repeat 50% 7px;" class="lolieloh" class="lolieloh">Mozilla Firefox</a><a href="https://web.archive.org/web/20220701173013/http://www.opera.com/" target="_blank" style="background: url(img/badbrowsers/opera.gif) no-repeat 50% 7px;" class="lolieloh">Opera</a></div></div></center>');
  }

  function randomNumber(min, max) {
    m = parseInt(min);
    n = parseInt(max);
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  function Predlog_kart_send() {
    var text = $("#predlog_text").val();
    if (document.getElementById("predlog_text").placeholder == 'Введите текст карты') { var tip = 1; } else { var tip = 2; }
    if (text) { Klik("predlog", tip, text); }
    $("#predl_kart_m").animate({ "margin-left": "+=270px", "opacity": "0" }, "slow", 'swing', function () { $("#predl_kart_m").remove(); });
  }

  function Predlog_kart_exit() {
    $("#predl_kart_m").remove();
  }

  function Predlog_kart(tip) {
    if (tip == 1) {
      var text = 'Введите текст карты';
    } else { var text = 'Пожалуйста как можно подробнее опишите суть ошибки, и условия, при которых она возникла'; }
    $('#players_st_bl0').append('<div class="predl_kart_m" id="predl_kart_m"><textarea id="predlog_text" class="predlog_text" type="text" placeholder="' + text + '"></textarea><input type=submit class="predlog_text_k1"  onclick=Predlog_kart_send() value="отправить"></input><input type=submit class="predlog_text_k2"  onclick=Predlog_kart_exit() value="отменить"></input></div>');
  }

  function M_Kn_an(idn, t) {
    if (t == 1) {
      //if(idn==1){ $("#M_Kn_an"+idn).css({"opacity":"0.8"}); }else{ $("#M_Kn_an"+idn).css({"opacity":"0.9"}); } 
    } else {
      //if(idn==1){ $("#M_Kn_an"+idn).css({"opacity":"0.3"}); }else{ $("#M_Kn_an"+idn).css({"opacity":"0.7"}); } 
    }
  }

  function Donat_main(mn, pay1, pay2, kol_d1, kol_d2) {

    var mmlal1 = '<div id="trprogres2_1" style="position:absolute;height:24px;width:' + (kol_d1 / 200) * 1.59 + 'px;max-width:159px;background:#000000;"></div><div style="color:rgb(128, 128, 128);position:absolute;width:160px;"><span id="trprogres1_1">' + kol_d1 / 200 + '</span>%</div>';

    var mmlal2 = '<div id="trprogres2_2" style="position:absolute;height:24px;width:' + (kol_d2 / 50) * 1.59 + 'px;max-width:159px;background:#000000;"></div><div style="color:rgb(128, 128, 128);position:absolute;width:160px;"><span id="trprogres1_2">' + kol_d2 / 50 + '</span>%</div>';

    var stl_pls = '';
    var stl_pls2 = '';
    var stl_pls3 = '';
    if (have_font < 1) {
      stl_pls = 'style="font-size:16px;"';
      stl_pls2 = 'style="font-size:18px;"';
      stl_pls3 = 'style="font-size:14px;"';
    }

    //NYAAAAA

    var spell_i1 = '<div style="margin: 15px 15px 15px 15px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"><div id="spell_k1i1s" class="spell_k1_b3"><div class="spell_k1_b4" style="margin:8px 0px 0px 3px;background:none;"><i class="spell_k1_b5 fa fa-refresh"></i></div></div></div>';

    var spell_i2 = '<div style="margin: 17px 15px 15px 13px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_i3 = '<div style="margin: 19px 15px 15px 11px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"><</div>';

    var spell_i4 = '<div style="margin: 21px 15px 15px 9px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"><div id="spell_k1i1s" class="spell_k1_b3"><div class="spell_k1_b4" style="margin:8px 0px 0px 3px;background:none;"><i class="spell_k1_b5 fa fa-refresh"></i></div></div></div>';


    var spell_ii1 = '<div style="margin: 15px 15px 15px 15px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii2 = '<div style="margin: 16px 15px 15px 14px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii3 = '<div style="margin: 17px 15px 15px 13px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii4 = '<div style="margin: 18px 15px 15px 12px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii5 = '<div style="margin: 19px 15px 15px 11px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii6 = '<div style="margin: 20px 15px 15px 10px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii7 = '<div style="margin: 21px 15px 15px 9px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"></div>';

    var spell_ii8 = '<div style="margin: 22px 15px 15px 8px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;" class="spell_k1_b2"><div id="spell_k1i1s" class="spell_k1_b3"><div class="spell_k1_b4" style="margin:8px 0px 0px 3px;background:none;"><i class="spell_k1_b5 fa fa-refresh"></i></div></div></div>';


    var spell2_i1 = '<div style="margin: 15px 15px 15px 15px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;text-align:center;" onclick=Klik("empty_card") class="spell_k1_b2"><div id="spell_k2i1s" class="spell_k1_b3">!</div></div>';
    var spell2_i4 = '<div style="margin: 21px 15px 15px 9px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;text-align:center;" onclick=Klik("empty_card") class="spell_k1_b2"><div id="spell_k2i1s" class="spell_k1_b3">!</div></div>';
    var spell2_ii8 = '<div style="margin: 22px 15px 15px 8px;cursor:pointer;background:#FFFFFF;border: 1px solid #000000;text-align:center;" onclick=Klik("empty_card") class="spell_k1_b2"><div id="spell_k2i1s" class="spell_k1_b3">!</div></div>';

    var spell1_1 = '<div id="show_text1_1" onclick=Klik("spell_buy","1") class="spell1"><div id="show_text1_1_b" class="spell1br"></div><div class="spell1m"><div style="position:absolute;margin-top:4px;">' + spell_i1 + '</div><div class="spell1t">4<br>штуки</div></div><div id="show_text1_1_t" class="spell1k">купить за 14р</div></div>';

    var spell1_2 = '<div id="show_text1_2" onclick=Klik("spell_buy","2") class="spell1"><div id="show_text1_2_b" class="spell1br"></div><div class="spell1m"><div style="position:absolute;margin-top:0px;">' + spell_i1 + spell_i2 + spell_i3 + spell_i4 + '</div><div class="spell1t">20<br>штук</div></div><div id="show_text1_2_t" class="spell1k">купить за 39р</div></div>';

    var spell1_3 = '<div id="show_text1_3" onclick=Klik("spell_buy","3") class="spell1"><div id="show_text1_3_b" class="spell1br"></div><div class="spell1m"><div style="position:absolute;margin-top:0px;">' + spell_ii1 + spell_ii2 + spell_ii3 + spell_ii4 + spell_ii5 + spell_ii6 + spell_ii7 + spell_ii8 + '</div><div class="spell1t">100<br>штук</div></div><div id="show_text1_3_t" class="spell1k">купить за 147р</div></div>';


    var spell1_4 = '<div id="show_text1_4" onclick=Klik("spell_buy","4") class="spell1"><div id="show_text1_4_b" class="spell1br"></div><div class="spell1m"><div style="position:absolute;margin-top:4px;">' + spell2_i1 + '</div><div class="spell1t">2<br>штуки</div></div><div id="show_text1_4_t" class="spell1k">купить за 2р</div></div>';

    var spell1_5 = '<div id="show_text1_5" onclick=Klik("spell_buy","5") class="spell1"><div id="show_text1_5_b" class="spell1br"></div><div class="spell1m"><div style="position:absolute;margin-top:0px;">' + spell_i1 + spell_i2 + spell_i3 + spell2_i4 + '</div><div class="spell1t">10<br>штук</div></div><div id="show_text1_5_t" class="spell1k">купить за 8р</div></div>';

    var spell1_6 = '<div id="show_text1_6" onclick=Klik("spell_buy","6") class="spell1"><div id="show_text1_6_b" class="spell1br"></div><div class="spell1m"><div style="position:absolute;margin-top:0px;">' + spell_ii1 + spell_ii2 + spell_ii3 + spell_ii4 + spell_ii5 + spell_ii6 + spell_ii7 + spell2_ii8 + '</div><div class="spell1t">50<br>штук</div></div><div id="show_text1_6_t" class="spell1k">купить за 29р</div></div>';

    var blk1 = '<div style="font-size:26px;">Услуги:</div><div id="show_text1" style="float:left;width:480px;"><div style="float:left;margin-top:10px;">' + spell1_1 + spell1_2 + spell1_3 + '</div><div style="float:left;margin-top:10px;">' + spell1_4 + spell1_5 + spell1_6 + '</div></div><div id="show_an_buy" style="margin-top:4px;float:left;width:100%;"></div></div>';

    var buy_button = '<button onclick=\'Donat_kol();Klik("stat_insrt")\' style="height:35px;width:120px;margin:0px 0px 0px 14px;font-size:22px;float:left;">Добавить</button>';

    var blk2 = '<div id="by_bld_1" style="height:80px;"><div style="font-size:26px;">У вас:</div><div style="height:45px;font-size:30px;margin:0 0 0 0px;float:left;" id="money_bl1"><div style="float:left;" id="money_kol">' + mn + '</div><i class="fa fa-rub" style="margin:5px 0 0 5px;"></i></div>' + buy_button + '</div>';

    $("#content").html('<div onclick="Main(1)" style="position:absolute;margin:280px 0px 0px 5px;"><div style="font-size:20px;cursor:pointer;border: 1px solid black;padding:4px 5px 4px 5px;border-radius: 5px 5px;background:#FFFFFF;"><i class="fa fa-backward" style="margin: 0 6px 0 0;"></i>Вернуться</div></div><div style="float:left;width:691px;text-align:left;"><div style="background:#000000;width:1px;height:400px;position:absolute;margin-left:690px;"></div>' + blk1 + '</div><div style="float:left;padding-left:10px;text-align:left;">' + blk2 + '<div id="donat_text1" class="donat_text1" ' + stl_pls2 + '></div><div class="kot1"><div id="kot2" class="kot2"></div></div></div>');
    $("#content").prepend('<div style="position: absolute;margin: 292px 0px 0px 525px;cursor: pointer;width: 140px;font-size: 12px;font-family: \'Microsoft Sans Serif\',Arial,sans-serif;" onclick="Donat_contact()">Проблемы с оплатой? <span style="text-decoration:underline;">Свяжитесь с нами!</span></div>');
    Banner_test(1);
    $(".webmoney_bl1").css("margin", "290px 0 0 210px");

    $("#show_text1").mouseleave(function () {
      if ($("#donat_text1").html()) {
        $("#kot2").animate({ "margin": "0 0 0 0" }, 300, 'linear', function () { });
        $("#donat_text1").html('');
      }
    });

    $("#show_text1_1").mouseleave(function () { Donat_text(1, 0) });
    $("#show_text1_2").mouseleave(function () { Donat_text(2, 0) });
    $("#show_text1_3").mouseleave(function () { Donat_text(3, 0) });
    $("#show_text1_4").mouseleave(function () { Donat_text(4, 0) });
    $("#show_text1_5").mouseleave(function () { Donat_text(5, 0) });
    $("#show_text1_6").mouseleave(function () { Donat_text(6, 0) });

    $("#show_text1_1").mouseenter(function () { Donat_text(1, 1) });
    $("#show_text1_2").mouseenter(function () { Donat_text(2, 1) });
    $("#show_text1_3").mouseenter(function () { Donat_text(3, 1) });
    $("#show_text1_4").mouseenter(function () { Donat_text(4, 1) });
    $("#show_text1_5").mouseenter(function () { Donat_text(5, 1) });
    $("#show_text1_6").mouseenter(function () { Donat_text(6, 1) });

  }

  function Donat_contact() {
    if (have_font < 1) { var stl_pls1 = 'font-size:18px;'; var stl_pls2 = 'font-size:14px;'; var stl_pls3 = 'font-size:14px;'; }
    var button_ok = '<input type=submit style="font-size:18px;width:80px;height:32px;cursor:pointer;color:rgb(255, 255, 255);background: none repeat scroll 0% 0% rgb(48, 48, 48);border-radius: 5px 5px 5px 5px;margin: 28px 0px 0px;" onclick=Donat_otmena() value="ok"></input>'

    $("body").prepend('<div id="donat_fon1"></div><div id="donat_kol1" class="seach_game" style="width:220px;height:200px;text-align:center;position:absolute;z-index:101;top: 0; left: 0; bottom: 0; right: 0;margin:200px auto 0px;background:#FFFFFF;color:#000000"><div style="font-size:20px;margin-top:16px;' + stl_pls1 + '">Наши контакты:</div><div style="margin-top:16px;' + stl_pls2 + '">email: admin@cardsvs.ru<br>телефон: ******<br>ВК: https://vk.com/cardscad</div>' + button_ok + '</div>');
  }

  function Donat_buy_spell(tip, kol, money) {
    var spell = ['', '<div id="spell_k1" style="margin:0 5px 0 6px;background:#FFFFFF;border: 1px solid #000000;float:left;position:relative;" class="spell_k1_b2"><div id="spell_k1i1s" class="spell_k1_b3"><div class="spell_k1_b4" style="margin:8px 0px 0px 3px;background:none;"><i style="color:#000000;" class="spell_k1_b5 fa fa-refresh"></i></div></div></div><div class="spell1ii">сброс<br>карт</div>', '<div style="margin:0 5px 0 6px;background:#FFFFFF;border: 1px solid #000000;text-align:center;float:left;position:relative;"  class="spell_k1_b2"><div id="spell_k2i1s" class="spell_k1_b3">!</div></div><div class="spell1ii">пустая<br>карта</div>'];

    var bonus = '<button style="margin: 10px 12px 0 0px;" id="end_bonus" class="end_bonus animated bounce2" onclick="KnopkaIschezai(\'end_bonus\')";><div style="float:left;font-size:18px;line-height:38px;">вы получили: </div>' + spell[tip] + '<div style="float:left;font-size:18px;line-height:38px;">' + kol + ' шт.</div></button>';

    $('#show_an_buy').append(bonus);

    $(".end_bonus").last().animate({ "color": "#000000" }, 2000, 'swing', function () {
      $(this).animate({ "opacity": "0" }, 600, 'swing', function () {
        $(this).remove();
      });
    });
    $("#money_kol").html($("#money_kol").html() - money);

  }

  function Donat_buy(tip) {
    $("#content").prepend('<div id="donat_kol1" class="seach_game" style="width:220px;height:200px;text-align:center;position:absolute;z-index:101;top: 0; left: 0; bottom: 0; right: 0;margin:200px auto 0px;"><div class="seach_fr_b1">Сколько?</div><input type=number maxlength=50 class="seach_fr_scr" style="float:left;width:200px;margin:15px 5px 10px 10px;" oninput="DonatCalc2(' + tip + ');"></input><div style="float:left;width:220px;margin-top:0px;"><i class="fa fa-rub" style="margin:5px 0 0 5px;"></i></div><div style="width:220px;float:left;margin:10px 0 10px 0;">вы получите: <span id="donat_t_k">+0%</span></div><input type=submit class="seach_fr_k1" style="width:110px;" onclick=Klik("donat_buy",$(".seach_fr_scr").val(),' + tip + ') value="Купить"></input><input type=submit class="seach_fr_k2"  onclick=Donat_otmena() value="отмена"></input></div>');

    $("body").prepend('<div id="donat_fon1"></div>');

  }

  function Donat_buy_animate(tip, kol, init, x, sum) {
    if (init) {
      x = 1; sum = 1;
      Donat_otmena();
    } else {
      x = x * 2; if (x > kol) { x = kol; }
      sum = sum + x;
    }
    $("#money_kol").html($("#money_kol").html() - x);
    $("#money_bl1").prepend('<div class="money_anime1" id="money_anime1"><div class="money_anime1_1">' + sum + '</div></div>');

    $("#money_anime1").animate({ "margin-left": (-646 + 213 * (tip - 1)) + "px", "margin-top": "57px" }, 400, 'swing', function () {
      $("#tr1_" + tip).html($("#tr1_" + tip).html() - 0 + x);
      var sumtr = $("#tr2_" + tip).html() - 0 + x;
      $("#tr2_" + tip).html(sumtr);

      var kof = sumtr;
      switch (tip) {
        case 1: var kof = sumtr / 200; break;
        case 2: var kof = sumtr / 50; break;
      }

      $("#trprogres1_" + tip).html(kof);
      $("#trprogres2_" + tip).css({ "width": (kof) * 1.59 });

      var a = document.getElementById('show_text1_' + tip);
      var op = 0.2;
      a.style.opacity = op;
      function doAnimation7() {
        if (op == 1) {
          a.style.opacity = 1;
        } else if (op < 1) {
          op += 0.1;
          a.style.opacity = op;
          timedel3 = setTimeout(doAnimation7, 50);
        }
      }
      setTimeout(doAnimation7, 50);

      $("#money_anime1").remove();
      if (x < kol) { setTimeout(function () { Donat_buy_animate(tip, kol - x, 0, x, sum); }, 100); }

    });

  }

  function DonatCalc2(tip) {
    var kol = $(".seach_fr_scr").val() - 0;
    if (!kol || kol < 1) { kol = 0; $(".seach_fr_k1").css({ "opacity": "0.2" }); } else { $(".seach_fr_k1").css({ "opacity": "1" }); }

    //$("#donat_t_k").html("+"+(kol/1000)+"%");
    switch (tip) {
      case 1: $("#donat_t_k").html("+" + (kol / 200) + "%"); break;
      case 2: $("#donat_t_k").html("+" + (kol / 50) + "%"); break;
    }

  }


  function Donat_text(n, t) {
    var text = ['', '<div class="donat_text3">Сброс карт</div><div class="donat_text2">Сбрасывает любые карты из руки.</div>', '<div class="donat_text3">Сброс карт</div><div class="donat_text2">Сбрасывает любые карты из руки.</div>', '<div class="donat_text3">Сброс карт</div><div class="donat_text2">Сбрасывает любые карты из руки.</div>', '<div class="donat_text3">Пустая карта</div><div class="donat_text2">Меняет текст на выбранной карте.</div>', '<div class="donat_text3">Пустая карта</div><div class="donat_text2">Меняет текст на выбранной карте.</div>', '<div class="donat_text3">Пустая карта</div><div class="donat_text2">Меняет текст на выбранной карте.</div>'];
    if (t == 1) {
      $("#show_text1_" + n + "_t").css("background", "#CDCDCD");
      $("#show_text1_" + n + "_b").css("border", "2px solid black");
      $("#donat_text1").css({ "opacity": "1" });
      if (!$("#donat_text1").html()) {
        $("#kot2").animate({ "margin": "88px 0 0 60px" }, 300, 'linear', function () { });
      }
      $("#donat_text1").html(text[n]);
      if (have_font < 1) { $('.donat_text2').css({ 'font-size': '14px' }); }
    } else {
      $("#show_text1_" + n + "_t").css("background", "#FFFFFF");
      $("#show_text1_" + n + "_b").css("border", "1px solid black");
      $("#donat_text1").css({ "opacity": "0" });
    }
  }

  function Donat_kol() {
    $("#content").prepend('<div id="donat_kol1" class="seach_game" style="width:220px;height:200px;text-align:center;position:absolute;z-index:101;top: 0; left: 0; bottom: 0; right: 0;margin:200px auto 0px;"><div class="seach_fr_b1">Сколько?</div><input type=number maxlength=50 value="20" class="seach_fr_scr" style="float:left;width:200px;margin:15px 5px 10px 10px;" oninput="DonatCalc();"></input><div style="float:left;width:220px;margin-top:-7px;">рублей</div><div style="width:220px;float:left;margin:15px 0 10px 0;">вы получите: <span id="donat_t_k">0</span><i class="fa fa-rub" style="margin:0 0 0 5px;vertical-align:bottom;"></i></div><input type=submit class="seach_fr_k1" style="width:110px;" onclick=Donat_pay() value="Купить"></input><input type=submit class="seach_fr_k2"  onclick=Donat_otmena() value="отмена"></input></div>');
    DonatCalc();

    $("body").prepend('<div id="donat_fon1"></div>');

  }

  function Donat_rklm_m1() {
    if (have_font < 1) { var stl_pls1 = 'font-size:18px;'; var stl_pls2 = 'font-size:14px;'; var stl_pls3 = 'font-size:14px;'; }
    var help_dev = '<div class="shop" id="shop_stl" style="width:180px;cursor:default;' + stl_pls1 + '">магазине бонусов</div>';
    var button_ok = '<input type=submit style="font-size:18px;width:80px;height:32px;cursor:pointer;color:rgb(255, 255, 255);background: none repeat scroll 0% 0% rgb(48, 48, 48);border-radius: 5px 5px 5px 5px;margin: 10px 0px 0px;" onclick=Donat_otmena() value="ok"></input>'
    $("body").prepend('<div id="donat_fon1"></div><div id="donat_kol1" class="seach_game" style="width:220px;height:200px;text-align:center;position:absolute;z-index:101;top: 0; left: 0; bottom: 0; right: 0;margin:200px auto 0px;background:#FFFFFF;color:#000000"><div style="font-size:20px;margin-top:6px;' + stl_pls1 + '">У вас нет очков этой способности!</div><div style="margin-top:6px;' + stl_pls2 + '">Выбивайте очки бонусов в играх, или приобретайте в:</div>' + help_dev + button_ok + '</div>');
  }

  function Donat_otmena() {
    $("#donat_fon1").remove();
    $("#donat_kol1").remove();
  }

  function DonatCalc() {
    var kol = $(".seach_fr_scr").val() - 0;
    if (!kol || kol < 1) { kol = 0; $(".seach_fr_k1").css({ "opacity": "0.2" }); } else { $(".seach_fr_k1").css({ "opacity": "1" }); }

    $("#donat_t_k").html(kol);
  }

  function Donat_pay() {
    Klik("support_pay", $(".seach_fr_scr").val());
  }

  function Cards_drop() {
    $(".fite_card").prepend('<div class="cards_drop_1">*сбросить*</div>');
    $(".fite_card").children(".fite_card_text").css({ "opacity": "0.4" });
    skill_mod = 1;
    $('#spell_k1').css({ 'display': 'none' });
    $('#spell_k2').css({ 'display': 'none' });
    $('#fite_blsr1_b5').append('<div id="spell_k12" onmouseover="Card_otm_a(1)" onmouseout="Card_otm_a(0)" style="border: 1px solid rgb(255, 255, 255); width: 112px; height: 38px; margin: 7px 13px 0px 0px; line-height: 34px;border-radius:5px;cursor:pointer;float:right;" onclick="Klik(\'cards_drop_end\')"><div id="spell_k13">закончить</div></div>');
  }


  function Card_otm_a(t) {
    if (t) {
      $('#spell_k12').css({ "border": "2px solid #FFFFFF" });
      $('#spell_k12').css({ "height": "36px", "width": "110px" });
      $('#spell_k13').css({ "margin-top": "-1px" });
    } else {
      $('#spell_k12').css({ "border": "1px solid #FFFFFF" });
      $('#spell_k12').css({ "height": "38px", "width": "112px" });
      $('#spell_k13').css({ "margin-top": "0" });
    }

  }

  function Cards_drop_end(kol) {
    skill_mod = 0;
    skill[0] = kol;

    $("#spell_k12").remove();
    $('#spell_k1').css({ 'display': 'block' });
    $('#spell_k2').css({ 'display': 'block' });
    $(".cards_drop_1").remove();
    $('#spell_k_n1').html(skill[0]);
    $(".fite_card_text").css({ "opacity": "1" });
  }


  function Cards_drop_go(n) {
    $('#fite_card_' + n + '_1').removeClass('animated bounce2');
    $('#fite_card_' + n + '_1').css({ "position": "relative", "z-index": "2" });
    $('#fite_card_' + n + '_1').addClass('animated fadeOutRightBig');

  }

  function Card_drop_a(t, n) {
    if (t) {
      if (n == 1) {
        $('#donat_text1').html('<div>сброс карт</div><div style="font-size:16px;font-style:italic;margin-top:1px;">Сбрасывает любые карты из руки.</div>');
      } else {
        $('#donat_text1').html('<div>пустая карта</div><div style="font-size:16px;font-style:italic;margin-top:1px;">Меняет текст на выбранной карте.</div>');
      }

      $('#spell_k' + n).css({ "border": "2px solid #FFFFFF", "height": "36px", "width": "24" });
      $('#spell_k1i1').css({ "border": "2px solid #FFFFFF", "height": "36px", "width": "24", "margin": "-2px 0px 0px -29px" });
      $('#spell_k1_t').css({ "margin": "-1px 0px 0px 15px" });
      $('#spell_k_n' + n).css({ "margin": "29px -8px 0px 0px" });
      $('#spell_k' + n + 'i1s').css({ "margin": "-1px 0px 0px -1px" });
      $('#donat_text1').addClass("katkitty" + n);
    } else {

      $('#spell_k' + n).css({ "border": "1px solid #FFFFFF", "height": "38px", "width": "26" });
      $('#spell_k1i1').css({ "border": "1px solid #FFFFFF", "height": "38px", "width": "26", "margin": "-1px 0px 0px -28px" });
      $('#spell_k1_t').css({ "margin": "0px 0px 0px 16px" });
      $('#spell_k_n' + n).css({ "margin": "30px -7px 0px 0px" });
      $('#spell_k' + n + 'i1s').css({ "margin": "0px 0px 0px 0px" });
      $('#donat_text1').removeClass("katkitty" + n);
    }

  }

  function EmptyCards() {
    $(".fite_card").prepend('<div class="cards_drop_1">*изменить*</div>');
    $(".fite_card").children(".fite_card_text").css({ "opacity": "0.4" });
    //skill_mod=20;
    $('#spell_k1').css({ 'display': 'none' });
    $('#spell_k2').css({ 'display': 'none' });
    $('#fite_blsr1_b5').append('<div id="spell_k12" onmouseover="Card_otm_a(1)" onmouseout="Card_otm_a(0)" style="border: 1px solid rgb(255, 255, 255); width: 112px; height: 38px; margin: 7px 13px 0px 0px; line-height: 34px;border-radius:5px;cursor:pointer;float:right;" onclick="Klik(\'empty_card_otm\')"><div id="spell_k13">отмена</div></div>');

  }

  function EmptyCards_otm() {
    $("#spell_k12").remove();
    //skill_mod=0;
    $('#spell_k1').css({ 'display': 'block' });
    $('#spell_k2').css({ 'display': 'block' });
    $(".cards_drop_1").remove();
    $(".fite_card_text").css({ "opacity": "1" });
  }

  function EmptyCards_go(i) {
    $('#fite_card_' + i + '_1').prepend('<textarea id="wite_cards" maxlength="80" style="width: 139px;height: 119px;float: left;margin: -1px 0px 0px -70px;border-radius: 5px 5px 5px 5px;position: absolute;font-size: 16px;font-family: Times New Roman;text-align: center;padding: 10px;resize:none;overflow:hidden;" placeholder="Введите текст карты" type="text"></textarea>');
    $('#wite_cards').focus();
    skill_mod2 = i;

    var id = 'fite_card_' + i + '_1';
    $("#" + id).css({ 'border': '1px solid black', 'height': '118', 'width': '138' });
    $("#" + id + "_text").css({ 'margin': '10px 10px 10px 10px' });
    $("#" + id + " .cards_drop_1").css({ 'margin': '75px 0px 0px 10px', 'background': '#FFFFFF' });

    EmptyCards_otm();
    $('#spell_k1').css({ 'display': 'none' });
    $('#spell_k2').css({ 'display': 'none' });
    $('#fite_blsr1_b5').append('<div id="spell_k12" onmouseover="Card_otm_a(1)" onmouseout="Card_otm_a(0)" style="border: 1px solid rgb(255, 255, 255); width: 112px; height: 38px; margin: 7px 13px 0px 0px; line-height: 34px;border-radius:5px;cursor:pointer;float:right;" onclick="EmptyCards_savepro()"><div id="spell_k13">Сохранить</div></div>');
  }

  function EmptyCards_savepro() {
    var text = $('#wite_cards').val();
    Klik('empty_card_save', text);

  }

  function EmptyCards_save(i) {
    skill_mod2 = -1;
    skill[1]--;
    $('#spell_k_n2').html(skill[1]);
    var text = $('#wite_cards').val();
    $('#fite_card_' + i + '_1').attr("onclick", "Cardklik('" + i + "','','1','1')");
    $('#fite_card_' + i + '_1').css("word-wrap", "break-word");
    $('#fite_card_' + i + '_1_text').text(text)

    $('#wite_cards').remove();
    EmptyCards_otm();

  }

  function Guest_help2(n, t, vdn, mod) {
    //if (!n) { return; }
    guest_ved = t;
    //n--;
    var av = ['goose', 'dok3', 'gop1', 'pol1', 'boy2', 'sec1'];
    var text1 = [vdn + ', а я не понял?!', 'Мистер ' + vdn + ', вы не выбрали ваш ответ.', 'Слыш, ' + vdn + ', ты че ответ не выбрал?', 'Гражданин ' + vdn + ', почему ответ не выбираем?', vdn + ' лалка и не выбрал)', vdn + ', ах так? Значит ты не выбрал?'];
    var text2 = ['Гусь спешит на помощь!', 'Теперь за вас буду выбирать я.', 'Щас выберу сам, внатуре.', 'Ну ничего, сейчас разберемся.', 'Сейчас выбиру как царь!', 'Так уж и быть, выберу за тебя)'];
    var text3 = ['Я гусь! Я пожалуй...', 'Ахахах). Обхохочешься!', 'Хаха, вот это чёткий прикол))', 'Отлично, так и запишем!', 'Азазазаз, я вас затралил))', 'Ну разве я не молодец?:D'];
    if (have_font < 1) { var stl_pls1 = 'font-size:18px;'; }
    var d3 = '<div id="ggvd_t1" class="katkat katkat1" style="margin: 20px 0px 0px -160px;' + stl_pls1 + '">' + text1[t] + '</div>';

    $('#fite_blsr1').prepend('<div style="position:absolute;height:140px;width:378px;margin: -140px 0px 0px 582px;overflow:hidden;"><div id="vedguest_bf1" style="float:right;height:inherit;width:178px;background:url(img/helpv/' + av[t] + '.png);margin:123px 0 0 0;">' + d3 + '</div></div>');

    if (!mod) {
      $("#vedguest_bf1").animate({ "margin": "0 0 0 0" }, 1000, 'easeInOutQuad', function () {
        setTimeout(function () {
          $("#ggvd_t1").addClass('animated bounce2');
        }, 200);
      });

      setTimeout(function () {
        $("#ggvd_t1").removeClass('animated bounce2');
        $("#ggvd_t1").css({ "opacity": "1" });
        $("#ggvd_t1").animate({ "opacity": "0" }, 600, 'swing', function () {
          $("#ggvd_t1").html(text2[t]);
          $("#ggvd_t1").addClass('animated bounce2');
          setTimeout(function () { Guest_help_go(n, text3[t]); }, 1600);
        });
      }, 4500);

    } else {
      $("#vedguest_bf1").css({ "margin": "0 0 0 0" });
      $("#ggvd_t1").html(text3[t]);
      $("#ggvd_t1").css({ "opacity": "1" });
    }

  }

  function doSetTimeout(i, t, time) {
    setTimeout(function () { Guest_avclick(i, t); }, time);
  }

  function Guest_help_go(n, text) {
    var vv = 0;
    var kol = $(".fite_card2").length - 1;
    var tn = 0;

    for (i = 0; i <= kol;) {
      doSetTimeout(i, 1, vv); vv += 200;
      if (vv > 6000 && i == n) { i = 100; } else { doSetTimeout(i, 2, vv); vv += 10; }
      if (tn == 0) { i++; } else { i--; }
      if (i == kol || i == 0) { if (tn == 0) { tn = 1; } else { tn = 0; } }
    }

    setTimeout(function () {
      $("#ggvd_t1").removeClass('animated bounce2');
      $("#ggvd_t1").css({ "opacity": "1" });
      $("#ggvd_t1").animate({ "opacity": "0" }, 600, 'swing', function () {
        $("#ggvd_t1").html(text);
        $("#ggvd_t1").addClass('animated bounce2');
      });
    }
      , vv);

  }

  function Guest_avclick(id, tip) {
    id = 'fite_card_' + id + '_2';
    if (tip == 1) { $("#" + id).css({ 'background': '#CDCDCD' }); } else { $("#" + id).css({ 'background': '#FFFFFF' }); }
  }

  function Webmaney_an(id, tip) {
    if (!tip) {
      $("#webmoney_f" + id).css("opacity", "0.6");
      //$("#webmoney_f"+id).animate({"opacity": "0.6"}, 200,'swing',function(){});
    } else {
      $("#webmoney_f" + id).css("opacity", "1");
      //$("#webmoney_f"+id).animate({"opacity": "1"}, 200,'swing',function(){});
    }
  }

  function Banner_test(tip) {
    var stlpls = '';
    if (!tip) { stlpls = 'z-index:2;'; }
    var rr = '<div class="webmoney_bl1" style="margin: 380px 0 0 -20px;' + stlpls + '"><div class="webmoney_bl2" ><div class="webmoney_b1"><div id="webmoney_f2" class="webmoney_f1"><!-- begin WebMoney Transfer : attestation label --><a href="https://web.archive.org/web/20220701173013/https://passport.webmoney.ru/asp/CertView.asp?wmid=561622569904" target="_blank"><img src="img/logo/wm1.png" alt="Здесь находится аттестат нашего WM идентификатора 000000000000" border="0" /></a><!-- end WebMoney Transfer : attestation label --></div></div><div class="webmoney_b1"><div id="webmoney_f1" class="webmoney_f1"><!-- begin WebMoney Transfer : accept label --><a href="https://web.archive.org/web/20220701173013/http://www.megastock.ru/" target="_blank"><img src="img/logo/88x31_wm_white_on_transparent_ru.png" alt="www.megastock.ru" border="0"/></a><!-- end WebMoney Transfer : accept label --></div></div><div class="webmoney_b1"><div id="webmoney_f3" class="webmoney_f1"><a href="https://web.archive.org/web/20220701173013/https://www.interkassa.com/" title="INTERKASSA" target="_blank"><img src="img/logo/ik_88x31_01.gif" alt="INTERKASSA" /></a></div></div></div><div style="width: 88px;height: 31px;background: none repeat scroll 0% 0% rgb(0, 0, 0);float: right;position: absolute;margin: 2px 0px 0px 723px;z-index: 1;display:none;"></div></div>';
    $('#content').prepend(rr);
    $("#webmoney_f1").mouseleave(function () { Webmaney_an(1, 0) });
    $("#webmoney_f2").mouseleave(function () { Webmaney_an(2, 0) });
    $("#webmoney_f3").mouseleave(function () { Webmaney_an(3, 0) });
    $("#webmoney_f1").mouseenter(function () { Webmaney_an(1, 1) });
    $("#webmoney_f2").mouseenter(function () { Webmaney_an(2, 1) });
    $("#webmoney_f3").mouseenter(function () { Webmaney_an(3, 1) });

  }



}
/*
     FILE ARCHIVED ON 17:30:13 Jul 01, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:46:48 Nov 11, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 70.764
  exclusion.robots: 0.086
  exclusion.robots.policy: 0.073
  cdx.remote: 0.066
  esindex: 0.009
  LoadShardBlock: 40.055 (3)
  PetaboxLoader3.datanode: 259.842 (6)
  load_resource: 402.696 (2)
  PetaboxLoader3.resolve: 130.939 (2)
  loaddict: 35.803
*/