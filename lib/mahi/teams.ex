defmodule Mahi.Teams do
  alias Mahi.Teams.TeamSchema
  alias Mahi.Teams.Team
  alias Mahi.Repo

  def create(name) when is_binary(name) do
    %TeamSchema{}
    |> TeamSchema.changeset(name)
    |> Repo.insert()
    |> case do
      {:error, reason} -> {:error, reason}
      {:ok, team_schema} -> team_schema_to_team(team_schema)
    end
  end

  defp team_schema_to_team(team_schema) do
    Team.from_team_schema(%Team{}, team_schema)
  end
end
