defmodule Mahi.Teams.Team do
  use Mahi.Schema

  import Ecto.Changeset

  alias Mahi.Teams.TeamSchema

  embedded_schema do
    field :name, :string

    timestamps()
  end

  def from_team_schema(%__MODULE__{} = team, %TeamSchema{} = team_schema) do
    team
    |> cast(Map.from_struct(team_schema), [:id, :name, :iserted_at, :updated_at])
    |> validate_required([:id, :name, :iserted_at, :updated_at])
    |> apply_action(:update)
  end
end
