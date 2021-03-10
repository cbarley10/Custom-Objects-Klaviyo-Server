# Custom Objects Server

This app is a server written in NodeJS to interact with Klaviyo Custom Objects for Hylete.

## Installation

Use Node Package Manager [NPM](https://www.npmjs.com) to install.

```bash
npm install
```

## Usage

To run the app:

1. Clone the app Repo:

```bash
git clone git@github.com:cbarley10/Custom-Objects-Klaviyo-Server.git
```

2. Change into the root directory:

```bash
cd Custom-Objects-Klaviyo-Server
```

3. Create a file in the root directory called `.env`.
4. Add the following information to the file and save it:

```
PORT=5000
PUBLIC_TOKEN={ Public Token Here }
KEY={ Private API Key Here}
ROOT_URL=https://a.klaviyo.com/api/v1/{CUSTOM OBJECTS ENDPOINT HERE}
```

You can find your Public Token and Private API key in your Klaviyo Account settings. Do not include the curly braces when you add those tokens. Example `PUBLIC_TOKEN=ABC123`

5. Install packages using:

```bash
npm install
```

6. Run the server using:

```bash
npm run dev
```

or

```bash
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

None
