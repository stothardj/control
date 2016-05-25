define(() => {
  class Layer {
    constructor(name) {
      this.name_ = name;
    }

    getCanvas() {
      return document.getElementById(this.name_);
    }

    getContext() {
      return this.getCanvas().getContext('2d');
    }
  }

  return {
    Layer: Layer,
  };
});
