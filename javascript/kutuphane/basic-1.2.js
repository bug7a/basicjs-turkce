/*

Bismillah

ilkokul öğrencileri için oyun tabanlı, ön programlama eğitimi.
ortaokul ve lise öğrencileri için ise eğlenceli nesne tabanlı programlamaya giriş.

İlkokul, ortaokul, lise öğrencilerinin veya hobi amaçlı nesne tabanlı programlama ile
eğlenceli algoritmalar (projeler) geliştirmek isteyenler için teknoloji ve eğitim içeriği.

Sadeleştirilmiş Nesne Tabanlı JavaScript
JavaScript ile Sadeleştirilmiş Nesne Tabanlı Programlama (basic.js)

Basic JavaScript: Lets Learn Coding (Hadi Kodlama Öğrenelim)

Kids can learn programming when develop simple projects.

Year: 25 Oktober 2020
Autor: Buğra ÖZDEN
Mail: bugra.ozden@gmail.com
Site: http://bugraozden.com

You are free:

to Share — to copy, distribute and transmit the work
to Remix — to adapt the work
to make commercial use of the work

http://creativecommons.org/licenses/by/3.0/

Have Fun.

*/


/*

TODO LIST:

let sndSes1 = new Sound();
    that.load("test.mp3");
    that.status = 0:stopped, 1:playing, 2:paused
    that.play();
    that.stop();
    that.pause();
    
    that.listener("click", doIt);
    [ok] that.event("click", doIt);
    
- box nesnesi fazla değişkenlerden temizlenecek.

en son oluşturulan nesne bir değişkene aktarılabilir. mesela that veya o, x, co

page1.imgBackground = new Image()
that.left = 12
that.top = 20

- resimlerin orjinal boyutunu bilmeliyim. eğer oluşturmada boyut girmezsen, yüklendiğinde otomatik boyutlansın.

//TODO: designMode("on"); nesnelerin yanında küçük kutularda konum bilgileri, sınır çizgileri görünsün.

- bir nesneyi silmek için fonksiyon olmalı.

// Her object te olacak, nesneye göre konumunu ortalayacak
//TODO: object.center(object2, "top"); //top, left, default: all

- imgOk.aline(imgCancel, "right", 20)
// sadece ilk parametre kullanılır ise aynı koordinata koyar.
// ikinci parametrede eklenirse sağına yapıştırır. üçüncü parametre eklenirse boşluk da ekler.

- sabitler de default u kaldır. zaten hepsi default. ama kullanım kolaylığı mı, default yazınca hepsi sıralanacak.

- mainBox.zoom = 0.7 diyelim. box1.center(mainBox, "left") düzgün çalışmıyor. zoom değeri hesaplanmıyor. Aynı şey box1.aline için de bakılmalı.

- mainBox.fit(600, 900); 600px lik genişliği olan içeriği en fazla 900px e kadar genişleten bir zoom uygular. 600px den küçük sınırsız küçültür.

*/


// Standart değerler
const DEFAULT_ACTION_COLOR = "steelblue";
const DEFAULT_CANCEL_COLOR = "lightgray";
const DEFAULT_WARNING_COLOR = "tomato";
const DEFAULT_ALERT_COLOR = "gold";
const DEFAULT_TEXT_COLOR = "#333333";
const DEFAULT_BACKGROUND_COLOR = "beige";

const DEFAULT_BUTTON_WIDTH = 130;
const DEFAULT_BUTTON_HEIGHT = 50;
const DEFAULT_BUTTON_COLOR = "steelblue";

//TODO: bu iki değişkeni sil, kullanıldığı yerleri değiştir.
//const CANCEL_BUTTON_COLOR = "lightgray"; //DEFAULT_CANCEL_COLOR
//const DELETE_BUTTON_COLOR = "tomato"; //DEFAULT_WARNING_COLOR

