# YouTube Title Generator

This is my _excuse for content_ project. It exists because I wanted something to do in my [DevLog](https://youtube.com/playlist?list=PLHTZjQ3iWQR_SpWOgahABzZsiW5u-xf7v) series. This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Features

As this is a excuse project, the feature set is mostly made up on the spot while I build. Expect this list to grow over time.

- [x] Generate a title given a video description.
- [ ] Generate a thumnail given a title, video description, and prompt.
- [ ] Generate a list of tags for a video given the URL.
- [ ] Automatically assign videos to relevant playlist based on title and description.
- [x] List previously generated titles.
- [ ] Automatically improve titles of previously published videos.

## Getting Started

You need to have the following accounts setup to:

* [Open AI](https://platform.openai.com/signup?launch)
* [Discord](https://discord.com/register)
* [GitHub](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)
* [Supabase](https://supabase.com/dashboard/sign-up)

## Running yttgen

1. Clone the repo, `git clone https://github.com/code-in-color/yttgen.git`
2. Install dependencies, `yarn`
3. Configure environement (refer to Environment setup)
4. Start **Docker Desktop**
5. Navigate to the repo in the CLI, `cd ~/<path-to-repo>`
6. Start Supabase, `supabase start`
7. Create Database, `db:push:schema`
8. Start the application, `yarn dev`

### Dependencies

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Supabase CLI](https://supabase.com/docs/guides/cli)
* [Node.js 18.*](https://nodejs.org/en/download)

### Environment setup

Before you run the project, you need to set environment variables.

1. Copy the example environement file, `cp .env.example .env.local`
2. Set the values

#### Discord OAuth credentials

1. Navigate to the [Discord Developer Portal](https://discord.com/developers/applications) and select **New Application**
2. Name the application `yttgen` and select **Create**
3. Select the application and navigate to Settings -> OAuth2
4. Set `DISCORD_CLIENT_ID` to the **Cliend ID** located under the Client information header
5. `DISCORD_CLIENT_SECRET`

#### GitHub OAuth credentials

1. Navigate to your [profile settings](https://github.com/settings/profile)
2. [Create a new GitHub app](https://github.com/settings/apps/new)
3. Name app `yttgen`
4. Set **Homepage URL** to a URL you own
5. Set the **Callback URL** to `http://localhost:3000/authorize`
6. Select **Register application** to complete the setup
7. Set `GITHUB_CLIENT_ID` to the **Client ID**
8. Select **Generate a new client secret** located in the **Client secrets** section
9. Set `GITHUB_CLIENT_SECRET` to the generated client secret

#### Supabase credentials

1. Navigate to your Supabase account
2. Select **New Project** and the org you'd like it to be created under
3. Set the **Name** to `yttgen`
4. Set **Database Password**
5. Choose the **Region** closest to you
6. Select **Create new project** to complete the setup
7. Navigate to **Settings** page from the left side-nav
8. Navigate to the **API Settings**
9. Set `NEXT_PUBLIC_SUPABASE_URL` to **URL** in the **Project URL** section
10. Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` to **anon public** key in **Project API keys** section
11. Navigate to **Database Settings**
12. Set `DATABASE_URL` to **Host** in the **Connection info** section

#### Open AI credentials

1. Navigate to [API Keys pages](https://platform.openai.com/account/api-keys)
2. Select **Create new secret key**
3. Set **Name** to `yttgen`
4. Select **Create secret key** to complete setup
5. Set `OPEN_AI_API_KEY` to the new key
