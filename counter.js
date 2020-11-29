const { createMachine, assign, interpret } = require("xstate");

const counterMachine = createMachine({
  initial: "active",
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({ count: (ctx) => ctx.count + 1 }),
        },
      },
    },
  },
});

const counterService = interpret(counterMachine).onTransition((state) =>
  console.log(state.context.count)
);

counterService.start();
counterService.send("INCREMENT");
counterService.send("INCREMENT");
counterService.send("INCREMENT");
