var md5 = require("md5");
const saltedMd5 = require('salted-md5');
var crypto = require('crypto');
var fs = require("fs");

/*
var crt = crypto.getHashes()//.createHash("sha256").update('apple').digest('hex');
  console.log( crt )

  try {  
    let data = (fs.readFileSync('words', 'utf8')).toString().split('\n');

    crt.forEach(function(value){
        try { 
           
            fs.writeFileSync('encrypted/'+(value.replace(/[/]/g, '_')) , data.map(x =>  crypto.createHash(value).update(x.toString()).digest('hex') ).join('\n') );
            console.log("Successfully written!");  
        } catch(e) {
            console.log('Error:', e.stack);
        }
      })

      
} catch(e) {
    console.log('Error:', e.stack);
}

*/


function findFrom(word, hash) {
  return new Promise((resolve, reject) => {
    fs.readFile('encrypted/'+hash.replace(/[/]/g, '_'), "utf8", function (err, data) {
        if (err) {
          reject(err);
        } else {
            let a = data.split("\n").map(function (word) {
                return crypto.createHash(hash).update(word).digest('hex');
              })


            let w = a[a.indexOf( crypto.createHash(hash).update(word).digest('hex') )]
          resolve(`found ${word} with the hash ${hash} and the given code way: ${crypto.createHash(hash).update(word).digest('hex')}`);
        }
      // file written successfully)
    });
  });
}

function findFromHash(hash, lookup) {
    return new Promise((resolve, reject) => {

        fs.readFile("words", "utf8", function (err, data) {
            let allWords = data.split("\n")
             
    fs.readFile('encrypted/'+lookup.replace(/[/]/g, '_'), "utf8", function (err, data) {
        if (err) {
          reject(err);
        } else {
            let a = data.split("\n")

            let w = a[a.indexOf( hash)]

            if( allWords[a.indexOf( hash)]  === undefined){
                reject('Invalid')
            }else{
            resolve(`word was ${allWords[a.indexOf( hash)] } useing the ${lookup} hashing algoritem`)
            }
           
        }
    })
})
})
}

async function handeHash(array){ 
    let d = await array

    return d.filter( x => x.status == 'fulfilled'  )

}


function findFromSalt(salt, precode) {
    return new Promise((resolve, reject) => {
        fs.readFile("words", "utf8", function (err, data) {
         let a = data.split("\n")
          let b = data.split("\n").map(function (word) {
            return saltedMd5(salt, precode);
          })

          

            if (err) {
              reject(err);
            } else {
                let w = a[b.indexOf( saltedMd5(salt, precode) )]

                resolve(`found ${w} with the salt ${saltedMd5(salt, precode)}`);
            }
          // file written successfully)
        });
      });
}


var crt = crypto.getHashes()
//var arr1 = crt.map(x => findFrom("apple", x.toString() ))
//var arr2 = crt.map(x => findFromHash("", x.toString() ))

let ans = crt.map(x => findFromHash("bc4f450d149e8133974eacf696886378b386967cb412a6c6c07c9f083de5b661", x.toString() ))
//Promise.race(arr1).then(console.log)

handeHash( Promise.allSettled(ans) ).then(console.log)



//findFrom("apple", crt[0] ).then(console.log)

//findFromSalt('2c80942f6266559d99dac6ce8bfad3a3', '5775').then(console.log);