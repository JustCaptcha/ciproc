#!/usr/bin/env babel-node

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
          const encData = CryptoJs.AES.encrypt(data.toString(), process.env.KEY).toString();
          fs.writeFile(path.resolve('output.txt'), encData, (fsErr) => {
            if (fsErr) console.log(fsErr);
          });
        }
        if (err) console.log(err);
      });
    })
  program.parse(process.argv);
})();
