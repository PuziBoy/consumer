const amqplib = require('amqplib');

var amqp_url = process.env.CLOUDAMQP_URL || 'amqp://user:pass@direct.gubanov.ee:5672';

async function do_consume() {
    var conn = await amqplib.connect(amqp_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var q = 'student-names';
    await conn.createChannel();
    await ch.assertQueue(q, {durable: true, exclusive: false, autoDelete: false, arguments: null});
    await ch.consume(q, function (msg) {
        console.log(msg.content.toString());
        ch.ack(msg);
        ch.cancel('myconsumer');
        }, {consumerTag: 'myconsumer'});
}

do_consume();