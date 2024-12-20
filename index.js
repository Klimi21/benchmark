const Benchmarkify = require("benchmarkify");

// Create a new benchmark
// The `.printHeader` method will print the name of benchmark & some
// information from the OS/PC to the console.
const benchmark = new Benchmarkify("Simple example", { description: "This is a common benchmark", chartImage: true }).printHeader();

// Create a test suite
benchmark.createSuite("String concatenate", { time: 1000, description: "Concatenate string in different ways" })

    .add("Concat with '+'", () => {
		let s = "";
		for (let i = 0; i < 1000; i++)
			s += "test" + i;
		return s;
	})

	.ref("Concat with array & join", () => {
		let s = [];
		for (let i = 0; i < 1000; i++)
			s.push("test" + i);
		return s.join();
	});

benchmark.run();
