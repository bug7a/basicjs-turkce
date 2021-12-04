
/* Bismillah */

/*


Version: 1.5


basic.js NEDİR?

Programlamaya yeni başlayanlar için: Nesne tabanlı yazılım projesi 
geliştirmeyi kolaylaştıran JavaScript kütüphanesi.


JAVASCRIPT PROGRAMLAMA DİLİ:

- Bu kütüphane, temel JavaScript kodları ile geliştirilmiştir.
- JavaScript'in ayrıntılarını öğrenmek için aşağıdaki kaynakları inceleyebilirsiniz.

Türkçe kaynak;
https://tr.javascript.info/

İngilizce kaynak;
https://www.w3schools.com/js/DEFAULT.asp


İNGİLİZCE - TÜRKÇE SÖZLÜK:

Anlamını bilmediğiniz ingilizce kelimeler için,
https://translate.google.com/ internet sitesini kullanabilirsiniz.


--

Year: 25 October 2020
Developer: Bugra OZDEN
Email: bugra.ozden@gmail.com
Personal Site: http://bugraozden.com
Project Site: https://bug7a.github.io/basicjs-turkce/

You are free:

to Share — to copy, distribute and transmit the work
to Remix — to adapt the work
to make commercial use of the work

https://creativecommons.org/licenses/by/4.0/

Have Fun.

*/

"use strict"
let basic = {};

// En az 20 olması önerilir.
basic.runTime = 45 // 45

// Başlangıç fonksiyonu
basic.start = function () {

    // Ekran nesnesini oluştur.
    page = new MainBox();
    page.element = document.getElementsByTagName("BODY")[0];

    selectBox(page);

    if (typeof start === "function") {
        start();
    }

    if (typeof loop === "function") {
        if(!basic.loopTimer) setLoopTimer(1000);
    }
    
}

// Standart değerler.
basic.ACTION_COLOR = "#689BD2";
basic.ACTION2_COLOR = "cadetblue";
basic.WARNING_COLOR = "tomato";
basic.ALERT_COLOR = "gold";
basic.CANCEL_COLOR = "lightgray";
basic.TEXT_COLOR = "#4A4A4A";
basic.BACKGROUND_COLOR = "whitesmoke";
basic.DARK_BACKGROUND_COLOR = "#141414";
basic.FONT_SIZE = 20;
basic.BUTTON_WIDTH = 130;
basic.BUTTON_HEIGHT = 50;
basic.BUTTON_COLOR = basic.ACTION_COLOR
basic.BUTTON_TEXT_COLOR = "rgba(0, 0, 0, 0.65)";
basic.TEXTBOX_WIDTH = 270;
basic.TEXTBOX_HEIGHT = 50;
basic.LABEL_WIDTH = 270;
basic.LABEL_HEIGHT = "auto";
basic.BOX_WIDTH = 100;
basic.BOX_HEIGHT = 100;
basic.IMAGE_WIDTH = 50;
basic.IMAGE_HEIGHT = 50;

// Gün ve ayların isimleri
basic.gunler = [
    "Pazar",
    "Pazartesi", 
    "Salı", 
    "Çarşamba", 
    "Perşembe", 
    "Cuma", 
    "Cumartesi"
];

basic.days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

basic.aylar = [
    "Ocak", 
    "Şubat", 
    "Mart", 
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
];

basic.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


// body, ekran nesnesi.
let page;
// Son oluşturulan nesne ve bir önceki (ex).
let that = "";
let exThat = "";

// Yeni oluşturulan nesnelerin ekleneceği kutu.
basic.selectedBox;
// loop fonksiyonunu sürekli çağıran timer.
basic.loopTimer;
// loop fonksiyonunu sürekli çağıran timer.
basic.autoAddTimer;
// Yeni oluşturulan nesneler bir süre görünmezdir.
basic.hiddenControlTimer;

// Sayfaya eklenen tüm box nesneleri.
basic.boxes = [];
// Yeni oluşturulan ve görünmeyen nesnelerin listesi.
basic.hiddenObjects = [];

// Ayarlar.
basic.settings = {};
// auto add into box setting.
basic.settings.auto_add_objects_into_boxes = 1;

// Oluşturulan nesneler kaç ms sonra otomatik taşınsın.
basic.settings.add_objects_into_boxes_time = 2;
// Oluşturulan nesneler kaç ms sonra görünsün.
basic.settings.show_hidden_objects_time = basic.runTime;
// NOT: Nesnelerin oluşturulma ve konum değişikliklerini gizlemek için.

basic.settings.auto_size_calculated_time = basic.runTime - 8;
// NOT: Nesnelerin gösterilmesi, hesaplamanın tamamlanmasından yüksek veya aynı olmalı. Yoksa, titreme görünür.

// Hareket ayarları
basic.settings.set_motion_time = basic.runTime + 20;
// NOT: Hareket tanımlanan nesneler, istenmediğinde; tanımlama satırlarındaki değişiklikleri harekete çevirmez.
basic.settings.with_motion_time = basic.runTime + 40;
// NOT: Hareket edecek nesneler, belli bir süre boyunca, ilk konumlarında bekler. 
// Bu, hareketin başını kaçırdığın hissini yumuşatır.

// Hareket kabiliyetini duraklat
basic.settings.dont_motion_time = 5;


