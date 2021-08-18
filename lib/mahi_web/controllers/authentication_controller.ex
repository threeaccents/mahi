defmodule MahiWeb.AuthenticationController do
  use MahiWeb, :controller

  alias MahiWeb.AuthenticateRequest
  alias Mahi.Accounts

  action_fallback MahiWeb.FallbackController

  def authenticate(conn, params) do
    with {:ok, req} <- AuthenticateRequest.from_params(%AuthenticateRequest{}, params),
         {:ok, auth_token} <- Accounts.authenticate(req.email, req.password) do
      conn
      |> put_status(:created)
      |> put_view(MahiWeb.TokenView)
      |> render("show.json", token: auth_token)
    end
  end
end
