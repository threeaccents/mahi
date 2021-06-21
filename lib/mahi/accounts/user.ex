defmodule Mahi.Accounts.User do
  use Mahi.Schema

  import Ecto.Changeset

  alias Mahi.Accounts.UserSchema

  embedded_schema do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :hashed_password, :string

    timestamps()
  end

  def from_user_schema(%__MODULE__{} = user, %UserSchema{} = user_schema) do
    changeset_from_user_schema(user, user_schema)
    |> apply_action(:update)
  end

  def changeset_from_user_schema(%__MODULE__{} = user, %UserSchema{} = user_schema) do
    user
    |> cast(Map.from_struct(user_schema), [
      :id,
      :first_name,
      :last_name,
      :email,
      :hashed_password,
      :inserted_at,
      :updated_at
    ])
    |> validate_required([
      :id,
      :first_name,
      :last_name,
      :email,
      :hashed_password,
      :inserted_at,
      :updated_at
    ])
  end
end
