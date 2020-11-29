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

const dummyFn = () => {
  console.log("dummy");
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
        exit: ["dummyFn", "aResolveFn"],
      },
      rejected: {
        type: "final",
      },
    },
  },
  {
    actions: { aResolveFn, bResolveFn, rejectFn, dummyFn },
  }
);

const promiseService = interpret(promiseMachine).onTransition((state) =>
  console.log(state.value)
);

// Start the service
promiseService.start();
// => 'pending'

// promiseService.send("REJECT");
// // => 'rejected'

promiseService.send("RESOLVE");
// => 'resolved'
