class Catagotchi {
  private alive : boolean;

  private mood : number;

  private energy : number;

  private hunger : number;

  private gameDOM : Element;

  private displayMood : HTMLDivElement;

  private displayEnergy : HTMLDivElement;

  private displayHunger : HTMLDivElement;

  private displayStatus : HTMLDivElement;

  private lastTickTimeStamp : number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  constructor(gameDOM : Element) {
    this.gameDOM = gameDOM;

    this.alive = true;

    this.mood = 10;
    this.energy = 10;
    this.hunger = 0;

    this.getDOMElements();
    this.updateDisplays();
    this.startRunning();
    this.meow();
  }

  /**
   * Meow says the cat.
   * Not accessible directly, but is used as a response by certain actions.
   * TODO: Add some sound effects
   */
  private meow() : void {
    if (!this.alive) {
      throw new Error('Dead catagotchi cannot meow. Something is wrong.');
    }
    console.log('meow!');
  }

  /**
   * Update the displays on the DOM with current state of attributes.
   */
  private updateDisplays() {
    this.displayMood.innerHTML = String(this.mood);
    this.displayHunger.innerHTML = String(this.hunger);
    this.displayEnergy.innerHTML = String(this.energy);
    this.displayStatus.innerHTML = (this.alive === true ? 'Alive' : 'Dead');
  }

  /**
   * Called for every game tick. Updates attributes.
   * TODO: currently called from outside the current class. Make the game tick internal?
   * TODO: move the update of attributes to its own function.
   */
  public gameTick() {
    if (this.alive) {
      if (this.hunger >= 10 || this.energy < 0) {
        this.catDied();
      }

      this.energy -= (Math.random() > 0.7 ? 1 : 0);
      this.mood -= (Math.random() > 0.4 ? 1 : 0);
      this.hunger += (Math.random() > 0.2 ? 1 : 0);

      this.updateDisplays();
    }
  }

  /**
   * Poor catagotchi died.
   */
  private catDied() {
    this.alive = false;
  }

  /**
   * Feed the Catagotchi. Will improve mood and reduce hunger.
   */
  public feed() {
    this.hunger -= 2;
    this.mood += 1;
    this.meow();
  }

  /**
   * Play with the Catagotchi. It does make Catagotchi sleepy, though.
   */
  public play() {
    this.mood += 1;
    this.energy -= 2;
    this.hunger += 1;
  }

  /**
   * Ask Catagotchi to sleeeeep. Improved mood and energy, but makes it hungry too.
   */
  public sleep() {
    this.energy += 2;
    this.hunger += 1;
    this.mood += 1;
  }

  private getDOMElements() {
    this.displayHunger = this.gameDOM.querySelector('#displayHunger');
    this.displayMood = this.gameDOM.querySelector('#displayMood');
    this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
    this.displayStatus = this.gameDOM.querySelector('#displayStatus');

    this.gameDOM.querySelector('#buttonFeed').addEventListener('click', this.feed.bind(this));
    this.gameDOM.querySelector('#buttonPlay').addEventListener('click', this.play.bind(this));
    this.gameDOM.querySelector('#buttonSleep').addEventListener('click', this.sleep.bind(this));
  }

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);
