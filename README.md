# 606 Experience Experiment Frontend

## Development

For code consistency, the best way of developing is:

1. Use Visual Studio Code
2. [Ensure the 'EditorConfig' extension is installed](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
3. [Ensure the 'Prettier' extension is installed](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. Open the workspace file (`ws.code-workspace`)

That's it. Now, every time you save, your file will be automatically formatted how it should be.

If you do use another editor, but can still use Prettier, ensure the following options are set:

- No semicolons
- Single quoted strings
- JSX single quoted strings
- Trailing commas where valid in ES5
- Always include parentheses in single argument arrow functions

## Running

### OSX (This method gives the fastest build times)

Ensure you have Homebrew installed:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install nvm and yarn:

```bash
brew install nvm yarn --without-node
```

Add the following lines to the end of your shell profile - e.g. for .zshrc:

```bash
echo -e 'export NVM_DIR="$HOME/.nvm"\n. "/usr/local/opt/nvm/nvm.sh"' >> ~/.zshrc && . ~/.zshrc
```

Install Node 10 and make it the default node for your system:

```bash
nvm install 10
```

Clone the repo, enter the folder and run:

```bash
yarn
yarn start
```

`Ctrl+c` to bomb out.

### Docker

```bash
docker-compose up
```

Navigate to `http://localhost:3000`.

Ctrl+C to stop the container.

If you want to just have it run in the background:

```bash
docker-compose up -d
```

or

```bash
docker-compose start
```

To 'follow' the logs of the background container:

```bash
docker-compose logs -f
```

To stop the background container:

```bash
docker-compose stop
```

Or, to stop and remove the container:

```bash
docker-compose down
```

To run the jest test watcher, open a new command terminal:

```bash
docker-compose exec react yarn test
```

To attach to the container on a command prompt for debugging:

```bash
docker-compose exec react bash
```
