# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :mahi,
  ecto_repos: [Mahi.Repo]

# Configures the endpoint
config :mahi, MahiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "CHYUh8mKRahs406iDtRsTmxEfgv/EFVRQfcG9wMAMMDSLWnXYhiHT8QsgMJvZILI",
  render_errors: [view: MahiWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Mahi.PubSub,
  live_view: [signing_salt: "mX22WaSk"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
