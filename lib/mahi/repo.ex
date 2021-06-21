defmodule Mahi.Repo do
  use Ecto.Repo,
    otp_app: :mahi,
    adapter: Ecto.Adapters.Postgres
end
