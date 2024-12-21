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

const fs = require('fs');
const path = './history.json';

// Function to append data to the JSON file
function appendData(newData) {
	// Read the existing data from the file
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			// console.error('Error reading the file:', err);
			// return;
			data = "[]";
		}

		// Parse the existing data
		let jsonData = [];
		try {
			jsonData = JSON.parse(data);
		} catch (parseErr) {
			console.error('Error parsing JSON data:', parseErr);
			return;
		}

		// Append the new data
		jsonData.push(newData);

		// Write the updated data back to the file
		fs.writeFile(path, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
			if (writeErr) {
				console.error('Error writing to the file:', writeErr);
				return;
			}
			console.log('Data successfully appended to the file');
		});
	});
}



// benchmark.run();
//auch als json:
// benchmark.run().then(res => console.log(res))
benchmark.run().then(res => appendData(res))
