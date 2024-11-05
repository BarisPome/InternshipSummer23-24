## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Please go through the reading material and make sure you're familiar with the basics of our building blocks before continuing the setup process. 

<br>

## Pre-requisites

You'll need:

- Node (and npm)
- Docker (in the near future, not implemented yet) 

Install node via your system's package manager. On macOS, using Homebrew is recommended.

To install Homebrew, run the following command in your terminal :

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, install Node (which includes npm -- Node Package Manager):

```
brew install node
```

You can verify successful installation by running the following:

```
node -v
```
```
npm -v
```

Install Docker by following the [instructions](https://docs.docker.com/get-docker/) on Docker's website.

<br>

## Installation

Clone the repository:

```
git clone https://github.com/taha-kahya/academic-note-copilot.git
```
```
cd academic-note-copilot
```

Install the dependencies

```
npm install
```

Now, you are ready to start developing!

<br>

## Standing up a local dev environment for the frontend

To start serving the app locally, first navigate to the project folder and then:

```
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

<br>

## Configuring environment variables

This repository includes a file named .env.local.sample which you should use as a starter for your own .env.local file. This file should include all the env variables for various dependencies.

### Supabase

- **NEXT_PUBLIC_SUPABASE_PROJECT**
  - You can use the value that's in the sample file.
- **NEXT_PUBLIC_SUPABASE_URL**
  - When you start your local Supabase instance, it will print this out (see above) as API URL. Unless you customize your local Supabase configuration, this should be the same as the value that's in the sample file.
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**
  - When you start your local Supabase instance, it will print this out (see above) as anon key.

<br>

## Suggested reading

We highly recommend you go through these tutorials/documentation to get yourself familiar with major building blocks of our application.

- [Trunk Based Development](https://trunkbaseddevelopment.com/)
- [Next.js](https://nextjs.org/learn)
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Supabase Branching](https://supabase.com/docs/guides/platform/branching)
