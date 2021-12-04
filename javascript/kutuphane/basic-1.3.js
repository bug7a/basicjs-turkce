
/* Bismillah */

/*

BasicJS KÜTÜPHANESİ NEDİR?

Programlamaya yeni başlayanlar için:
Yazılım projeleri geliştirmeyi kolaylaştıran JavaScript kütüphanesi.


JAVASCRIPT PROGRAMLAMA DİLİ:

- Bu kütüphane, temel JavaScript kodları ile geliştirilmiştir.
- JavaScript'in ayrıntılarını öğrenmek için aşağıdaki kaynakları öneriyorum.

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
WebSite: http://bugraozden.com

You are free:

to Share — to copy, distribute and transmit the work
to Remix — to adapt the work
to make commercial use of the work

https://creativecommons.org/licenses/by/4.0/

Have Fun.

*/

"use strict"

// Standartlar.
const DEFAULT = {};

// Standart değerler.
DEFAULT.ACTION_COLOR = "steelblue";
DEFAULT.CANCEL_COLOR = "lightgray";
DEFAULT.WARNING_COLOR = "tomato";
DEFAULT.ALERT_COLOR = "gold";
DEFAULT.TEXT_COLOR = "#4A4A4A";
DEFAULT.BACKGROUND_COLOR = "whitesmoke";
DEFAULT.FONT_SIZE = 20;
DEFAULT.BUTTON_WIDTH = 130;
DEFAULT.BUTTON_HEIGHT = 50;
DEFAULT.BUTTON_COLOR = "steelblue";
DEFAULT.TEXTBOX_WIDTH = 270;
DEFAULT.TEXTBOX_HEIGHT = 50;
DEFAULT.LABEL_WIDTH = 270;
DEFAULT.LABEL_HEIGHT = "auto";
DEFAULT.BOX_WIDTH = 100;
DEFAULT.BOX_HEIGHT = 100;
DEFAULT.IMAGE_WIDTH = 50;
DEFAULT.IMAGE_HEIGHT = 50;


// body, ekran nesnesi.
let page;
// Son oluşturulan nesne ve bir önceki (ex).
let that = "";
let exThat = "";
// Yeni oluşturulan nesnelerin ekleneceği kutu.
let basic_selectedBox;
// loop fonksiyonunu sürekli çağıran timer.
let basic_loopTimer;
// Sayfaya eklenen tüm box nesneleri.ß
let basic_boxes = [];

//let gunler = ["Pazartesi", "Salı", "Çarşamba", ];
//let aylar = ["Ocak", "Şubat", "Mart", "Nisan"];

// Ayarlar.
let basic_settings = {};
// auto add into box setting.
basic_settings.auto_add_objects_into_boxes = 1;

let Basic = {};

Basic.init = function () {

}


// Nesnelerin, ortak metod ve özellikleri.
class UIComponent {

    _type;
    _upperObject;

    _element;
    _rotate;

    _backgroundColor;

    _border;
    _borderColor;
    _round;
    
    _fontSize;
    _textColor;
    _textAlign;

    constructor($type) {

        this._type = $type;

        this._element = null;
        this._rotate = 0;

    }

    get upperObject() {
        return this._upperObject;
    }

    set upperObject($value) {
        this._upperObject = $value;
    }

    // Hizalama ve boyutlandırma.

    get left() {
        return parseInt(this.contElement.style.left);
    }

    set left($value) {
        this.contElement.style.right = "";
        this.contElement.style.left = parseInt($value) + "px";
    }

    get top() {
        return parseInt(this.contElement.style.top);
    }

    set top($value) {
        this.contElement.style.bottom = "";
        this.contElement.style.top = parseInt($value) + "px";
    }

    get right() {
        return parseInt(this.contElement.style.right);
    }

    set right($value) {
        this.contElement.style.left = "";
        this.contElement.style.right = parseInt($value) + "px";
    }

    get bottom() {
        return parseInt(this.contElement.style.bottom);
    }

    set bottom($value) {
        this.contElement.style.top = "";
        this.contElement.style.bottom = parseInt($value) + "px";
    }
    
