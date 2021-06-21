defmodule Mahi.Accounts.UserSchema do
  use Mahi.Schema

  # import Ecto.Changeset
  import Ecto.Query, warn: false

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :hashed_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  def where_id(query, id) do
    from(user in query,
      where: user.id == ^id
    )
  end
end
