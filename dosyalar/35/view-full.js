
var viewFull = {}

viewFull.create = function(x, y, width, height) {

    // BOX: Normal içerik taşıyıcısı
    viewFull.box = createBox(x, 
        y, 
        width, 
        height
    )
    
    viewFull.clean()

    viewFull.setVisible(0)

}

viewFull.clean = function() {

    viewFull.box.text = ""
    viewFull.box.color = "whitesmoke"
    viewFull.box.border = 0
    viewFull.box.scrollX = 1

}

viewFull.setVisible = function(visible) {

    viewFull.box.visible = visible

}

viewFull.loadContent = function(content) {

    viewFull.clean()
    content.create(viewFull.box)

}