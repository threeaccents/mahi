defmodule MahiWeb.ErrorView do
  use MahiWeb, :view

  @unprocessable_entity_status_code 422
  @unauthorized_status_code 401
  @not_found_status_code 404

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.html", _assigns) do
  #   "Internal Server Error"
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.html" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end

  def render("error.json", %{message: message}) do
    new_error_payload()
    |> set_status_code(@unprocessable_entity_status_code)
    |> add_req_id()
    |> set_message(message)
    |> to_camel_case()
  end

  def render("error.json", %{error: {:error, :invalid_credentials}}) do
    new_error_payload()
    |> set_status_code(@unprocessable_entity_status_code)
    |> add_req_id()
    |> set_message("invalid credentials")
    |> to_camel_case()
  end

  def render("error.json", %{error: {:error, :unauthorized}}) do
    new_error_payload()
    |> set_status_code(@unauthorized_status_code)
    |> add_req_id()
    |> set_message("unauthorized")
    |> to_camel_case()
  end

  def render("error.json", %{error: {:error, :not_found}}) do
    new_error_payload()
    |> set_status_code(@not_found_status_code)
    |> add_req_id()
    |> set_message("not found")
    |> to_camel_case()
  end

  defp new_error_payload do
    %{errors: %{}}
  end

  defp set_status_code(payload, code) do
    Map.put(payload, :status_code, code)
  end

  defp set_message(payload, message) do
    Map.put(payload, :message, message)
  end

  defp add_req_id(payload) do
    Map.put(payload, :request_id, Logger.metadata()[:request_id])
  end

  defp to_camel_case(payload) do
    ProperCase.to_camel_case(payload)
  end
end