// Konsola metin yazdır.
var print = function ($message) {

    console.log($message);

}

// Rasgele bir sayı üret (tek parametre izin verilmiyor.)
var random = function ($first, $second) {

    let myNum = 0;

    if ($second != undefined) {
        if ($second < $first) {
            console.log("basic.js: random(): İkinci parametre (sayı), birinciden büyük olmalıdır.");

        } else {
            myNum = $first + Math.round(Math.random() * ($second - $first));
        }
    } else {
        console.log("basic.js: random(): İki parametre (sayı) gönderilmelidir.");
    }

    return myNum;

}

// Sayıya çevir. $type: "float" veya "integer"
var num = function ($str, $type = "float") {

    if ($type == "float") {
        var i = parseFloat($str);
        return Math.round(i * 100) / 100;
        
    } else if ($type == "integer" || $type == "int") {
        return parseInt($str);
    }
    
}

// Metine çevir.
var str = function ($num) {

    return String($num);

}

// Mobil olup/olmadığını kontrol et. (1:mobil, 0:değil)
var isMobile = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

// URL aç.
var go = function ($url, $windowType = "_self") {
    // window.location.href = $url;
    window.open($url, $windowType);
}

// İki haneli saat ve tarih için başında 0 gösterir. 03:10:05
var twoDigitFormat = function($number) {
    if ($number <= 9) {
        $number = "0" + $number;
    }
    return $number;
}