const DEFAULT_TEXTBOX_WIDTH = 270;
const DEFAULT_TEXTBOX_HEIGHT = 50;
const DEFAULT_LABEL_WIDTH = 270;
const DEFAULT_BOX_WIDTH = 100;
const DEFAULT_BOX_HEIGHT = 100;
const DEFAULT_IMAGE_WIDTH = 50;
const DEFAULT_IMAGE_HEIGHT = 50;

// son oluşturulan nesne.
let that = "";
// bunun yerine last veya the olabilir mi?

// body, ekran nesnesi
let mainBox;
// Yeni nesnelerin ekleneceği kutu
let selectedBox;
// loop fonksiyonunu sürekli çağıran timer
let loopTimer;

// Anahtar ile veri kaydetmek, almak.
//let storage = window.localStorage;
//var value = storage.getItem(key); // Anahtar ile veri almak.
//storage.setItem(key, value) // Anahtar ile veri kaydetmek.
//storage.removeItem(key) // Anahtar ile veri silmek.
//data.save data.load data.delete

let Basic = {};

Basic.init = function() {

}

let data = {
    
    save() {
        
    },
    
    load() {
        
    },
    
    delete(){
        
    }
    
}

// Saat ve tarih bilgileri
let clock = {
    
    get year() {
        
    },
    
    get mount() {
        
    },
    
    get week() {
        
    },
    
    get day() {
        
    },
    
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

let mouse = {
    
    get x() {
        
    },
    
    get y() {
        
    }
    
}

/* MAINBOX COMPONENT (SCREEN) */
class MainBox {
    
    _element;
    _backgroundColor;
    _zoom;
    
    constructor() {
        
        this._element = null;
        this._backgroundColor = "white";
        this._zoom = 1;
        
        that = this;

    }

    get element() {
        return this._element;
    }

    set element($value) {
        this._element = $value;
    }

    get width() {
        
        if(isMobile()){
            return window.screen.availWidth;
        }else{
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }
        
    }

    get height() {
        
        if(isMobile()){
            return window.screen.availHeight;
        }else{
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
        
    }

    get zoom() {
        return this._zoom;
    }

    set zoom($value) {
        this._zoom = $value;
        this._element.style.zoom = $value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }
    
    set backgroundColor($value) {
        this._backgroundColor = $value;
        this._element.style.backgroundColor = $value;
    }

    fit($value, $maxValue) {
        
        let _w = antiZoom(mainBox.width);
        
        // ikinci değer yok ise
        if (!$maxValue) {
            $maxValue = _w;
        }
        
        // ekran genişliği izin verilenden fazla ise
        if (_w > $maxValue) {
            mainBox.zoom = $maxValue / $value;
        } else {
            mainBox.zoom = _w / $value;
        }
        
    }

    // events: resize
    addEventListener($event, $func) {
        window.addEventListener($event, $func);
    }
    
}

/* BOX COMPONENT */
class Box {
    
    _element;

    _backgroundColor;
    _borderColor;
    
    //_value;
    //_border;
    //_borderRadius;
    
    constructor($left = 0, $top = 0, $width = DEFAULT_BOX_WIDTH, $height = DEFAULT_BOX_HEIGHT) {
        
        this._element = null;

        this._backgroundColor = "beige";
        this._borderColor = "gray";
        
        //this._border = 1;
        //this._borderRadius = 0;
        
        /*
        
        hScroll = 0
        vScroll = 0
        
        */
        
        let labelElement = document.createElement("DIV");
        labelElement.setAttribute("class", "box");
        
        labelElement.style.left = $left + "px";
        labelElement.style.top = $top + "px";
        labelElement.style.width = $width + "px";
        labelElement.style.height = $height + "px";
        labelElement.style.opacity = 1;
        labelElement.style.borderWidth = "1px";
        labelElement.style.borderRadius = "0px";
        
        this._element = labelElement;
        selectedBox.element.appendChild(this._element);
                                        
        that = this;
        
    }

    //sample: <b>text</b><br />
    
    get element() {
        return this._element;
    }
        
    get left() {
        return parseInt(this._element.style.left);
    }
    
    set left($value) {
        this._element.style.left = $value + "px";
    }
    
    get top() {
        return parseInt(this._element.style.top);
    }
    
    set top($value) {
        this._element.style.top = $value + "px";
    }

    get width() {
        return parseInt(this._element.style.width);
    }
    
    set width($value) {
        this._element.style.width = $value + "px";
    }
    
    get height() {
        return parseInt(this._element.style.height);
    }
    
    set height($value) {
        this._element.style.height = $value + "px";
    }

    get html() {
        return this._element.innerHTML;
    }
    
    set html($value) {
        this._element.innerHTML = $value;
    }
    
    get visible() {
        return (this._element.style.display == "none") ? 0 : 1;
    }
    
    set visible($value) {
        this._element.style.display = ($value == 1) ? "block" : "none";
    }
    /*   
    get value() {
        return this._value;
    }
    
    set value($value) {
        this._value = $value;
    }
    */
    get backgroundColor() {
        return this._backgroundColor;
    }
    
    set backgroundColor($value) {
        this._backgroundColor = $value;
        this._element.style.backgroundColor = $value;
    }
        
    set border($value) {
        //this._border = $value;
        this._element.style.borderWidth = $value + "px";
    }
    
    get border() {
        return parseInt(this._element.style.borderWidth);
    }
        
    set round($value) {
        //this._borderRadius = $value;
        this._element.style.borderRadius = $value + "px";
    }
        
    get round() {
        return parseInt(this._element.style.borderRadius);
    }
    
    get borderColor() {
        return this._borderColor;
    }
        
    set borderColor($value) {
        this._borderColor = $value;
        this._element.style.borderColor = $value;
    }
        
    get opacity() {
        return this._element.style.opacity;
    }
        
    set opacity($value) {
        this._element.style.opacity = $value;
    }
    
    // events: click
    addEventListener($event, $func) {
        let _that = this;
        this._element.addEventListener($event, function(){ $func(_that); });
    }
        
    center($obj, $position) {
        moveToCenter(this, $obj, $position);
    }
        
    aline($obj, $position, $space = 0) {
        moveToAline(this, $obj, $position, $space);
    }

}

/* BUTTON COMPONENT [OK] */
class Button {
    
    _element;
    _backgroundColor;
    
    constructor($left = 0, $top = 0, $width = DEFAULT_BUTTON_WIDTH, $height = DEFAULT_BUTTON_HEIGHT) {
        
        this._element = null;
        this._backgroundColor = DEFAULT_BUTTON_COLOR;
        
        let buttonElement = document.createElement("BUTTON");
        buttonElement.innerHTML = "Button";
        buttonElement.setAttribute("class", "button");
        buttonElement.setAttribute("type", "button");
        
        buttonElement.style.left = $left + "px";
        buttonElement.style.top = $top + "px";
        buttonElement.style.width = $width + "px";
        buttonElement.style.height = $height + "px";
        buttonElement.style.backgroundColor = DEFAULT_BUTTON_COLOR;
        
        this._element = buttonElement;
        selectedBox.element.appendChild(this._element);
                                        
        that = this;
        
    }
    
    get element() {
        return this._element;
    }
    
    get left() {
        return parseInt(this._element.style.left);
    }
    
    set left($value) {
        this._element.style.left = $value + "px";
    }
    
    get top() {
        return parseInt(this._element.style.top);
    }
    
    set top($value) {
        this._element.style.top = $value + "px";
    }

    get width() {
        return parseInt(this._element.style.width);
    }
    
    set width($value) {
        this._element.style.width = $value + "px";
    }
    
    get height() {
        return parseInt(this._element.style.height);
    }
    
    set height($value) {
        this._element.style.height = $value + "px";
    }
    
    get text() {
        return this._element.innerHTML;
    }
    
    set text($value) {
        this._element.innerHTML = $value;
    }
    
    get value() {
        return this._element.value;
    }
    
    set value($value) {
        this._element.value = $value;
    }
    
    get enabled() {
        return (this._element.disabled) ? 0 : 1;
    }
    
    set enabled($value) {
        this._element.disabled = ($value) ? 0 : 1;
    }
    
    get visible() {
        return (this._element.style.display == "none") ? 0 : 1;
    }
    
    set visible($value) {
        this._element.style.display = ($value == 1) ? "block" : "none";
    }
        
    get backgroundColor() {
        return this._backgroundColor;
    }
    
    set backgroundColor($value) {
        
        this._backgroundColor = $value;
        
        if($value == "okay") $value = DEFAULT_BUTTON_COLOR;
        if($value == "cancel") $value = DEFAULT_CANCEL_COLOR;
        if($value == "delete") $value = DEFAULT_WARNING_COLOR;
        
        this._element.style.backgroundColor = $value;
    }

    addEventListener($event, $func) {
        let _that = this;
        this._element.addEventListener($event, function(){ $func(_that); });
    }
        
    center($obj, $position) {
        moveToCenter(this, $obj, $position);
    }
        
    aline($obj, $position, $space = 0) {
        moveToAline(this, $obj, $position, $space);
    }
    
    //TODO: removeOnClicked(clickedFunc) ihtiyaç olabilir.
    
}

/* TEXTBOX COMPONENT [OK] */
class TextBox {
    
    _element;
    _titleElement;
    _mainElement;
    
    constructor($left = 0, $top = 0, $width = DEFAULT_TEXTBOX_WIDTH, $height = DEFAULT_TEXTBOX_HEIGHT) {
        
        this._element = null;
        this._titleElement = null;
        this._mainElement = null;
        
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
        
        mainElement.appendChild(this._titleElement);
        mainElement.appendChild(this._element);
        
        selectedBox.element.appendChild(this._mainElement);
        
    }
    
    get element() {
        return this._element;
    }

    get left() {
        return parseInt(this._mainElement.style.left);
    }
    
    set left($value) {
        this._mainElement.style.left = $value + "px";
    }
    
    get top() {
        return parseInt(this._mainElement.style.top);
    }
    
    set top($value) {
        this._mainElement.style.top = $value + "px";
    }

    get width() {
        return parseInt(this._element.style.width);
    }
    
    set width($value) {
        this._element.style.width = $value + "px";
    }
    
    get height() {
        return parseInt(this._element.style.height);
    }
    
    set height($value) {
        this._element.style.height = $value + "px";
    }
 
    get text() {
        return this._element.value;
    }
    
    set text($value) {
        this._element.value = $value.toString();
    }
        
    get title() {
        return this._titleElement.innerHTML;
    }
    
    set title($value) {
        this._titleElement.innerHTML = $value;
    }
        
    get enabled() {
        return (this._element.disabled) ? 0 : 1;
    }
    
    set enabled($value) {
        this._element.disabled = ($value) ? 0 : 1;
    }
    
    get visible() {
        return (this._element.style.display == "none") ? 0 : 1;
    }
    
    set visible($value) {
        this._element.style.display = ($value == 1) ? "block" : "none";
    }
    
    addEventListener($event, $func) {
        let _that = this;
        this._element.addEventListener($event, function(){ $func(_that); });
    }
        
    center($obj, $position) {
        moveToCenter(this, $obj, $position);
    }
        
    aline($obj, $position, $space = 0) {
        moveToAline(this, $obj, $position, $space);
    }
    
}

/* LABEL COMPONENT */
class Label {
    
    _element;

    //_value;
    //_backgroundColor;
    _fontSize;
    _textAlign;
    _textColor
    
    constructor($left = 0, $top = 0, $width = DEFAULT_LABEL_WIDTH) {
        
        this._element = null;
        //this._value = "";
        this._fontSize = 20;
        this._textAlign = "left";
        this._textColor = "#4A4A4A";
        
        let labelElement = document.createElement("DIV");
        
        labelElement.innerHTML = "Label Text";
        labelElement.setAttribute("class", "label");
        
        labelElement.style.left = $left + "px";
        labelElement.style.top = $top + "px";
        labelElement.style.width = $width + "px";
        /* delete labelElement.style.height = "auto"; */
        labelElement.style.opacity = 1;
        labelElement.style.backgroundColor = "transparent";
        
        this._element = labelElement;
        selectedBox.element.appendChild(this._element);
                                        
        that = this;
        
    }

    //sample: <b>text</b><br />
    
    get element() {
        return this._element;
    }
        
    get left() {
        return parseInt(this._element.style.left);
    }
    
    set left($value) {
        this._element.style.left = $value + "px";
    }
    
    get top() {
        return parseInt(this._element.style.top);
    }
    
    set top($value) {
        this._element.style.top = $value + "px";
    }

    get width() {
        return parseInt(this._element.style.width);
    }
    
    set width($value) {
        this._element.style.width = $value + "px";
    }
        
    set height($value) {
        alert("Label nesnesinin, yükseklik değeri otomatik olarak belirlenir.");
    }
    
    get height() {
        return this._element.offsetHeight;
    }

    get text() {
        return this._element.innerHTML;
    }
    
    set text($value) {
        this._element.innerHTML = $value;
    }
    /*
    get value() {
        return this._value;
    }
    
    set value($value) {
        this._value = $value;
    }
    */
    get visible() {
        return (this._element.style.display == "none") ? 0 : 1;
    }
    
    set visible($value) {
        this._element.style.display = ($value == 1) ? "block" : "none";
    }

    get textSize() {
        return this._fontSize;
    }
    
    set textSize($value) {
        this._fontSize = $value;
        this._element.style.fontSize = $value + "px";
    }
        
    get textAlign() {
        return this._textAlign;
    }
    
    set textAlign($value) {
        this._textAlign = $value;
        this._element.style.textAlign = $value;
    }
        
    get textColor() {
        return this._textColor;
    }
    
    set textColor($value) {
        this._textColor = $value;
        this._element.style.color = $value;
    }
        
    get opacity() {
        return this._element.style.opacity;
    }
    
    set opacity($value) {
        //this._rotate = $value;
        this._element.style.opacity = $value;
    }
    
    /*
    addEventListener($event, $func) {
        let _that = this;
        this._element.addEventListener($event, function(){ $func(_that); });
    }
    */
        
    center($obj, $position) {
        moveToCenter(this, $obj, $position);
    }
        
    aline($obj, $position, $space = 0) {
        moveToAline(this, $obj, $position, $space);
    }

}

/* IMAGE COMPONENT */
class Image {
    
    // Not: CheckBox resim nesnesi ile yapılabilir.
    // TODO: Eğer resim nesnesi div içine eklenecek ise; resim: imageElement, ana nesne: element olmalı.

    _element;
    _mainElement;
    //_value;
    _naturalWidth;
    _naturalHeight;
    _rotate;
    
    constructor($left = 0, $top = 0, $width = DEFAULT_IMAGE_WIDTH, $height = DEFAULT_IMAGE_HEIGHT) {
        
        this._element = null;
        this._mainElement = null;
        //this._value = "";
        this._naturalWidth = 0;
        this._naturalHeight = 0;
        this._rotate = 0;
        
        let shapeElement = document.createElement("DIV");
        shapeElement.setAttribute("class", "image");
        
        let imageElement = document.createElement("IMG");
        imageElement.setAttribute("width", "100%");
        imageElement.setAttribute("height", "100%");
        shapeElement.appendChild(imageElement);
        
        shapeElement.style.left = $left + "px";
        shapeElement.style.top = $top + "px";
        shapeElement.style.width = $width + "px";
        shapeElement.style.height = $height + "px";
        shapeElement.opacity = 1;
        
        this._element = imageElement;
        this._mainElement = shapeElement;
        selectedBox.element.appendChild(this._mainElement);
                                        
        that = this;
        
    }
                                
    get element() {
        return this._element;
    }
        
    get left() {
        return parseInt(this._mainElement.style.left);
    }
    
    set left($value) {
        this._mainElement.style.left = $value + "px";
    }
    
    get top() {
        return parseInt(this._mainElement.style.top);
    }
    
    set top($value) {
        this._mainElement.style.top = $value + "px";
    }

    get width() {
        return parseInt(this._mainElement.style.width);
    }
    
    set width($value) {
        this._mainElement.style.width = $value + "px";
    }
    
    get height() {
        return parseInt(this._mainElement.style.height);
    }
    
    set height($value) {
        this._mainElement.style.height = $value + "px";
    }
        
    /*
    get value() {
        return this._value;
    }
    
    set value($value) {
        this._value = $value;
    }
    */
    
    get visible() {
        return (this._mainElement.style.display == "none") ? 0 : 1;
    }
    
    set visible($value) {
        this._mainElement.style.display = ($value == 1) ? "block" : "none";
    }
        
    get rotate() {
        return this._rotate;
    }
    
    set rotate($value) {
        this._rotate = $value;
        this._mainElement.style.transform = "rotate(" + $value + "deg)";
    }
        
    get opacity() {
        return this._mainElement.style.opacity;
    }
    
    set opacity($value) {
        this._mainElement.style.opacity = $value;
    }
            
    addEventListener($event, $func) {
        let _that = this;
        this._mainElement.addEventListener($event, function(){ $func(_that); });
    }
        
    load($imagePath) {
        this._element.setAttribute("src", $imagePath);
    }
        
    center($obj, $position) {
        moveToCenter(this, $obj, $position);
    }
        
    aline($obj, $position, $space = 0) {
        moveToAline(this, $obj, $position, $space);
    }

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
                                        
        that = this;
        
    }
                                        
    get element() {
        return this._element;
    }
        
    get time() {
        return this._element.timr;
    }
        
    get timeLeft() {
        return this._element.timeLeft;
    }
        
    get currentTime() {
        return this._element.currentTime;
    }
        
    get paused() {
        return this._element.paused;
    }
        
    get playing() {
        return !this._element.paused;
    }

    get loop() {
        return (this._element.getAttribute("loop") == "loop") ? 1 : 0;
    }
        
    set loop($value){
        if($value == 1) {
            this._element.setAttribute("loop", "loop");
        } else {
            this._element.setAttribute("loop", "");
        }
    }
                              
    play() {
        if(this.paused) {
            this._element.play();
        }
    }
        
    pause($value) {
        if(!this.paused) {
            this._element.pause();
        }
    }
    
    stop() {
        if(!this.paused) {
            this._element.pause();
            this._element.currentTime = 0;
        }
    }
        
    load($path) {
        
        let fileType = "audio/wav";
        
        if ($path.substr(-3).toLowerCase() == "mp3") {
            fileType = "audio/mpeg";
        }
            
        this._element.children[0].setAttribute("src", $path);
        this._element.children[0].setAttribute("type", fileType);
            
    }                    
                    
}
        
/* ### OTHERS ### */
        
// bir nesneye göre ortalama
let moveToCenter = function($this, $obj, $position) {
        if ($position == "left" || !$position) {
            let _w = $obj.width;
            //eğer mainBox ise, zoom değerini hesaba kat.
            if ($obj === mainBox) {
                _w = antiZoom(mainBox.width);
            }
            $this.left = (_w - $this.width) / 2;
        }
        
        if ($position == "top" || !$position) {
            let _h = $obj.height;
            //eğer mainBox ise, zoom değerini hesaba kat.
            if ($obj === mainBox) {
                _h = antiZoom(mainBox.height);
            }
            $this.top = (_h - $this.height) / 2;
        }
}

// bir nesneye göre hizalama
let moveToAline = function($this, $obj, $position, $space) {
    
    //TODO: aline, mainBox nesnesi için kullanılır ise ve bu nesne zoom 1 değil ise ne olur.
    
        if ($position == "left") {
            $this.left = $obj.left - $this.width - $space;
            $this.top = $obj.top;
            
        } else if ($position == "top") {
            $this.top = $obj.top - $this.height - $space;
            $this.left = $obj.left;
            
        } else if ($position == "right") {
            $this.left = $obj.left + $obj.width + $space; 
            $this.top = $obj.top;
            
        } else if ($position == "bottom") {
            $this.top = $obj.top + $obj.height + $space;  
            $this.left = $obj.left;
            
        } else {
            $this.top = $obj.top;
            $this.left = $obj.left;
            
        }
    
}

// Her saniye tekrar eden fonksiyonun zamanını ayarla.
let setLoopTimer = function($time) {
    
    if (typeof loop === "function") {
        
        // Daha önceden oluşturulmuş ise temizle.
        if (loopTimer) clearInterval(loopTimer);
        
        // Yenisini oluştur.
        loopTimer = setInterval(loop, $time);
    }
    
}
        
// Rasgele bir sayı üret (tek parametre için 1 den başlar.)
let random = function($first, $second) {

    let myNum = 0;
    
    if ($second) {
        if ($second < $first) {
            alert("İkinci sayı, birinciden büyük olmalıdır. random(sayi1, sayi2) fonksiyonu, verilen iki sayı arasında rasgele bir sayı üretir.");
        
        } else {
            myNum = $first + Math.round(Math.random() * ($second - $first));
            
        }
    } else  {
        myNum = 1 + Math.round(Math.random() * ($first - 1));

    }

    return myNum;
    
}

// Consola metin yazdır.
let print = function($message) {
    console.log($message);
}
        
//tam sayıya çevir
// Number()
let num = function($str) {
    return parseFloat($str);
}

//string e çevir
// String()
let str = function($num) {
    return String($num);
}

let int = function($str){
    return parseInt($str);
}

//zoom değeri değiştirilmiş bir alanın, orjinal boyutunu hesaplar.
let antiZoom = function($value) {
    
    return $value * (1 / mainBox.zoom);
    
}
    
// Mobil olup/olmadığını kontrol et. (1:mobil, 0:değil)
let isMobile = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

let openUrl = function($url) {
    if (App.mobileAndTabletCheck()) {
        window.location.href = $url;
    } else {
        window.open($url, '_blank');
    }
}

// Bir değişken içeriğini, anahtar ile kaydet.
let saveData = function($key, $data) {
    
    // string or object
    
}

// Bir değişken içeriğini, anahtar ile geri yükle.
let loadData = function($key) {
    
    var _data = "";
    
    return _data;
    
}
        
// Hangi box nesnesi seçili ise, yeni eklenen nesneler onun üzerine oluşturulur.
let selectBox = function($box) {
    
    //TODO: if (typeof $box === "Box") { -- box object
    //TODO: if (typeof $box === "DIV element") { -- div element
    //TODO: if (typeof $box === "string") {  --  get element by id
    
    selectedBox = $box;
    
    // Bir div elementi seçmek için:
    // selectBox({"element":DOMElement});
    
}

// Nesne hangi kutuya eklenecek.
let getSelectedBox = function() {
    
    return selectedBox;
    
}
        
/* ### START ### */   

window.addEventListener("load", function(){

    // Ekran nesnesini oluştur.
    mainBox = new MainBox();
    mainBox.element = document.getElementsByTagName("BODY")[0];
    mainBox.zoom = 1;
    mainBox.backgroundColor = "white";
    
    selectBox(mainBox);
    //selectBox({element:document.getElementById("div-id")});

    if (typeof start === "function") {
        start();
    }
    
    if (typeof loop === "function") {
        loopTimer = setInterval(loop, 1000);
    }

});
        
