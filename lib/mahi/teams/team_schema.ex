defmodule Mahi.Teams.TeamSchema do
  use Mahi.Schema

  import Ecto.Changeset

  schema "teams" do
    field :name, :string

    timestamps()
  end

  def changeset(%__MODULE__{} = team, name) do
    params = %{name: name}

    team
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
