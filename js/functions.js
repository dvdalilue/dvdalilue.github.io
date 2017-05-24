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

function putBefore(element1, element2) {
    $(element1).animate(
        {
            top: '+=' + ($(element2).offset().top - $(element1).offset().top) + 'px'
        },
        500,
        function() {
            $(element1).get(0).parentNode.insertBefore($(element1).get(0),
                                                       $(element2).get(0));
            $(element1).css({'top' : ''});
            }
        );
        $(element1).text($(element2).text());
};

$(document).ready(function(){
    $('.filter_link').click(function(event) {
        for (var e of $('.mark')) { $(e).css({'opacity':'0'}) }

        $($('#'+$(this).attr('id')).get(0)).css({'opacity':'1'})

        if ($(this).attr('id') === 'all') {
            $.map($('.entry'), function(i) {
                $(i).css({'display' : ''})
            })
            return
        }

        $.map($('.entry'), function(i) {
            $(i).css({'display' : 'none'})
        })
        
        for (var e of $('.' + $(this).attr('id'))) {
            $(e).css({'display' : ''})
        }
    });
});