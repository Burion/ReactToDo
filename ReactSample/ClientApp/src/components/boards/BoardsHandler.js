var context = document.getElementById("context-menu")
context.style.display = 'none'

var cardName = document.getElementById('board-name')

function editIconOnClick(event) {
    window.addEventListener('click', checkClickOutside)
    var bodyRect = document.body.getBoundingClientRect()
    console.log(bodyRect.top)
    context.style.display = 'grid'
    context.style.position = 'absolute'
    var rect = event.target.getBoundingClientRect()
    context.style.left = rect.left + 'px'
    context.style.top = rect.top + window.scrollY + 'px'
}

function checkClickOutside(e){   
    if (context.style.display != 'none' && e.target.className != 'edit-icon'){
        if(!context.contains(e.target))
        {
            context.style.display = 'none'
        }
    }
}