    // TODO: width, height parseFloat yapılabilir.
    // TODO: width ve height için "auto" değeri eklenebilsin. Olmaz, geri alırken auto ise offsetHeight den alınacak.

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
            this.contElement.style.width = "auto";

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
            this.contElement.style.height = "auto";

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
        return (this.contElement.style.display == "none") ? 0 : 1;
    }

    set visible($value) {
        this.contElement.style.display = ($value == 1) ? "block" : "none";
    }

    get opacity() {
        return this.contElement.style.opacity || 1;
    }

    set opacity($value) {
        this.contElement.style.opacity = $value;
    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {

        this._backgroundColor = $value;

        //if ($value == "okay") $value = DEFAULT.BUTTON_COLOR;
        //if ($value == "cancel") $value = DEFAULT.CANCEL_COLOR;
        //if ($value == "delete") $value = DEFAULT.WARNING_COLOR;

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
        moveToCenter(this, $position);
    }

    aline($obj, $position, $space = 0) {
        moveToAline(this, $obj, $position, $space);
    }

    // -- Otomatik hizalama metodları SONU

    // Nesneyi sil.
    delete() {
        this.contElement.remove();
    }

}

// Bilgiyi kaydetmek ve geri yüklemek.
let data = {

    save(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));

    },

    load(key) {
        return JSON.parse(window.localStorage.getItem(key));

    },

    delete(key) {  
        window.localStorage.removeItem(key)

    }

}

