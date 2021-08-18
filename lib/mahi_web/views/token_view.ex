defmodule MahiWeb.TokenView do
  use MahiWeb, :view
  alias MahiWeb.TokenView

  def render("show.json", %{token: token}) do
    data = %{data: render_one(token, TokenView, "token.json")}
    ProperCase.to_camel_case(data)
  end

  def render("token.json", %{token: token}) do
    %{
      token: token
    }
  end
end
