class Catagochi {
  private alive : boolean;

  private mood : number;

  private energy : number;

  private hunger : number;

  private gameDOM : Element;

  private displayMood : HTMLDivElement;

  private displayEnergy : HTMLDivElement;

  private displayHunger : HTMLDivElement;

  private displayStatus : HTMLDivElement;

  /**
   * Creates the Catagochi game. Sets all of the attributes of the
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
    Catagochi.meow();
  }

  /**
   * Meow says the cat.
   * Not accessible directly, but is used as a response by certain actions.
   * TODO: Add some sound effects
   */
  private static meow() {
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
   * Poor catagochi died.
   */
  private catDied() {
    this.alive = false;
  }

  /**
   * Feed the Catagochi. Will improve mood and reduce hunger.
   */
  public feed() {
    this.hunger -= 2;
    this.mood += 1;
    Catagochi.meow();
  }

  /**
   * Play with the Catagochi. It does make Catagochi sleepy, though.
   */
  public play() {
    this.mood += 1;
    this.energy -= 2;
    this.hunger += 1;
  }

  /**
   * Ask Catagochi to sleeeeep. Improved mood and energy, but makes it hungry too.
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
}

const init = () => {
  const catGame = new Catagochi(document.querySelector('#game'));
  setInterval(() => {
    catGame.gameTick();
  }, 3000);
};

window.addEventListener('load', init);