// Saat bilgileri.
let clock = {

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


let date = {

    get year() {

    },

    get mount() {

    },

    get week() {

    },

    get day() {

    }

}

let mouse = {

    get x() {

    },

    get y() {

    }

}

/* MAINBOX COMPONENT (page) */
class MainBox {

    // Not: Ana pencerede scroll özelliği olmasın. Gerekirse, yeni bir box nesnesi oluşturulsun.

    _element;
    _backgroundColor;
    _zoom;

    constructor() {

        this._element = null;
        this._backgroundColor = "white";
        this._zoom = 1;

        exThat = that;
        that = this;

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

        return antiZoom(_w);

    }

    get height() {

        let _h;

        _h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        return antiZoom(_h);

    }

    get zoom() {
        return this._zoom;
    }

    set zoom($value) {
        this._zoom = $value;
        this.element.style.zoom = $value;
    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.element.style.backgroundColor = $value;
    }

    fit($value = document.body.clientWidth, $maxValue = 900) {

        let _w = page.width; //antizoom silindi

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
    addEventListener($event, $func) {
        window.addEventListener($event, $func);
    }

    onClick($func) {
        this.addEventListener("click", $func);
    }

    onResize($func) {
        this.addEventListener("resize", $func);
    }

    onMouseMove() {

    }

    add($obj) {
        // Eklenen nesnenin, üst nesnesi değişiyor.
        $obj.upperObject = this;
        this.element.appendChild($obj.contElement);
    }

}

/* BOX COMPONENT */
class Box extends UIComponent {

    constructor($left = 0, $top = 0, $width = DEFAULT.BOX_WIDTH, $height = DEFAULT.BOX_HEIGHT) {

        super("box");

        // Renk
        this._backgroundColor = "beige";

        // Kenarlık
        this._border = 0;
        this._borderColor = "gray";
        this._round = 0;
        
        // Text
        this._fontSize = 16;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        let labelElement = document.createElement("DIV");
        labelElement.setAttribute("class", "box");

        labelElement.style.left = $left + "px";
        labelElement.style.top = $top + "px";
        labelElement.style.width = $width + "px";
        labelElement.style.height = $height + "px";

        this._element = labelElement;
        this._upperObject = basic_selectedBox;
        basic_selectedBox.element.appendChild(this._element);

        basic_boxes.push(this);

        if (getAutoAdd() == 1) {
            basic_autoAdd(this);
        }

        exThat = that;
        that = this;

    }

    //sample: <b>text</b><br />

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html($value) {
        this.element.innerHTML = $value;
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
            this.contElement.style.overflowX = "overlay";
        }
    }

    set scrollY($value) {
        this.contElement.style.overflowY = "hidden";

        if ($value == 1) {
            this.contElement.style.overflowY = "overlay";
        }
    }

    // "x", "y", "xy", "none"
    set scroll($value) {

        this.contElement.style.overflowX = "hidden";
        this.contElement.style.overflowY = "hidden";

        if ($value == "x" || $value == "xy") {
            this.contElement.style.overflowX = "overlay";
        }

        if ($value == "y" || $value == "xy") {
            this.contElement.style.overflowY = "overlay";
        }

    }

    // events: click
    addEventListener($event, $func) {
        let _that = this;
        this.element.style.pointerEvents = "auto";
        this.element.addEventListener($event, function () {
            $func(_that);
        });

    }

    onClick($func) {
        this.addEventListener("click", $func);
    }

    onResize($func) {
        // TODO: genişlik veya yükseklik değiştirildiğinde, çalıştırılabilir.
    }

    add($obj) {
        // Eklenen nesnenin, üst nesnesini değiştir.
        $obj.upperObject = this;
        this.element.appendChild($obj.contElement);
    }

}

let createBox = function ($left, $top, $width, $height) {

    return new Box($left, $top, $width, $height);

}

/* BUTTON COMPONENT */
class Button extends UIComponent {

    constructor($left = 0, $top = 0, $width = DEFAULT.BUTTON_WIDTH, $height = DEFAULT.BUTTON_HEIGHT) {

        super("button");

        // renk
        this._backgroundColor = DEFAULT.BUTTON_COLOR;

        // kenarlık
        this._border = 1;
        this._borderColor = "rgba(0, 0, 0, 0.40)";
        this._round = 4;
        
        // Text
        this._fontSize = 20;
        this._textColor = "rgba(0, 0, 0, 0.90)";
        this._textAlign = "center";

        // TODO: Bir dış div taşıyıcı nesnesi faydalı olur mu?

        let buttonElement = document.createElement("BUTTON");
        buttonElement.innerHTML = "Button";
        buttonElement.setAttribute("class", "button");
        buttonElement.setAttribute("type", "button");

        buttonElement.style.left = $left + "px";
        buttonElement.style.top = $top + "px";
        buttonElement.style.width = $width + "px";
        buttonElement.style.height = $height + "px";

        this._element = buttonElement;
        this._upperObject = basic_selectedBox;
        basic_selectedBox.element.appendChild(this._element);

        if (getAutoAdd() == 1) {
            basic_autoAdd(this);
        }

        exThat = that;
        that = this;

    }

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

    // ÖZEL: Renk özelliğini element taşır.
    get color() {
        return super.color;
    }

    set color($value) {

        this._backgroundColor = $value;

        //if ($value == "okay") $value = DEFAULT.BUTTON_COLOR;
        //if ($value == "cancel") $value = DEFAULT.CANCEL_COLOR;
        //if ($value == "delete") $value = DEFAULT.WARNING_COLOR;

        this.element.style.backgroundColor = $value;
    }

    // Buttonun value özelliğini kullan.
    get value() {
        return this.element.value;
    }

    set value($value) {
        this.element.value = $value;
    }

    get enabled() {
        return (this.element.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.element.disabled = ($value) ? 0 : 1;
    }

    get minimal() {
        return (this.element.getAttribute("class") == "button") ? 0 : 1;
    }

    set minimal($value) {
        if ($value) {
            this.element.setAttribute("class", "button minimal");
        } else {
            this.element.setAttribute("class", "button");
        }
    }

    addEventListener($event, $func) {
        let _that = this;
        this.element.style.pointerEvents = "auto";
        this.element.addEventListener($event, function () {
            $func(_that);
        });
    }

    onClick($func) {
        this.addEventListener("click", $func);
    }

    //TODO: removeOnClicked(clickedFunc) ihtiyaç olabilir.
    add($obj) {
        alert("Button nesnesinin içine ekleme (add) yapılamaz.");
    }

}

let createButton = function ($left, $top, $width, $height) {

    return new Button($left, $top, $width, $height);

}

/* TEXTBOX COMPONENT */
class TextBox extends UIComponent {

    _titleElement = null;
    _mainElement = null;

    constructor($left = 0, $top = 0, $width = DEFAULT.TEXTBOX_WIDTH, $height = DEFAULT.TEXTBOX_HEIGHT) {

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

        let mainElement = document.createElement("DIV");
        mainElement.style.position = "absolute";
        this._mainElement = mainElement;

        let titleElement = document.createElement("DIV");
        titleElement.setAttribute("class", "textbox title");
        titleElement.innerHTML = "";
        this._titleElement = titleElement;

        let element = document.createElement("INPUT");
        element.value = "";
        element.setAttribute("class", "textbox");
        element.setAttribute("type", "text");
        this._element = element;

        mainElement.style.left = $left + "px";
        mainElement.style.top = $top + "px";
        
        element.style.width = $width + "px";
        element.style.height = $height + "px";
        mainElement.style.width = $width + "px";
        mainElement.style.height = $height + "px";

        mainElement.appendChild(this._titleElement);
        mainElement.appendChild(this._element);

        this._upperObject = basic_selectedBox;
        basic_selectedBox.element.appendChild(this._mainElement);

        if (getAutoAdd() == 1) {
            basic_autoAdd(this);
        }

        exThat = that;
        that = this;

    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._mainElement;
    }

    get titleElement() {
        return this._titleElement;
    }

    /* Diğerlerinden farklı: genişlik ve yükseklik element nesnesine bağlıdır. */
    get width() {
        return parseInt(this.element.style.width);
    }
    // Farklı
    set width($value) {
        this.contElement.style.width = $value + "px";
        this.element.style.width = $value + "px";
    }
    // Farklı
    get height() {
        return parseInt(this.element.style.height);
    }
    // Farklı
    set height($value) {
        this.contElement.style.height = $value + "px";
        this.element.style.height = $value + "px";
    }

    get text() {
        return this.element.value;
    }

    set text($value) {
        this.element.value = $value.toString();
    }

    // ÖZEL: Renk özelliğini element taşıyor.
    get color() {
        return super.color;
    }

    set color($value) {

        this._backgroundColor = $value;

        this.element.style.backgroundColor = $value;
    }
    // ÖZEL SONU

    get title() {
        return this.titleElement.innerHTML;
    }

    set title($value) {
        this.titleElement.innerHTML = $value;
    }

    get enabled() {
        return (this.element.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.element.disabled = ($value) ? 0 : 1;
    }

    // ÖZEL: Kenarlık
    set border($value) {
        this._border = $value;
        this.element.style.borderWidth = $value + "px";
    }

    get border() {
        return super.border;
    }

    get borderColor() {
        return super.borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.element.style.borderColor = $value;
    }

    set round($value) {
        this._round = $value;
        this.element.style.borderRadius = $value + "px";
    }

    get round() {
        return super.round;
    }
    // Özel kenarlık SONU

    get minimal() {
        return (this.element.getAttribute("class") == "textbox") ? 0 : 1;
    }

    set minimal($value) {
        if ($value) {
            this.element.setAttribute("class", "textbox minimal");
        } else {
            this.element.setAttribute("class", "textbox");
        }
    }

    addEventListener($event, $func) {
        let _that = this;
        this.element.addEventListener($event, function () {
            $func(_that);
        });
    }

    onChange($func) {
        this.addEventListener("change", $func);
    }

    add($obj) {
        alert("TextBox nesnesinin içine ekleme (add) yapılamaz.");
    }

}

let createTextBox = function ($left, $top, $width, $height) {

    return new TextBox($left, $top, $width, $height);

}

/* LABEL COMPONENT */
class Label extends UIComponent {

    constructor($left = 0, $top = 0, $width = DEFAULT.LABEL_WIDTH, $height = DEFAULT.LABEL_HEIGHT) {

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

        let labelElement = document.createElement("DIV");

        labelElement.innerHTML = "Label Text";
        labelElement.setAttribute("class", "label");

        labelElement.style.left = $left + "px";
        labelElement.style.top = $top + "px";

        this._element = labelElement;
        this._upperObject = basic_selectedBox;
        basic_selectedBox.element.appendChild(this._element);

        // TODO: değer auto olabileceği için, özellik kullanıldı. Diğer nesneler için de yapılabilir. 
        this.width = $width;
        this.height = $height;

        if (getAutoAdd() == 1) {
            basic_autoAdd(this);
        }

        exThat = that;
        that = this;

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

    get space() {
        return parseInt(this.contElement.style.padding) || 0;
    }

    set space($value) {
        this.contElement.style.padding = $value + "px";
    }

    addEventListener($event, $func) {
        let _that = this;
        this.element.style.pointerEvents = "auto";
        this.element.addEventListener($event, function () {
            $func(_that);
        });
    }

    onClick($func) {
        this.addEventListener("click", $func);
    }

    add($obj) {
        alert("Label nesnesinin içine ekleme (add) yapılamaz.");
    }

}

let createLabel = function ($left, $top, $width, $height) {

    return new Label($left, $top, $width, $height);

}

/* IMAGE COMPONENT */
class Image extends UIComponent {

    // Not: CheckBox resim nesnesi ile yapılabilir.
    // TODO: Eğer resim nesnesi div içine eklenecek ise; resim: imageElement, ana nesne: element olmalı.

    _mainElement;
    _autoSize;

    constructor($left = 0, $top = 0, $width = 0, $height = 0) {

        super("image");

        this._mainElement = null;
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


        let shapeElement = document.createElement("DIV");
        shapeElement.setAttribute("class", "image");

        let imageElement = document.createElement("IMG");
        imageElement.setAttribute("width", "100%");
        imageElement.setAttribute("height", "100%");

        shapeElement.appendChild(imageElement);

        shapeElement.style.left = $left + "px";
        shapeElement.style.top = $top + "px";

        if ($width || $height) {
            this.autoSize = 0;
        }

        shapeElement.style.width = $width + "px";
        shapeElement.style.height = $height + "px";

        shapeElement.style.opacity = 1;

        //shapeElement.style.borderWidth = "1px";
        var _that = this;

        // Resim yüklendiğinde, Otomatik boyutlandır.
        imageElement.addEventListener('load', function () {

            //if auto size
            if (_that.autoSize > 0) {
                shapeElement.style.width = parseInt(this.naturalWidth / _that.autoSize) + "px";
                shapeElement.style.height = parseInt(this.naturalHeight / _that.autoSize) + "px";
                // Her yüklemede, isteniyor ise auto size özelliğini tekrar aktif etmeli.
                _that.autoSize = 0; 
            }

            //shapeElement.style.borderWidth = "0px";

        });

        this._element = imageElement;
        this._mainElement = shapeElement;
        this._upperObject = basic_selectedBox;
        basic_selectedBox.element.appendChild(this._mainElement);

        if (getAutoAdd() == 1) {
            basic_autoAdd(this);
        }

        exThat = that;
        that = this;

    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._mainElement;
    }

    // Özel boyutlandırma komutları
    
    get width() {
        return parseInt(this.contElement.style.width);
    }
    

    set width($value) {
        this.autoSize = 0;
        super.width = $value;
        //this.contElement.style.width = $value + "px";
    }

    
    get height() {
        return parseInt(this.contElement.style.height);
    }
    

    set height($value) {
        this.autoSize = 0;
        super.height = $value;
        //this.contElement.style.height = $value + "px";
    }

    // Resim yüklendikten sonra, çalışır.
    get naturalWidth() {
        return this.element.naturalWidth;
    }

    get naturalHeight() {
        return this.element.naturalHeight;
    }

    get imageTop() {
        return parseInt(this.element.style.marginTop);
    }

    set imageTop($value) {
        this.element.style.marginTop = $value + "px";
    }

    get imageLeft() {
        return parseInt(his.element.style.marginLeft);
    }

    set imageLeft($value) {
        this.element.style.marginLeft = $value + "px";
    }

    // Resmi orjinal boyutuna ölçekler. 1: orjinal, 2:2 kat küçült, 3: 3 kat küçült.
    get autoSize() {
        return this._autoSize;
    }

    set autoSize($value) {
        this._autoSize = $value;
    }

    //TODO: Bu özellik olmaz, resim her zaman kare olmaz.
    // veya spaceX spaceY olabilir.
    
    get space() {
        return parseInt(this.contElement.style.padding) || 0;
    }

    set space($value) {
        this.contElement.style.padding = $value + "px";
    }
    
    addEventListener($event, $func) {
        let _that = this;
        this.contElement.style.pointerEvents = "auto";
        this.element.addEventListener("load", function () {
            $func(_that);
        });
    }

    onClick($func) {
        //this.addEventListener("click", $func);
        let _that = this;
        this.contElement.style.pointerEvents = "auto";
        this.contElement.addEventListener("click", function () {
            $func(_that);
        });
    }

    onLoad($func) {
        //this.addEventListener("load", $func);
        let _that = this;
        //this.contElement.style.pointerEvents = "auto";
        this.element.addEventListener("load", function () {
            $func(_that);
        });
    }

    load($imagePath) {
        this.element.setAttribute("src", $imagePath);
    }

    add($obj) {
        alert("Image nesnesinin içine ekleme (add) yapılamaz.");
    }

}

let createImage = function ($left, $top, $width, $height) {

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

        exThat = that;
        that = this;

    }

    get element() {
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

    delete() {
        this.contElement.remove();
    }

}

/* ### FUNCTIONS ### */

// Bir nesnenin, başka bir nesneye göre ortalanması.
let moveToCenter = function ($this, $position) {

    // Otomatik Box içine ekleme 1ms sürüyor. 
    // Ortalama uygulamadan önce içine aktarma işlemini yap.
    // Çünkü .center içinde bulunduğu Box nesnesi ile doğrudan ilgili.
    if (getAutoAdd() == 1) {
        // TODO: Buradaki kod, nesneyi 2 kere daha kutu içine almaya çalışıyor.
        // Ve ters şekilde; dış kutuyu iç kutuya almaya çalışıyor. (3.)
        basic_autoAdder($this);
    }

    if ($position == "left" || !$position) {
        let _w = $this.upperObject.width;
        $this.left = (_w - $this.width) / 2;

    }

    if ($position == "top" || !$position) {
        let _h = $this.upperObject.height;
        $this.top = (_h - $this.height) / 2;

    }

}

// Bir nesneye göre hizalama yapar.
let moveToAline = function ($this, $obj, $position, $space) {

    if ($position == "left") {
        if ($obj.left > -1) {
            $this.left = $obj.left - $this.width - $space;

        } else if ($obj.right > -1) {
            $this.right = $obj.right + $obj.width + $space;

        }

        if ($obj.top > -1) {
            $this.top = $obj.top;

        } else {
            $this.bottom = $obj.bottom;

        }

    } else if ($position == "top") {
        if ($obj.top > -1) {
            $this.top = $obj.top - $this.height - $space;

        } else if ($obj.bottom > -1) {
            $this.bottom = $obj.bottom + $this.height + $space;

        }

        if ($obj.left > -1) {
            $this.left = $obj.left;

        } else {
            $this.right = $obj.right;

        }


    } else if ($position == "right") {
        if ($obj.left > -1) {
            $this.left = $obj.left + $obj.width + $space;

        } else if ($obj.right > -1) {
            $this.right = $obj.right - $obj.width - $space;

        }

        if ($obj.top > -1) {
            $this.top = $obj.top;

        } else {
            $this.bottom = $obj.bottom;

        }

    } else if ($position == "bottom") {
        if ($obj.top > -1) {
            $this.top = $obj.top + $obj.height + $space;

        } else if ($obj.bottom > -1) {
            $this.bottom = $obj.bottom - $obj.height - $space;

        }

        if ($obj.left > -1) {
            $this.left = $obj.left;

        } else {
            $this.right = $obj.right;

        }


    } else {

        if ($obj.top > -1) {
            $this.top = $obj.top;

        } else if ($obj.bottom > -1) {
            $this.bottom = $obj.bottom;

        }

        if ($obj.left > -1) {
            $this.left = $obj.left;

        } else if ($obj.right > -1) {
            $this.right = $obj.right;

        }

    }

}

// Her saniye tekrar eden fonksiyonun zamanını ayarla.
let setLoopTimer = function ($time) {
    
    if (typeof loop === "function") {

        // Daha önceden oluşturulmuş ise temizle.
        if (basic_loopTimer) { 
            basic_loopTimer = clearInterval(basic_loopTimer);
            //basic_loopTimer = undefined;
        }

        // Yenisini oluştur.
        if ($time == 0) {
            // Eğer tekrarlama zamanı 0 ise yenisini oluşturma.
        } else {
            basic_loopTimer = setInterval(loop, $time);
        }
        
    }

}

// Rasgele bir sayı üret (tek parametre için 1 den başlar.)
let random = function ($first, $second) {

    let myNum = 0;

    if ($second != undefined) {
        if ($second < $first) {
            alert("İkinci sayı, birinciden büyük olmalıdır. random(num1:integer, num2:integer) fonksiyonu, verilen iki sayı arasında rasgele bir sayı üretir.");

        } else {
            myNum = $first + Math.round(Math.random() * ($second - $first));

        }

    } else {
        if ($first != 0) {
            myNum = 1 + Math.round(Math.random() * ($first - 1));

        } else {
            myNum = 0;

        }

    }

    return myNum;

}

// Consola metin yazdır.
let print = function ($message) {

    console.log($message);

}

// Sayıya çevir. $type: "float" veya "integer"
let num = function ($str, $type = "float") {

    if ($type == "float") {
        return parseFloat($str);
        
    } else if ($type == "integer") {
        return parseInt($str);
        
    }
    
}

// Metine çevir.
let str = function ($num) {

    return String($num);

}

// Zoom değeri değiştirilmiş bir alanın, orjinal boyutunu hesaplar.
let antiZoom = function ($value) {

    return parseInt($value * (1 / page.zoom));

}

// Mobil olup/olmadığını kontrol et. (1:mobil, 0:değil)
let isMobile = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

// URL aç.
let go = function ($url, $windowType = "_self") {
    if (isMobile) {
        window.location.href = $url;
    } else {
        window.open($url, $windowType);
    }
}

// Hangi box nesnesi seçili ise, yeni eklenen nesneler onun üzerine oluşturulur.
let selectBox = function ($box) {

    //TODO: if (typeof $box === "Box") { -- box object
    //TODO: if (typeof $box === "DIV element") { -- div element
    //TODO: if (typeof $box === "string") {  --  get element by id

    basic_selectedBox = $box;

    // Bir div elementi seçmek için:
    // selectBox({"element":DOMElement});

}

let addToElement = function ($element, $obj) {

    //TODO: if (typeof $box === "DIV element") { -- div element
    //TODO: if (typeof $box === "string") {  --  get element by id

}

// Nesne hangi kutuya eklenecek.
let getSelectedBox = function () {

    return basic_selectedBox;

}

// Box nesnesine eklenen nesneyi, otomatik o nesnenin içine taşır.
let basic_autoAdd = function ($object) {

    // Bir nesne create edildikten sonra, bir box nesnesinin içine aktarılıyor. (gecikme)
    // page1.btn1 = createButton() gibi,
    setTimeout(function () {
        basic_autoAdder($object);
    }, 1);
}

let basic_autoAdder = function ($object) {
    // Taşıyıcı nesne, alt nesnelere eklenmeye çalışılır ise hata vermesin.
    try {
        for (var boxIndex in basic_boxes) {
            for (var boxItemNames in basic_boxes[boxIndex]) {
                if (basic_boxes[boxIndex][boxItemNames] == $object) {
                    // console.log("insert:")
                    // console.log($object.text + " -> " + basic_boxes[boxIndex].text);
                    // console.log($object.color + " -> " + basic_boxes[boxIndex].color);
                    basic_boxes[boxIndex].add($object);
                }
            }
        }
    } catch (e) {
        // console.log("insert error.")
    }
}

let setAutoAdd = function ($value) {
    basic_settings.auto_add_objects_into_boxes = $value;
}

let getAutoAdd = function () {
    return basic_settings.auto_add_objects_into_boxes;
}

/* ### START ### */
window.addEventListener("load", function () {
    
    // Ekran nesnesini oluştur.
    page = new MainBox();
    page.element = document.getElementsByTagName("BODY")[0];
    //page.zoom = 1;
    //page.color = "white";

    selectBox(page);
    //selectBox({element:document.getElementById("div-id")});

    if (typeof start === "function") {
        start();
    }

    if (typeof loop === "function") {
        if(!basic_loopTimer) setLoopTimer(1000);
        //basic_loopTimer = setInterval(loop, 1000);
    }

});