// Bilgiyi kaydetmek ve geri yüklemek.
var storage = {
    save(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    remove(key) {
        window.localStorage.removeItem(key)
    }
}

// Saat bilgileri.
var clock = {
    get hour() {
        let dt = new Date();
        return dt.getHours();
    },
    get minute() {
        let dt = new Date();
        return dt.getMinutes();
    },
    get second() {
        let dt = new Date();
        return dt.getSeconds();
    }
};

// Tarih bilgileri.
var date = {
    get year() {
        let dt = new Date();
        return dt.getFullYear();
    },
    get mountNumber() {
        let dt = new Date();
        let mouth = dt.getMonth();
        // 0:Ocak, 1:Şubat bunu değiştir. 1:Ocak olsun.
        mouth++;
        return mouth;
    },
    get ayAdi() {
        return basic.aylar[this.mountNumber - 1];
    },
    get mountName() {
        return basic.months[this.mountNumber - 1];
    },
    get dayNumber() {
        let dt = new Date();
        return dt.getDay();
    },
    get gunAdi() {
        return basic.gunler[this.dayNumber];
    },
    get dayName() {
        return basic.days[this.dayNumber];
    },
    get today() {
        let dt = new Date();
        return dt.getDate();
    },
    get now() {
        return Date.now();
    }
}

// Nesnelerin, ortak metod ve özellikleri.
class Basic_UIComponent {

    _type;
    _upperObject;

    _element;
    _visible;
    _opacity;
    _rotate;

    _backgroundColor;

    _border;
    _borderColor;
    _round;
    
    _fontSize;
    _textColor;
    _textAlign;

    _motionString;
    _clickable;

    constructor($type) {

        this._type = $type;

        this._element = null;
        this._visible = 1;
        this._opacity = 1;
        this._rotate = 0;

        this._motionString = "none";
        this._clickable = 0;

    }

    get upperObject() {
        return this._upperObject;
    }

    set upperObject($value) {
        this._upperObject = $value;
    }

    // Hizalama ve boyutlandırma.

    get left() {
        return parseFloat(this.contElement.style.left);
    }

    set left($value) {
        this.contElement.style.right = "";
        this.contElement.style.left = parseFloat($value) + "px";
    }

    get top() {
        return parseFloat(this.contElement.style.top);
    }

    set top($value) {
        this.contElement.style.bottom = "";
        this.contElement.style.top = parseFloat($value) + "px";
    }

    get right() {
        return parseFloat(this.contElement.style.right);
    }

    set right($value) {
        this.contElement.style.left = "";
        this.contElement.style.right = parseFloat($value) + "px";
    }

    get bottom() {
        return parseFloat(this.contElement.style.bottom);
    }

    set bottom($value) {
        this.contElement.style.top = "";
        this.contElement.style.bottom = parseFloat($value) + "px";
    }
    
    get width() {
        var _width = parseInt(this.contElement.style.width);
        if (isNaN(_width)) {
            _width = parseInt(this.contElement.offsetWidth);
        }
        return _width;
    }

    set width($value) {
        if ($value != "auto") {
            this.contElement.style.width = parseInt($value) + "px";
        } else {
            console.log("basic.js: .width: 'auto' özelliği bu nesne için desteklenmiyor.");
        }
    }

    get height() {
        var _height = parseInt(this.contElement.style.height);
        if (isNaN(_height)) {
            _height = parseInt(this.contElement.offsetHeight);
        }
        return _height;
    }

    set height($value) {
        if ($value != "auto") {
            this.contElement.style.height = parseInt($value) + "px";
        } else {
            console.log("basic.js: .height: 'auto' özelliği bu nesne için desteklenmiyor.");

        }
    }

    get rotate() {
        return this._rotate;
    }

    set rotate($value) {
        this._rotate = parseInt($value);
        this.contElement.style.transform = "rotate(" + $value + "deg)";
    }

    // -- Hizalama ve boyutlandırma SONU

    // Genel özellikler

    get visible() {
        return this._visible;
    }

    set visible($value) {
        this._visible = $value;
        // Nesne olluşturulduktan sonra, görünür olana kadar display uygulanmaz.
        // Böylece tarayıcı, "auto" boyutlandırma için hesaplamaları yapar.
        if(this.contElement.style.visibility == "visible") {
            this.contElement.style.display = ($value == 1) ? "block" : "none";
        }
    }

    get clickable() {
        return this._clickable;
    }

    set clickable($value) {
        this._clickable = $value;
        this.contElement.style.pointerEvents = ($value == 1) ? "auto" : "none";
    }

    get opacity() {
        return this._opacity;
    }

    set opacity($value) {
        this._opacity = $value;
        this.contElement.style.opacity = $value;
    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.contElement.style.backgroundColor = $value;
    }

    // -- Genel özellikler SONU

    // Kenarlık

    set border($value) {
        this._border = $value;
        this.contElement.style.borderWidth = $value + "px";
    }

    get border() {
        return this._border;
    }

    get borderColor() {
        return this._borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.contElement.style.borderColor = $value;
    }

    set round($value) {
        this._round = $value;
        this.contElement.style.borderRadius = $value + "px";
    }

    get round() {
        return this._round;
    }

    // -- Kenarlık SONU
    
    // Metin özellikleri
    
    get fontSize() {
        return this._fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this.element.style.fontSize = $value + "px";
    }

    // fontSize Alternatif kullanım
    get textSize() {
        return this._fontSize;
    }

    set textSize($value) {
        this._fontSize = $value;
        this.element.style.fontSize = $value + "px";
    }
    
    get textColor() {
        return this._textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this.element.style.color = $value;
    }

    get textAlign() {
        return this._textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this.element.style.textAlign = $value;
    }
    
    // Metin özellikleri SONU

    // Otomatik hizalama metodları

    center($position) {
        basic.moveToCenter(this, $position);
    }

    aline($obj, $position, $space = 0) {
        basic.moveToAline(this, $obj, $position, $space);
    }

    // -- Otomatik hizalama metodları SONU

    // Nesneyi sil.
    remove() {
        this.contElement.remove();
    }

    // Toplu özellik değiştirmek.
    prop($values) {
        basic.setProparties(this, $values);
    }

    // Olay eklemek.
    _addEventListener($eventName, $func, $element) {
        let _that = this;
        // NOT: Bir nesneye, olay eklemek onu basılabilir yapar.
        $element.addEventListener($eventName, function ($ev) {
            $func(_that, $ev);
        });
    }

    // Hareket
    setMotion($motionString) {
        // motionString "left 1s, top 1s, width 1s, height 1s, transform 1s, background-color 1s, border-radius 1s, opacity 1s";
        if (this.contElement.style.visibility == "visible") {
            this.setMotionNow(this)
        } else {
            this.contElement.style.transition = "none";
            this._motionString = $motionString;
            var _that = this;
            setTimeout(function() {
                _that.contElement.style.transition = _that._motionString;
            }, basic.settings.set_motion_time);
            // NOT: Nesnelerin ilk oluşturulmaları, hareket ayarlarından etkilenmez.
        }
    }

    getMotion() {
        return this._motionString;
    }

    setMotionNow($motionString) {
        this._motionString = $motionString;
        this.contElement.style.transition = $motionString;
    }

    withMotion($func) {
        var _that = this;
        setTimeout(function() {
            $func(_that);
        }, basic.settings.with_motion_time)
    }

    dontMotion() {
        this.contElement.style.transition = "none";
        var _that = this;
        setTimeout(function(){
            _that.contElement.style.transition = _that._motionString;
        }, basic.settings.dont_motion_time)
    }

    canMotionNow() {
        this.contElement.style.transition = this._motionString;
    }

}

/* MAINBOX COMPONENT (page) */
class MainBox {

    _element;
    _backgroundColor;
    _zoom;

    constructor() {

        this._element = null;
        this._backgroundColor = "white";
        this._zoom = 1;

    }

    get element() {
        return this._element;
    }

    set element($value) {
        this._element = $value;
    }

    
    get contElement() {
        return this._element;
    }
    

    get width() {
        let _w;
        _w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return basic.antiZoom(_w);
    }

    get height() {
        let _h;
        _h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return basic.antiZoom(_h);
    }

    get zoom() {
        return this._zoom;
    }

    set zoom($value) {
        this._zoom = $value;
        // this.element.style.zoom = $value;
        // page.zoom kullanılır ise, body margin 0px olarak ayarlanır.
        this.element.style.margin = "0px"
        this.element.style.transformOrigin = "top left";
        this.element.style.transform = "scale(" + $value + ")";
    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.element.style.backgroundColor = $value;
    }

    fit($value = document.body.clientWidth, $maxValue = 900) {
        page.zoom = 1
        let _w = page.width;
        // ikinci değer yok ise
        if (!$maxValue) {
            $maxValue = _w;
        }
        // ekran genişliği izin verilenden fazla ise
        if (_w > $maxValue) {
            page.zoom = $maxValue / $value;
        } else {
            page.zoom = _w / $value;
        }
    }

    // events: resize
    _addEventListener($event, $func) {
        window.addEventListener($event, $func);
    }

    onClick($func) {
        this._addEventListener("click", $func, this.contElement);
    }

    onResize($func) {
        this._addEventListener("resize", $func, this.contElement);
    }

    add($obj) {
        // Eklenen nesnenin, üst nesnesi değişiyor.
        if ($obj.upperObject != this) {
            $obj.upperObject = this;
            this.element.appendChild($obj.contElement);
        }
    }

}

/* BOX COMPONENT */
class Box extends Basic_UIComponent {

    constructor($left = 0, $top = 0, $width = basic.BOX_WIDTH, $height = basic.BOX_HEIGHT) {

        super("box");

        // Renk
        this._backgroundColor = "whitesmoke";

        // Kenarlık
        this._border = 0;
        this._borderColor = "gray";
        this._round = 0;
        
        // Text
        this._fontSize = 16;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        let divElement = document.createElement("DIV");
        divElement.classList.add("basic_box");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        // Genişliğin "auto" olmasına izin verme.
        if ($width == "auto") {
            $width = basic.BOX_WIDTH;
        }

        // TODO: değer auto olabileceği için, özellik kullanıldı.
        this.width = $width;
        this.height = $height;

        basic.boxes.push(this);
        makeBasicObject(this);
        basic.visibiltyControl(this);

    }

    //sample: <b>text</b><br />

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get text() {
        return this.element.innerHTML;
    }

    set text($value) {
        this.element.innerHTML = $value;
    }

    // .text alternatif kullanım:
    get html() {
        return this.element.innerHTML;
    }

    set html($value) {
        this.element.innerHTML = $value;
    }

    // Otomatik yüksekliğe izin ver
    get height() {
        return super.height;
    }

    set height($value) {
        if ($value != "auto") {
            this.contElement.style.height = parseInt($value) + "px";

        } else {
            this.contElement.style.height = "auto";

        }
    }

    get scrollX() {
        return (this.contElement.style.overflowX == "overlay") ? 1 : 0;
    }

    get scrollY() {
        return (this.contElement.style.overflowY == "overlay") ? 1 : 0;
    }

    set scrollX($value) {
        
        this.contElement.style.overflowX = "hidden";

        if ($value == 1) {
            this.clickable = 1
            this.contElement.style.overflowX = "overlay";
        }
    }

    set scrollY($value) {
        
        this.contElement.style.overflowY = "hidden";

        if ($value == 1) {
            this.clickable = 1
            this.contElement.style.overflowY = "overlay";
        }
    }

    onClick($func) {
        this.clickable = 1
        this._addEventListener("click", $func, this.contElement);
    }

    add($obj) {
        if ($obj.upperObject != this) {
            // Eklenen nesnenin, üst nesnesini değiştir.
            $obj.upperObject = this;
            // İçine başka bir nesne eklendiğinde, artık basılabilir.
            this.clickable = 1
            this.element.appendChild($obj.contElement);
        }
    }

    afterSized($func) {
        afterSized($func, this)
    }

    // Ağaç şeklinde kod blokları oluştumak için bir teknik.
    in($func) {
        var _selectedBox = getSelectedBox();
        selectBox(this);
        $func(this);
        selectBox(_selectedBox);
    }

}

// Alternatif kullanım
let createBox = function ($left, $top, $width, $height) {

    return new Box($left, $top, $width, $height);

}

// Alternatif kullanım
let cbox = function ($left, $top, $width, $height) {

    return new Box($left, $top, $width, $height);

}

/* BUTTON COMPONENT */
class Button extends Basic_UIComponent {

    constructor($left = 0, $top = 0, $width = basic.BUTTON_WIDTH, $height = basic.BUTTON_HEIGHT) {

        super("button");

        // renk
        this._backgroundColor = basic.BUTTON_COLOR;

        // kenarlık
        this._border = 1;
        this._borderColor = "rgba(0, 0, 0, 0.40)";
        this._round = 4;
        
        // Text
        this._fontSize = 20;
        this._textColor = basic.BUTTON_TEXT_COLOR;
        this._textAlign = "center";

        this._clickable = 1

        let buttonElement = document.createElement("BUTTON");
        buttonElement.innerHTML = "Button";
        buttonElement.classList.add("basic_button");
        buttonElement.setAttribute("type", "button");

        buttonElement.style.left = $left + "px";
        buttonElement.style.top = $top + "px";

        this._element = buttonElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        // Yüksekliğin "auto" olmasına izin verme.
        if ($height == "auto") {
            $height = basic.BUTTON_HEIGHT;
        }

        // TODO: değer auto olabileceği için, özellik kullanıldı. 
        this.width = $width;
        this.height = $height;

        makeBasicObject(this);
        basic.visibiltyControl(this);

    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get buttonElement() {
        return this._element;
    }

    get text() {
        return this.buttonElement.innerHTML;
    }

    set text($value) {
        this.buttonElement.innerHTML = $value;
    }

    // Otomatik genişliğe izin ver.
    get width() {
        return super.width;
    }

    set width($value) {
        if ($value != "auto") {
            this.contElement.style.width = parseInt($value) + "px";

        } else {
            this.contElement.style.width = "auto";

        }
    }

    // ÖZEL: Renk özelliği
    /*
    get color() {
        return super.color;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.buttonElement.style.backgroundColor = $value;
    }
    */

    // Buttonun value özelliğini kullan.
    get value() {
        return this.buttonElement.value;
    }

    set value($value) {
        this.buttonElement.value = $value;
    }

    get enabled() {
        return (this.buttonElement.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.buttonElement.disabled = ($value) ? 0 : 1;
    }

    get minimal() {
        return (this.buttonElement.classList.contains("minimal")) ? 1 : 0;
    }

    set minimal($value) {
        if ($value) {
            this.buttonElement.classList.add("minimal");
        } else {
            this.buttonElement.classList.remove("minimal");
        }
    }

    onClick($func) {
        this.clickable = 1
        this._addEventListener("click", $func, this.buttonElement);
    }

    //TODO: removeOnClicked(clickedFunc) ihtiyaç olabilir.
    add($obj) {
        console.log("basic.js: add(): Button nesnesinin içine ekleme yapılamaz.");
    }

    afterSized($func) {
        afterSized($func, this)
    }

}

// Alternatif kullanım1
let createButton = function ($left, $top, $width, $height) {

    return new Button($left, $top, $width, $height);

}

// Alternatif kullanım 2
let cbtn = function ($left, $top, $width, $height) {

    return new Button($left, $top, $width, $height);

}

/* TEXTBOX COMPONENT */
class TextBox extends Basic_UIComponent {

    _titleElement = null;
    _mainElement = null;

    constructor($left = 0, $top = 0, $width = basic.TEXTBOX_WIDTH, $height = basic.TEXTBOX_HEIGHT) {

        super("textbox");

        // renk
        this._backgroundColor = "white";

        // kenarlık
        this._border = 1;
        this._borderColor = "#4A4A4A";
        this._round = 4;
        
        // Text
        this._fontSize = 20;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        this._clickable = 1

        let mainElement = document.createElement("DIV");
        mainElement.classList.add("basic_textbox-main");
        this._mainElement = mainElement;

        let titleElement = document.createElement("DIV");
        titleElement.classList.add("basic_textbox-title");
        titleElement.innerHTML = "";
        this._titleElement = titleElement;

        let element = document.createElement("INPUT");
        element.value = "";
        element.classList.add("basic_textbox");
        element.setAttribute("type", "text");
        element.style.width = "100%";
        element.style.height = "100%";
        this._element = element;

        mainElement.style.left = $left + "px";
        mainElement.style.top = $top + "px";
        mainElement.style.width = $width + "px";
        mainElement.style.height = $height + "px";

        mainElement.appendChild(this._titleElement);
        mainElement.appendChild(this._element);

        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._mainElement);

        makeBasicObject(this);
        basic.visibiltyControl(this);

    }

    get element() {
        return this._mainElement;
    }

    get inputElement() {
        return this._element;
    }

    get contElement() {
        return this._mainElement;
    }

    get titleElement() {
        return this._titleElement;
    }

    get text() {
        return this.inputElement.value;
    }

    set text($value) {
        this.inputElement.value = $value.toString();
    }

    // ÖZEL: Renk özelliği
    get color() {
        return super.color;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.inputElement.style.backgroundColor = $value;
    }
    // ÖZEL SONU

    get title() {
        return this.titleElement.innerHTML;
    }

    set title($value) {
        this.titleElement.innerHTML = $value;
    }

    get enabled() {
        return (this.inputElement.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.inputElement.disabled = ($value) ? 0 : 1;
    }

    // ÖZEL: Kenarlık
    set border($value) {
        this._border = $value;
        this.inputElement.style.borderWidth = $value + "px";
    }

    get border() {
        return super.border;
    }

    get borderColor() {
        return super.borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.inputElement.style.borderColor = $value;
    }

    set round($value) {
        this._round = $value;
        this.inputElement.style.borderRadius = $value + "px";
    }

    get round() {
        return super.round;
    }
    // Özel kenarlık SONU

    // ÖZEL
    
    get fontSize() {
        return super.fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this.inputElement.style.fontSize = $value + "px";
    }

    get textSize() {
        return super.textSize;
    }

    set textSize($value) {
        this._fontSize = $value;
        this.inputElement.style.fontSize = $value + "px";
    }
    
    get textColor() {
        return super.textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this.inputElement.style.color = $value;
    }

    get textAlign() {
        return super.textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this.inputElement.style.textAlign = $value;
    }

    get minimal() {
        return (this.inputElement.classList.contains("minimal")) ? 1 : 0;
    }

    set minimal($value) {
        if ($value) {
            this.inputElement.classList.add("minimal");
        } else {
            this.inputElement.classList.remove("minimal");
        }
    }

    onChange($func) {
        this._addEventListener("change", $func, this.inputElement);
    }

    add($obj) {
        console.log("basic.js: add(): TextBox nesnesinin içine ekleme yapılamaz.");
    }

}

// Alternatif kullanım
let createTextBox = function ($left, $top, $width, $height) {

    return new TextBox($left, $top, $width, $height);

}

// Alternatif kullanım
let ctxt = function ($left, $top, $width, $height) {

    return new TextBox($left, $top, $width, $height);

}

/* LABEL COMPONENT */
class Label extends Basic_UIComponent {

    constructor($left = 0, $top = 0, $width = basic.LABEL_WIDTH, $height = basic.LABEL_HEIGHT) {

        super("label");

        //this._value = "";
        this._backgroundColor = "transparent";

        // Kenarlık
        this._border = 0;
        this._borderColor = "#4A4A4A";
        this._round = 0;
        
        // Text
        this._fontSize = 20;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        let divElement = document.createElement("DIV");

        divElement.innerHTML = "Label Text";
        divElement.classList.add("basic_label");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        // TODO: değer auto olabileceği için, özellik kullanıldı. 
        this.width = $width;
        this.height = $height;

        makeBasicObject(this);
        basic.visibiltyControl(this);

    }

    //sample: <b>text</b><br />

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get text() {
        return this.element.innerHTML;
    }

    set text($value) {
        this.element.innerHTML = $value;
    }

    get width() {
        return super.width;
    }

    set width($value) {
        if ($value != "auto") {
            this.contElement.style.width = parseInt($value) + "px";

        } else {
            this.contElement.style.width = "auto";

        }
    }

    get height() {
        return super.height;
    }

    set height($value) {
        if ($value != "auto") {
            this.contElement.style.height = parseInt($value) + "px";

        } else {
            this.contElement.style.height = "auto";
        }
    }

    get space() {
        return parseInt(this.contElement.style.padding) || 0;
    }

    set space($value) {
        this.contElement.style.padding = $value + "px";
    }

    get spaceX() {
        return parseInt(this.contElement.style.paddingLeft) || 0;
    }

    set spaceX($value) {
        this.contElement.style.paddingLeft = $value + "px";
        this.contElement.style.paddingRight = $value + "px";
    }

    get spaceY() {
        return parseInt(this.contElement.style.paddingTop) || 0;
    }

    set spaceY($value) {
        this.contElement.style.paddingTop = $value + "px";
        this.contElement.style.paddingBottom = $value + "px";
    }

    onClick($func) {
        this.clickable = 1
        this._addEventListener("click", $func, this.contElement);
    }

    add($obj) {
        console.log("basic.js: add(): Label nesnesinin içine ekleme yapılamaz.");
    }

    afterSized($func) {
        afterSized($func, this)
    }

}

// Alternatif kullanım
let createLabel = function ($left, $top, $width, $height) {

    return new Label($left, $top, $width, $height);

}

// Alternatif kullanım
let clbl = function ($left, $top, $width, $height) {

    return new Label($left, $top, $width, $height);

}

/* IMAGE COMPONENT */
class Image extends Basic_UIComponent {

    // Not: CheckBox resim nesnesi ile yapılabilir.

    _autoSize;

    constructor($left = 0, $top = 0, $width = 0, $height = 0) {

        super("image");

        this._autoSize = 1;

        // Renk
        this._backgroundColor = "transparent";

        // kenarlık
        this._border = 0;
        this._borderColor = "#4A4A4A";
        this._round = 0;
        
        // Text
        this._fontSize = null;
        this._textColor = null;
        this._textAlign = null;

        let imageElement = document.createElement("IMG");
        imageElement.classList.add("basic_image");

        imageElement.style.left = $left + "px";
        imageElement.style.top = $top + "px";

        if ($width || $height) {
            this.autoSize = 0;
        }

        imageElement.style.width = $width + "px";
        imageElement.style.height = $height + "px";


        var _that = this;

        // Resim yüklendiğinde, Otomatik boyutlandır.
        imageElement.addEventListener('load', function () {

            //if auto size
            if (_that.autoSize > 0) {
                imageElement.style.width = parseInt(_that.naturalWidth / _that.autoSize) + "px";
                imageElement.style.height = parseInt(_that.naturalHeight / _that.autoSize) + "px";
                // Her yüklemede, isteniyor ise auto size özelliğini tekrar aktif etmeli.
                _that.autoSize = 0; 
            }

        });

        this._element = imageElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        makeBasicObject(this);
        basic.visibiltyControl(this);

    }

    get element() {
        return this._element;
    }

    get imageElement() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    // Özel boyutlandırma komutları
    
    get width() {
        return super.width;
    }
    

    set width($value) {
        this.autoSize = 0;
        super.width = $value;
    }

    
    get height() {
        return super.height;
    }
    

    set height($value) {
        this.autoSize = 0;
        super.height = $value;
    }

    // Resim yüklendikten sonra, çalışır.
    get naturalWidth() {
        return this.imageElement.naturalWidth;
    }

    get naturalHeight() {
        return this.imageElement.naturalHeight;
    }

    // Resmi orjinal boyutuna ölçekler. 1: orjinal, 2: 2 kat küçült, 3: 3 kat küçült.
    get autoSize() {
        return this._autoSize;
    }

    set autoSize($value) {
        this._autoSize = $value;
    }

    // TODO: Bu özellik olmaz, resim her zaman kare olmaz.
    // veya spaceX spaceY olabilir. Orantılı olarak kenarlara farklı boşluklar uygulanabilir.
    
    set space($value) {
        this.contElement.style.padding = $value + "px";
    }

    get spaceX() {
        return parseInt(this.contElement.style.paddingLeft) || 0;
    }

    set spaceX($value) {
        this.contElement.style.paddingLeft = $value + "px";
        this.contElement.style.paddingRight = $value + "px";
    }

    get spaceY() {
        return parseInt(this.contElement.style.paddingTop) || 0;
    }

    set spaceY($value) {
        this.contElement.style.paddingTop = $value + "px";
        this.contElement.style.paddingBottom = $value + "px";
    }
    
    onClick($func) {
        this.clickable = 1
        this._addEventListener("click", $func, this.contElement);
    }

    onLoad($func) {
        this._addEventListener("load", $func, this.imageElement);
    }

    load($imagePath) {
        this.imageElement.setAttribute("src", $imagePath);
    }

    add($obj) {
        console.log("basic.js: add(): Image nesnesinin içine ekleme yapılamaz.");
    }

}

// Alternatif kullanım
let createImage = function ($left, $top, $width, $height) {

    return new Image($left, $top, $width, $height);

}

// Alternatif kullanım
let cimg = function ($left, $top, $width, $height) {

    return new Image($left, $top, $width, $height);

}

class Sound {

    /* TODO: 
    - Yükleme sonrasında, ilk çalıştırma da delay olursa, bir çözüm bul.
    */

    _element;

    constructor() {

        this._element = null;

        let element = document.createElement("AUDIO");
        let source = document.createElement("SOURCE");

        element.appendChild(source);

        this._element = element;
        document.body.appendChild(this._element);

        makeBasicObject(this);

    }

    get element() {
        return this._element;
    }

    get soundElement() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get time() {
        return this.element.timr;
    }

    get timeLeft() {
        return this.element.timeLeft;
    }

    get currentTime() {
        return this.element.currentTime;
    }

    get paused() {
        return this.element.paused;
    }

    get playing() {
        return !this.element.paused;
    }

    get loop() {
        return (this.element.getAttribute("loop") == "loop") ? 1 : 0;
    }

    set loop($value) {
        if ($value == 1) {
            this.element.setAttribute("loop", "loop");
        } else {
            this.element.setAttribute("loop", "");
        }
    }

    play() {
        if (this.paused) {
            this.element.play();
        }
    }

    pause($value) {
        if (!this.paused) {
            this.element.pause();
        }
    }

    stop() {
        if (!this.paused) {
            this.element.pause();
            this.element.currentTime = 0;
        }
    }
    
    onLoad($func) {
        let _that = this;
        this.element.addEventListener("canplaythrough", function () {
            $func(_that);
        });
    }

    load($path) {

        let fileType = "audio/wav";

        if ($path.substr(-3).toLowerCase() == "mp3") {
            fileType = "audio/mpeg";
        }

        this.element.children[0].setAttribute("src", $path);
        this.element.children[0].setAttribute("type", fileType);

    }

    remove() {
        this.contElement.remove();
    }

}

/* ### FUNCTIONS ### */

// Dizideki tüm özellikleri, nesneye yansıt.
basic.setProparties = function ($this, $values = []) {

    for (var valueTitle in $values) {
        $this[valueTitle] = $values[valueTitle];
    }

}

// Bir nesnenin, başka bir nesneye göre ortalanması.
basic.moveToCenter = function ($this, $position) {

    // Otomatik Box içine ekleme zaman alır.
    // Ortalama uygulamadan önce içine aktarma işlemini yap.
    // Çünkü .center içinde bulunduğu Box nesnesi ile doğrudan ilgili.
    if (getAutoAdd() == 1) {
        basic.autoAdder($this);
    }

    if ($position == "left" || !$position) {
        let _w = $this.upperObject.width - (($this.upperObject.border || 0) * 2);
        $this.left = parseInt((_w - $this.width) / 2);

    }

    if ($position == "top" || !$position) {
        let _h = $this.upperObject.height - (($this.upperObject.border || 0) * 2);
        $this.top = parseInt((_h - $this.height) / 2);

    }

    // Her zaman tam sayı olarak ortala, yoksa bulanıklık yapabilir.
    // TODO: Eğer, kenarlık kalınlıkları, aynı olmaz ise, doğru hesaplayamayacak.

}

// Bir nesneye göre hizalama yapar.
basic.moveToAline = function ($this, $obj, $position, $space) {

    if ($position == "left") {
        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left - $this.width - $space);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right + $obj.width + $space);

        }

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else {
            $this.bottom = parseInt($obj.bottom);

        }

    } else if ($position == "top") {
        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top - $this.height - $space);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom + $this.height + $space);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else {
            $this.right = parseInt($obj.right);

        }


    } else if ($position == "right") {
        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left + $obj.width + $space);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right - $obj.width - $space);

        }

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else {
            $this.bottom = parseInt($obj.bottom);

        }

    } else if ($position == "bottom") {
        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top + $obj.height + $space);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom - $obj.height - $space);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else {
            $this.right = parseInt($obj.right);

        }


    } else {

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right);

        }

    }
    
}

