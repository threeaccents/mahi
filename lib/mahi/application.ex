defmodule Mahi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Mahi.Repo,
      # Start the Telemetry supervisor
      MahiWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Mahi.PubSub},
      # Start the Endpoint (http/https)
      MahiWeb.Endpoint,
      # Chunk Upload
      Mahi.Uploads.ChunkUploadSupervisor
      # Start a worker by calling: Mahi.Worker.start_link(arg)
      # {Mahi.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Mahi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    MahiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
