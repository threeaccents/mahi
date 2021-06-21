defmodule MahiWeb.Plugs.ApiAuth do
  use Guardian.Plug.Pipeline,
    otp_app: :mahi,
    module: MahiWeb.Guardian,
    error_handler: MahiWeb.Plugs.ApiAuthErrorHandler

  plug Guardian.Plug.VerifyHeader, claims: %{typ: "access"}
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
  plug MahiWeb.Plugs.CurrentUser
end