// Her saniye tekrar eden fonksiyonun zamanını ayarla.
let setLoopTimer = function ($time) {
    
    if (typeof loop === "function") {

        // Daha önceden oluşturulmuş ise temizle.
        if (basic.loopTimer) { 
            basic.loopTimer = clearInterval(basic.loopTimer);
            //basic.loopTimer = undefined;
        }

        // Yenisini oluştur.
        if ($time == 0) {
            // Eğer tekrarlama zamanı 0 ise yenisini oluşturma.
        } else {
            basic.loopTimer = setInterval(loop, $time);
        }
        
    }

}

// Zoom değeri değiştirilmiş bir alanın, orjinal boyutunu hesaplar.
basic.antiZoom = function ($value) {

    return parseInt($value * (1 / page.zoom));

}

// Hangi box nesnesi seçili ise, yeni eklenen nesneler onun içinde oluşturulur.
let selectBox = function ($box) {

    basic.selectedBox = $box;

    // Bir div elementine, Box nesnesi eklemek için;
    // document.getElementById("elementID").appendChild(boxObject.contElement)

}

// Nesne hangi kutuya eklenecek.
let getSelectedBox = function () {
    
    return basic.selectedBox;

}

// Box nesnesine eklenen nesneyi, otomatik o nesnenin içine taşır.
basic.autoAdd = function ($object) {

    // Bir nesne create edildikten sonra, bir box nesnesinin içine aktarılıyor. (gecikme)
    // page1.btn1 = createButton() gibi,

    // Yeni nesne eklendiğinde bir önceki otomatik eklenir, zamanlayıcıyı temizle.
    if (basic.autoAddTimer) {
        basic.autoAddTimer = clearTimeout(basic.autoAddTimer);
    }

    // Son eklenen nesne için uygula.
    basic.autoAddTimer = setTimeout(function () {
        basic.autoAdder($object);
    }, basic.settings.add_objects_into_boxes_time);


}

