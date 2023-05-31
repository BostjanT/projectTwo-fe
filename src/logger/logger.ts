import { level } from 'winston';

/* export class DefaultTable {
  id: string;
  level: string;
  timestamp: string;
  context: string;
  message: string;
  stack: any;
} */

const config = require('config');

const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

/* const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
}); */

/* const logger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), splat(), timestamp()),
  transports: [
    new Postgres({
      connectionString: 'your connection string',
      maxPool: 10,
      level: 'info',
      tableName: 'winston_logs',
      tableColumns: [
        {
          name: 'id',
          dataType: 'SERIAL',
          primaryKey: true,
          unique: true
        },
        {
          name: 'level',
          dataType: 'VARCHAR'
        },
        {
          name: 'timestamp',
          dataType: 'TIMESTAMP'
        },
        {
          name: 'message',
          dataType: 'VARCHAR'
        },
        {
          name: 'context',
          dataType: 'VARCHAR'
        },
        {
          name: 'stack',
          dataType: 'JSON'
        },
        {
          name: 'input',
          dataType: 'JSON'
        },
        {
          name: 'output',
          dataType: 'JSON'
        }
      ]
    })
  ]
});
module.exports = logger; */
