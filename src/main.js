import CryptoJs from 'crypto-js';
import fs from 'fs';
import path from 'path';
import commander from 'commander';
import dotenv from 'dotenv';

(() => {
  dotenv.config();
  const  program = new commander.Command();
  program
    .version('0.0.1')
    .command('encrypt <dir>')
    .action((dir) => {
      fs.readFile(dir, (err, data) => {
        if (data) {
          const ext = path.extname(dir);
          const filename = path.basename(dir.replace(ext, ''));
          const encData = CryptoJs.AES.encrypt(data.toString(), process.env.KEY)
          fs.writeFile(path.resolve(`${filename}.${process.env.EXT}${ext}`), encData, (fsErr) => {
            if (fsErr) console.log(fsErr);
          });
        }
        if (err) console.log(err);
      });
    });
  program
    .command('decrypt <div>')
    .action((dir) => {
      fs.readFile(dir, (err, data) => {
        if (data) {
          const decData = CryptoJs.AES.decrypt(data.toString(), process.env.KEY).toString(CryptoJs.enc.Utf8);
          fs.writeFile(path.resolve(dir.replace(process.env.EXT, '')), decData, (fsErr) => {
            if (fsErr) console.log(fsErr);
          });
        }
      })
    })
  program.parse(process.argv);
})();
