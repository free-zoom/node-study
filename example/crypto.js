// crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

// 可以在不包括支持 crypto 模块的情况下构建 Node.js，这时调用 require('crypto') 将导致抛出异常。

const fs = require('fs')
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('不支持 crypto');
}

// hash 加密
const hash = crypto.createHash('sha256')
hash.update('hello')
const output  = hash.digest('hex')
console.log('hash加密:',output)

// ------------------------------------------------------------------------------------------------------------
// HMAC例子
const secret = 'AALF893423423'
const hash1 = crypto.createHmac('sha256',secret)
hash1.update('hello')
const output1  = hash1.digest('hex')
console.log('HMAC加密：', output1)

// ------------------------------------------------------------------------------------------------------------
/*
 核心方法：final()
 加密：
 crypto.createCipher(algorithm, password)
 crypto.createCipheriv(algorithm, key, iv)
 解密：
 crypto.createDecipher(algorithm, password)
 crypto.createDecipheriv(algorithm, key, iv)
*/
function cipher(content){
    const cipher = crypto.createCipher('aes192', secret);
    cipher.update(content);
    return cipher.final('hex');
}

function decipher(content){
    const decipher = crypto.createDecipher('aes192', secret);
    decipher.update(content, 'hex');
    return decipher.final('utf8');
}

console.log('cipher加密：',cipher('hello'));
console.log('decipher解密：',decipher(cipher('hello')));

// --------------------------------------------------------------------------------------------------------------
const key = crypto.randomBytes(192/8);
const iv = crypto.randomBytes(128/8);
const algorithm1 = 'aes192';

function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm1, key, iv);
    cipher.update(text);
    return cipher.final('hex');
}

function decrypt(encrypted){
    const decipher = crypto.createDecipheriv(algorithm1, key, iv);
    decipher.update(encrypted, 'hex');
    return decipher.final('utf8');
}

const crypted = encrypt('hello');
console.log('crypted加密：', crypted );
const decrypted = decrypt( crypted );
console.log('decrypted解密：', decrypted );

// ---------------------------------------------------------------------------------------------------------------
// 数字签名/签名校验
const privateKey = fs.readFileSync('./config/private-key.pem');  // 私钥 签名加密
const publicKey = fs.readFileSync('./config/public-key.pem');  // 公钥 解密
const algorithm2 = 'RSA-SHA256';  // 加密算法 vs 摘要算法

// 数字签名
function sign(text){
    const sign = crypto.createSign(algorithm2);
    sign.update(text);
    return sign.sign(privateKey, 'hex');
}

// 校验签名
function verify(oriContent, signature){
    const verifier = crypto.createVerify(algorithm2);
    verifier.update(oriContent);
    return verifier.verify(publicKey, signature, 'hex');
}

// 对内容进行签名
const signature = sign('hello world');
console.log(signature);

// 校验签名，如果通过，返回true
const verified = verify('hello world', signature);
console.log(verified);