// Box nesnesine eklenen nesneyi, otomatik o nesnenin içine taşır.
basic.visibiltyControl = function ($object) {

    // $object.contElement.style.visibility = ($object._visible == 1) ? "visible" : "hidden";
    basic.hiddenObjects.push($object);

    // Yeni nesne eklendiğinde bir önceki otomatik eklenir, zamanlayıcıyı temizle.
    if (basic.hiddenControlTimer) {
        basic.hiddenControlTimer = clearTimeout(basic.hiddenControlTimer);
    }

    // Son eklenen nesne için uygula.
    basic.hiddenControlTimer = setTimeout(function () {
        // Görünmeyen tüm nesneleri göster.
        for ( var i = 0; i < basic.hiddenObjects.length; i++) {
            basic.hiddenObjects[i].contElement.style.visibility = "visible";
            // Nesne gösterildiğinde, belirlenen değere göre; nesneyi göster veya gösterme.
            if (basic.hiddenObjects[i]._visible == 0) {
                var _that = basic.hiddenObjects[i];
                _that.visible = 0;
            }
            // NOT: Nesne başlangıçta display:none yapılırsa, "auto" hesaplamalar da yapılmaz.
            // O yüzden, nesneler gösterilene kadar, Kullanıcının display:none yapma isteğini geciktirir.
        }
        
        basic.hiddenObjects = []

    }, basic.settings.show_hidden_objects_time);


}

