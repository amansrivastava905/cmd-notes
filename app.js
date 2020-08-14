const notes = require("./notes.js");
const yargs = require("yargs");
const chalk = require('chalk');

// customise yargs version(i.e. version of your application that you are making)
yargs.version("beta");

// our app will have add,delete,read,list commands
// we add a new command using yargs.command

// create add command
yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "Notes Title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body of Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// create remove command
yargs.command({
    command: "remove",
    describe: "remove a  note",
    builder: {
        title: {
            describe: "note title to delete",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
});

// create read command
yargs.command({
    command: "read",
    describe: "read the notes",
    builder: {
        title: {
            describe: "note title to delete",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv){
        notes.readNote(argv.title);
    }
});

// create list command
yargs.command({
    command: "list",
    describe: "list note",
    handler: function () {
       notes.listNotes();
    }
});






yargs.parse();

