const { Machine, interpret } = require("xstate");

const lightDelayMachine = Machine({
  id: "lightDelay",
  initial: "green",
  states: {
    green: {
      after: {
        // after 1 second, transition to yellow
        1000: "yellow",
      },
    },
    yellow: {
      after: {
        // after 0.5 seconds, transition to red
        500: "red",
      },
    },
    red: {
      type: "final",
    },
  },
});

const lightDelayService = interpret(lightDelayMachine).onTransition((state) =>
  console.log(state.value)
);

// Start the service
lightDelayService.start();
// => 'start'
