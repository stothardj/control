define(() => {
  class Command {
    constructor(unit) {
      this.unit = unit;
    }

    stepCommand() {
      throw Error('stepCommand not implemented');
    }

    isCommandDone() {
      throw Error('isCommandDone not implemented');
    }
  }

  return {
    Command: Command,
  };
});
