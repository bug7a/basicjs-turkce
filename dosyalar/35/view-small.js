
var viewSmall = {}

viewSmall.create = function(x, y, width, height) {

    // BOX: Normal içerik taşıyıcısı
    viewSmall.box = createBox(x, 
        y, 
        width, 
        height
    )
    that.color = "rgba(0, 0, 0, 0.8)"

    viewSmall.box.b1 = createBox(0, 0, APP_CONTENT_WIDTH, 500)
    that.element.style.borderTopLeftRadius = "50px"
    that.element.style.borderTopRightRadius = "50px"
    that.bottom = 0
    
    viewSmall.clean()
    viewSmall.setVisible(0)

}

viewSmall.clean = function() {

    viewSmall.box.b1.text = ""
    viewSmall.box.b1.color = "whitesmoke"
    viewSmall.box.b1.border = 0
    viewSmall.box.b1.scrollX = 1

}

viewSmall.setVisible = function(visible) {

    viewSmall.box.visible = visible

}

viewSmall.loadContent = function(content) {

    viewSmall.clean()
    content.create(viewSmall.box.b1)

}