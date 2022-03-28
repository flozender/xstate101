const { Machine, interpret } = require("xstate");

const bResolveFn = () => {
  console.log("before resolve");
};

const aResolveFn = () => {
  console.log("after resolve");
};

const rejectFn = () => {
  console.log("reject");
};

const aResolveFn2 = () => {
  console.log("after resolve 2");
};

const promiseMachine = Machine(
  {
    id: "promise",
    initial: "pending",
    states: {
      pending: {
        on: {
          RESOLVE: "resolved",
          REJECT: {
            target: "rejected",
            actions: "rejectFn",
          },
        },
      },
      resolved: {
        type: "final",
        entry: "bResolveFn",
        exit: ["aResolveFn", "aResolveFn2"],
      },
      rejected: {
        type: "final",
      },
    },
  },
  {
    actions: { aResolveFn, bResolveFn, rejectFn, aResolveFn2 },
  }
);

const promiseService = interpret(promiseMachine).onTransition((state) =>
  console.log(state.value)
);

// Start the service
promiseService.start();
// => 'pending'

promiseService.send("RESOLVE");
// => 'resolved'

// promiseService.send("REJECT");
// // => 'rejected'
