
const tasks = new Listr([
    {
      title: "Git",
      task: () => {
        return new Listr(
          [
            {
              title: "Checking git status",
              task: () =>
                execa.stdout("git", ["status", "--porcelain"]).then(result => {
                  if (result !== "") {
                    console.log("Changes are present");
                    //throw new Error('Unclean working tree. Commit or stash changes first.');
                  }
                })
            },
            {
              title: "Checking remote history",
              task: () =>
                execa
                  .stdout("git", [
                    "rev-list",
                    "--count",
                    "--left-only",
                    "@{u}...HEAD"
                  ])
                  .then(result => {
                    if (result !== "0") {
                      throw new Error(
                        "Remote history differ. Please pull changes."
                      );
                    }
                  })
            }
          ],
          { concurrent: true }
        );
      }
    },
    {
      title: "Install package dependencies with Yarn",
      task: (ctx, task) =>
        execa("yarn").catch(() => {
          ctx.yarn = false;
  
          task.skip("Yarn not available, install it via `npm install -g yarn`");
        })
    },
    {
      title: "Install package dependencies with npm",
      enabled: ctx => ctx.yarn === false,
      task: () => execa("npm", ["install"])
    },
    {
      title: "Run tests",
      task: () => execa("npm", ["test"])
    },
    {
      title: "Publish package",
      task: () => execa("npm", ["publish"])
    }
  ]);
  
  tasks.run().catch(err => {
    console.error(err);
  });
  

  
  return new Listr(
    [
      {
        title: "Checking git status",
        task: () =>
          execa.stdout("git", ["status", "--porcelain"]).then(result => {
            if (result !== "") {
              throw new Error(
                "Unclean working tree. Commit or stash changes first."
              );
            }
          })
      },
      {
        title: "Checking remote history",
        task: () =>
          execa
            .stdout("git", ["rev-list", "--count", "--left-only", "@{u}...HEAD"])
            .then(result => {
              if (result !== "0") {
                throw new Error("Remote history differ. Please pull changes.");
              }
            })
      }
    ],
    { concurrent: true }
  );
  
  const env_query = [
      {
        type: "input",
        name: "FB_ID",
        message: chalk.green("Your Facebook Id(Eg: John.lennon.84):")
      },
      {
        type: "input",
        name: "FB_PASS",
        message: chalk.green("Your Facebook password:")
      },
      {
        type: "input",
        name: "EMAIL",
        message: chalk.green("Your email address:")
      },
      {
        type: "input",
        name: "EMAIL_PASS",
        message: chalk.green("Password of your email account:")
      },
      {
        type: "input",
        name: "MAILTO",
        default: env_values => env_values.EMAIL,
        message: chalk.green("Email address to send notification:")
      },
      {
        type: "list",
        name: "sam",
        choices: ["a", "b", "c"],
        message: chalk.red("Choose one")
      }
    ];
  
  
  //--------------------------------------------------------------------------
  #!/usr/bin/env node
  
  const program = require("commander");
  const inquirer = require("inquirer");
  const chalk = require("chalk");
  const execa = require("execa");
  const Listr = require("listr");
  const input = require("listr-input");
  const fs = require("fs");
  const Observable = require("rxjs").Observable;
  const through = require("through");
  
  const pjson = require("./package.json");
  const { env_query } = require("./questions_cli.js");
  
  const tasks = new Listr([
    /*{
      title: "Install package dependencies with npm",
      //enabled: ctx => ctx.yarn === false,
      task: () => execa("npm", ["install"])
    },
    ,
    {
      title: "Enter environment variables",
      task: () => {
        return new Observable(observer => {
          let buffer = "";
  
          const outputStream = through(data => {
            if (/\u001b\[.*?(D|C)$/.test(data)) {
              if (buffer.length > 0) {
                observer.next(buffer);
                buffer = "";
              }
              return;
            }
  
            buffer += data;
          });
  
          const prompt = inquirer.createPromptModule({
            output: outputStream
          });
  
          prompt(env_query)
            .then(env_values => {
              observer.next(); // Clear the output
              const file = fs.createWriteStream(".log");
              for (let property in env_values) {
                file.write(`${property}:${env_values[property]}\n`);
              }
              file.end();
            })
            .then(() => {
              observer.complete();
            })
            .catch(err => {
              observer.error(err);
            });
          return outputStream;
        });
      }
      },*/
    {
      title: "Running get_env.js",
      task: () => {
              const child_process = execa('node', ['get_env.js']);
              const child_out = child_process.stdout;
              const child_in = child_process.stdin;
              process.stdin.pipe(child_in);
              child_out.pipe(process.stdout);
  
      }
    }
    /*{
      title: "Running index.js",
      task: async () => {
        try {
          const stream = await execa("node", ["index.js"]).stdout;
          stream.pipe(process.stdout);
        } catch (err) {
          console.log(`Error: ${err}`);
        }
      }
    }*/
  ]);
  
  tasks.run().catch(err => console.error(err));
  