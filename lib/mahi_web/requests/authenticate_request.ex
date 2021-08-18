defmodule MahiWeb.AuthenticateRequest do
  use Mahi.Schema

  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :email, :string
    field :password, :string
  end

  def from_params(%__MODULE__{} = req, params) do
    req
    |> cast(params, [
      :email,
      :password
    ])
    |> validate_required([
      :email,
      :password
    ])
    |> apply_action(:update)
  end
end
