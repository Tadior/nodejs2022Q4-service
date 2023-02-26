import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
import * as fsPromise from 'node:fs/promises';
import * as path from 'node:path';

dotenv.config();

const mainDir = path.join('logs');
const logsDir = path.join('logs' + '/logs');
const errorDir = path.join('logs' + '/errors');
const LOGGER_FILE_MAX_SIZE = Number(process.env.LOGGER_FILE_MAX_SIZE);

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  constructor() {
    super('App');
    this.setContext('App');

    process.on('uncaughtException', (error, origin) => {
      this.logError(`captured error:  ${error.message}`);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.logError(`unhandled rejection detected: ${reason}`);
    });

    this.createDir(mainDir);
    this.createDir(logsDir, `/log.1.txt`);
    this.createDir(errorDir, `/log.1.txt`);
  }

  private createDir(dist, file = '') {
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
    const distPath = path.join(dist + file);

    if (fs.existsSync(distPath)) {
      return false;
    }
    const msg = `${new Date().toISOString()} - init`;

    fs.appendFileSync(distPath, msg);
  }

  async logging(message: string) {
    this.log(message);

    const file = await fsPromise.readdir(logsDir);
    const pathDist = path.join(`${logsDir}/log.${file.length}.txt`);

    await this.getLogDirSize(pathDist, 'logging');
    await this.addLog(pathDist, message);
  }

  async logError(message: string) {
    this.error(message);
    const file = await fsPromise.readdir(errorDir);
    const pathDist = path.join(`${errorDir}/log.${file.length}.txt`);

    await this.getLogDirSize(pathDist, 'error');
    await this.addLog(pathDist, message);
  }

  private async getLogDirSize(pathDist, counterName) {
    const fileStat = await fsPromise.stat(pathDist);

    if (fileStat.size >= LOGGER_FILE_MAX_SIZE) {
      const log = `${new Date().toISOString()} - init new log file`;
      let file;
      let pathToFileLog;

      switch (counterName) {
        case 'logging':
          file = await fsPromise.readdir(logsDir);
          pathToFileLog = path.join(`${logsDir}/log.${file.length}.txt`);

          await fsPromise.appendFile(pathToFileLog, log);
          break;

        case 'error':
          file = await fsPromise.readdir(errorDir);
          pathToFileLog = path.join(`${errorDir}/log.${file.length}.txt`);

          await fsPromise.appendFile(pathToFileLog, log);
          break;
      }
    }
  }

  private async addLog(pathDist, message: string) {
    try {
      const date = new Date().toISOString();
      const log = JSON.stringify(message);
      const out = `Date: ${date}, message: ${log}`;

      await fsPromise.appendFile(pathDist, out);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }
}
