randomArray = (length, max) => [...new Array(length)].map(() => Math.round(Math.random() * max));
randomMatrix = (rows, columns) => [...new Array(rows)].map(() => randomArray(columns,1))

function zero2D(rows, cols) {
    var array = [], row = [];
    while (cols--) row.push(0);
    while (rows--) array.push(row.slice());
    return array;
}

var matrix = undefined;
var timeout = 0;
var rows = undefined;
var cols = undefined;

function create() {
    matrix = undefined;
    rows = undefined;
    cols = undefined;
    
    if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
    }
    construct();
}

function construct() {
    rows == undefined ? rows = parseInt(document.getElementById('rows').value) : rows;
    cols == undefined ? cols = parseInt(document.getElementById('columns').value) : cols;

    $('tr').remove();

    for (var i = 0; i < rows; i++) {
        var table_row = document.createElement('tr');
        for (var j = 0; j < cols; j++) {
            var table_data = document.createElement('td');
            table_row.appendChild(table_data);
        };
        document.getElementById('petri').appendChild(table_row);
    };

    refresh();
}

function refresh() {
    matrix == undefined ? matrix = randomMatrix(rows,cols) : matrix;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (1 == matrix[i][j]) {
                document.getElementById('petri').children[i].children[j].className = 'alive';
            } else {
                document.getElementById('petri').children[i].children[j].className = 'dead';
            };
        };
    };
};

function change() {
    var aux_mat = zero2D(rows,cols); //jQuery.extend(true, {}, matrix);
    var count = 0;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            count = 0;

            if (i > 0 & j > 0 & i < rows-1 & j < cols-1) {
                matrix[i + 1][  j  ] == 1 ? count += 1 : count += 0;
                matrix[i - 1][  j  ] == 1 ? count += 1 : count += 0;
                matrix[  i  ][j + 1] == 1 ? count += 1 : count += 0;
                matrix[  i  ][j - 1] == 1 ? count += 1 : count += 0;
                matrix[i - 1][j + 1] == 1 ? count += 1 : count += 0;
                matrix[i + 1][j - 1] == 1 ? count += 1 : count += 0;
                matrix[i + 1][j + 1] == 1 ? count += 1 : count += 0;
                matrix[i - 1][j - 1] == 1 ? count += 1 : count += 0;
            } else {
                if (i == 0 & j == 0) {
                    matrix[  i  ][j + 1] == 1 ? count += 1 : count += 0;
                    matrix[i + 1][  j  ] == 1 ? count += 1 : count += 0;
                    matrix[i + 1][j + 1] == 1 ? count += 1 : count += 0;
                }
                else if (i == 0 & j == cols-1) {
                    matrix[  i  ][j - 1] == 1 ? count += 1 : count += 0;
                    matrix[i + 1][  j  ] == 1 ? count += 1 : count += 0;
                    matrix[i + 1][j - 1] == 1 ? count += 1 : count += 0;
                }
                else if (i == rows-1 & j == 0) {
                    matrix[i - 1][  j  ] == 1 ? count += 1 : count += 0;
                    matrix[i - 1][j + 1] == 1 ? count += 1 : count += 0;
                    matrix[  i  ][j + 1] == 1 ? count += 1 : count += 0;
                }
                else if (i == rows-1 & j == cols-1) {
                    matrix[  i  ][j - 1] == 1 ? count += 1 : count += 0;
                    matrix[i - 1][j - 1] == 1 ? count += 1 : count += 0;
                    matrix[i - 1][  j  ] == 1 ? count += 1 : count += 0;
                }
                else {
                    if (i == 0) {
                        matrix[  i  ][j + 1] == 1 ? count += 1 : count += 0;
                        matrix[  i  ][j - 1] == 1 ? count += 1 : count += 0;
                        matrix[i + 1][  j  ] == 1 ? count += 1 : count += 0;
                        matrix[i + 1][j - 1] == 1 ? count += 1 : count += 0;
                        matrix[i + 1][j + 1] == 1 ? count += 1 : count += 0;
                    } else if (j == 0) {
                        matrix[i + 1][  j  ] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][  j  ] == 1 ? count += 1 : count += 0;
                        matrix[  i  ][j + 1] == 1 ? count += 1 : count += 0;
                        matrix[i + 1][j + 1] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][j + 1] == 1 ? count += 1 : count += 0;
                    } else if (i == rows-1) {
                        matrix[  i  ][j + 1] == 1 ? count += 1 : count += 0;
                        matrix[  i  ][j - 1] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][  j  ] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][j - 1] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][j + 1] == 1 ? count += 1 : count += 0;
                    } else if (j == cols-1) {
                        matrix[i + 1][  j  ] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][  j  ] == 1 ? count += 1 : count += 0;
                        matrix[  i  ][j - 1] == 1 ? count += 1 : count += 0;
                        matrix[i + 1][j - 1] == 1 ? count += 1 : count += 0;
                        matrix[i - 1][j - 1] == 1 ? count += 1 : count += 0;
                    };
                };
            };

            if (matrix[i][j] == 1) {
                if      (count < 2) { aux_mat[i][j] = 0 }
                else if (count < 4) { aux_mat[i][j] = 1 }
                else                { aux_mat[i][j] = 0 };
            } else {
                if (count == 3) { aux_mat[i][j] = 1 };
            };
        };
    };

    matrix = aux_mat;
    
    refresh();
    timeout = setTimeout(change, 1);
};

function reset() {
    matrix = undefined;
    refresh();
}

function stop() {
    if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
    }
}

function hideMenu() {
    document.getElementById('menu').style.opacity = 0.1
}

function showMenu() {
    document.getElementById('menu').style.opacity = 1
}

function calculateDistance(elem, mouseY) {
    return Math.floor((mouseY - (elem.offset().top+(elem.height()/2))));
}

$(document).mousemove(function(e) {  
    mY = e.pageY;
    distance = calculateDistance($('#menu'), mY);
    
    if ($(document.getElementById('menu')).css('opacity') < 1 ) {
        if (Math.abs(distance) < 50) {
            showMenu();
        }        
    } else {
        if (Math.abs(distance) > 50) {
            hideMenu();
        }        
    }
});