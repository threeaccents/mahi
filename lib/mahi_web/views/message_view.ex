defmodule MahiWeb.MessageView do
  use MahiWeb, :view
  alias MahiWeb.MessageView

  def render("show.json", %{message: message}) do
    data = %{data: render_one(message, MessageView, "message.json")}
    ProperCase.to_camel_case(data)
  end

  def render("message.json", %{message: message}) do
    %{
      message: message
    }
  end
end
