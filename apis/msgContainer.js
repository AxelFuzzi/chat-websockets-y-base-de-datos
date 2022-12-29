import knex from 'knex';
import createTable from '../utils/createTableMsgs.js';
import insertNewElement from '../utils/insertElement.js';
import readAllElements from '../utils/readElements.js';

class MsgContainer {
  constructor(dbConfigs, tableName) {
    this.db = knex(dbConfigs);
    this.config = dbConfigs;
    this.tableName = tableName;
    this.#existTable();
  }

  async #existTable() {
    try {
      if (!(await this.db.schema.hasTable(this.tableName))) {
        createTable(this.config, this.tableName);
      }
    } catch (error) {
      throw error;
    }
  };

  async insertMsg(msgData) {
    try {
      await insertNewElement(this.config, this.tableName, msgData);
      console.log(
        `El mensage fue insertado correctamente en la base de datos.`
      );
    } catch (error) {
      throw `${error}`;
    }
  };

  async readMsgs(){
    try {
      const messages = await readAllElements(this.config, this.tableName);
      if (!messages.length) {
        return 'No se encontraron mensajes en la base de datos.';
      }
      return messages;
    } catch (error) {
      throw `${error}`;
    }
  };
}

export default MsgContainer;
