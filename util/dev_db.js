#!/usr/bin/env node

require('dotenv').config()
const execa = require('execa')

const dbProcess = execa(
    'mongod', [
    	'--dbpath=./data'
    ]
);


// setTimeout(() => {
// 	const initProcess = execa(
// 		'npm',
// 		[
// 			'run',
// 			'init'
// 		]
// 	)

// 	initProcess.stdout.pipe(process.stdout);
// 	initProcess.stderr.pipe(process.stderr);

// }, 5000)


dbProcess.stdout.pipe(process.stdout);
dbProcess.stderr.pipe(process.stderr);


