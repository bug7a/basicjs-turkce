var _SUB_MENU_WIDTH = 560
var _SUB_MENU_TOTAL_ICON = 4

// oluşturulan alt menu
var subMenu


var startSubMenu = function() {

    var _FIRST_ICON_LEFT = 40
    var _ICON_SPACE = 42
    var _ICON_TOP = 5

    // Alt menu taşıyıcı kutusu
    subMenu = createBox()
    that.width = _SUB_MENU_WIDTH
    that.height = 100
    that.bottom = 20
    that.left = 20
    that.color = "white"
    that.border = 0
    that.borderColor = "lightgray"
    that.round = 20
    that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.2)"


    // Başlangıç ikonu
    subMenu.icon1 = createSubMenuIcon("resimler/35/fi-rr-home.svg", "BAŞLANGIÇ")
    that.left = _FIRST_ICON_LEFT
    that.top = _ICON_TOP
    that.iconID = "1"
    that.onClick(openHomePage)

    // Arama ikonu
    subMenu.icon2 = createSubMenuIcon("resimler/35/fi-rr-search.svg", "ARAMA")
    that.aline(subMenu.icon1, "right", _ICON_SPACE)
    that.top = _ICON_TOP
    that.iconID = "2"
    that.onClick(openSearchPage)

    // İpucu ikonu
    subMenu.icon3 = createSubMenuIcon("resimler/35/fi-rr-bulb.svg", "İPUCU")
    that.aline(subMenu.icon2, "right", _ICON_SPACE)
    that.top = _ICON_TOP
    that.iconID = "3"
    that.onClick(openTipPage)

    // Hesap ikonu
    subMenu.icon4 = createSubMenuIcon("resimler/35/fi-rr-user.svg", "HESAP")
    that.aline(subMenu.icon3, "right", _ICON_SPACE)
    that.top = _ICON_TOP
    that.iconID = "4"
    that.onClick(openAccountPage)

    // NOT: ikon nesneleri, birbirlerine göre hizalanıyor.
    // O yüzden; önce ortadaki, sonra yanlara doğru oluşturulmuş.

}

// Bir ikon kutusu oluştur.
var createSubMenuIcon = function($imagePath, $name) {

    var _BOX_WIDTH = 90
    var _BOX_HEIGHT = 90
    var _ICON_WIDTH = 35
    var _ICON_HEIGHT = 35

    // İkonun taşıyıcı kutusu:
    var _object = createBox()
    that.width = _BOX_WIDTH
    that.height = _BOX_HEIGHT
    that.border = 0
    that.round = 30
    that.color = "transparent"

    // İkon resmi:
    _object.imgIcon = createImage(0, 0, _ICON_WIDTH, _ICON_HEIGHT)
    that.load($imagePath)
    that.center("left")
    that.top = 15

    // İkonun altındaki isim:
    _object.lblName = createLabel(0, 0, _ICON_WIDTH)
    that.text = $name
    that.width = _BOX_WIDTH
    that.textAlign = "center"
    that.fontSize = 12
    that.textColor = "gray"
    that.bottom = 12
    
    // NOT: parametrelerin başındaki $ (dolar) işareti, 
    // sadece, parametre olduğunu belirten bir karakterdir.

    // NOT: _object değişkeninin başındaki _ (alt çizgi) işareti,
    // değişkenin gizli veya geçici olduğunu belirten bir karakterdir.

    makeBasicObject(_object)

    // NOT: Özel nesneniz için, oluşturulması tamamlandıktan sonra,
    // that değişkenine eşitlerseniz, that kısaltmasını da kullanabilirsiniz.

    return _object

}

// Eski seçimleri temizler.
var clearSubMenuIconSelection = function() {

    // Tüm seçimleri temizle.
    for (var i = 1; i <= _SUB_MENU_TOTAL_ICON; i++) {
        subMenu["icon" + i].color = "transparent"
    }

}

// ID si verilen bir ikonun seçilmesini sağlar.
var selectSubMenuIcon = function(self) {

    clearSubMenuIconSelection()

    // Basılan ikonu boya.
    subMenu["icon" + self].color = "#f6f6f6"

}

var openHomePage = function(self) {

    selectSubMenuIcon(self.iconID)

}

var openSearchPage = function(self) {

    selectSubMenuIcon(self.iconID)

}

var openTipPage = function(self) {

    selectSubMenuIcon(self.iconID)

}

var openAccountPage = function(self) {

    selectSubMenuIcon(self.iconID)

}