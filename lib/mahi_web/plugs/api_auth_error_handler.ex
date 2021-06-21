defmodule MahiWeb.Plugs.ApiAuthErrorHandler do
  @behaviour Guardian.Plug.ErrorHandler

  use MahiWeb, :controller

  @impl Guardian.Plug.ErrorHandler
  def auth_error(conn, {_type, reason}, _opts) do
    body = %{
      http_code: 401,
      request_id: Logger.metadata()[:request_id],
      errors: %{},
      message: to_string(reason)
    }

    body = ProperCase.to_camel_case(body)

    conn
    |> put_status(:unauthorized)
    |> json(body)
  end
end
