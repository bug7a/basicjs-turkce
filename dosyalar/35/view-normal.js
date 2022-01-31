
var viewNormal = {}

viewNormal.create = function(x, y, width, height) {

    // BOX: Normal içerik taşıyıcısı
    viewNormal.box = createBox(x, 
        y, 
        width, 
        height
    )

    viewNormal.clean()

}

viewNormal.clean = function() {

    viewNormal.box.text = ""
    viewNormal.box.color = "whitesmoke"
    viewNormal.box.border = 0
    viewNormal.box.scrollX = 1

}

viewNormal.setVisible = function(visible) {

    viewNormal.box.visible = visible

}

viewNormal.loadContent = function(content) {

    viewNormal.clean()
    content.create(viewNormal.box)

}