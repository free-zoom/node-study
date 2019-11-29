const dns = require('dns');

// 域名解析
dns.lookup('baidu.com', (err, address, family) => {
    console.log('地址: %j 地址族: IPv%s', address, family);
    // 地址: "220.181.38.148" 地址族: IPv4
});

// 解析'archive.org' 然后逆向解析返回的IP地址：
dns.resolve4('baidu.com', (err, addresses) => {
    if (err) throw err;

    console.log(`地址: ${JSON.stringify(addresses)}`);

    addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
            if (err) {
                throw err;
            }
            console.log(`地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`);
        });
    });
});
