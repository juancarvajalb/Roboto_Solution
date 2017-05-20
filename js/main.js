
(function () {

    var grass = new Image();
    var roboti = new Image();
    var sizeX, sizeY, posX, posY, step_size, default_step_number;

    function init() {
        grass.src = './img/grass.jpg';
        roboti.src = './img/robot-1.png';
        sizeX = 550;
        sizeY = 450; // size of the canvas 

        posX = 30;
        posY = 30; // intial position 

        step_size = 30;
        default_step_number = 1;
        window.requestAnimationFrame(draw);
    }

    function draw() {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        ctx.clearRect(0, 0, sizeX, sizeY);
        ctx.drawImage(roboti, posX, posY);// draw robot 
        ctx.drawImage(grass, 0, 0, sizeX, sizeY);// draw grass 
        window.requestAnimationFrame(draw);
    }


    function move(direction, numbersteps) { //right
        if (!numbersteps) {
            numbersteps = default_step_number;
        }
        switch (direction.toUpperCase()) {
            case "E"://right
                posXtemporal = posX + (numbersteps * step_size);
                if (posXtemporal < sizeX) {
                    posX = posXtemporal;
                }
                break;
            case "W": //left
                posXtemporal = posX - (numbersteps * step_size);
                if (posXtemporal >= 0) {
                    posX = posXtemporal;
                }
                break;
            case "S": // down
                posYtemporal = posY + (numbersteps * step_size);
                if (posYtemporal < sizeY) {
                    posY = posYtemporal;
                }
                break;
            default: // up
                posYtemporal = posY - (numbersteps * step_size);
                if (posYtemporal >= 0) {
                    posY = posYtemporal;
                }
                break;
        }

        draw();
    }

    function resetcommands() {
        roboti.src = './img/robot-1.png';
        posX = 30;
        posY = 30;
        draw();
    }

    function transformRoboto() {
        roboti.src = './img/robot-2.png';
        draw();
    }


    function executecommands(stringf) {
        // stringf = 'move("N"); move("S"); move("S"); move("w");' ;
        stringf = stringf.replace(/(\r\n|\n|\r)/gm, " ");
        var commandsarray = stringf.split("; ");
        commandsarray.forEach(function (key, index) {
            setTimeout(function () {
                eval(key);
            }, 200 * index);
        });
    }

    $(function () {
        $('html').keydown(function (e) {
            var key = e.which;
            switch (key) {
                case 37://left
                    move("W");
                    console.log('left');
                    break;
                case 38://up
                    move("N");
                    console.log('up');
                    break;
                case 39: //right
                    move("E");
                    console.log('right');
                    break;
                case 40:  //down
                    move("S");
                    console.log('down');
                    break;
                case 69:  //e, to execute commands
                    var command_string = $("#input_commands").val();
                    executecommands(command_string);
                    console.log('executecommands: ' + command_string);
                    break;
                case 82:  //r, to reset commands
                    resetcommands();
                    break;
                default:

                    break;
            }
        });

        $("#button_exe").on("click", function () {
            var command_string = $("#input_commands").val();
            executecommands(command_string);
            console.log('executecommands: ' + command_string);
        });
        $("#button_reset").on("click", function () {
            resetcommands();
            console.log('resetcommands');
        });

        $("#button_transform").on("click", function () {
            transformRoboto();
            console.log('transformRoboto');
        });

    });

    init();





})();