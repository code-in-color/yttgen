# YouTube Title Generator

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Getting Started

### Dependencies

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Supabase CLI](https://supabase.com/docs/guides/cli)
* [Node.js 18.*](https://nodejs.org/en/download)

### Environment

* Set Discord OAuth credentials
* Set Github OAuth credentials
* Set Supabase credentials
* Set Open AI credentials

#### How to get Discord OAuth credentials

1. Navigate to the [Discord Developer Portal](https://discord.com/developers/applications) and select **New Application**.
2. Name the application `yttgen` and select **Create**.
3. Select the application and navigate to Settings -> OAuth2
4. Copy **Cliend ID** located under the Client information header.

#### How to get GitHub OAuth credentials

1. Navigate to your [profile settings](https://github.com/settings/profile).
2. [Create a new GitHub app](https://github.com/settings/apps/new)
3. Name app `yttgen`.
4. Set **Homepage URL** to a URL you own.
5. Set the **Callback URL** to `http://localhost:3000/authorize`
6. Select **Register application** to complete the setup.
7. Copy the **Client ID**
8. Select **Generate a new client secret** located in the **Client secrets** section.

