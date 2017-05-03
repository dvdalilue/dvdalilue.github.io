function invert_order(list) {
    var parent = document.getElementsByClassName(list)[0],
    divs = parent.children,
    i = divs.length - 1;

    for (; i--;) {
        parent.appendChild(divs[i])
    }

    var order = document.getElementById('entry-list-order');

    if (order.textContent == 'hacia el pasado') {
        order.textContent = 'desde el pasado'
    } else {
        order.textContent = 'hacia el pasado'
    }
}