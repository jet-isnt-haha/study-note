var Flower = function () { };

var xiaoming = {
    sendFlower: function (target) {
        var flower = new Flower();
        target.receiveFlower(flower);

    }
};



var A = {
    receiveFlower: function (flower) {
        console.log('receive', flower);
    }
}



var B = {
    receiveFlower: function (flower) {
        A.receiveFlower(flower);
    }
}

xiaoming.sendFlower(A);

