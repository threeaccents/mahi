defmodule MahiWeb.PageController do
  use MahiWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