// Nesnenin taşınması gerektiğini tespit eden ve taşıyan fonksiyon.
basic.autoAdder = function ($object) {
    // Taşıyıcı nesne, alt nesnelere eklenmeye çalışılır ise hata vermesin.
    try {
        for (var boxIndex in basic.boxes) {
            for (var boxItemNames in basic.boxes[boxIndex]) {
                if (basic.boxes[boxIndex][boxItemNames] == $object) {
                    if (basic.boxes[boxIndex].upperObject != $object) {
                        basic.boxes[boxIndex].add($object);
                    }
                }
            }
        }
        if ($object != page) {
            // Nesne bir mainBox değil.
        }
    } catch (e) {
        //console.log("insert error.")
    }
}

// Box nesnesi içine eklenen, diğer nesnelerin otomatik taşı.
let setAutoAdd = function ($value) {
    basic.settings.auto_add_objects_into_boxes = $value;
}

let getAutoAdd = function () {
    return basic.settings.auto_add_objects_into_boxes;
}

// Özel bir nesne oluşturulduğunda, that ve exThat nesnelerini yeniden düzenle.
let makeBasicObject = function($newObject) {

    // Önceki nesneyi kontrol et ve gerekirse taşı.
    if (getAutoAdd() == 1) {
        // NOT: Yeni bir nesne oluşturulduğunda, katman sırası bozulmasın diye,
        // Eğer kontrol edilmemiş ise, bir önceki nesnenin hemen otomatik eklenmesini gerçekleştir.
        if (that) {
            basic.autoAdder(that);
        }
    }

    // Önceki nesneyi taşı.
    exThat = that
    // Yeni nesneyi kullanılmak üzere değişkene aktar.
    that = $newObject

    // Yeni nesneyi ilerde kontrol etmek için ayarla.
    if (getAutoAdd() == 1) {
        // Bir nesne oluşturulduğunda, bir önceki oluşturan nesne otomatik ekleme için kontrol edilir.
        // Son oluşturulan nesnenin de kontrol edilmesi için zamanlayıcıyı kur.
        basic.autoAdd(that);
    }

}

// Boyutu, tarayıcı tarafından hesaplanana nesnelerin, hesaplanmasını bekler.
let afterSized = function($func, $obj) {

    setTimeout(function(){
        $func($obj)
    }, basic.settings.auto_size_calculated_time);

}

/* ### START ### */
window.addEventListener("load", function () {
    basic.start()
});