import lct from '../src/index.js';
// var lct = require('../dist/local-coords-transform');
import assert from 'assert';

//local和wgs84是控制点数据，用来生成转换函数
var localSamples = [
        [82988.494, 81115.818],
        [82968.062, 81127.929],
        [83169.665, 80927.33],
        [82933.239, 81163.508],
        [83161.176, 80998.557],
        [83035.765, 80006.048],
        [83255.212, 80457.499],
        [83324.18, 80733.834],
        [83186.574, 80198.748],
        [83484.19, 80997.47],
        [83283.525, 80505.326],
        [83332.371, 80740.772],
        [83486.041, 80984.627],
        [83388.475, 80945.521]
      ];

var wgs84Samples =[
        [120.191416, 30.255882],
        [120.191204, 30.255991],
        [120.193298, 30.254181],
        [120.190842, 30.256312],
        [120.19321, 30.254823],
        [120.191903, 30.245871],
        [120.194185, 30.249942],
        [120.194902, 30.252435],
        [120.19347, 30.247609],
        [120.196566, 30.254813],
        [120.194479, 30.250374],
        [120.194988, 30.252497],
        [120.196585, 30.254697],
        [120.195571, 30.254344]
      ];

//生成转换函数
var transform = lct(localSamples, wgs84Samples);

describe('coordinate transform specs', function () {
    //本地坐标 => wgs84
    it('#fromLocal', function () {
        //第一个参数是用来接收结果的数组，第二个参数是本地坐标值
        var result = transform.fromLocal([], [ 82988.494, 81115.818 ]);
        //wgs84坐标的转换精度为1E-5
        var delta = 1E-5;
        assert.ok(approx(result[0], 121.38365648516356, delta));
        assert.ok(approx(result[1], 31.15163789378666, delta));
    });

    //wgs84 => 本地坐标
    it('#toLocal', function () {
        //第一个参数是用来接收结果的数组，第二个参数是84坐标值
        var result = transform.toLocal([], [ 121.38365648516356, 31.15163789378666 ]);
        //本地坐标的转换精度为0.5m
        var delta = 0.5;
        assert.ok(approx(result[0], -7961.222764147446, delta), result[0]);
        assert.ok(approx(result[1], -9289.597782096651, delta), result[1]);
    });

    it('#fromLocal with object', function () {
        var result = transform.fromLocal([], { x : -7961.222764147446, y : -9289.597782096651 });
        var delta = 1E-5;
        assert.ok(approx(result[0], 121.38365648516356, delta));
        assert.ok(approx(result[1], 31.15163789378666, delta));
    });

    it('#toLocal with object', function () {
        var result = transform.toLocal([], { x : 121.38365648516356, y : 31.15163789378666 });
        var delta = 0.5;
        assert.ok(approx(result[0], -7961.222764147446, delta), result[0]);
        assert.ok(approx(result[1], -9289.597782096651, delta), result[1]);
    });
});

function approx(a, b, delta) {
    return Math.abs(a - b) < delta;
}
