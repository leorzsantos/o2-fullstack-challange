enum Environments {
  local_environment = 'local',
  dev_environment = 'dev',
  prod_environment = 'prod'
}
class Environment {
  private environment: String;
  constructor(environment: String) {
    this.environment = environment;
  }

  getPort(): Number {
    return 5001;
  }

  getConnectionString(): String {
    if (this.environment === Environments.prod_environment) {
      return 'mongodb://[database-user]:[password]@1.1.1.1:27017/[database-name]?authSource=[database-user]&readPreference=primary&gssapiServiceName=mongodb&appname=[app-name]&ssl=false';
    } else if (this.environment === Environments.dev_environment) {
      return 'mongodb://[database-user]:[password]@2.2.2.2:27017/[database-name]?authSource=[database-user]&readPreference=primary&gssapiServiceName=mongodb&appname=[app-name]&ssl=false';
    } else {
      return 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
    }
  }
}

export default new Environment(Environments.dev_environment);